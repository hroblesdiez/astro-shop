import { cachedRequest } from "./client";
import {
  GET_PRODUCTS,
  GET_PRODUCT_BY_SLUG,
  GET_TESTIMONIALS,
  GET_BESTSELLERS,
  GET_CATEGORIES,
  GET_PRODUCTS_BY_CATEGORY,
  GET_PRODUCTS_FILTERED,
} from "../queries/products";

export async function getProducts(first = 12, after?: string) {
  const data = await cachedRequest<any>(GET_PRODUCTS, { first, after });
  return data.products;
}

export async function getProductBySlug(slug: string) {
  const data = await cachedRequest<any>(GET_PRODUCT_BY_SLUG, { slug });
  return data.product;
}

export async function getBestsellers(first = 8) {
  const data = await cachedRequest<any>(GET_BESTSELLERS, { first });
  return data.products?.nodes ?? [];
}

export async function getTestimonials() {
  const data = await cachedRequest<any>(GET_TESTIMONIALS);
  return data.testimonials.nodes;
}

export async function getCategories() {
  const data = await cachedRequest<any>(GET_CATEGORIES);
  return data.productCategories.nodes;
}

export async function getProductsByCategory(
  category: string,
  first = 12,
  after?: string,
) {
  const data = await cachedRequest<any>(GET_PRODUCTS_BY_CATEGORY, {
    category,
    first,
    after,
  });
  return data.products;
}

export async function getProductsFiltered({
  first = 12,
  after,
  category,
  minPrice,
  maxPrice,
  orderby,
}: {
  first?: number;
  after?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  orderby?: { field: string; order: string }[];
}) {
  const data = await cachedRequest<any>(GET_PRODUCTS_FILTERED, {
    first,
    after: after ?? null,
    category: category ?? null,
    minPrice: minPrice ?? null,
    maxPrice: maxPrice ?? null,
    orderby: orderby ?? null,
  });
  return data.products;
}

export const CATS_WITH_SIZE = new Set([
  "mens-shirts",
  "tops",
  "womens-dresses",
  "mens-shoes",
  "womens-shoes",
]);

export const CATS_WITH_COLOR = new Set(["womens-bags"]);

export const SIZE_CLOTHING = ["XS", "S", "M", "L", "XL", "XXL"];
export const SIZE_FOOTWEAR = [
  "36",
  "37",
  "38",
  "39",
  "40",
  "41",
  "42",
  "43",
  "44",
  "45",
  "46",
];
export const COLORS = ["Black", "White", "Red", "Blue", "Green"];

export const FOOTWEAR_CATS = new Set(["mens-shoes", "womens-shoes"]);

export function getSizesForCategory(slug: string): string[] {
  if (FOOTWEAR_CATS.has(slug)) return SIZE_FOOTWEAR;
  return SIZE_CLOTHING;
}
