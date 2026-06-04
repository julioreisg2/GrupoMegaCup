"use client";

import Link from "next/link";
import { Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { useQuoteCart } from "./QuoteCartProvider";
import { ShippingCalculator } from "./ShippingCalculator";
import { formatBRLShort, materialLabels } from "@/lib/utils";
import { gerarLinkWhatsApp } from "@/lib/pricing/explain";
import { siteConfig } from "@/config/site";

function buildMsg(items: ReturnType<typeof useQuoteCart>["items"], total: number): string {
  const linhas = ["Olá! Gostaria de um orçamento completo:", ""];
  items.forEach((item, i) => {
    const { produto, opcoes, resultado } = item;
    linhas.push(`Produto ${i + 1}: ${produto.nome}`);
    linhas.push(`  Quantidade: ${opcoes.quantidade} un`);
    linhas.push(`  Material: ${materialLabels[produto.material]}`);
    if (opcoes.degrade) linhas.push("  Acabamento: Degradê");
    if (opcoes.borda) linhas.push("  Acabamento: Borda");
    if (opcoes.transferFrenteVerso) linhas.push("  Personalização: Frente e verso");
    else if (opcoes.transferFrente) linhas.push("  Personalização: Frente");
    if (opcoes.nomesIndividuais) linhas.push("  Nomes individuais: Sim");
    linhas.push(`  Preço estimado: ${formatBRLShort(resultado.total)}`);
    if (item.observacoes) linhas.push(`  Obs: ${item.observacoes}`);
    linhas.push("");
  });
  linhas.push(`Total estimado: ${formatBRLShort(total)}`);
  return linhas.join("\n");
}

const TAG_STYLES = {
  default: { backgroundColor: "var(--surface-el)", color: "var(--text-muted)", border: "1px solid var(--border)" },
  cyan:    { backgroundColor: "rgba(0,213,255,0.1)", color: "var(--cyan)", border: "1px solid rgba(0,213,255,0.2)" },
  lime:    { backgroundColor: "rgba(182,255,0,0.08)", color: "var(--lime)", border: "1px solid rgba(182,255,0,0.2)" },
};

export function QuoteCartPage() {
  const { items, removeItem, clearCart, totalEstimado } = useQuoteCart();

  if (items.length === 0) {
    return (
      <div
        className="min-h-screen flex items-center justify-center px-4"
        style={{ backgroundColor: "var(--bg)" }}
      >
        <div className="text-center">
          <div
            className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-5 border"
            style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}
          >
            <ShoppingBag className="w-9 h-9" style={{ color: "var(--text-soft)" }} aria-hidden="true" />
          </div>
          <h1 className="font-display font-black text-3xl mb-2" style={{ color: "var(--text)" }}>
            Orçamento vazio
          </h1>
          <p className="mb-6" style={{ color: "var(--text-muted)" }}>
            Adicione produtos ao seu orçamento pelo catálogo.
          </p>
          <Link
            href="/catalogo"
            className="btn-lime inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold"
          >
            Ver catálogo <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    );
  }

  const link = gerarLinkWhatsApp(buildMsg(items, totalEstimado));

  return (
    <div style={{ backgroundColor: "var(--bg)" }}>
      {/* Header */}
      <div className="border-b" style={{ backgroundColor: "var(--bg-soft)", borderColor: "var(--border)" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
          <nav className="text-sm mb-3 flex gap-2" style={{ color: "var(--text-soft)" }}>
            <Link href="/" className="hover:text-[var(--lime)] transition-colors">Início</Link>
            <span>/</span>
            <span style={{ color: "var(--text)" }}>Meu Orçamento</span>
          </nav>
          <h1 className="font-display font-black text-3xl sm:text-4xl" style={{ color: "var(--text)" }}>
            Meu Orçamento
          </h1>
          <p className="mt-1 text-sm" style={{ color: "var(--text-soft)" }}>
            <span style={{ color: "var(--cyan)", fontWeight: 700 }}>{items.length}</span>
            {" "}{items.length === 1 ? "produto selecionado" : "produtos selecionados"}
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        {/* Lista de itens */}
        <div className="space-y-3 mb-6">
          {items.map((item) => {
            const { produto, opcoes, resultado } = item;
            const tags = [
              { label: `${opcoes.quantidade} unidades`, style: TAG_STYLES.default },
              opcoes.degrade           && { label: "Degradê",          style: TAG_STYLES.cyan },
              opcoes.borda             && { label: "Borda",             style: TAG_STYLES.cyan },
              opcoes.transferFrenteVerso && { label: "Transfer F+V",   style: TAG_STYLES.lime },
              (opcoes.transferFrente && !opcoes.transferFrenteVerso) && { label: "Transfer Frente", style: TAG_STYLES.lime },
              opcoes.nomesIndividuais  && { label: "Nomes individuais", style: TAG_STYLES.lime },
            ].filter(Boolean) as { label: string; style: Record<string, string> }[];

            return (
              <div
                key={item.id}
                className="rounded-2xl border p-4 sm:p-5"
                style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <Link
                      href={`/catalogo/${produto.slug}`}
                      className="font-semibold text-base hover:opacity-75 transition-opacity"
                      style={{ color: "var(--text)" }}
                    >
                      {produto.nome}
                    </Link>
                    <p className="text-xs mt-0.5" style={{ color: "var(--text-soft)" }}>
                      {materialLabels[produto.material]} · {produto.categoriaDisplay}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mt-2.5">
                      {tags.map((t) => (
                        <span
                          key={t.label}
                          className="text-xs px-2.5 py-1 rounded-full font-medium"
                          style={t.style}
                        >
                          {t.label}
                        </span>
                      ))}
                    </div>

                    {item.observacoes && (
                      <p className="text-xs mt-2 italic" style={{ color: "var(--text-soft)" }}>
                        {item.observacoes}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col items-end gap-3 flex-shrink-0">
                    <div className="text-right">
                      <p className="font-display font-black text-xl leading-none" style={{ color: "var(--lime)" }}>
                        {formatBRLShort(resultado.total)}
                      </p>
                      <p className="text-xs mt-1" style={{ color: "var(--text-soft)" }}>
                        {formatBRLShort(resultado.precoUnitario)}/un
                      </p>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      aria-label={`Remover ${produto.nome}`}
                      className="transition-colors hover:text-red-400 p-1"
                      style={{ color: "var(--text-soft)" }}
                    >
                      <Trash2 className="w-4 h-4" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Resumo + envio */}
        <div
          className="rounded-2xl border p-5 sm:p-6"
          style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}
        >
          {/* Total */}
          <div
            className="flex justify-between items-center mb-5 pb-4 border-b"
            style={{ borderColor: "var(--border)" }}
          >
            <span className="font-semibold text-lg" style={{ color: "var(--text-muted)" }}>
              Total estimado
            </span>
            <span className="font-display font-black text-3xl" style={{ color: "var(--lime)" }}>
              {formatBRLShort(totalEstimado)}
            </span>
          </div>

          <p className="text-sm mb-5" style={{ color: "var(--text-soft)" }}>
            Orçamento estimado. O valor final é confirmado via WhatsApp após aprovação da arte e frete.
          </p>

          {/* CTA Checkout */}
          <Link
            href="/checkout"
            className="btn-lime flex items-center justify-center gap-2.5 w-full py-4 rounded-xl text-base font-bold mb-3"
          >
            Ir para Checkout
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>

          <button
            onClick={clearCart}
            className="w-full py-2.5 text-sm transition-colors hover:text-red-400"
            style={{ color: "var(--text-soft)" }}
          >
            Limpar orçamento
          </button>

          <div className="mt-5 pt-5 border-t" style={{ borderColor: "var(--border)" }}>
            <ShippingCalculator />
          </div>

          <p className="text-xs text-center mt-4" style={{ color: "var(--text-soft)" }}>
            {siteConfig.producao.prazoLabel}
          </p>
        </div>
      </div>
    </div>
  );
}
