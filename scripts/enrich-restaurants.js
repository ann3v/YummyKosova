const path = require('node:path');
const { readFile, writeFile } = require('node:fs/promises');

const FIND_PLACE_URL = 'https://maps.googleapis.com/maps/api/place/findplacefromtext/json';
const PLACE_DETAILS_URL = 'https://maps.googleapis.com/maps/api/place/details/json';
const PLACE_PHOTO_URL = 'https://maps.googleapis.com/maps/api/place/photo';

function getArgValue(name) {
  const prefix = `--${name}=`;
  const arg = process.argv.find((item) => item.startsWith(prefix));

  if (arg) {
    return arg.split('=')[1];
  }

  const flagIndex = process.argv.indexOf(`--${name}`);
  if (flagIndex !== -1 && flagIndex + 1 < process.argv.length) {
    return process.argv[flagIndex + 1];
  }

  return null;
}

function resolvePath(rawPath) {
  return path.isAbsolute(rawPath)
    ? rawPath
    : path.resolve(process.cwd(), rawPath);
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function sanitizeSql(value) {
  if (value === null || value === undefined) {
    return 'NULL';
  }

  const text = String(value);
  return `'${text.replace(/'/g, "''")}'`;
}

function buildPhotoUrl(photoReference, apiKey) {
  if (!photoReference) {
    return null;
  }

  return `${PLACE_PHOTO_URL}?maxwidth=1200&photoreference=${encodeURIComponent(
    photoReference
  )}&key=${encodeURIComponent(apiKey)}`;
}

async function fetchJson(url) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Google API request failed: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

async function findPlaceId(query, apiKey) {
  const url = `${FIND_PLACE_URL}?input=${encodeURIComponent(query)}&inputtype=textquery&fields=place_id,formatted_address,name&key=${encodeURIComponent(apiKey)}`;
  const data = await fetchJson(url);

  if (data.status !== 'OK' || !Array.isArray(data.candidates) || data.candidates.length === 0) {
    console.warn(`Google Places findplace response for ${query}:`, data.status, data.error_message ?? 'no error_message');
    return null;
  }

  return data.candidates[0];
}

async function getPlaceDetails(placeId, apiKey) {
  const fields = [
    'name',
    'formatted_address',
    'editorial_summary',
    'photos',
    'website',
    'rating',
    'formatted_phone_number',
    'geometry',
  ].join(',');

  const url = `${PLACE_DETAILS_URL}?place_id=${encodeURIComponent(placeId)}&fields=${fields}&key=${encodeURIComponent(apiKey)}`;
  const data = await fetchJson(url);

  if (data.status !== 'OK' || !data.result) {
    console.warn(`Google Places details response for ${placeId}:`, data.status, data.error_message ?? 'no error_message');
    return null;
  }

  return data.result;
}

function normalizeText(value) {
  const trimmed = typeof value === 'string' ? value.trim() : '';
  return trimmed.length > 0 ? trimmed : null;
}

function buildRestaurantSql(restaurant) {
  const slug = normalizeText(restaurant.slug) ||
    normalizeText(restaurant.name)?.toLowerCase().replace(/[^a-z0-9]+/g, '-')?.replace(/(^-|-$)/g, '') ||
    `restaurant-${Date.now()}`;

  const fields = [
    'name',
    'slug',
    'description',
    'city',
    'address',
    'cuisine',
    'price_range',
    'rating',
    'latitude',
    'longitude',
    'phone',
    'website',
    'is_featured',
    'is_published',
    'updated_at',
  ];

  const values = [
    sanitizeSql(restaurant.name),
    sanitizeSql(slug),
    sanitizeSql(restaurant.description || restaurant.google_description || null),
    sanitizeSql(restaurant.city || 'Prishtinë'),
    sanitizeSql(restaurant.address || restaurant.google_address || null),
    sanitizeSql(restaurant.cuisine || null),
    sanitizeSql(restaurant.price_range || null),
    restaurant.rating ?? 'NULL',
    restaurant.latitude ?? 'NULL',
    restaurant.longitude ?? 'NULL',
    sanitizeSql(restaurant.phone || restaurant.google_phone || null),
    sanitizeSql(restaurant.website || restaurant.google_website || null),
    restaurant.is_featured ? 'true' : 'false',
    restaurant.is_published === false ? 'false' : 'true',
    'now()',
  ];

  const updateFields = [
    'name = excluded.name',
    'description = excluded.description',
    'city = excluded.city',
    'address = excluded.address',
    'cuisine = excluded.cuisine',
    'price_range = excluded.price_range',
    'rating = excluded.rating',
    'latitude = excluded.latitude',
    'longitude = excluded.longitude',
    'phone = excluded.phone',
    'website = excluded.website',
    'is_featured = excluded.is_featured',
    'is_published = excluded.is_published',
    'updated_at = now()',
  ];

  const slugValue = sanitizeSql(slug);
  const imageUrl = restaurant.photo_url || restaurant.google_photo_url || null;
  const altText = restaurant.photo_alt_text || `Photo of ${restaurant.name}`;

  const insertRestaurant = `insert into public.restaurants (${fields.join(', ')}) values (${values.join(', ')} ) on conflict (slug) do update set ${updateFields.join(', ')};`;

  if (!imageUrl) {
    return insertRestaurant;
  }

  const deleteImage = `delete from public.restaurant_images where restaurant_id = (select id from public.restaurants where slug = ${slugValue});`;
  const insertImage = `insert into public.restaurant_images (restaurant_id, image_url, alt_text, sort_order)
select id, ${sanitizeSql(imageUrl)}, ${sanitizeSql(altText)}, 0
from public.restaurants
where slug = ${slugValue};`;

  return [insertRestaurant, deleteImage, insertImage].join('\n');
}

async function main() {
  const apiKey = getArgValue('api-key') || process.env.GOOGLE_PLACES_API_KEY;
  const inputFile = resolvePath(getArgValue('input') || '../RESTAURANTET PRISHTINE V2.json');
  const outputFile = resolvePath(getArgValue('output') || './scripts/restaurants-enriched.json');
  const sqlOutput = getArgValue('sql-output') ? resolvePath(getArgValue('sql-output')) : null;
  const delayMs = Number(getArgValue('delay') || '120');

  if (!apiKey) {
    console.error('Error: Google Places API key is required. Add it to GOOGLE_PLACES_API_KEY or pass --api-key=KEY');
    process.exit(1);
  }

  console.log(`Loading restaurants from ${inputFile}`);
  const rawText = await readFile(inputFile, 'utf8');
  const parsed = JSON.parse(rawText);
  const restaurants = Array.isArray(parsed)
    ? parsed
    : Array.isArray(parsed.restaurants)
    ? parsed.restaurants
    : null;

  if (!restaurants) {
    throw new Error('Input JSON must be an array or contain a top-level "restaurants" array.');
  }

  const enriched = [];
  const sqlLines = [];
  const problems = [];

  for (let index = 0; index < restaurants.length; index += 1) {
    const item = restaurants[index];
    const name = normalizeText(item.name);

    if (!name) {
      problems.push(`Skipping item at index ${index}: missing name.`);
      enriched.push(item);
      continue;
    }

    const city = normalizeText(item.city) || 'Prishtinë';
    const address = normalizeText(item.address);
    const queryParts = [name, address, city, 'Kosovo'].filter(Boolean);
    const query = queryParts.join(', ');

    console.log(`\n[${index + 1}/${restaurants.length}] Searching for: ${query}`);

    let candidate = null;
    try {
      candidate = await findPlaceId(query, apiKey);
    } catch (error) {
      console.warn(`  Warning: find place failed for ${name}: ${error.message}`);
    }

    if (!candidate) {
      problems.push(`No Google place found for ${name} (${query})`);
      enriched.push({ ...item, google_place_match: false });
      await sleep(delayMs);
      continue;
    }

    if (!candidate.place_id) {
      problems.push(`No place_id returned for ${name} (${query})`);
      enriched.push({ ...item, google_place_match: false });
      await sleep(delayMs);
      continue;
    }

    let details = null;
    try {
      details = await getPlaceDetails(candidate.place_id, apiKey);
    } catch (error) {
      problems.push(`Place details failed for ${name}: ${error.message}`);
    }

    if (!details) {
      enriched.push({
        ...item,
        google_place_id: candidate.place_id,
        google_place_match: true,
      });
      await sleep(delayMs);
      continue;
    }

    const photoReference = Array.isArray(details.photos) && details.photos[0]?.photo_reference
      ? details.photos[0].photo_reference
      : null;

    const googleDescription = details.editorial_summary?.overview || details.editorial_summary?.summary || details.formatted_address || null;
    const googlePhotoUrl = buildPhotoUrl(photoReference, apiKey);

    const enrichedItem = {
      ...item,
      google_place_id: details.place_id || candidate.place_id,
      google_name: details.name || name,
      google_address: normalizeText(details.formatted_address) || address || null,
      google_description: googleDescription,
      google_rating: typeof details.rating === 'number' ? details.rating : null,
      google_website: normalizeText(details.website) || null,
      google_phone: normalizeText(details.formatted_phone_number) || null,
      google_latitude: details.geometry?.location?.lat ?? null,
      google_longitude: details.geometry?.location?.lng ?? null,
      photo_reference: photoReference,
      photo_url: googlePhotoUrl,
      photo_alt_text: `Photo of ${name}`,
      google_place_match: true,
    };

    enriched.push(enrichedItem);

    if (sqlOutput) {
      sqlLines.push(buildRestaurantSql(enrichedItem));
    }

    await sleep(delayMs);
  }

  await writeFile(outputFile, JSON.stringify({ restaurants: enriched }, null, 2) + '\n', 'utf8');
  console.log(`\nWrote enriched restaurant JSON to ${outputFile}`);

  if (sqlOutput) {
    await writeFile(sqlOutput, sqlLines.join('\n\n') + '\n', 'utf8');
    console.log(`Wrote SQL seed file to ${sqlOutput}`);
  }

  if (problems.length > 0) {
    console.log(`\nCompleted with ${problems.length} warnings. Review the following:`);
    problems.slice(0, 20).forEach((line) => console.log(`- ${line}`));
    if (problems.length > 20) {
      console.log(`...and ${problems.length - 20} more warnings.`);
    }
  } else {
    console.log('\nCompleted successfully with no warnings.');
  }
}

main().catch((error) => {
  console.error('Error:', error.message || error);
  process.exit(1);
});
