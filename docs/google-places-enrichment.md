# Google Places Enrichment for Restaurant Data

This project uses Supabase-backed restaurant data. To add real descriptions and photos to your existing JSON, use the Google Places API to enrich the file before importing it into Supabase.

## 1. Get a Google Places API key

1. Open the Google Cloud Console:
   - https://console.cloud.google.com/google/maps-apis/
2. Create or select a Google Cloud project.
3. Enable `Places API` for that project.
   - If you see `REQUEST_DENIED` with a legacy API message, enable the new Places API backend here:
     `https://console.cloud.google.com/apis/library/places-backend.googleapis.com`
4. Create an API key.
5. Restrict the key later if you want:
   - HTTP referrers for web apps
   - Android/iOS package and SHA-1 for mobile
   - IP addresses for server-side scripts

## 2. Store the key

This project already uses `.env.example` with `EXPO_PUBLIC_GOOGLE_MAPS_API_KEY`.

For the enrichment script, you can set it in your shell or pass it directly:

```bash
export GOOGLE_PLACES_API_KEY=YOUR_KEY
```

or on Windows PowerShell:

```powershell
$env:GOOGLE_PLACES_API_KEY='YOUR_KEY'
```

## 3. Run the enrichment script

From the project root:

```bash
npm run enrich-restaurants -- --input="../RESTAURANTET PRISHTINE V2.json" --output="./scripts/restaurants-enriched.json" --sql-output="./supabase/seed-generated.sql"
```

If your input file is in a different location, update the `--input` or `--output` value accordingly.

## 4. What the script does

- Reads your restaurant JSON structure.
- Searches Google Places using restaurant name + address + city.
- Fetches place details.
- Writes an enriched JSON file with:
  - `google_place_id`
  - `google_address`
  - `google_description`
  - `google_rating`
  - `google_website`
  - `google_phone`
  - `google_latitude`
  - `google_longitude`
  - `photo_reference`
  - `photo_url`
- Optionally writes a SQL file for Supabase import.

## 5. Import into Supabase

The generated SQL file is not automatically applied. Open `supabase/seed-generated.sql` and run it in the Supabase SQL editor.

Because this is a one-time enrichment step, the recommended flow is:

1. Run the script.
2. Review the generated JSON or SQL.
3. Apply the SQL file in Supabase or copy values into your database.

## 6. Notes

- Google returned photo URLs are temporary and are served through the Places Photo endpoint.
- If some restaurants do not match, the script will still keep them and mark them with `google_place_match: false`.
- This script is intentionally offline-friendly: it enriches the data file before your app consumes the restaurant data.
