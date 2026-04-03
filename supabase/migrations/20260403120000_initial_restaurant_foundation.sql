begin;

create extension if not exists pgcrypto with schema extensions;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text,
  avatar_url text,
  preferred_language text not null default 'en',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint profiles_preferred_language_check
    check (preferred_language in ('en', 'sq'))
);

comment on table public.profiles is 'Application profile data for authenticated users.';
comment on column public.profiles.preferred_language is 'Preferred UI language for the mobile app.';

create table public.restaurants (
  id uuid primary key default extensions.gen_random_uuid(),
  name text not null,
  slug text not null unique,
  description text,
  city text not null,
  address text,
  cuisine text,
  price_range text,
  rating numeric(2,1),
  latitude numeric(9,6),
  longitude numeric(9,6),
  phone text,
  website text,
  is_featured boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint restaurants_rating_check
    check (rating is null or (rating >= 0 and rating <= 5)),
  constraint restaurants_latitude_check
    check (latitude is null or (latitude >= -90 and latitude <= 90)),
  constraint restaurants_longitude_check
    check (longitude is null or (longitude >= -180 and longitude <= 180)),
  constraint restaurants_website_check
    check (website is null or website ~* '^https?://')
);

comment on table public.restaurants is 'Restaurant listings available in the YummyKosova discovery app.';
comment on column public.restaurants.slug is 'Stable public identifier used by the client and web links.';

create table public.restaurant_images (
  id uuid primary key default extensions.gen_random_uuid(),
  restaurant_id uuid not null references public.restaurants (id) on delete cascade,
  image_url text not null,
  alt_text text,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  constraint restaurant_images_sort_order_check
    check (sort_order >= 0)
);

comment on table public.restaurant_images is 'Ordered image gallery entries for restaurant listings.';

create table public.saved_restaurants (
  id uuid primary key default extensions.gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  restaurant_id uuid not null references public.restaurants (id) on delete cascade,
  created_at timestamptz not null default now(),
  constraint saved_restaurants_user_id_restaurant_id_key unique (user_id, restaurant_id)
);

comment on table public.saved_restaurants is 'Restaurants bookmarked by authenticated users.';

create trigger set_profiles_updated_at
before update on public.profiles
for each row
execute function public.set_updated_at();

create trigger set_restaurants_updated_at
before update on public.restaurants
for each row
execute function public.set_updated_at();

-- Primary keys and unique constraints already index profiles.id and restaurants.slug.
create index restaurants_city_idx on public.restaurants (city);
create index restaurants_cuisine_idx on public.restaurants (cuisine);
create index restaurants_featured_idx on public.restaurants (is_featured) where is_featured = true;
create index restaurant_images_restaurant_id_sort_order_idx
  on public.restaurant_images (restaurant_id, sort_order);
create index saved_restaurants_user_id_idx on public.saved_restaurants (user_id);
create index saved_restaurants_restaurant_id_idx on public.saved_restaurants (restaurant_id);

alter table public.profiles enable row level security;
alter table public.restaurants enable row level security;
alter table public.restaurant_images enable row level security;
alter table public.saved_restaurants enable row level security;

create policy "Profiles are viewable by owner"
on public.profiles
for select
to authenticated
using (auth.uid() = id);

create policy "Profiles are insertable by owner"
on public.profiles
for insert
to authenticated
with check (auth.uid() = id);

create policy "Profiles are updatable by owner"
on public.profiles
for update
to authenticated
using (auth.uid() = id)
with check (auth.uid() = id);

create policy "Saved restaurants are viewable by owner"
on public.saved_restaurants
for select
to authenticated
using (auth.uid() = user_id);

create policy "Saved restaurants are insertable by owner"
on public.saved_restaurants
for insert
to authenticated
with check (auth.uid() = user_id);

create policy "Saved restaurants are deletable by owner"
on public.saved_restaurants
for delete
to authenticated
using (auth.uid() = user_id);

create policy "Restaurants are publicly readable"
on public.restaurants
for select
to anon, authenticated
using (true);

create policy "Restaurant images are publicly readable"
on public.restaurant_images
for select
to anon, authenticated
using (true);

commit;
