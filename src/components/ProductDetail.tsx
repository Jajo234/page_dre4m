'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Check } from 'lucide-react';
import type { Product, Size } from '@/types';
import { useCart } from '@/store/cart';
import { formatPrice } from '@/lib/utils';

export function ProductDetail({ product }: { product: Product }) {
  const router = useRouter();
  const addItem = useCart((s) => s.addItem);
  const openCart = useCart((s) => s.openCart);

  const [selectedSize, setSelectedSize] = useState<Size | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [justAdded, setJustAdded] = useState(false);

  const typeLabel =
    product.type === 'retro' ? 'Retro' :
    product.type === 'jugador' ? 'Versión Jugador' : 'Versión Fan';

  const handleAdd = () => {
    if (!selectedSize || !product.stock) return;
    addItem(product, selectedSize, 1);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
    // Abre el carrito para que vea lo que agregó
    setTimeout(() => openCart(), 300);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <button
        onClick={() => router.back()}
        className="inline-flex items-center gap-2 text-sm font-mono tracking-wider text-ink/60 hover:text-ink mb-8 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        VOLVER
      </button>

      <div className="grid md:grid-cols-2 gap-10 lg:gap-16">
        {/* Galería de imágenes */}
        <div>
          <div className="aspect-square bg-paper border-2 border-ink overflow-hidden mb-4">
            {product.images[selectedImage] && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            )}
          </div>

          {product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-3">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`aspect-square border-2 overflow-hidden transition-colors ${
                    selectedImage === idx ? 'border-accent' : 'border-ink/20 hover:border-ink'
                  }`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info y selector */}
        <div>
          <div className="font-mono text-xs tracking-[0.3em] text-accent mb-3">
            {typeLabel.toUpperCase()} · {product.season}
          </div>

          <h1 className="heading-display text-4xl sm:text-5xl mb-2 leading-none">
            {product.name}
          </h1>

          <div className="text-ink/60 mb-6">
            {product.team}
          </div>

          <div className="heading-display text-5xl mb-8">
            {formatPrice(product.price)}
          </div>

          {product.description && (
            <p className="text-ink/80 leading-relaxed mb-8">
              {product.description}
            </p>
          )}

          {/* Selector de talla */}
          <div className="mb-8">
            <div className="font-mono text-xs tracking-[0.3em] text-ink/60 mb-3">
              SELECCIONA TU TALLA
            </div>
            <div className="flex flex-wrap gap-2">
              {(['S', 'M', 'L', 'XL', 'XXL'] as Size[]).map((size) => {
                const available = product.sizes.includes(size);
                const selected = selectedSize === size;
                return (
                  <button
                    key={size}
                    disabled={!available}
                    onClick={() => setSelectedSize(size)}
                    className={`w-14 h-14 border-2 font-mono font-semibold transition-colors ${
                      !available
                        ? 'border-ink/10 text-ink/20 line-through cursor-not-allowed'
                        : selected
                        ? 'border-ink bg-ink text-cream'
                        : 'border-ink/30 hover:border-ink'
                    }`}
                  >
                    {size}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Botón agregar */}
          <button
            onClick={handleAdd}
            disabled={!selectedSize || !product.stock}
            className={`w-full py-5 font-mono tracking-[0.2em] text-sm font-semibold transition-colors border-2 ${
              justAdded
                ? 'bg-grass border-grass text-cream'
                : !selectedSize || !product.stock
                ? 'bg-ink/10 border-ink/10 text-ink/30 cursor-not-allowed'
                : 'bg-ink border-ink text-cream hover:bg-accent hover:border-accent'
            }`}
          >
            {justAdded ? (
              <span className="inline-flex items-center gap-2">
                <Check className="w-4 h-4" /> AGREGADO AL CARRITO
              </span>
            ) : !product.stock ? (
              'AGOTADO'
            ) : !selectedSize ? (
              'ELIGE UNA TALLA'
            ) : (
              'AGREGAR AL CARRITO'
            )}
          </button>

          {/* Info extra */}
          <div className="mt-8 pt-8 border-t border-ink/10 space-y-2 text-sm text-ink/70">
            <p>✓ Envíos a toda Colombia</p>
            <p>✓ Pago contra entrega disponible</p>
            <p>✓ Atención directa por WhatsApp</p>
          </div>
        </div>
      </div>
    </div>
  );
}
