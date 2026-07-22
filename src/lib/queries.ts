import { supabase } from "./supabase";
import { Product, ProductVariant } from "@/types";

function mapProduct(item: any): Product {
  console.log(item);

  return {
    _id: item.id,
    modelId: item.model_id,
    slug: item.slug,
    name: item.name,
    team: item.team,
    season: item.season,
    type: item.type,

    category: item.categories?.slug ?? "",
    categoryName: item.categories?.name ?? "",

    price: item.price,
    description: item.description,
    availability: item.availability,
    featured: item.featured,

    images: item.product_images.map((i: any) => i.image_url),
    sizes: item.product_sizes.map((s: any) => ({
      size: s.size,
      stock: s.stock,
    })),
  };
}

export async function getAllProducts(): Promise<Product[]> {
  const { data, error } = await supabase.from("vw_catalog_products").select(`
    *,
    categories!products_category_id_fkey(
        id,
        name,
        slug
    ),
    product_images(image_url),
    product_sizes(
        size,
        stock
    )
` );

  console.log(JSON.stringify(data, null, 2));

  if (error) {
    console.log(error);
    throw error;
  }

  return data.map(mapProduct);
}

export async function getProductBySlug(slug: string) {
  const { data, error } = await supabase
    .from("products")
    .select(
      `
            *,
            categories(name,slug),
            product_images(image_url),
            product_sizes(
                size,
                stock
            )
        `,
    )
    .eq("slug", slug)
    .single();

  if (error) return null;

  return mapProduct(data);
}

export async function getFeaturedProducts() {
  const { data, error } = await supabase
    .from("products")
    .select(
      `
            *,
            categories(name,slug),
            product_images(image_url),
            product_sizes(
              size,
              stock
            )
        `,
    )
    .eq("featured", true);

  if (error) throw error;

  return data.map(mapProduct);
}

export async function getCategories() {
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("sort_order");

  console.log("CATEGORIES:", data);
  console.log("ERROR CATEGORIES:", error);

  if (error) throw error;

  return data;
}

export async function getProductVariants(
  modelId: string,
): Promise<ProductVariant[]> {
  const { data, error } = await supabase
    .from("products")
    .select(
      `
      id,
      slug,
      name,
      type,
      price
    `,
    )
    .eq("model_id", modelId);

  if (error) throw error;

  return data.map((item) => ({
    id: item.id,
    slug: item.slug,
    name: item.name,
    type: item.type,
    price: item.price,
  }));
}
