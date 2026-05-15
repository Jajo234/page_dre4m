# DRE4M Shop 🏆

MVP de tienda de camisetas de fútbol (retro, jugador, fan) con carrito que envía el pedido por WhatsApp.

## 🧱 Stack

- **Next.js 15** (App Router) — framework React
- **TypeScript** — tipos estáticos
- **Tailwind CSS** — estilos
- **Sanity CMS** — panel para editar productos
- **Zustand** — carrito persistente (localStorage)
- **Lucide React** — íconos
- **Cloudflare Pages** — hosting (gratis)

## 🚀 Cómo correrlo (paso a paso)

### 1. Instalar dependencias

```bash
npm install
```

### 2. Crear cuenta en Sanity

1. Ve a [sanity.io](https://www.sanity.io) y crea una cuenta gratis.
2. Crea un proyecto nuevo (elige el plan "Free").
3. Copia el **Project ID** (lo encuentras en [sanity.io/manage](https://www.sanity.io/manage)).

### 3. Configurar variables de entorno

Copia el archivo de ejemplo:

```bash
cp .env.local.example .env.local
```

Abre `.env.local` y pon tus valores:

```
NEXT_PUBLIC_SANITY_PROJECT_ID=xxxxxxxx      # el ID que copiaste
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01

NEXT_PUBLIC_WHATSAPP_NUMBER=573001234567     # tu número SIN + ni espacios
NEXT_PUBLIC_STORE_NAME=Retro Fútbol Shop
```

### 4. Correr el panel de Sanity y cargar productos

En una terminal aparte:

```bash
npx sanity dev
```

Esto abre el panel en `http://localhost:3333`. Ahí:

1. Crea primero **2-3 categorías** (ej: "Selecciones", "Premier League", "La Liga").
2. Luego crea tus primeras **camisetas** (subir fotos, poner precio, tallas, etc.).
3. Publica cada documento con el botón "Publish".

### 5. Correr el sitio en desarrollo

En la terminal principal:

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000). Verás tus camisetas.

## 📁 Estructura del proyecto

```
retro-shop/
├── sanity/schemas/        ← define los campos de cada producto
├── src/
│   ├── app/               ← páginas (home, detalle)
│   ├── components/        ← componentes UI
│   ├── lib/               ← cliente de Sanity + queries + utils
│   ├── store/             ← carrito con Zustand
│   └── types/             ← tipos TypeScript
├── sanity.config.ts       ← config del panel de Sanity
└── package.json
```

## 🎯 Funcionalidades

- ✅ Catálogo con grid de camisetas
- ✅ Búsqueda por nombre, equipo o temporada
- ✅ Filtros por tipo (retro/jugador/fan) y categoría
- ✅ Página de detalle con galería de imágenes
- ✅ Selector de talla
- ✅ Carrito persistente (sobrevive al cerrar la pestaña)
- ✅ Drawer lateral con resumen del carrito
- ✅ Botón que arma el pedido y lo envía por WhatsApp
- ✅ SEO básico (metadata, Open Graph)
- ✅ Responsive (móvil y desktop)

## 📱 Cómo funciona el botón de WhatsApp

Cuando el cliente le da click, se genera un mensaje así:

```
🛒 *Nuevo pedido — Retro Fútbol Shop*

*1.* Argentina 1986 Maradona
   • Temporada: 1986
   • Tipo: Retro
   • Talla: M
   • Cantidad: 1
   • Subtotal: $ 150.000

━━━━━━━━━━━━━━
*TOTAL: $ 150.000*
━━━━━━━━━━━━━━

Hola, quiero confirmar este pedido. ¿Me ayudas con el envío? 🙌
```

Y se abre WhatsApp con ese texto listo para enviar a tu número.

## 🚢 Desplegar en Cloudflare Pages

1. Sube el proyecto a GitHub.
2. Ve a [dash.cloudflare.com](https://dash.cloudflare.com) → Workers & Pages → Create → Pages.
3. Conecta tu repo.
4. Configuración de build:
   - Framework preset: `Next.js`
   - Build command: `npx @cloudflare/next-on-pages@1`
   - Build output: `.vercel/output/static`
5. En "Environment variables" pega las mismas de `.env.local`.
6. Deploy. Listo.

Opcional: conecta tu dominio propio en Cloudflare DNS.

## 🎨 Personalización

- **Colores:** edita `tailwind.config.ts` (cream, ink, accent, grass).
- **Fuentes:** cambia `src/app/globals.css` (el `@import` de Google Fonts).
- **Textos del home/footer:** edita `src/app/page.tsx` y `src/components/Footer.tsx`.
- **Mensaje de WhatsApp:** edita `buildWhatsAppMessage` en `src/components/WhatsAppCheckoutButton.tsx`.

## 🐛 Problemas comunes

**"Cannot find module 'next-sanity'"** → corre `npm install`.

**El sitio no carga productos** → revisa que `.env.local` esté bien y que hayas publicado productos en Sanity.

**WhatsApp no abre** → verifica que el número esté sin `+` ni espacios (ej: `573001234567`).

**"Sanity project not found"** → revisa el Project ID en `.env.local`.

---

Hecho con ⚽ y código limpio.
