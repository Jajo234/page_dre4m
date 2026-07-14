import { sanityClient, urlFor } from './sanity';
import type { Product } from '@/types';

const productProjection = `{
  "_id": _id,
  "slug": slug.current,
  name,
  team,
  season,
  type,
  "category": category->slug.current,
  "categoryName": category->name,
  price,
  description,
  "images": images[].asset->url,
  sizes,
  stock,
  featured
}`;

export async function getAllProducts(): Promise<Product[]> {
  return sanityClient.fetch(
    `*[_type == "product"] | order(_createdAt desc) ${productProjection}`
  );
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  return sanityClient.fetch(
    `*[_type == "product" && slug.current == $slug][0] ${productProjection}`,
    { slug }
  );
}

export async function getFeaturedProducts(): Promise<Product[]> {
  return sanityClient.fetch(
    `*[_type == "product" && featured == true] | order(_createdAt desc) ${productProjection}`
  );
}

export async function getCategories(): Promise<{ name: string; slug: string }[]> {
  return sanityClient.fetch(
    `*[_type == "category"] | order(order asc) { name, "slug": slug.current }`
  );
}

export { urlFor };
