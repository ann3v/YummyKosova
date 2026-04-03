begin;

insert into public.restaurants (
  name,
  slug,
  description,
  city,
  address,
  cuisine,
  price_range,
  rating,
  latitude,
  longitude,
  phone,
  website,
  is_featured
)
values
  (
    'Te Sheshi Bistro',
    'te-sheshi-bistro',
    'A polished all-day bistro near the city center with brunch plates, fresh pasta, and a calm evening crowd.',
    'Prishtinë',
    'Sheshi Zahir Pajaziti, Prishtinë',
    'Modern European',
    '€€',
    4.6,
    42.662913,
    21.165503,
    '+383 38 221 450',
    null,
    true
  ),
  (
    'Sofra e Vjetër',
    'sofra-e-vjeter',
    'Traditional Kosovar comfort food with slow-cooked meats, flija on weekends, and a warm family dining room.',
    'Prishtinë',
    'Rruga Rexhep Luci, Prishtinë',
    'Traditional Kosovar',
    '€€',
    4.7,
    42.658922,
    21.161492,
    '+383 38 248 910',
    null,
    true
  ),
  (
    'Rruga e Gurit Grill House',
    'rruga-e-gurit-grill-house',
    'Charcoal grills, sharri platters, and late dinners in the old stone quarter above the river.',
    'Prizren',
    'Rruga e Shadërvanit, Prizren',
    'Grill & Traditional',
    '€€',
    4.5,
    42.213901,
    20.739176,
    '+383 29 244 801',
    null,
    false
  ),
  (
    'Lumbardhi Terrace',
    'lumbardhi-terrace',
    'A riverside terrace for seafood, seasonal salads, and sunset dinners overlooking central Prizren.',
    'Prizren',
    'Rruga Marin Barleti, Prizren',
    'Mediterranean',
    '€€€',
    4.8,
    42.209774,
    20.741118,
    '+383 29 221 660',
    null,
    true
  ),
  (
    'Dukagjini Kitchen',
    'dukagjini-kitchen',
    'Contemporary Albanian dishes, local wines, and an elevated dinner service close to the heart of Pejë.',
    'Pejë',
    'Sheshi Haxhi Zeka, Pejë',
    'Contemporary Albanian',
    '€€€',
    4.7,
    42.659128,
    20.288435,
    '+383 39 431 220',
    null,
    true
  ),
  (
    'Bjeshka Table',
    'bjeshka-table',
    'Hearty mountain-style plates, grilled vegetables, and generous portions inspired by western Kosovo kitchens.',
    'Pejë',
    'Rruga Mbretëresha Teutë, Pejë',
    'Traditional Kosovar',
    '€€',
    4.4,
    42.661203,
    20.296311,
    '+383 39 440 118',
    null,
    false
  ),
  (
    'Çarshia Garden',
    'carshia-garden',
    'A relaxed courtyard restaurant in the old bazaar area serving grills, meze, and house-made desserts.',
    'Gjakovë',
    'Çarshia e Madhe, Gjakovë',
    'Balkan Grill',
    '€€',
    4.5,
    42.380554,
    20.431193,
    '+383 39 325 404',
    null,
    false
  ),
  (
    'Hani i Sahatit',
    'hani-i-sahatit',
    'A classic city restaurant known for stews, oven dishes, and long family lunches near the historic center.',
    'Gjakovë',
    'Rruga Yll Morina, Gjakovë',
    'Traditional Kosovar',
    '€€',
    4.3,
    42.378931,
    20.435977,
    '+383 39 326 220',
    null,
    false
  ),
  (
    'City Garden Ferizaj',
    'city-garden-ferizaj',
    'Modern comfort food, polished service, and a bright indoor-outdoor setup popular for casual dinners.',
    'Ferizaj',
    'Rruga Dëshmorët e Kombit, Ferizaj',
    'International',
    '€€',
    4.4,
    42.370862,
    21.155298,
    '+383 29 330 512',
    null,
    true
  ),
  (
    'N''Kullë Smokehouse',
    'n-kulle-smokehouse',
    'Wood-fired meats, rustic sides, and a cozy evening atmosphere with a strong local following.',
    'Ferizaj',
    'Rruga Ahmet Kaçiku, Ferizaj',
    'Smokehouse',
    '€€€',
    4.6,
    42.366918,
    21.152445,
    '+383 29 333 740',
    null,
    false
  )
on conflict (slug) do update
set
  name = excluded.name,
  description = excluded.description,
  city = excluded.city,
  address = excluded.address,
  cuisine = excluded.cuisine,
  price_range = excluded.price_range,
  rating = excluded.rating,
  latitude = excluded.latitude,
  longitude = excluded.longitude,
  phone = excluded.phone,
  website = excluded.website,
  is_featured = excluded.is_featured,
  updated_at = now();

delete from public.restaurant_images
where restaurant_id in (
  select id
  from public.restaurants
  where slug in (
    'te-sheshi-bistro',
    'sofra-e-vjeter',
    'rruga-e-gurit-grill-house',
    'lumbardhi-terrace',
    'dukagjini-kitchen',
    'bjeshka-table',
    'carshia-garden',
    'hani-i-sahatit',
    'city-garden-ferizaj',
    'n-kulle-smokehouse'
  )
);

insert into public.restaurant_images (restaurant_id, image_url, alt_text, sort_order)
select r.id, v.image_url, v.alt_text, v.sort_order
from public.restaurants r
join (
  values
    ('te-sheshi-bistro', 'https://placehold.co/1200x800/png?text=Te+Sheshi+Bistro', 'Dining room at Te Sheshi Bistro', 0),
    ('sofra-e-vjeter', 'https://placehold.co/1200x800/png?text=Sofra+e+Vjeter', 'Traditional table setting at Sofra e Vjetër', 0),
    ('rruga-e-gurit-grill-house', 'https://placehold.co/1200x800/png?text=Rruga+e+Gurit+Grill+House', 'Grill platter at Rruga e Gurit Grill House', 0),
    ('lumbardhi-terrace', 'https://placehold.co/1200x800/png?text=Lumbardhi+Terrace', 'Riverside seating at Lumbardhi Terrace', 0),
    ('dukagjini-kitchen', 'https://placehold.co/1200x800/png?text=Dukagjini+Kitchen', 'Evening dining setup at Dukagjini Kitchen', 0),
    ('bjeshka-table', 'https://placehold.co/1200x800/png?text=Bjeshka+Table', 'Rustic plates at Bjeshka Table', 0),
    ('carshia-garden', 'https://placehold.co/1200x800/png?text=Carshia+Garden', 'Courtyard seating at Çarshia Garden', 0),
    ('hani-i-sahatit', 'https://placehold.co/1200x800/png?text=Hani+i+Sahatit', 'Traditional lunch spread at Hani i Sahatit', 0),
    ('city-garden-ferizaj', 'https://placehold.co/1200x800/png?text=City+Garden+Ferizaj', 'Dining area at City Garden Ferizaj', 0),
    ('n-kulle-smokehouse', 'https://placehold.co/1200x800/png?text=N+Kulle+Smokehouse', 'Smokehouse platter at N''Kullë Smokehouse', 0)
) as v(slug, image_url, alt_text, sort_order)
  on v.slug = r.slug;

commit;
