export type RestaurantImage = {
  id: string;
  image_url: string;
  alt_text: string | null;
  sort_order: number;
};

export type RestaurantSummaryRecord = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  city: string;
  address: string | null;
  cuisine: string | null;
  price_range: string | null;
  rating: number | null;
  is_featured: boolean;
  restaurant_images?: RestaurantImage[] | null;
};

export type RestaurantCoordinatesRecord = RestaurantSummaryRecord & {
  latitude: number | null;
  longitude: number | null;
};

export type RestaurantSearchFilters = {
  city: string | null;
  cuisine: string | null;
  priceRange: string | null;
};

export type RestaurantFilterOptions = {
  cities: string[];
  cuisines: string[];
  priceRanges: string[];
};

export type MenuItemRecord = {
  id: string;
  name: string;
  description: string | null;
  price: number;
  image_url: string | null;
  image_alt_text: string | null;
  sort_order: number;
  is_available: boolean;
  availability_note: string | null;
};

export type MenuCategoryRecord = {
  id: string;
  restaurant_id: string;
  name: string;
  description: string | null;
  sort_order: number;
  is_active: boolean;
  menu_items?: MenuItemRecord[] | null;
};

export type RestaurantRecord = {
  latitude: number | null;
  longitude: number | null;
  phone: string | null;
  website: string | null;
  is_published: boolean;
} & RestaurantSummaryRecord;

type RestaurantBase = {
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
};

export type RestaurantListItem = RestaurantBase & {
  isSaved: boolean;
};

export type RestaurantDetail = RestaurantBase & {
  latitude: number | null;
  longitude: number | null;
  phone: string | null;
  website: string | null;
  images: RestaurantImage[];
  isSaved: boolean;
};

export type RestaurantMapItem = RestaurantBase & {
  latitude: number;
  longitude: number;
};

export type MenuItem = {
  id: string;
  name: string;
  description: string | null;
  priceValue: number;
  priceLabel: string;
  imageUrl: string | null;
  imageAlt: string | null;
  availabilityLabel: string | null;
};

export type MenuCategory = {
  id: string;
  name: string;
  description: string | null;
  items: MenuItem[];
};

export const emptyRestaurantSearchFilters: RestaurantSearchFilters = {
  city: null,
  cuisine: null,
  priceRange: null,
};

function normalizeOptionalText(value: string | null | undefined) {
  const trimmedValue = value?.trim();
  return trimmedValue ? trimmedValue : null;
}

function sortRestaurantImages(images: RestaurantImage[] | null | undefined) {
  return [...(images ?? [])]
    .filter((image) => Boolean(image.image_url?.trim()))
    .sort((left, right) => left.sort_order - right.sort_order);
}

function getPrimaryRestaurantImage(images: RestaurantImage[] | null | undefined) {
  return sortRestaurantImages(images)[0] ?? null;
}

function mapRestaurantSummaryRecord(source: RestaurantSummaryRecord) {
  const primaryImage = getPrimaryRestaurantImage(source.restaurant_images);

  return {
    id: source.id,
    name: source.name,
    slug: source.slug,
    description: normalizeOptionalText(source.description),
    city: source.city,
    address: normalizeOptionalText(source.address),
    cuisine: normalizeOptionalText(source.cuisine),
    priceRange: normalizeOptionalText(source.price_range),
    rating: source.rating,
    imageUrl: primaryImage?.image_url ?? null,
    imageAlt: normalizeOptionalText(primaryImage?.alt_text),
    isFeatured: source.is_featured,
  };
}

function sortMenuItems(items: MenuItemRecord[] | null | undefined) {
  return [...(items ?? [])].sort((left, right) => left.sort_order - right.sort_order);
}

function formatMenuPrice(price: number) {
  return Number.isInteger(price) ? `€${price.toFixed(0)}` : `€${price.toFixed(2)}`;
}

export function mapRestaurantRecord(
  restaurant: RestaurantSummaryRecord,
  isSaved = false
): RestaurantListItem {
  return {
    ...mapRestaurantSummaryRecord(restaurant),
    isSaved,
  };
}

export function mapRestaurantDetailRecord(
  restaurant: RestaurantRecord,
  isSaved = false
): RestaurantDetail {
  const images = sortRestaurantImages(restaurant.restaurant_images);

  return {
    ...mapRestaurantSummaryRecord(restaurant),
    latitude: restaurant.latitude,
    longitude: restaurant.longitude,
    phone: normalizeOptionalText(restaurant.phone),
    website: normalizeOptionalText(restaurant.website),
    images,
    isSaved,
  };
}

export function mapRestaurantMapRecord(
  restaurant: RestaurantCoordinatesRecord
): RestaurantMapItem | null {
  if (restaurant.latitude === null || restaurant.longitude === null) {
    return null;
  }

  return {
    ...mapRestaurantSummaryRecord(restaurant),
    latitude: restaurant.latitude,
    longitude: restaurant.longitude,
  };
}

export function mapMenuCategoryRecord(category: MenuCategoryRecord): MenuCategory {
  const items = sortMenuItems(category.menu_items)
    .filter((item) => item.is_available)
    .map((item) => {
      const priceValue = Number(item.price);

      if (!Number.isFinite(priceValue) || priceValue < 0) {
        return null;
      }

      return {
        id: item.id,
        name: item.name.trim(),
        description: normalizeOptionalText(item.description),
        priceValue,
        priceLabel: formatMenuPrice(priceValue),
        imageUrl: normalizeOptionalText(item.image_url),
        imageAlt: normalizeOptionalText(item.image_alt_text),
        availabilityLabel: normalizeOptionalText(item.availability_note),
      };
    })
    .filter((item): item is MenuItem => item !== null);

  return {
    id: category.id,
    name: category.name.trim(),
    description: normalizeOptionalText(category.description),
    items,
  };
}
