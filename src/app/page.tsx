import { Suspense } from 'react';
import { getAllProducts, getCategories } from '@/lib/queries';
import { ProductGrid } from '@/components/ProductGrid';
import { CategoryFilter } from '@/components/CategoryFilter';

// Revalida cada 60s para que los cambios en Sanity aparezcan pronto
export const runtime = 'edge';
export const revalidate = 60;

export default async function HomePage() {
  const [products, categories] = await Promise.all([
    getAllProducts(),
    getCategories(),
  ]);

  return (
    <>
      {/* Hero */}
      <section className="relative border-b-2 border-ink overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24 relative">
          {/* Texto gigante decorativo de fondo */}
          <div className="absolute -top-6 -left-4 heading-display text-[160px] sm:text-[240px] text-ink/5 leading-none select-none pointer-events-none">
            FÚTBOL
          </div>

          <div className="relative max-w-3xl">
            <div className="font-mono text-xs tracking-[0.4em] text-accent mb-4">
              · EL FÚTBOL NUNCA PASA DE MODA ·
            </div>
            <h1 className="heading-display text-5xl sm:text-7xl lg:text-8xl mb-6">
              CAMISETAS QUE<br />
              <span className="text-accent">CUENTAN</span> HISTORIAS
            </h1>
            <p className="text-lg text-ink/70 max-w-xl leading-relaxed">
              Retro, versión jugador y versión fan. Calidad premium, envíos a toda Colombia
              y atención directa por WhatsApp.
            </p>
          </div>
        </div>
        <div className="vintage-divider" />
      </section>

      {/* Catálogo */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="flex items-end justify-between mb-8 flex-wrap gap-4">
          <div>
            <div className="font-mono text-[10px] tracking-[0.3em] text-ink/50 mb-2">
              · CATÁLOGO ·
            </div>
            <h2 className="heading-display text-4xl sm:text-5xl">
              TODAS LAS CAMISETAS
            </h2>
          </div>
        </div>

        <div className="mb-8">
          <Suspense fallback={<div className="h-10" />}>
            <CategoryFilter categories={categories} />
          </Suspense>
        </div>

        <Suspense fallback={<div className="h-96" />}>
          <ProductGrid products={products} />
        </Suspense>
      </section>
    </>
  );
}
