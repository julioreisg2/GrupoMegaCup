"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { X } from "lucide-react";

const categorias = [
  { value: "", label: "Todas as categorias" },
  { value: "acrilicos_aluminio_similares", label: "Acrílicos e Similares" },
  { value: "porcelana_vidro", label: "Porcelana e Vidro" },
  { value: "itens_diversos", label: "Itens Diversos" },
  { value: "termicos", label: "Térmicos" },
];

const materiais = [
  { value: "", label: "Todos os materiais" },
  { value: "acrilico", label: "Acrílico" },
  { value: "aluminio", label: "Alumínio" },
  { value: "porcelana", label: "Porcelana" },
  { value: "vidro", label: "Vidro" },
  { value: "termico", label: "Térmico" },
  { value: "diverso", label: "Outros" },
];

function FilterItem({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className="w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150"
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

  const hasFilters = !!params.get("categoria") || !!params.get("material") || !!params.get("q");
  const activeCategoria = params.get("categoria") ?? "";
  const activeMaterial  = params.get("material")  ?? "";

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
              <X className="w-3.5 h-3.5" aria-hidden="true" /> Limpar
            </button>
          )}
        </div>

        <div className="mb-5">
          <p className="text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: "var(--text-soft)" }}>
            Categoria
          </p>
          <div className="flex flex-col gap-0.5">
            {categorias.map((c) => (
              <FilterItem key={c.value} active={activeCategoria === c.value} onClick={() => update("categoria", c.value)}>
                {c.label}
              </FilterItem>
            ))}
          </div>
        </div>

        <div className="mb-5">
          <p className="text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: "var(--text-soft)" }}>
            Material
          </p>
          <div className="flex flex-col gap-0.5">
            {materiais.map((m) => (
              <FilterItem key={m.value} active={activeMaterial === m.value} onClick={() => update("material", m.value)}>
                {m.label}
              </FilterItem>
            ))}
          </div>
        </div>

        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: "var(--text-soft)" }}>
            Selos
          </p>
          <div className="flex flex-col gap-0.5">
            {[
              { key: "destaque", label: "Destaques" },
              { key: "lancamento", label: "Lançamentos" },
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
