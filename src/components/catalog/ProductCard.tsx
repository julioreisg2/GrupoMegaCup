import Link from "next/link";
import Image from "next/image";
import { Tag } from "lucide-react";
import { formatBRLShort, materialLabels } from "@/lib/utils";
import { precoAPartirDe } from "@/lib/pricing/engine";
import type { CatalogProduct } from "@/lib/pricing/types";
import { cn } from "@/lib/utils";

const EMOJI: Record<string, string> = {
  acrilico: "🥤", aluminio: "🪣", porcelana: "☕",
  vidro: "🍷", termico: "🫗", diverso: "🎁",
  misto: "🥤", a_confirmar: "📦",
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
            className="flex items-center justify-center select-none transition-transform duration-300 ease-out group-hover:scale-110"
            aria-hidden="true"
          >
            <span className="text-5xl drop-shadow-lg">{EMOJI[produto.material] ?? "🥤"}</span>
          </div>
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
