import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CartItem, Product, Size } from '@/types';

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  addItem: (product: Product, size: Size, quantity?: number) => void;
  removeItem: (productId: string, size: Size) => void;
  updateQuantity: (productId: string, size: Size, quantity: number) => void;
  clear: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  totalItems: () => number;
  totalPrice: () => number;
}

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (product, size, quantity = 1) => {
        const items = get().items;
        const existing = items.find(
          (i) => i.productId === product._id && i.size === size
        );

        if (existing) {
          set({
            items: items.map((i) =>
              i.productId === product._id && i.size === size
                ? { ...i, quantity: i.quantity + quantity }
                : i
            ),
          });
        } else {
          set({
            items: [
              ...items,
              {
                productId: product._id,
                name: product.name,
                team: product.team,
                season: product.season,
                type: product.type,
                size,
                price: product.price,
                quantity,
                image: product.images[0] || '',
              },
            ],
          });
        }
      },

      removeItem: (productId, size) =>
        set({
          items: get().items.filter(
            (i) => !(i.productId === productId && i.size === size)
          ),
        }),

      updateQuantity: (productId, size, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId, size);
          return;
        }
        set({
          items: get().items.map((i) =>
            i.productId === productId && i.size === size
              ? { ...i, quantity }
              : i
          ),
        });
      },

      clear: () => set({ items: [] }),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set({ isOpen: !get().isOpen }),

      totalItems: () =>
        get().items.reduce((sum, item) => sum + item.quantity, 0),

      totalPrice: () =>
        get().items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    }),
    {
      name: 'retro-shop-cart',
      partialize: (state) => ({ items: state.items }),
    }
  )
);
