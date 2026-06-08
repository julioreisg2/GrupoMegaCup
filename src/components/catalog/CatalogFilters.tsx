"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { X } from "lucide-react";

const tipos = [
  { value: "",        label: "Todos os produtos" },
  { value: "copo",    label: "🥤 Copos" },
  { value: "caneca",  label: "☕ Canecas" },
  { value: "taca",    label: "🍷 Taças" },
  { value: "garrafa", label: "🫗 Garrafas" },
  { value: "kit",     label: "🎁 Kits" },
  { value: "roupa",   label: "👕 Roupas e Vestuário" },
  { value: "bolsa",   label: "👜 Bolsas e Sacolas" },
  { value: "outros",  label: "📦 Outros Produtos" },
];

function FilterItem({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className="w-full text-left px-3 py-2.5 rounded-xl text-sm transition-all duration-150"
      style={{
        backgroundColor: active ? "var(--lime)" : "transparent",
        color: active ? "var(--lime-dark)" : "var(--text-muted)",
        fontWeight: active ? 700 : 500,
      }}
    >
      {children}
    </button>
  );
}

export function CatalogFilters() {
  const router = useRouter();
  const params = useSearchParams();

  const update = useCallback(
    (key: string, value: string) => {
      const next = new URLSearchParams(params.toString());
      if (value) next.set(key, value);
      else next.delete(key);
      next.delete("page");
      router.push(`/catalogo?${next.toString()}`);
    },
    [router, params]
  );

  const hasFilters = !!params.get("tipo") || !!params.get("q");
  const activeTipo = params.get("tipo") ?? "";

  return (
    <aside className="w-full lg:w-60 flex-shrink-0">
      <div
        className="rounded-2xl border p-4 sticky top-20"
        style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xs font-black uppercase tracking-widest" style={{ color: "var(--text-soft)" }}>
            Filtros
          </h2>
          {hasFilters && (
            <button
              onClick={() => router.push("/catalogo")}
              className="flex items-center gap-1 text-xs transition-colors hover:text-red-400"
              style={{ color: "var(--text-soft)" }}
            >
              <X className="w-3.5 h-3.5" /> Limpar
            </button>
          )}
        </div>

        {/* Tipo de Produto */}
        <div className="mb-5">
          <p className="text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: "var(--text-soft)" }}>
            O que você busca?
          </p>
          <div className="flex flex-col gap-0.5">
            {tipos.map((t) => (
              <FilterItem key={t.value} active={activeTipo === t.value} onClick={() => update("tipo", t.value)}>
                {t.label}
              </FilterItem>
            ))}
          </div>
        </div>

        {/* Selos */}
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: "var(--text-soft)" }}>
            Selos
          </p>
          <div className="flex flex-col gap-0.5">
            {[
              { key: "destaque", label: "⭐ Destaques" },
              { key: "lancamento", label: "🆕 Lançamentos" },
            ].map(({ key, label }) => (
              <FilterItem
                key={key}
                active={params.get(key) === "true"}
                onClick={() => update(key, params.get(key) === "true" ? "" : "true")}
              >
                {label}
              </FilterItem>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}
