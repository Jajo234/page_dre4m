export type JerseyType = 'retro' | 'jugador' | 'fan';

export type Size = 'S' | 'M' | 'L' | 'XL' | 'XXL';

export interface Product {
  _id: string;
  slug: string;
  name: string;           // ej: "Argentina 1986 Maradona"
  team: string;           // ej: "Argentina"
  season: string;         // ej: "1986" o "2023/24"
  type: JerseyType;
  category: string;       // ej: "Selecciones", "Clubes Europa"
  price: number;
  description?: string;
  images: string[];       // URLs desde Sanity
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
}
