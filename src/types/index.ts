export type JerseyType = "retro" | "jugador" | "fan";

export type Size = "S" | "M" | "L" | "XL" | "XXL";

export interface Product {
  _id: string;
  slug: string;
  name: string;
  team: string;
  season: string;
  type: JerseyType;

  // Slug de la categoría (para filtros y URLs)
  category: string;

  // Nombre legible de la categoría (opcional)
  categoryName?: string;

  price: number;
  description?: string;
  images: string[];
  sizes: Size[];
  stock: boolean;
  featured?: boolean;
}
export interface CartItem {
  productId: string;
  name: string;
  team: string;
  season: string;
  type: JerseyType;
  size: Size;
  price: number;
  quantity: number;
  image: string;

  customization?: {
    enabled: boolean;
    playerName?: string;
    number?: string;
  };
}
