import type { Metadata } from 'next';
import ProductDetailClient from '@/components/materials/ProductDetailClient';
import { productDetailSlugs, products } from '@/lib/materialsContent';

export function generateStaticParams() {
  return productDetailSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = products.find((item) => item.slug === `/materials/products/${slug}`);

  return {
    title: product ? `${product.name} | KANAE Materials` : 'Product Detail | KANAE Materials',
    description: product?.summary.ja ?? 'KANAE Building Materials product detail page.',
  };
}

export default async function MaterialsProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return <ProductDetailClient slug={slug} />;
}
