import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getDestacados, getLancamentos } from "@/lib/catalog/get-catalog";
import { ProductCard } from "@/components/catalog/ProductCard";

export function ProductHighlights() {
  const destacados = getDestacados().slice(0, 8);
  const lancamentos = getLancamentos().slice(0, 3);

  if (destacados.length === 0 && lancamentos.length === 0) return null;

  return (
    <section className="py-16 lg:py-24" style={{ backgroundColor: "var(--bg-soft)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Destaques */}
        {destacados.length > 0 && (
          <div className="mb-16">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
              <div>
                <p className="text-sm font-bold uppercase tracking-widest mb-2" style={{ color: "var(--lime)" }}>
                  Mais pedidos
                </p>
                <h2 className="font-display text-4xl lg:text-5xl font-bold" style={{ color: "var(--text)" }}>
                  Destaques do catálogo
                </h2>
              </div>
              <Link
                href="/catalogo"
                className="inline-flex items-center gap-2 font-medium transition-opacity hover:opacity-70 flex-shrink-0"
                style={{ color: "var(--lime)" }}
              >
                Ver todos
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {destacados.map((produto) => (
                <ProductCard key={produto.id} produto={produto} />
              ))}
            </div>
          </div>
        )}

        {/* Lançamentos */}
        {lancamentos.length > 0 && (
          <div>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
              <div>
                <p className="text-sm font-bold uppercase tracking-widest mb-2" style={{ color: "var(--cyan)" }}>
                  Novidades
                </p>
                <h2 className="font-display text-4xl lg:text-5xl font-bold" style={{ color: "var(--text)" }}>
                  Lançamentos
                </h2>
              </div>
              <Link
                href="/catalogo"
                className="inline-flex items-center gap-2 font-medium transition-opacity hover:opacity-70 flex-shrink-0"
                style={{ color: "var(--cyan)" }}
              >
                Ver lançamentos
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {lancamentos.map((produto) => (
                <ProductCard key={produto.id} produto={produto} />
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
