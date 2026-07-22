"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { Product, ProductVariant, Size } from "@/types";
import { useCart } from "@/store/cart";
import { formatPrice } from "@/lib/utils";
import { ArrowLeft, Check, CheckCircle2 } from "lucide-react";

interface ProductDetailProps {
  product: Product;
  variants: ProductVariant[];
}

export function ProductDetail({ product, variants }: ProductDetailProps) {
  const router = useRouter();
  const addItem = useCart((s) => s.addItem);
  const openCart = useCart((s) => s.openCart);

  const [selectedSize, setSelectedSize] = useState<Size | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [justAdded, setJustAdded] = useState(false);

  const [customize, setCustomize] = useState(false);
  const [playerName, setPlayerName] = useState("");
  const [number, setNumber] = useState("");
  const CUSTOMIZATION_PRICE = 10000;

  const selectedSizeInfo = product.sizes.find((s) => s.size === selectedSize);

  const hasImmediateStock = (selectedSizeInfo?.stock ?? 0) > 0;

  const finalPrice = product.price + (customize ? CUSTOMIZATION_PRICE : 0);

  const selectableVariants = variants.filter(
    (variant) => variant.type !== "retro",
  );

  const handleAdd = () => {
    if (!selectedSize) return;

    const cleanName = playerName.trim().toUpperCase();
    const cleanNumber = number.trim();

    if (customize) {
      if (!cleanName || !cleanNumber) {
        alert("Completa el nombre y el dorsal.");
        return;
      }

      const dorsal = Number(cleanNumber);

      if (Number.isNaN(dorsal) || dorsal < 0 || dorsal > 99) {
        alert("El dorsal debe estar entre 0 y 99.");
        return;
      }
    }

    addItem(
      product,
      selectedSize,
      1,
      customize
        ? {
            enabled: true,
            playerName: cleanName,
            number: cleanNumber,
          }
        : undefined,
    );

    setJustAdded(true);

    setTimeout(() => {
      setJustAdded(false);
    }, 1500);

    // Limpiar formulario
    setCustomize(false);
    setPlayerName("");
    setNumber("");
    setSelectedSize(null);

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
                    selectedImage === idx
                      ? "border-accent"
                      : "border-ink/20 hover:border-ink"
                  }`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={img}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info y selector */}
        <div>
          <div className="font-mono text-xs tracking-[0.3em] text-accent mb-3">
            {product.season}
          </div>

          <h1 className="heading-display text-4xl sm:text-5xl mb-2 leading-none">
            {product.name}
          </h1>

          <div className="text-ink/60 mb-6">{product.team}</div>

          <div className="mb-8">
            <div className="heading-display text-5xl">
              {formatPrice(finalPrice)}
            </div>

            {selectableVariants.length > 1 && (
              <div className="mb-8">
                {product.description && (
                  <p className="text-ink/80 leading-relaxed mb-8">
                    {product.description}
                  </p>
                )}
                <div className="font-mono text-xs tracking-[0.3em] text-ink/60 mb-3">
                  VERSIÓN
                </div>

                <p className="text-sm text-ink/60 mb-5">
                  Escoge la versión que mejor se adapte a ti.
                </p>

                <div className="grid md:grid-cols-2 gap-4">
                  {selectableVariants.map((variant) => {
                    const active = variant.slug === product.slug;

                    const label =
                      variant.type === "fan"
                        ? "FAN"
                        : variant.type === "jugador"
                          ? "JUGADOR"
                          : variant.type.toUpperCase();

                    return (
                      <Link
                        key={variant.id}
                        href={`/producto/${variant.slug}`}
                        className={`
                          relative
                          flex
                          flex-col
                          border-2
                          rounded-xl
                          p-5
                          transition-all
                          duration-300
                          hover:-translate-y-1
                          hover:shadow-lg
                          ${
                            active
                              ? "border-accent bg-accent/10 shadow-md"
                              : "border-ink/10 hover:border-accent hover:shadow-md"
                          }
                        `}
                      >
                        {active && (
                          <CheckCircle2 className="absolute top-4 right-4 w-5 h-5 text-accent" />
                        )}
                        <div className="text-left">
                          <h3 className="heading-display text-2xl">{label}</h3>

                          <p className="text-sm text-ink/60 mt-1">
                            {variant.type === "fan"
                              ? "Perfecta para el día a día."
                              : "La versión utilizada en competición."}
                          </p>

                          <ul className="mt-4 space-y-2 text-sm">
                            {variant.type === "fan" ? (
                              <>
                                <li className="flex items-center gap-2 text-ink/70">
                                  <span className="text-accent">✓</span>
                                  Corte clásico
                                </li>

                                <li className="flex items-center gap-2 text-ink/70">
                                  <span className="text-accent">✓</span>
                                  Escudo bordado
                                </li>

                                <li className="flex items-center gap-2 text-ink/70">
                                  <span className="text-accent">✓</span>
                                  Excelente para uso diario
                                </li>
                              </>
                            ) : (
                              <>
                                <li className="flex items-center gap-2 text-ink/70">
                                  <span className="text-accent">✓</span>
                                  Tela profesional
                                </li>

                                <li className="flex items-center gap-2 text-ink/70">
                                  <span className="text-accent">✓</span>
                                  Ajuste atlético
                                </li>
                                <li className="flex items-center gap-2 text-ink/70">
                                  <span className="text-accent">✓</span>
                                  Tecnología de alto rendimiento
                                </li>
                              </>
                            )}
                          </ul>
                        </div>
                        <div className="mt-auto pt-6 border-t border-ink/10">
                          <div className="text-xs font-mono tracking-widest text-ink/40 mb-1">
                            DESDE
                          </div>

                          <div className="heading-display text-3xl">
                            {formatPrice(variant.price)}
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}

            {customize && (
              <p className="mt-2 text-sm text-grass font-medium">
                Incluye personalización (+{formatPrice(CUSTOMIZATION_PRICE)})
              </p>
            )}
          </div>

          {/* Selector de talla */}
          <div className="mb-8">
            <div className="font-mono text-xs tracking-[0.3em] text-ink/60 mb-3">
              SELECCIONA TU TALLA
            </div>
            <div className="flex flex-wrap gap-2">
              {(["S", "M", "L", "XL", "XXL"] as Size[]).map((size) => {
                const sizeInfo = product.sizes.find((s) => s.size === size);

                const exists = !!sizeInfo;
                const inStock = (sizeInfo?.stock ?? 0) > 0;
                const selected = selectedSize === size;

                const borderClass = !exists
                  ? "border-ink/10 text-ink/20 cursor-not-allowed"
                  : selected
                    ? inStock
                      ? "border-green-600 bg-green-600 text-white"
                      : "border-yellow-500 bg-yellow-500 text-black"
                    : inStock
                      ? "border-ink/30 hover:border-green-600 hover:bg-green-50"
                      : "border-ink/30 hover:border-yellow-500 hover:bg-yellow-50";
                return (
                  <button
                    key={size}
                    disabled={!exists}
                    onClick={() => setSelectedSize(size)}
                    className={`w-14 h-14 border-2 font-mono font-semibold transition-all duration-200 ${borderClass}`}
                  >
                    {size}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mb-8 border-2 border-ink/10 rounded-lg p-5">
            <div className="font-mono text-xs tracking-[0.3em] text-ink/60 mb-3">
              DISPONIBILIDAD
            </div>

            {!selectedSize ? (
              <p className="text-sm text-ink/60">
                Selecciona una talla para conocer el tiempo de entrega.
              </p>
            ) : hasImmediateStock ? (
              <>
                <p className="font-semibold text-green-700">
                  🟢 Entrega inmediata
                </p>

                <p className="text-sm text-ink/60 mt-2">
                  Tenemos esta talla disponible. Tu pedido será despachado entre
                  2 y 4 días hábiles.
                </p>
              </>
            ) : (
              <>
                <p className="font-semibold text-yellow-700">
                  🟡 Disponible por encargo
                </p>

                <p className="text-sm text-ink/60 mt-2">
                  Esta talla se encuentra disponible por pedido. La incluiremos
                  en nuestro próximo embarque.
                </p>

                <p className="text-sm font-medium mt-2">
                  Tiempo estimado:
                  <span className="text-accent"> 15 a 20 días hábiles.</span>
                </p>
              </>
            )}
          </div>

          {/* Personalización */}
          <div className="mb-8">
            <div className="font-mono text-xs tracking-[0.3em] text-ink/60 mb-3">
              PERSONALIZACIÓN
            </div>

            <label className="flex items-center gap-3 cursor-pointer mb-4">
              <input
                type="checkbox"
                checked={customize}
                onChange={(e) => {
                  const checked = e.target.checked;

                  setCustomize(checked);

                  if (!checked) {
                    setPlayerName("");
                    setNumber("");
                  }
                }}
              />
              <span className="text-sm">Quiero personalizar mi camiseta</span>
            </label>

            {customize && (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-mono tracking-[0.2em] mb-2">
                    NOMBRE
                  </label>

                  <input
                    type="text"
                    value={playerName}
                    onChange={(e) => {
                      const value = e.target.value
                        .toUpperCase()
                        .replace(/[^A-ZÁÉÍÓÚÑ0-9 ]/g, "");

                      setPlayerName(value);
                    }}
                    maxLength={15}
                    placeholder="Ej. MESSI"
                    className="w-full border-2 border-ink px-4 py-3 bg-transparent focus:outline-none focus:border-accent"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono tracking-[0.2em] mb-2">
                    DORSAL
                  </label>

                  <input
                    type="text"
                    inputMode="numeric"
                    maxLength={2}
                    value={number}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, "");

                      if (value === "") {
                        setNumber("");
                        return;
                      }

                      const n = Number(value);

                      if (n >= 0 && n <= 99) {
                        setNumber(value);
                      }
                    }}
                    placeholder="10"
                    className="w-28 border-2 border-ink px-4 py-3 bg-transparent focus:outline-none focus:border-accent"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Botón agregar */}
          <button
            onClick={handleAdd}
            disabled={!selectedSize}
            className={`w-full py-5 font-mono tracking-[0.2em] text-sm font-semibold transition-colors border-2 ${
              justAdded
                ? "bg-grass border-grass text-cream"
                : !selectedSize
                  ? "bg-ink/10 border-ink/10 text-ink/30 cursor-not-allowed"
                  : "bg-ink border-ink text-cream hover:bg-accent hover:border-accent"
            }`}
          >
            {justAdded ? (
              <span className="inline-flex items-center gap-2">
                <Check className="w-4 h-4" /> AGREGADO AL CARRITO
              </span>
            ) : !selectedSize ? (
              "ELIGE UNA TALLA"
            ) : (
              "AGREGAR AL CARRITO"
            )}
          </button>

          {/* Info extra */}
          <div className="mt-8 pt-8 border-t border-ink/10 space-y-2 text-sm text-ink/70">
            <p>✓ Envíos a toda Colombia</p>
            <p>✓ Atención directa por WhatsApp</p>
          </div>
        </div>
      </div>
    </div>
  );
}
