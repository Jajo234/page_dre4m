'use client';

import Link from 'next/link';
import { Search, ShoppingBag } from 'lucide-react';
import { useCart } from '@/store/cart';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export function Header() {
  const totalItems = useCart((s) => s.totalItems());
  const openCart = useCart((s) => s.openCart);
  const router = useRouter();
  const [query, setQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const q = query.trim();
    if (q) router.push(`/?q=${encodeURIComponent(q)}`);
  };

  return (
    <header className="relative z-20 border-b-2 border-ink bg-cream">
      {/* Barra superior con mensaje */}
      <div className="bg-ink text-cream text-xs font-mono py-2 text-center tracking-widest">
        ENVÍOS A TODA COLOMBIA · WHATSAPP DIRECTO
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="shrink-0 group">
          <div className="heading-display text-3xl sm:text-4xl leading-none">
            DRE4M<span className="text-accent">·</span>
          </div>
          <div className="text-[10px] font-mono tracking-[0.3em] text-ink/60 mt-0.5">
            FUTBOL · CAMISETAS · COLOMBIA
          </div>
        </Link>

        {/* Búsqueda */}
        <form
          onSubmit={handleSearch}
          className="hidden md:flex flex-1 max-w-md relative"
        >
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar equipo, jugador, temporada..."
            className="w-full bg-transparent border-2 border-ink px-4 py-2.5 pr-11 text-sm focus:outline-none focus:border-accent transition-colors placeholder:text-ink/40"
          />
          <button
            type="submit"
            aria-label="Buscar"
            className="absolute right-0 top-0 h-full px-3 hover:text-accent transition-colors"
          >
            <Search className="w-4 h-4" />
          </button>
        </form>

        {/* Carrito */}
        <button
          onClick={openCart}
          aria-label="Abrir carrito"
          className="relative shrink-0 border-2 border-ink bg-cream hover:bg-ink hover:text-cream transition-colors px-4 py-2.5 flex items-center gap-2 group"
        >
          <ShoppingBag className="w-5 h-5" />
          <span className="font-mono text-sm tracking-wider hidden sm:inline">
            CARRITO
          </span>
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-accent text-cream text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full ring-2 ring-cream">
              {totalItems}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
