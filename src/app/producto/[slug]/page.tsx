import { notFound } from "next/navigation";
import { getProductBySlug, getProductVariants } from "@/lib/queries";
import { ProductDetail } from "@/components/ProductDetail";

export const revalidate = 60;

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  
  if (!product) notFound();

  const variants = await getProductVariants(product.modelId);

  return <ProductDetail product={product} variants={variants} />;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: "Producto no encontrado" };

  return {
    title: `${product.name} — Retro Fútbol Shop`,
    description:
      product.description || `Camiseta ${product.name}, ${product.season}`,
    openGraph: {
      images: product.images[0] ? [product.images[0]] : [],
    },
  };
}
