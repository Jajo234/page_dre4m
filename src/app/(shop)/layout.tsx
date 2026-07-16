import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/Header';
import { CartDrawer } from '@/components/CartDrawer';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'DRE4M',
  description:
    'Tienda de camisetas de fútbol retro, versión jugador y versión fan. Envíos a todo Colombia.',
  openGraph: {
    title: 'DRE4M',
    description: 'Camisetas retro, jugador y fan.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 relative z-10">{children}</main>
        <Footer />
        <CartDrawer />
      </body>
    </html>
  );
}
