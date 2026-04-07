export function getRestaurantDetailHref(slug: string) {
  return `../restaurants/${slug}` as const;
}
