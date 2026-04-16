export function Footer() {
  return (
    <footer className="relative z-10 border-t-2 border-ink bg-ink text-cream mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 grid md:grid-cols-3 gap-8">
        <div>
          <div className="heading-display text-3xl">
            RETRO<span className="text-accent">·</span>FÚTBOL
          </div>
          <p className="text-cream/70 text-sm mt-3 leading-relaxed max-w-xs">
            Camisetas retro, versión jugador y versión fan. Para los que viven el fútbol.
          </p>
        </div>

        <div>
          <h3 className="font-mono text-xs tracking-[0.3em] text-cream/50 mb-3">
            CONTACTO
          </h3>
          <ul className="space-y-2 text-sm">
            <li>WhatsApp directo</li>
            <li>Envíos a todo Colombia</li>
            <li>Pagos contra entrega disponibles</li>
          </ul>
        </div>

        <div>
          <h3 className="font-mono text-xs tracking-[0.3em] text-cream/50 mb-3">
            CATEGORÍAS
          </h3>
          <ul className="space-y-2 text-sm">
            <li>Retro</li>
            <li>Versión Jugador</li>
            <li>Versión Fan</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-cream/10 py-4 text-center text-xs font-mono tracking-widest text-cream/40">
        © {new Date().getFullYear()} — HECHO CON PASIÓN POR EL FÚTBOL
      </div>
    </footer>
  );
}
