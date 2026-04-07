begin;

create table public.menu_categories (
  id uuid primary key default extensions.gen_random_uuid(),
  restaurant_id uuid not null references public.restaurants (id) on delete cascade,
  name text not null,
  description text,
  sort_order int not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint menu_categories_sort_order_check
    check (sort_order >= 0)
);

comment on table public.menu_categories is 'Top-level menu groupings shown on a restaurant detail page.';

create table public.menu_items (
  id uuid primary key default extensions.gen_random_uuid(),
  category_id uuid not null references public.menu_categories (id) on delete cascade,
  name text not null,
  description text,
  price numeric(10,2) not null,
  image_url text,
  image_alt_text text,
  sort_order int not null default 0,
  is_available boolean not null default true,
  availability_note text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint menu_items_sort_order_check
    check (sort_order >= 0),
  constraint menu_items_price_check
    check (price >= 0),
  constraint menu_items_image_url_check
    check (image_url is null or image_url ~* '^https?://')
);

comment on table public.menu_items is 'Individual menu dishes nested under a restaurant menu category.';
comment on column public.menu_items.availability_note is 'Optional short note shown as a badge for limited-time or context-specific availability.';

create trigger set_menu_categories_updated_at
before update on public.menu_categories
for each row
execute function public.set_updated_at();

create trigger set_menu_items_updated_at
before update on public.menu_items
for each row
execute function public.set_updated_at();

create index menu_categories_restaurant_id_sort_order_idx
  on public.menu_categories (restaurant_id, sort_order);
create index menu_items_category_id_sort_order_idx
  on public.menu_items (category_id, sort_order);
create index menu_items_available_idx
  on public.menu_items (is_available)
  where is_available = true;

alter table public.menu_categories enable row level security;
alter table public.menu_items enable row level security;

create policy "Published menu categories are publicly readable"
on public.menu_categories
for select
to anon, authenticated
using (
  is_active = true
  and exists (
    select 1
    from public.restaurants
    where restaurants.id = menu_categories.restaurant_id
      and restaurants.is_published = true
  )
);

create policy "Published menu items are publicly readable"
on public.menu_items
for select
to anon, authenticated
using (
  is_available = true
  and exists (
    select 1
    from public.menu_categories
    join public.restaurants on restaurants.id = menu_categories.restaurant_id
    where menu_categories.id = menu_items.category_id
      and menu_categories.is_active = true
      and restaurants.is_published = true
  )
);

commit;
