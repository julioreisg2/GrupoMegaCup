"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

const categories = [
  { slug: "acrilicos",      label: "Acrílicos e Similares", desc: "Long drinks, canecas, taças e copos infantis.", icon: "🥤", accent: "var(--cyan)" },
  { slug: "porcelana_vidro", label: "Porcelana e Vidro",    desc: "Canecas de porcelana, taças de vinho e champanhe.", icon: "🍷", accent: "var(--lime)" },
  { slug: "diverso",        label: "Itens Diversos",        desc: "Sacolas, kits, squeezes e outros personalizados.", icon: "🎁", accent: "var(--cyan)" },
  { slug: "termicos",       label: "Térmicos",              desc: "Garrafas e copos com gravação a laser.", icon: "🫗", accent: "var(--lime)" },
];

export function Categories() {
  return (
    <section style={{ backgroundColor: "var(--bg-soft)" }} className="py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <p className="text-xs font-black uppercase tracking-widest mb-2" style={{ color: "var(--cyan)" }}>Categorias</p>
            <h2 className="font-display font-black text-3xl sm:text-4xl" style={{ color: "var(--text)" }}>
              O que você procura?
            </h2>
          </div>
          <Link href="/catalogo" className="inline-flex items-center gap-1.5 text-sm font-semibold transition-colors hover:opacity-80" style={{ color: "var(--lime)" }}>
            Ver catálogo completo <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/catalogo?categoria=${cat.slug}`}
              className="group relative p-6 rounded-2xl border transition-all duration-200 hover:-translate-y-1"
              style={{
                backgroundColor: "var(--surface)",
                borderColor: "var(--border)",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = cat.accent; (e.currentTarget as HTMLElement).style.boxShadow = `0 0 0 1px ${cat.accent}22`; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}
            >
              <span className="text-4xl mb-4 block">{cat.icon}</span>
              <h3 className="font-display font-bold text-lg mb-1.5" style={{ color: "var(--text)" }}>{cat.label}</h3>
              <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>{cat.desc}</p>
              <div className="flex items-center gap-1.5 text-sm font-semibold" style={{ color: cat.accent }}>
                Ver produtos <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
