# API Usage Notes

YummyKosova uses Supabase as the backend. For day-to-day product work, these flows are better documented than exported as a rigid Postman collection because most client requests depend on the signed-in user's bearer token.

## Base Configuration

- Supabase project URL: `https://<your-project-ref>.supabase.co`
- REST base URL: `https://<your-project-ref>.supabase.co/rest/v1`
- Auth base URL: `https://<your-project-ref>.supabase.co/auth/v1`
- Required headers for authenticated requests:

```http
apikey: <SUPABASE_ANON_KEY>
Authorization: Bearer <access_token>
Content-Type: application/json
```

## Auth Notes

The mobile app uses `@supabase/supabase-js`, so direct Postman usage is mainly useful for debugging.

### Sign Up

```http
POST /auth/v1/signup
```

```json
{
  "email": "ardit@example.com",
  "password": "secret123",
  "data": {
    "full_name": "Ardit Avdiu"
  }
}
```

Expected shape:

```json
{
  "access_token": "jwt-or-null-if-email-confirmation-is-required",
  "refresh_token": "token-or-null",
  "user": {
    "id": "uuid",
    "email": "ardit@example.com",
    "user_metadata": {
      "full_name": "Ardit Avdiu"
    }
  }
}
```

### Sign In With Password

```http
POST /auth/v1/token?grant_type=password
```

```json
{
  "email": "ardit@example.com",
  "password": "secret123"
}
```

Expected shape:

```json
{
  "access_token": "jwt",
  "refresh_token": "token",
  "expires_in": 3600,
  "token_type": "bearer",
  "user": {
    "id": "uuid",
    "email": "ardit@example.com"
  }
}
```

## Restaurant Read Queries

### List Restaurants With Images

```http
GET /rest/v1/restaurants?select=id,name,slug,description,city,address,cuisine,price_range,rating,latitude,longitude,phone,website,is_featured,is_published,restaurant_images(id,image_url,alt_text,sort_order)&is_published=eq.true&order=is_featured.desc,name.asc
```

Notes:

- This mirrors the app's Discover query.
- Only published restaurants and their images are public-read under RLS.

Example response item:

```json
[
  {
    "id": "uuid",
    "name": "Te Sheshi Bistro",
    "slug": "te-sheshi-bistro",
    "description": "A polished all-day bistro...",
    "city": "Prishtinë",
    "address": "Sheshi Zahir Pajaziti, Prishtinë",
    "cuisine": "Modern European",
    "price_range": "€€",
    "rating": 4.6,
    "is_featured": true,
    "is_published": true,
    "restaurant_images": [
      {
        "id": "uuid",
        "image_url": "https://placehold.co/1200x800/png?text=Te+Sheshi+Bistro",
        "alt_text": "Dining room at Te Sheshi Bistro",
        "sort_order": 0
      }
    ]
  }
]
```

## Saved Restaurants Examples

These require an authenticated bearer token because `saved_restaurants` is user-scoped with RLS.

### List Current User's Saved Restaurant IDs

```http
GET /rest/v1/saved_restaurants?select=restaurant_id&user_id=eq.<auth-user-id>
```

Example response:

```json
[
  {
    "restaurant_id": "restaurant-uuid"
  }
]
```

### List Current User's Saved Restaurants With Details

```http
GET /rest/v1/saved_restaurants?select=restaurant_id,restaurants!inner(id,name,slug,description,city,address,cuisine,price_range,rating,latitude,longitude,phone,website,is_featured,is_published,restaurant_images(id,image_url,alt_text,sort_order))&user_id=eq.<auth-user-id>&order=created_at.desc
```

Example response item:

```json
[
  {
    "restaurant_id": "restaurant-uuid",
    "restaurants": {
      "id": "restaurant-uuid",
      "name": "Dukagjini Kitchen",
      "slug": "dukagjini-kitchen",
      "city": "Pejë",
      "is_published": true,
      "restaurant_images": [
        {
          "image_url": "https://placehold.co/1200x800/png?text=Dukagjini+Kitchen",
          "alt_text": "Evening dining setup at Dukagjini Kitchen",
          "sort_order": 0
        }
      ]
    }
  }
]
```

