'use client';

import { useRouter, useSearchParams } from 'next/navigation';

interface Props {
  categories: { name: string; slug: string }[];
}

export function CategoryFilter({ categories }: Props) {
  const router = useRouter();
  const params = useSearchParams();
  const activeCategory = params.get('cat');
  const activeType = params.get('type');

  const setParam = (key: string, value: string | null) => {
    const newParams = new URLSearchParams(params.toString());
    if (value === null || newParams.get(key) === value) {
      newParams.delete(key);
    } else {
      newParams.set(key, value);
    }
    const qs = newParams.toString();
    router.push(qs ? `/?${qs}` : '/');
  };

  const pill = (active: boolean) =>
    `px-4 py-2 text-xs font-mono tracking-widest border-2 transition-colors ${
      active
        ? 'bg-ink text-cream border-ink'
        : 'bg-transparent text-ink border-ink/30 hover:border-ink'
    }`;

  return (
    <div className="space-y-4">
      {/* Filtro por tipo */}
      <div className="flex flex-wrap gap-2">
        <span className="font-mono text-[10px] tracking-[0.3em] text-ink/50 self-center mr-2">
          TIPO:
        </span>
        {[
          { label: 'TODOS', value: null },
          { label: 'RETRO', value: 'retro' },
          { label: 'JUGADOR', value: 'jugador' },
          { label: 'FAN', value: 'fan' },
        ].map((t) => (
          <button
            key={t.label}
            onClick={() => setParam('type', t.value)}
            className={pill(activeType === t.value || (!activeType && t.value === null))}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Filtro por categoría */}
      {categories.length > 0 && (
        <div className="flex flex-wrap gap-2">
          <span className="font-mono text-[10px] tracking-[0.3em] text-ink/50 self-center mr-2">
            LIGA:
          </span>
          <button
            onClick={() => setParam('cat', null)}
            className={pill(!activeCategory)}
          >
            TODAS
          </button>
          {categories.map((c) => (
            <button
              key={c.slug}
              onClick={() => setParam('cat', c.slug)}
              className={pill(activeCategory === c.slug)}
            >
              {c.name.toUpperCase()}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
