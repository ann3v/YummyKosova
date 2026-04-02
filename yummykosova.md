# Low-competition project ideas with differentiation potential

---

## BEFORE YOU WRITE A SINGLE LINE OF CODE — DAY 1 SETUP

### GitHub
- Create org: **YummyKosova**
- Repo: **yummykosova-app**
- Branches: `main`, `dev`, `feat/*`
- Never push directly to `main`

### Supabase
- Create free project
- Run SQL schema migration
- Copy anon key + URL to `.env`
- Enable email auth

### Expo + React Native
- `npx create-expo-app yummykosova`
- Install NativeWind
- All devs install Expo Go app
- Test on real phones — **day 1**

---

### Accounts to create
- Supabase (1 shared account)
- Expo account (free)
- Google Cloud (Maps API key)
- Figma (design collaboration)

---

# PHASE 1 — FOUNDATION (WEEKS 1–2)

## 1. Project setup, auth & database

### Frontend (D1)
- App navigation — Expo Router setup, tab bar (Discover, Search, Saved, Profile)
- Splash screen — app icon, loading screen with YummyKosova branding
- Login & signup screens — forms with validation, Albanian + English toggle
- Onboarding flow — 3 slides explaining the app
- Global theme — colors, fonts, reusable components

### Backend (D2)
- Supabase schema — full SQL migration
- Row Level Security — owner-based permissions
- Auth integration — connect Supabase auth
- Seed data — 10 real restaurants
- Postman collection — document APIs

### Infra (D3)
- GitHub Actions — CI (lint + type-check)
- Environment setup — `.env.example`, secrets, README guide
- Figma design system
- Google Maps API key
- Supabase storage bucket

---

# PHASE 2 — CORE FEATURES (WEEKS 3–6)

## 2. Restaurant discovery, menus & maps

### Frontend (D1)
- Home feed — restaurant cards, categories
- Restaurant detail — photo, info, map
- Full menu — categories + items
- Search — filters (city, cuisine, price)
- Map — Google Maps with pins
- Photo gallery

### Backend (D2)
- Restaurant API — GET all/by id/by city
- Search API — full-text search
- Filter API — multiple filters
- Menu API — nested categories/items
- Image upload — Supabase Storage
- Nearby restaurants — PostGIS queries

### Infra (D3)
- Railway — deploy backend
- Image optimization — Sharp
- Edge functions — auto-expire specials
- Error tracking — Sentry
- Design handoff — Figma

---

# PHASE 3 — KEY DIFFERENTIATORS (WEEKS 7–9)

## 3. Daily specials, reservations & reviews

### Frontend (D1)
- Daily specials feed
- Reservation flow
- My reservations
- Write review
- Reviews list
- Offers screen

### Backend (D2)
- Daily specials API
- Reservation API + conflict checks
- Reviews API
- Offers API
- Saved restaurants

### Infra (D3)
- Email notifications (Resend)
- Push notifications (Expo)
- Real-time updates
- Owner dashboard

---

# PHASE 4 — POLISH, PAYMENTS & DEPLOYMENT (WEEKS 10–12)

## 4. Stripe, testing, app store submission

### Frontend (D1)
- Bilingual polish
- Loading skeletons
- Empty states
- Offline banner
- Profile screen
- App store screenshots

### Backend (D2)
- Stripe integration
- Plan enforcement
- Admin API
- Rate limiting
- Input validation
- Analytics events

### Infra (D3)
- EAS Build
- TestFlight beta
- App Store Connect
- Google Play Console
- Privacy policy
- Production Supabase

---

# DEPLOYMENT CHECKLIST

## Security
- RLS enabled
- No anon key in frontend
- Env variables secured
- Input validation
- Rate limiting

## Performance
- Images < 200KB
- DB indexes
- Pagination
- Load < 3s

## Testing
- Real devices tested
- Beta users
- All flows tested

## Content
- 30+ restaurants
- Real photos & menus

## Legal
- Privacy policy
- Terms of service
- Stripe KYC

---

# TEAM RULES

### Git workflow
- Feature branches
- PR required
- No direct push to main

### Daily standup
- What you did
- What you're doing
- Blockers

### API contract first
- Backend defines before frontend builds

### One source of truth
- Notion / Linear board

### TypeScript strictly
- No `any`

### Real devices always
- Test on Android & iPhone

---

# MILESTONES

- Week 2 → Login works on real devices
- Week 4 → Restaurant + menu working
- Week 6 → Search + maps done
- Week 8 → Reservation working
- Week 10 → Beta live
- Week 12 → App submitted

---

# ⚠️ KEY INSIGHTS

- Week 1 is the most important (foundation)
- Biggest risk: frontend waiting on backend
- Solve with API-first approach
- Content (restaurants) is critical before launch
- App Store review takes time — plan ahead

---

**This is your full 12-week execution plan.**