### Get One Published Restaurant By Slug

```http
GET /rest/v1/restaurants?select=id,name,slug,description,city,address,cuisine,price_range,rating,latitude,longitude,phone,website,is_featured,is_published,restaurant_images(id,image_url,alt_text,sort_order)&slug=eq.<restaurant-slug>&is_published=eq.true&limit=1
```

Notes:

- This mirrors the app's detail page fetch.
- The `slug` is the stable route identifier used for in-app navigation and future deep links.

### Search Published Restaurants With Combined Filters

```http
GET /rest/v1/restaurants?select=id,name,slug,description,city,address,cuisine,price_range,rating,latitude,longitude,phone,website,is_featured,is_published,restaurant_images(id,image_url,alt_text,sort_order)&is_published=eq.true&or=(name.ilike.%bistro%,cuisine.ilike.%bistro%,description.ilike.%bistro%,city.ilike.%bistro%)&city=eq.Prishtinë&price_range=eq.€€&order=is_featured.desc,name.asc
```

Notes:

- This mirrors the app's Search screen query behavior.
- The keyword search is applied across `name`, `cuisine`, `description`, and `city`.
- `city`, `cuisine`, and `price_range` filters can be combined in the same request.

### List Published Restaurants With Coordinates For Map Pins

```http
GET /rest/v1/restaurants?select=id,name,slug,description,city,address,cuisine,price_range,rating,latitude,longitude,phone,website,is_featured,is_published,restaurant_images(id,image_url,alt_text,sort_order)&is_published=eq.true&latitude=not.is.null&longitude=not.is.null&order=is_featured.desc,name.asc
```

Notes:

- This mirrors the app's Map tab query behavior.
- The returned shape is ready for map pins, preview cards, and future nearby-map queries.

### Save A Restaurant

```http
POST /rest/v1/saved_restaurants
Prefer: return=representation
```

```json
{
  "user_id": "auth-user-uuid",
  "restaurant_id": "restaurant-uuid"
}
```

Expected response:

```json
[
  {
    "id": "uuid",
    "user_id": "auth-user-uuid",
    "restaurant_id": "restaurant-uuid",
    "created_at": "2026-04-03T12:00:00.000Z"
  }
]
```

### Unsave A Restaurant

```http
DELETE /rest/v1/saved_restaurants?user_id=eq.<auth-user-id>&restaurant_id=eq.<restaurant-id>
```

Expected result:

- `204 No Content`

## Menu Read Queries

### List Active Menu Categories With Available Items

```http
GET /rest/v1/menu_categories?select=id,restaurant_id,name,description,sort_order,is_active,menu_items(id,name,description,price,image_url,image_alt_text,sort_order,is_available,availability_note)&restaurant_id=eq.<restaurant-id>&is_active=eq.true&order=sort_order.asc
```

Notes:

- This mirrors the app's menu query on the restaurant detail screen.
- Public RLS only exposes active categories and available items for published restaurants.
- The mobile app groups items by category and sorts both categories and items by `sort_order`.

Example response item:

```json
[
  {
    "id": "category-uuid",
    "restaurant_id": "restaurant-uuid",
    "name": "Brunch Plates",
    "description": "Slow starts, eggs, and lighter mid-day favorites.",
    "sort_order": 0,
    "is_active": true,
    "menu_items": [
      {
        "id": "item-uuid",
        "name": "Truffle Omelette",
        "description": "Soft eggs, sauteed mushrooms, parmesan, and herbs.",
        "price": 9.5,
        "image_url": "https://placehold.co/400x400/png?text=Truffle+Omelette",
        "image_alt_text": "Truffle omelette at Te Sheshi Bistro",
        "sort_order": 0,
        "is_available": true,
        "availability_note": null
      }
    ]
  }
]
```

## Practical Recommendation

- Use the mobile app and Supabase JS client as the source of truth for auth/session behavior.
- Use these HTTP examples in Postman only for debugging RLS, payloads, and raw REST behavior.
