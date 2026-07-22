import Link from 'next/link';
import type { Product } from '@/types';
import { formatPrice } from '@/lib/utils';

export function ProductCard({ product }: { product: Product }) {

  return (
    <Link
      href={`/producto/${product.slug}`}
      className="group block relative bg-paper border-2 border-ink hover:-translate-y-1 transition-transform duration-300"
    >

      {/* Imagen */}
      <div className="aspect-square overflow-hidden bg-cream border-b-2 border-ink">
        {product.images[0] ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-ink/20 text-6xl">
            ⚽
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-4">
        <div className="font-mono text-[10px] tracking-[0.2em] text-ink/50 mb-1">
          {product.team.toUpperCase()} · {product.season}
        </div>
        <h3 className="font-semibold text-base leading-tight line-clamp-2 mb-3 group-hover:text-accent transition-colors">
          {product.name}
        </h3>
        <div className="flex items-end justify-between">
          <span className="heading-display text-2xl">
            {formatPrice(product.price)}
          </span>
          <span className="text-xs font-mono text-ink/50 group-hover:text-accent transition-colors">
            VER →
          </span>
        </div>
      </div>
    </Link>
  );
}
