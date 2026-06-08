import type { Metadata } from "next";
import Link from "next/link";
import { Search } from "lucide-react";
import { getCatalog } from "@/lib/catalog/get-catalog";
import { ProductCard } from "@/components/catalog/ProductCard";
import { CatalogFilters } from "@/components/catalog/CatalogFilters";
import { siteConfig } from "@/config/site";
import type { CatalogProduct } from "@/lib/pricing/types";

export const metadata: Metadata = {
  title: "Catálogo Completo",
  description: `Catálogo completo da ${siteConfig.name}: copos, canecas, taças, térmicos e muito mais.`,
};

interface CatalogoPageProps {
  searchParams: Promise<{ q?: string; tipo?: string; segmento?: string }>;
}

function filter(products: CatalogProduct[], p: Awaited<CatalogoPageProps["searchParams"]>): CatalogProduct[] {
  let r = products;
  if (p.q) { const q = p.q.toLowerCase(); r = r.filter((x) => x.nome.toLowerCase().includes(q) || x.subcategoria.toLowerCase().includes(q)); }
  if (p.tipo) r = r.filter((x) => (x as any).tipoProduct === p.tipo);
  if (p.segmento) r = r.filter((x) => (x as any).segmentos?.includes(p.segmento));
  return r;
}

const TIPO_LABELS: Record<string, string> = {
  copo:    "Copos",
  caneca:  "Canecas",
  taca:    "Taças",
  garrafa: "Garrafas",
  kit:     "Kits",
  roupa:   "Roupas e Vestuário",
  bolsa:   "Bolsas e Sacolas",
  outros:  "Outros",
};

export default async function CatalogoPage({ searchParams }: CatalogoPageProps) {
  const params   = await searchParams;
  const all      = getCatalog();
  const filtered = filter(all, params);
  const hasFilters = !!(params.q || params.tipo || params.segmento);
  const tipoLabel = params.tipo ? TIPO_LABELS[params.tipo] : undefined;

  return (
    <div style={{ backgroundColor: "var(--bg)" }}>
      {/* Page header */}
      <div className="border-b" style={{ backgroundColor: "var(--bg-soft)", borderColor: "var(--border)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <nav className="text-sm mb-2 flex gap-2 items-center" style={{ color: "var(--text-soft)" }}>
            <Link href="/" className="hover:text-[var(--lime)] transition-colors">Início</Link>
            <span>/</span>
            <span style={{ color: tipoLabel ? "var(--text-muted)" : "var(--text)" }}>Catálogo</span>
            {tipoLabel && (
              <>
                <span>/</span>
                <span style={{ color: "var(--cyan)" }}>{tipoLabel}</span>
              </>
            )}
          </nav>

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h1 className="font-display font-black text-2xl sm:text-3xl" style={{ color: "var(--text)" }}>
                {tipoLabel ?? "Catálogo Completo"}
              </h1>
              <p className="text-sm mt-1" style={{ color: "var(--text-soft)" }}>
                <span style={{ color: "var(--cyan)", fontWeight: 700 }}>{filtered.length}</span>
                {" "}produto{filtered.length !== 1 ? "s" : ""} encontrado{filtered.length !== 1 ? "s" : ""}
              </p>
            </div>

            <form method="GET" action="/catalogo" className="flex gap-2 w-full sm:w-auto sm:min-w-[300px]">
              {params.tipo && <input type="hidden" name="tipo" value={params.tipo} />}
              {params.segmento && <input type="hidden" name="segmento" value={params.segmento} />}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "var(--text-soft)" }} aria-hidden="true" />
                <input
                  type="search"
                  name="q"
                  defaultValue={params.q ?? ""}
                  placeholder="Buscar produto…"
                  autoComplete="off"
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-[var(--lime)] transition-shadow"
                  style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)", color: "var(--text)" }}
                />
              </div>
              <button type="submit" className="btn-lime px-4 py-2.5 rounded-xl text-sm font-semibold">
                Buscar
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          <CatalogFilters />

          <div className="flex-1">
            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <div
                  className="w-20 h-20 rounded-2xl flex items-center justify-center text-4xl mb-5 border"
                  style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}
                >
                  🔍
                </div>
                <h2 className="font-display font-bold text-xl mb-2" style={{ color: "var(--text)" }}>
                  Nenhum produto encontrado
                </h2>
                <p className="text-sm mb-6 max-w-xs" style={{ color: "var(--text-muted)" }}>
                  Tente outros filtros ou consulte pelo WhatsApp — temos mais opções.
                </p>
                <div className="flex flex-wrap gap-3 justify-center">
                  {hasFilters && (
                    <Link
                      href="/catalogo"
                      className="btn-outline px-5 py-2.5 rounded-xl text-sm"
                    >
                      Limpar filtros
                    </Link>
                  )}
                  <Link
                    href={siteConfig.whatsapp.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-wa px-5 py-2.5 rounded-xl text-sm"
                  >
                    Consultar no WhatsApp
                  </Link>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                {filtered.map((p) => <ProductCard key={p.id} produto={p} />)}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
