# YummyKosova

YummyKosova is an Expo + React Native restaurant discovery app for Kosovo. The current foundation includes Expo Router navigation, Supabase Auth, Supabase-backed restaurant data, saved restaurants, and a small production-friendly UI system.

## Stack

- Expo
- React Native
- TypeScript
- Expo Router
- Supabase Auth + Postgres

## Prerequisites

- Node.js 20+
- npm
- Expo Go or a simulator/emulator
- A Supabase project
- A Google Maps API key for future map/location features

## Environment Setup

1. Copy `.env.example` to `.env.local`.
2. Fill in the required values:

```env
EXPO_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
EXPO_PUBLIC_GOOGLE_MAPS_API_KEY=your-google-maps-api-key
```

Notes:

- Expo automatically exposes `EXPO_PUBLIC_*` variables to the client app.
- Supabase is required for auth, restaurant reads, and saved restaurants.
- Google Maps is documented now so onboarding stays complete even before map screens are added.

## Install Dependencies

```bash
npm install
```

## Run The Expo App

```bash
npm start
```

Useful variants:

```bash
npm run android
npm run ios
npm run web
```

## Configure Supabase

1. Create a Supabase project.
2. Copy the project URL and anon key into `.env.local`.
3. Enable Email auth in the Supabase dashboard.
4. Apply the SQL migration in `supabase/migrations/`.
5. Run the seed data in `supabase/seed.sql` if you want starter restaurants locally.

Recommended dashboard settings:

- Authentication: enable Email provider
- Authentication: decide whether email confirmation should be required
- URL configuration: add your app scheme later if you introduce magic links or email redirects

## Configure Google Maps

Add `EXPO_PUBLIC_GOOGLE_MAPS_API_KEY` to `.env.local`.

This project does not yet ship a live maps screen, but the key is documented now so future onboarding does not need to change shape later. When maps are added, platform-specific setup may also be needed in Expo config.

## Quality Checks

Run lint:

```bash
npm run lint
```

Run type-check:

```bash
npm run typecheck
```

## CI

GitHub Actions is configured in `.github/workflows/ci.yml` to run:

- dependency install via `npm ci`
- lint
- type-check

## API Debugging Notes

For Supabase REST examples and debugging flows, see:

- `docs/api-usage.md`

That file documents:

- auth-related Supabase requests
- restaurant read examples
- saved restaurants examples

## Project Structure

```text
app/
src/
supabase/
docs/
.github/
```

## Current Focus

The app currently supports:

- onboarding flow
- email/password auth with Supabase
- restaurant discovery
- saved restaurants

Not implemented yet:

- reviews
- reservations
- maps UI
- admin content management
