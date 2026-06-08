import Link from "next/link";
import Image from "next/image";
import { Tag } from "lucide-react";
import { formatBRLShort, materialLabels } from "@/lib/utils";
import { precoAPartirDe } from "@/lib/pricing/engine";
import type { CatalogProduct } from "@/lib/pricing/types";
import { cn } from "@/lib/utils";

// SVG ilustrativo por material - mais visual que emoji padrão
const PLACEHOLDER_SVG: Record<string, string> = {
  acrilico: `<svg viewBox="0 0 80 100" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="20" y="10" width="40" height="75" rx="6" fill="rgba(0,213,255,0.15)" stroke="rgba(0,213,255,0.4)" stroke-width="2"/><rect x="24" y="14" width="32" height="67" rx="4" fill="rgba(0,213,255,0.08)"/><path d="M28 30 Q40 25 52 30" stroke="rgba(0,213,255,0.5)" stroke-width="1.5" fill="none"/><text x="40" y="58" text-anchor="middle" font-size="11" fill="rgba(255,255,255,0.5)" font-family="sans-serif">COPO</text></svg>`,
  aluminio: `<svg viewBox="0 0 80 100" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="18" y="15" width="44" height="70" rx="5" fill="rgba(150,150,160,0.2)" stroke="rgba(200,200,210,0.4)" stroke-width="2"/><rect x="18" y="15" width="44" height="12" rx="5" fill="rgba(200,200,210,0.3)"/><path d="M25 27 H55" stroke="rgba(200,200,210,0.3)" stroke-width="1"/><text x="40" y="62" text-anchor="middle" font-size="9" fill="rgba(255,255,255,0.5)" font-family="sans-serif">CANECA</text></svg>`,
  porcelana: `<svg viewBox="0 0 80 100" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M22 35 Q20 65 25 80 H55 Q60 65 58 35 Z" fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.3)" stroke-width="2"/><path d="M56 45 Q68 45 68 55 Q68 65 56 65" stroke="rgba(255,255,255,0.3)" stroke-width="2" fill="none"/><ellipse cx="40" cy="35" rx="18" ry="5" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.3)" stroke-width="1.5"/><text x="40" y="62" text-anchor="middle" font-size="9" fill="rgba(255,255,255,0.4)" font-family="sans-serif">CANECA</text></svg>`,
  vidro: `<svg viewBox="0 0 80 100" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M25 20 L20 85 H60 L55 20 Z" fill="rgba(100,220,150,0.1)" stroke="rgba(100,220,150,0.35)" stroke-width="2"/><path d="M27 28 L53 28" stroke="rgba(100,220,150,0.25)" stroke-width="1"/><path d="M25 20 L55 20" stroke="rgba(100,220,150,0.4)" stroke-width="2"/><text x="40" y="62" text-anchor="middle" font-size="9" fill="rgba(255,255,255,0.4)" font-family="sans-serif">TAÇA</text></svg>`,
  termico: `<svg viewBox="0 0 80 100" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="22" y="12" width="36" height="76" rx="8" fill="rgba(182,255,0,0.1)" stroke="rgba(182,255,0,0.35)" stroke-width="2"/><rect x="22" y="12" width="36" height="14" rx="8" fill="rgba(182,255,0,0.2)"/><path d="M30 35 H50 M30 45 H50 M30 55 H45" stroke="rgba(182,255,0,0.2)" stroke-width="1.5"/><text x="40" y="75" text-anchor="middle" font-size="8" fill="rgba(255,255,255,0.4)" font-family="sans-serif">TÉRMICO</text></svg>`,
  diverso: `<svg viewBox="0 0 80 100" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="15" y="40" width="50" height="45" rx="4" fill="rgba(255,150,50,0.1)" stroke="rgba(255,150,50,0.35)" stroke-width="2"/><path d="M15 50 H65" stroke="rgba(255,150,50,0.3)" stroke-width="1.5"/><path d="M40 15 Q40 40 40 40" stroke="rgba(255,150,50,0.4)" stroke-width="2"/><path d="M25 15 Q40 8 55 15" stroke="rgba(255,150,50,0.4)" stroke-width="2" fill="none"/><text x="40" y="72" text-anchor="middle" font-size="9" fill="rgba(255,255,255,0.4)" font-family="sans-serif">PRODUTO</text></svg>`,
  misto: `<svg viewBox="0 0 80 100" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="20" y="10" width="40" height="75" rx="6" fill="rgba(0,213,255,0.15)" stroke="rgba(0,213,255,0.4)" stroke-width="2"/><text x="40" y="58" text-anchor="middle" font-size="9" fill="rgba(255,255,255,0.4)" font-family="sans-serif">KIT</text></svg>`,
  a_confirmar: `<svg viewBox="0 0 80 100" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="15" y="20" width="50" height="60" rx="4" fill="rgba(150,150,150,0.1)" stroke="rgba(150,150,150,0.3)" stroke-width="2"/><text x="40" y="55" text-anchor="middle" font-size="20" fill="rgba(255,255,255,0.2)" font-family="sans-serif">?</text></svg>`,
};

