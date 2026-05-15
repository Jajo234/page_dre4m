import { FaWhatsapp, FaInstagram, FaFacebook } from "react-icons/fa";


export function Footer() {
  return (
    <footer className="relative z-10 border-t-2 border-ink bg-ink text-cream mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 grid md:grid-cols-3 gap-8">
        
        {/* BRAND */}
        <div>
          <div className="heading-display text-3xl">
            DRE4M<span className="text-accent">·</span>
          </div>
          <p className="text-cream/70 text-sm mt-3 leading-relaxed max-w-xs">
            Camisetas retro, versión jugador y versión fan. Para los que viven el fútbol.
          </p>
        </div>

        {/* CONTACTO */}
        <div>
          <h3 className="font-mono text-xs tracking-[0.3em] text-cream/50 mb-3">
            CONTACTO
          </h3>
          <ul className="space-y-3 text-sm">
            
            <li>
              <a
                href="https://wa.me/573158801259"
                target="_blank"
                className="flex items-center gap-2 hover:text-accent transition"
              >
                <FaWhatsapp /> WhatsApp
              </a>
            </li>

            <li>
              <a
                href="https://www.instagram.com/dre4m_col?igsh=YjZ3YnFhdHNidWE0"
                target="_blank"
                className="flex items-center gap-2 hover:text-accent transition"
              >
                <FaInstagram /> Instagram
              </a>
            </li>

            <li>
              <a
                href="https://www.facebook.com/share/1UN6sZDH69/?mibextid=wwXIfr"
                target="_blank"
                className="flex items-center gap-2 hover:text-accent transition"
              >
                <FaFacebook /> Facebook
              </a>
            </li>

          </ul>
        </div>

        {/* CATEGORÍAS */}
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