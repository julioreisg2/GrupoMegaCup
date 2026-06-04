import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getCatalog, getProductBySlug } from "@/lib/catalog/get-catalog";
import { precoAPartirDe } from "@/lib/pricing/engine";
import { formatBRLShort, materialLabels } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PriceSimulator } from "@/components/product/PriceSimulator";
import { ProductCard } from "@/components/catalog/ProductCard";
import { ProductGalery } from "@/components/product/ProductGalery";
import { Tag } from "lucide-react";
import { siteConfig } from "@/config/site";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getCatalog().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const produto = getProductBySlug(slug);
  if (!produto) return { title: "Produto não encontrado" };

  const preco = precoAPartirDe(produto);
  const descricao = `${produto.nome} personalizado. ${
    preco ? `A partir de ${formatBRLShort(preco)}/un em 100 unidades. ` : ""
  }Orçamento rápido pelo WhatsApp.`;

  return {
    title: produto.nome,
    description: descricao,
    openGraph: {
      title: `${produto.nome} | ${siteConfig.name}`,
      description: descricao,
    },
  };
}

const PRICE_TABLE_LABELS: Record<string, string> = {
  base100:   "100 un (base)",
  faixa1un:  "1 unidade",
  faixa1a5:  "1 a 5 un",
  faixa2a5:  "2 a 5 un",
  faixa6a10: "6 a 10 un",
  faixa11a20:"11 a 20 un",
  faixa20:   "20 un",
  faixa30a40:"30 a 40 un",
  faixa50:   "50 un",
  faixa60a80:"60 a 80 un",
  faixa100:  "100 un",
  faixa300:  "300 un",
  acima300:  "Acima de 300 un",
};

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const produto = getProductBySlug(slug);
  if (!produto) notFound();

  const preco = precoAPartirDe(produto);
  const catalog = getCatalog();
  const relacionados = catalog
    .filter(
      (p) =>
        p.id !== produto.id &&
        (p.subcategoria === produto.subcategoria || p.categoriaMacro === produto.categoriaMacro)
    )
    .slice(0, 4);

  const faixasPreco = Object.entries(produto.priceTable).filter(
    ([, v]) => v != null
  ) as [string, number][];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: produto.nome,
    description: `${produto.nome} personalizado. Material: ${materialLabels[produto.material]}.`,
    brand: { "@type": "Brand", name: siteConfig.name },
    offers: preco
      ? {
          "@type": "Offer",
          price: preco.toFixed(2),
          priceCurrency: "BRL",
          availability: "https://schema.org/InStock",
        }
      : undefined,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="min-h-screen" style={{ backgroundColor: "var(--bg)" }}>
        {/* Breadcrumb */}
        <div className="border-b py-3 px-4" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
          <div className="max-w-7xl mx-auto">
            <Breadcrumbs
              items={[
                { label: "Início", href: "/" },
                { label: "Catálogo", href: "/catalogo" },
                { label: produto.categoriaDisplay, href: `/catalogo?categoria=${produto.categoriaMacro}` },
                { label: produto.nome },
              ]}
            />
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
            {/* Imagem ou Galeria */}
            <div className="relative">
              {produto.galeria && produto.galeria.length > 0 ? (
                <ProductGalery images={produto.galeria} productName={produto.nome} />
              ) : (
                <div className="aspect-square bg-gradient-to-br from-navy-50 to-surface rounded-2xl border border-navy-100 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-dots opacity-30" />
                  <span className="text-8xl relative z-10 opacity-40">
                    {produto.material === "termico" ? "♨️" :
                     produto.material === "porcelana" ? "🍵" :
                     produto.material === "vidro" ? "🍷" :
                     produto.material === "aluminio" ? "🥤" : "🥤"}
                  </span>

                  <p className="absolute bottom-4 left-0 right-0 text-center text-xs text-navy-400">
                    Imagem ilustrativa · Foto real após personalização
                  </p>
                </div>
              )}

              <div className="absolute top-4 left-4 flex flex-col gap-2 z-20">
                {produto.destaque && (
                  <Badge variant="gold">
                    <Tag className="w-3 h-3" /> Destaque
                  </Badge>
                )}
                {produto.lancamento && (
                  <Badge variant="navy">Lançamento</Badge>
                )}
              </div>
            </div>

            {/* Dados e simulador */}
            <div>
              <div className="mb-1">
                <Link
                  href={`/catalogo?categoria=${produto.categoriaMacro}`}
                  className="text-sm font-medium transition-colors hover:opacity-80"
                  style={{ color: "var(--cyan)" }}
                >
                  {produto.categoriaDisplay}
                </Link>
                <span className="mx-2" style={{ color: "var(--text-soft)" }}>›</span>
                <span className="text-sm" style={{ color: "var(--text-soft)" }}>{produto.subcategoria}</span>
              </div>

              <h1 className="font-display text-3xl sm:text-4xl font-bold mb-2" style={{ color: "var(--text)" }}>
                {produto.nome}
              </h1>

              <div className="flex items-center gap-2 mb-4">
                <Badge variant="outline">{materialLabels[produto.material]}</Badge>
                {produto.regras.permiteDegrade && <Badge variant="default">Aceita degradê</Badge>}
                {produto.regras.linhaAcqua && <Badge variant="gold">Linha Acqua</Badge>}
              </div>

              {preco ? (
                <div className="rounded-2xl p-4 mb-6 inline-flex flex-col" style={{ backgroundColor: "var(--surface-el)", border: "1px solid var(--border)" }}>
                  <span className="text-sm" style={{ color: "var(--text-soft)" }}>A partir de</span>
                  <span className="font-display text-4xl font-bold" style={{ color: "var(--text)" }}>
                    {formatBRLShort(preco)}
                    <span className="text-lg font-normal" style={{ color: "var(--text-soft)" }}>/un</span>
                  </span>
                  <span className="text-xs mt-0.5" style={{ color: "var(--text-soft)" }}>em 100 unidades sem personalização extra</span>
                </div>
              ) : (
                <div className="rounded-2xl p-4 mb-6 inline-flex" style={{ backgroundColor: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.3)" }}>
                  <p className="font-medium" style={{ color: "#fbbf24" }}>Consultar preço via WhatsApp</p>
                </div>
              )}

              <PriceSimulator produto={produto} />
            </div>
          </div>

          {/* Tabela de preços */}
          {faixasPreco.length > 0 && (
            <div className="mb-12">
              <h2 className="font-display text-2xl font-bold mb-4" style={{ color: "var(--text)" }}>
                Tabela de preços
              </h2>
              <div className="overflow-x-auto rounded-2xl border" style={{ borderColor: "var(--border)" }}>
                <table className="w-full" style={{ backgroundColor: "var(--surface)" }}>
                  <thead>
                    <tr style={{ backgroundColor: "var(--surface-el)", color: "var(--text-muted)" }}>
                      <th className="text-left px-5 py-3 text-sm font-semibold">Quantidade</th>
                      <th className="text-right px-5 py-3 text-sm font-semibold">Preço/unidade</th>
                      <th className="text-right px-5 py-3 text-sm font-semibold hidden sm:table-cell">Total aproximado</th>
                    </tr>
                  </thead>
                  <tbody>
                    {faixasPreco.map(([key, val]) => {
                      const isBasePlusDelta = produto.priceModel === "base_plus_tier_delta";
                      const displayPrice = isBasePlusDelta && key !== "base100" ? (produto.priceTable.base100 ?? 0) + val : val;
                      const qtdEstimada = key === "faixa1un" ? 1 : key === "faixa1a5" || key === "faixa2a5" ? 5 : key === "faixa6a10" ? 10 : key === "faixa11a20" ? 20 : key === "faixa20" ? 20 : key === "faixa30a40" ? 40 : key === "faixa50" ? 50 : key === "faixa60a80" ? 80 : key === "faixa100" || key === "base100" ? 100 : key === "faixa300" ? 300 : 300;
                      return (
                        <tr
                          key={key}
                          className="border-t transition-colors hover:opacity-75"
                          style={{ borderColor: "var(--border)" }}
                        >
                          <td className="px-5 py-3 text-sm font-medium" style={{ color: "var(--text)" }}>
                            {PRICE_TABLE_LABELS[key] ?? key}
                          </td>
                          <td className="px-5 py-3 text-sm font-semibold text-right" style={{ color: "var(--lime)" }}>
                            {formatBRLShort(displayPrice)}/un
                          </td>
                          <td className="px-5 py-3 text-xs text-right hidden sm:table-cell" style={{ color: "var(--text-soft)" }}>
                            {formatBRLShort(displayPrice * qtdEstimada)}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              {produto.observacoes && (
                <ul className="mt-3 space-y-1">
                  {produto.observacoes.map((obs, i) => (
                    <li key={i} className="text-sm flex gap-2" style={{ color: "var(--text-soft)" }}>
                      <span>ℹ️</span>{obs}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {/* Produtos relacionados */}
          {relacionados.length > 0 && (
            <div>
              <h2 className="font-display text-2xl font-bold mb-4" style={{ color: "var(--text)" }}>
                Você também pode gostar
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {relacionados.map((p) => (
                  <ProductCard key={p.id} produto={p} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