const GRAD: Record<string, string> = {
  acrilico: "card-img-acrilico", aluminio: "card-img-aluminio",
  porcelana: "card-img-porcelana", vidro: "card-img-vidro",
  termico: "card-img-termico", diverso: "card-img-diverso",
  misto: "card-img-acrilico", a_confirmar: "card-img-diverso",
};

export function ProductCardSkeleton() {
  return (
    <div className="rounded-2xl overflow-hidden border" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
      <div className="skeleton aspect-[4/3]" />
      <div className="p-4 space-y-3">
        <div className="skeleton h-3 w-20 rounded" />
        <div className="skeleton h-4 w-full rounded" />
        <div className="skeleton h-4 w-2/3 rounded" />
        <div className="flex items-center justify-between pt-2">
          <div className="skeleton h-6 w-20 rounded" />
          <div className="skeleton h-9 w-28 rounded-xl" />
        </div>
      </div>
    </div>
  );
}

export function ProductCard({ produto }: { produto: CatalogProduct }) {
  const preco = precoAPartirDe(produto);
  const grad  = GRAD[produto.material] ?? "card-img-acrilico";

  return (
    /* Card inteiro é clicável — Link envolve tudo */
    <Link
      href={`/catalogo/${produto.slug}`}
      className="product-card group flex flex-col rounded-2xl overflow-hidden border"
      style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}
    >
      {/* Área de imagem */}
      <div className={cn("relative aspect-[4/3] flex items-center justify-center overflow-hidden", grad)}>
        {produto.imagem ? (
          <Image
            src={produto.imagem}
            alt={produto.nome}
            fill
            className="object-cover transition-transform duration-300 ease-out group-hover:scale-105"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            loading="lazy"
          />
        ) : (
          <div
            className="flex items-center justify-center w-full h-full transition-transform duration-300 ease-out group-hover:scale-110"
            aria-hidden="true"
            dangerouslySetInnerHTML={{
              __html: PLACEHOLDER_SVG[produto.material] ?? PLACEHOLDER_SVG.diverso
            }}
          />
        )}

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {produto.destaque && (
            <span
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider"
              style={{ backgroundColor: "var(--lime)", color: "var(--lime-dark)" }}
            >
              <Tag className="w-2.5 h-2.5" aria-hidden="true" /> Destaque
            </span>
          )}
          {produto.lancamento && (
            <span
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider"
              style={{ backgroundColor: "var(--cyan)", color: "var(--cyan-dark)" }}
            >
              Novo
            </span>
          )}
        </div>
      </div>

      {/* Conteúdo */}
      <div className="p-4 flex flex-col flex-1 gap-2">
        <p className="text-xs font-semibold uppercase tracking-wider truncate" style={{ color: "var(--text-soft)" }}>
          {materialLabels[produto.material]} · {produto.subcategoria}
        </p>
        <h3 className="font-semibold text-sm sm:text-base leading-snug line-clamp-2" style={{ color: "var(--text)" }}>
          {produto.nome}
        </h3>

        <div
          className="mt-auto pt-3 border-t flex items-center justify-between gap-2"
          style={{ borderColor: "var(--border)" }}
        >
          {/* Preço em uma linha — whitespace-nowrap evita quebra */}
          <div className="min-w-0">
            {preco ? (
              <>
                <p className="text-[10px] leading-none mb-1" style={{ color: "var(--text-soft)" }}>A partir de</p>
                <p className="font-display font-black text-base leading-none whitespace-nowrap" style={{ color: "var(--text)" }}>
                  {formatBRLShort(preco)}
                  <span className="text-xs font-normal" style={{ color: "var(--text-soft)" }}>/un</span>
                </p>
              </>
            ) : (
              <p className="text-sm font-semibold" style={{ color: "var(--cyan)" }}>Consultar</p>
            )}
          </div>

          {/* Botão visual — não é um <a> aninhado, é só estilo */}
          <span
            className="flex-shrink-0 text-xs font-bold px-3 py-2 rounded-xl whitespace-nowrap transition-all group-hover:brightness-110"
            style={{ backgroundColor: "var(--lime)", color: "var(--lime-dark)" }}
          >
            Ver produto
          </span>
        </div>
      </div>
    </Link>
  );
}
