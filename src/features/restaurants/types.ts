export type RestaurantImage = {
  id?: string;
  image_url: string;
  alt_text: string | null;
  sort_order: number;
};

export type RestaurantRecord = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  city: string;
  address: string | null;
  cuisine: string | null;
  price_range: string | null;
  rating: number | null;
  latitude: number | null;
  longitude: number | null;
  phone: string | null;
  website: string | null;
  is_featured: boolean;
  restaurant_images?: RestaurantImage[] | null;
};

export type RestaurantListItem = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  city: string;
  address: string | null;
  cuisine: string | null;
  priceRange: string | null;
  rating: number | null;
  imageUrl: string | null;
  imageAlt: string | null;
  isFeatured: boolean;
  isSaved: boolean;
};

export function mapRestaurantRecord(
  restaurant: RestaurantRecord,
  isSaved = false
): RestaurantListItem {
  const images = [...(restaurant.restaurant_images ?? [])].sort(
    (left, right) => left.sort_order - right.sort_order
  );
  const primaryImage = images[0];

  return {
    id: restaurant.id,
    name: restaurant.name,
    slug: restaurant.slug,
    description: restaurant.description,
    city: restaurant.city,
    address: restaurant.address,
    cuisine: restaurant.cuisine,
    priceRange: restaurant.price_range,
    rating: restaurant.rating,
    imageUrl: primaryImage?.image_url ?? null,
    imageAlt: primaryImage?.alt_text ?? null,
    isFeatured: restaurant.is_featured,
    isSaved,
  };
}
