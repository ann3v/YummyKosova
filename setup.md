# 📱 YummyKosova — Quick Setup Guide

## 🚀 Project Overview

YummyKosova is a React Native (Expo) app for discovering restaurants in Kosovo.

### ✅ Current Features Implemented

- Supabase project setup
- Database schema + seed data (10 restaurants)
- Authentication (Supabase Auth)
- Login / Signup UI
- Expo Router navigation structure
- AsyncStorage integration for auth persistence

---

## ⚡ Quick Setup (for teammates & professor)

### 1. Clone the project

git clone <your-repo-url>
cd yummykosova

---

### 2. Install dependencies

npm install

---

### 3. Install required native packages (IMPORTANT)

npx expo install @react-native-async-storage/async-storage
npx expo install react-native-url-polyfill

---

### 4. Setup environment variables

Create a .env file in the root:

EXPO_PUBLIC_SUPABASE_URL=your_supabase_url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_anon_key

You can find these in:
Supabase → Project Settings → API

---

### 5. Run the app

npx expo start

---

## 🗄️ Database Setup (IMPORTANT)

If database is empty, run seed manually:

1. Go to Supabase Dashboard
2. Open SQL Editor
3. Paste contents of seed.sql
4. Click Run

---

## ⚠️ Common Issues

### ❌ No restaurants available

- Make sure seed.sql is executed
- Check restaurants table has data
- Disable RLS if needed:

alter table restaurants disable row level security;
alter table restaurant_images disable row level security;

---

### ❌ AsyncStorage error

If you see "Native module is null":

npx expo install @react-native-async-storage/async-storage
npx expo start -c

---

## 📁 Key Project Structure

app/
(auth)/
(tabs)/
(onboarding)/
lib/
supabase.ts

---

## 🧠 Notes

- Seed file (seed.sql) must be run manually
- Supabase is used for Auth and Database
- App uses Expo Router

---

## ✅ Status

Backend connected
Auth working
Seed data loaded
App runs locally
