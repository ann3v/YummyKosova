begin;

alter table public.restaurants
add column if not exists is_published boolean not null default true;

comment on column public.restaurants.is_published is 'Controls whether a restaurant is publicly visible in the consumer app.';

create index if not exists restaurants_published_idx
  on public.restaurants (is_published)
  where is_published = true;

drop policy if exists "Restaurants are publicly readable" on public.restaurants;
create policy "Published restaurants are publicly readable"
on public.restaurants
for select
to anon, authenticated
using (is_published = true);

drop policy if exists "Restaurant images are publicly readable" on public.restaurant_images;
create policy "Published restaurant images are publicly readable"
on public.restaurant_images
for select
to anon, authenticated
using (
  exists (
    select 1
    from public.restaurants
    where restaurants.id = restaurant_images.restaurant_id
      and restaurants.is_published = true
  )
);

commit;
