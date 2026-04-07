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
  is_featured,
  is_published
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
    true,
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
    true,
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
    false,
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
    true,
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
    true,
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
    false,
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
    false,
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
    false,
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
    true,
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
    false,
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
  is_published = excluded.is_published,
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

delete from public.menu_items
where category_id in (
  select mc.id
  from public.menu_categories mc
  join public.restaurants r on r.id = mc.restaurant_id
  where r.slug in (
    'te-sheshi-bistro',
    'sofra-e-vjeter',
    'lumbardhi-terrace',
    'dukagjini-kitchen'
  )
);

delete from public.menu_categories
where restaurant_id in (
  select id
  from public.restaurants
  where slug in (
    'te-sheshi-bistro',
    'sofra-e-vjeter',
    'lumbardhi-terrace',
    'dukagjini-kitchen'
  )
);

insert into public.menu_categories (restaurant_id, name, description, sort_order, is_active)
select r.id, v.name, v.description, v.sort_order, true
from public.restaurants r
join (
  values
    ('te-sheshi-bistro', 'Brunch Plates', 'Slow starts, eggs, and lighter mid-day favorites.', 0),
    ('te-sheshi-bistro', 'Pasta & Mains', 'Comforting house specials for lunch and dinner.', 1),
    ('sofra-e-vjeter', 'Traditional Plates', 'Kosovar staples served in generous portions.', 0),
    ('sofra-e-vjeter', 'Weekend Specials', 'Classic dishes that rotate around the family table.', 1),
    ('lumbardhi-terrace', 'Seafood & Salads', 'Fresh plates built for the riverside terrace.', 0),
    ('lumbardhi-terrace', 'Sunset Mains', 'Heavier evening dishes for long dinners in Prizren.', 1),
    ('dukagjini-kitchen', 'Starters', 'A refined start built around local produce and dairy.', 0),
    ('dukagjini-kitchen', 'Signature Plates', 'Contemporary Albanian dishes and house specialties.', 1),
    ('dukagjini-kitchen', 'Desserts', 'Sweet finishes with a polished dinner-service feel.', 2)
) as v(slug, name, description, sort_order)
  on v.slug = r.slug;

insert into public.menu_items (
  category_id,
  name,
  description,
  price,
  image_url,
  image_alt_text,
  sort_order,
  is_available,
  availability_note
)
select
  mc.id,
  v.item_name,
  v.item_description,
  v.price,
  v.image_url,
  v.image_alt_text,
  v.sort_order,
  v.is_available,
  v.availability_note
from public.menu_categories mc
join public.restaurants r on r.id = mc.restaurant_id
join (
  values
    ('te-sheshi-bistro', 'Brunch Plates', 'Truffle Omelette', 'Soft eggs, sauteed mushrooms, parmesan, and herbs.', 9.50, 'https://placehold.co/400x400/png?text=Truffle+Omelette', 'Truffle omelette at Te Sheshi Bistro', 0, true, null),
    ('te-sheshi-bistro', 'Brunch Plates', 'Ricotta Pancakes', 'Fluffy pancakes with whipped ricotta, berries, and honey.', 8.50, null, null, 1, true, 'Weekend favorite'),
    ('te-sheshi-bistro', 'Pasta & Mains', 'Fresh Tagliatelle', 'Hand-cut pasta with roasted tomatoes, basil, and pecorino.', 12.00, null, null, 0, true, null),
    ('te-sheshi-bistro', 'Pasta & Mains', 'Roasted Chicken Plate', 'Herbed chicken with lemon potatoes and seasonal greens.', 13.50, 'https://placehold.co/400x400/png?text=Roasted+Chicken', 'Roasted chicken plate at Te Sheshi Bistro', 1, true, null),
    ('sofra-e-vjeter', 'Traditional Plates', 'Flija with Yogurt', 'Layered traditional pastry served warm with village yogurt.', 7.00, 'https://placehold.co/400x400/png?text=Flija', 'Flija served at Sofra e Vjetër', 0, true, 'Served daily'),
    ('sofra-e-vjeter', 'Traditional Plates', 'Tavë Prizreni', 'Slow-baked peppers, meat, and potatoes in a rich clay-pan sauce.', 11.50, null, null, 1, true, null),
    ('sofra-e-vjeter', 'Weekend Specials', 'Pite e Shtëpisë', 'House pie with spinach and local cheese baked fresh each morning.', 6.50, null, null, 0, true, 'Weekends only'),
    ('lumbardhi-terrace', 'Seafood & Salads', 'Grilled Sea Bass', 'Whole grilled sea bass with lemon oil and charred fennel.', 17.00, 'https://placehold.co/400x400/png?text=Sea+Bass', 'Sea bass plate at Lumbardhi Terrace', 0, true, null),
    ('lumbardhi-terrace', 'Seafood & Salads', 'Citrus Shrimp Salad', 'Shrimp, greens, citrus segments, and toasted almonds.', 12.50, null, null, 1, true, null),
    ('lumbardhi-terrace', 'Sunset Mains', 'Seafood Risotto', 'Creamy risotto with mussels, shrimp, herbs, and parmesan.', 15.00, null, null, 0, true, null),
    ('lumbardhi-terrace', 'Sunset Mains', 'Lamb Shoulder', 'Slow-cooked lamb shoulder with root vegetables and pan jus.', 18.50, null, null, 1, true, 'Evening special'),
    ('dukagjini-kitchen', 'Starters', 'Whipped Feta Dip', 'Creamy feta, roasted peppers, olive oil, and toasted bread.', 6.00, null, null, 0, true, null),
    ('dukagjini-kitchen', 'Starters', 'Charred Zucchini', 'Zucchini ribbons, herbs, yogurt dressing, and walnuts.', 5.50, null, null, 1, true, null),
    ('dukagjini-kitchen', 'Signature Plates', 'Veal Medallions', 'Tender veal, potato puree, wild mushrooms, and red wine glaze.', 19.00, 'https://placehold.co/400x400/png?text=Veal+Medallions', 'Veal medallions at Dukagjini Kitchen', 0, true, null),
    ('dukagjini-kitchen', 'Signature Plates', 'Forest Mushroom Pappardelle', 'Wide pasta with mushroom ragout, thyme, and aged cheese.', 14.00, null, null, 1, true, null),
    ('dukagjini-kitchen', 'Desserts', 'Honey Cake', 'Layered sponge with burnt honey cream and toasted crumbs.', 5.00, null, null, 0, true, null),
    ('dukagjini-kitchen', 'Desserts', 'Chocolate Mousse', 'Dark chocolate mousse with sea salt and berry compote.', 5.50, null, null, 1, true, null)
) as v(
  restaurant_slug,
  category_name,
  item_name,
  item_description,
  price,
  image_url,
  image_alt_text,
  sort_order,
  is_available,
  availability_note
)
  on v.restaurant_slug = r.slug
 and v.category_name = mc.name;

commit;
