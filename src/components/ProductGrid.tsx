'use client';

import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import type { Product } from '@/types';
import { ProductCard } from './ProductCard';

export function ProductGrid({ products }: { products: Product[] }) {
  const params = useSearchParams();
  const q = params.get('q')?.toLowerCase() ?? '';
  const cat = params.get('cat');
  const type = params.get('type');

  const filtered = useMemo(() => {
    return products.filter((p) => {
      if (type && p.type !== type) return false;
      if (cat && p.category !== cat) return false;
      if (q) {
        const haystack = `${p.name} ${p.team} ${p.season}`.toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    });
  }, [products, q, cat, type]);

  if (filtered.length === 0) {
    return (
      <div className="text-center py-24">
        <div className="text-6xl opacity-20 mb-4">🔍</div>
        <p className="font-mono text-sm tracking-wider text-ink/60">
          NO ENCONTRAMOS CAMISETAS CON ESOS FILTROS
        </p>
        {q && (
          <p className="text-sm text-ink/50 mt-2">
            Búsqueda: &ldquo;{q}&rdquo;
          </p>
        )}
      </div>
    );
  }

  return (
    <>
      <div className="font-mono text-xs tracking-[0.3em] text-ink/50 mb-6">
        {filtered.length} {filtered.length === 1 ? 'CAMISETA' : 'CAMISETAS'}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((p) => (
          <ProductCard key={p._id} product={p} />
        ))}
      </div>
    </>
  );
}
