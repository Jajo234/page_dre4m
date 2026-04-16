'use client';

import { useCart } from '@/store/cart';
import { formatPrice } from '@/lib/utils';
import { X, Minus, Plus, Trash2 } from 'lucide-react';
import { WhatsAppCheckoutButton } from './WhatsAppCheckoutButton';
import { useEffect } from 'react';

export function CartDrawer() {
  const isOpen = useCart((s) => s.isOpen);
  const closeCart = useCart((s) => s.closeCart);
  const items = useCart((s) => s.items);
  const updateQuantity = useCart((s) => s.updateQuantity);
  const removeItem = useCart((s) => s.removeItem);
  const totalPrice = useCart((s) => s.totalPrice());

  // Cerrar con tecla Escape
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeCart();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [closeCart]);

  // Bloquear scroll del body cuando está abierto
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <>
      {/* Overlay oscuro */}
      <div
        onClick={closeCart}
        className={`fixed inset-0 bg-ink/60 z-40 transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden="true"
      />

      {/* Panel */}
      <aside
        className={`fixed top-0 right-0 h-full w-full sm:w-[440px] bg-cream z-50 flex flex-col border-l-2 border-ink shadow-2xl transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        role="dialog"
        aria-label="Carrito de compras"
      >
        {/* Header del drawer */}
        <div className="flex items-center justify-between px-6 py-5 border-b-2 border-ink">
          <h2 className="heading-display text-3xl">TU CARRITO</h2>
          <button
            onClick={closeCart}
            aria-label="Cerrar carrito"
            className="p-2 hover:bg-ink hover:text-cream transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Lista de items */}
        <div className="flex-1 overflow-y-auto">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full px-6 text-center">
              <div className="text-6xl mb-4 opacity-20">⚽</div>
              <p className="font-mono text-sm tracking-wider text-ink/60">
                TU CARRITO ESTÁ VACÍO
              </p>
              <p className="text-sm text-ink/50 mt-2">
                Agrega camisetas para empezar
              </p>
            </div>
          ) : (
            <ul className="divide-y divide-ink/10">
              {items.map((item) => (
                <li
                  key={`${item.productId}-${item.size}`}
                  className="p-5 flex gap-4"
                >
                  {/* Imagen */}
                  <div className="w-20 h-20 bg-paper border border-ink/20 shrink-0 overflow-hidden">
                    {item.image && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>

                  {/* Detalles */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm leading-tight truncate">
                      {item.name}
                    </h3>
                    <p className="text-xs text-ink/60 mt-0.5 font-mono">
                      {item.season} · {item.type.toUpperCase()} · T-{item.size}
                    </p>

                    <div className="flex items-center justify-between mt-3">
                      {/* Control de cantidad */}
                      <div className="flex items-center border border-ink">
                        <button
                          onClick={() =>
                            updateQuantity(item.productId, item.size, item.quantity - 1)
                          }
                          className="w-7 h-7 flex items-center justify-center hover:bg-ink hover:text-cream transition-colors"
                          aria-label="Disminuir cantidad"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-8 text-center text-sm font-mono">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.productId, item.size, item.quantity + 1)
                          }
                          className="w-7 h-7 flex items-center justify-center hover:bg-ink hover:text-cream transition-colors"
                          aria-label="Aumentar cantidad"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="font-semibold text-sm">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  </div>

                  {/* Eliminar */}
                  <button
                    onClick={() => removeItem(item.productId, item.size)}
                    aria-label="Eliminar"
                    className="self-start p-1 text-ink/40 hover:text-accent transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer con total y botón WhatsApp */}
        {items.length > 0 && (
          <div className="border-t-2 border-ink p-5 space-y-4 bg-paper">
            <div className="flex items-center justify-between">
              <span className="font-mono text-sm tracking-wider text-ink/70">
                TOTAL
              </span>
              <span className="heading-display text-3xl">
                {formatPrice(totalPrice)}
              </span>
            </div>
            <WhatsAppCheckoutButton />
            <p className="text-[11px] text-center text-ink/50 leading-relaxed">
              Al continuar, se abrirá WhatsApp con tu pedido listo para enviar.
            </p>
          </div>
        )}
      </aside>
    </>
  );
}
