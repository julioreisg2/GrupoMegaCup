"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ShoppingBag, Trash2 } from "lucide-react";
import { useQuoteCart } from "@/components/quote/QuoteCartProvider";
import { CheckoutForm } from "./CheckoutForm";
import { formatBRLShort } from "@/lib/utils";
import { gerarMensagemComCheckout, gerarLinkWhatsApp } from "@/lib/pricing/explain";
import type { ClienteCheckout } from "@/lib/types/checkout";

export function CheckoutClient() {
  const { items, clearCart } = useQuoteCart();
  const [loading, setLoading] = useState(false);
  const [enviado, setEnviado] = useState(false);
  const [whatsappLink, setWhatsappLink] = useState<string>("");

  const subtotal = items.reduce((sum, item) => sum + (item.resultado.total || 0), 0);

  const handleSubmit = async (cliente: ClienteCheckout, frete: number) => {
    setLoading(true);
    try {
      const mensagem = gerarMensagemComCheckout(items, cliente, frete, subtotal);
      const link = gerarLinkWhatsApp(mensagem);
      setWhatsappLink(link);
      setEnviado(true);
      setTimeout(() => window.open(link, "_blank"), 500);
    } catch (error) {
      console.error("Erro ao processar pedido:", error);
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: "var(--bg)" }}>
        <div className="text-center">
          <div
            className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-5 border"
            style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}
          >
            <ShoppingBag className="w-9 h-9" style={{ color: "var(--text-soft)" }} />
          </div>
          <h1 className="font-display font-black text-3xl mb-2" style={{ color: "var(--text)" }}>
            Carrinho vazio
          </h1>
          <p className="mb-6" style={{ color: "var(--text-muted)" }}>
            Adicione produtos ao seu carrinho antes de fazer checkout.
          </p>
          <Link
            href="/catalogo"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold"
            style={{ backgroundColor: "var(--lime)", color: "var(--lime-dark)" }}
          >
            <ArrowLeft className="w-4 h-4" />
            Ver Catálogo
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: "var(--bg)" }}>
      {/* Header */}
      <div className="border-b" style={{ backgroundColor: "var(--bg-soft)", borderColor: "var(--border)" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
          <Link
            href="/orcamento"
            className="inline-flex items-center gap-2 text-sm mb-4 hover:opacity-70 transition"
            style={{ color: "var(--cyan)" }}
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar ao Orçamento
          </Link>
          <h1 className="font-display font-black text-3xl sm:text-4xl" style={{ color: "var(--text)" }}>
            Finalizar Pedido
          </h1>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Resumo */}
          <div className="lg:col-span-1 order-2 lg:order-1">
            <div
              className="rounded-2xl p-6 sticky top-6"
              style={{ backgroundColor: "var(--surface)", border: "1px solid var(--border)" }}
            >
              <h2 className="font-bold text-lg mb-4" style={{ color: "var(--text)" }}>
                Resumo do Pedido
              </h2>

              <div className="space-y-3 mb-6 pb-6" style={{ borderBottom: "1px solid var(--border)" }}>
                {items.map((item, idx) => (
                  <div key={idx} className="text-sm flex justify-between items-center">
                    <div>
                      <p style={{ fontWeight: 600, color: "var(--text)" }}>{item.produto.nome}</p>
                      <p style={{ fontSize: "0.75rem", marginTop: "0.25rem", color: "var(--text-muted)" }}>
                        {item.opcoes.quantidade} un
                      </p>
                    </div>
                    <p style={{ fontWeight: 700, color: "var(--lime)" }}>
                      {formatBRLShort(item.resultado.total)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="space-y-2 mb-6">
                <div className="flex justify-between text-sm" style={{ color: "var(--text-muted)" }}>
                  <span>Subtotal</span>
                  <span>{formatBRLShort(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm" style={{ color: "var(--text-muted)" }}>
                  <span>Frete</span>
                  <span style={{ color: "var(--cyan)" }}>A calcular...</span>
                </div>
              </div>

              {/* Estado após envio */}
              {enviado ? (
                <div className="space-y-3">
                  <div
                    className="p-4 rounded-xl text-center"
                    style={{ backgroundColor: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.3)" }}
                  >
                    <p style={{ color: "#22c55e", fontSize: "0.875rem", fontWeight: 700 }}>
                      ✓ Pedido enviado!
                    </p>
                    <p style={{ color: "var(--text-soft)", fontSize: "0.75rem", marginTop: "0.25rem" }}>
                      WhatsApp aberto com seu pedido.
                    </p>
                  </div>

                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition"
                    style={{ backgroundColor: "#22c55e", color: "#fff" }}
                  >
                    Abrir WhatsApp novamente
                  </a>

                  <Link
                    href="/catalogo"
                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition"
                    style={{ backgroundColor: "var(--surface-el)", color: "var(--text)" }}
                  >
                    Continuar comprando
                  </Link>

                  <button
                    onClick={clearCart}
                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium transition hover:opacity-80"
                    style={{ color: "#ef4444", border: "1px solid rgba(239,68,68,0.3)" }}
                  >
                    <Trash2 className="w-4 h-4" />
                    Limpar carrinho
                  </button>
                </div>
              ) : null}
            </div>
          </div>

          {/* Formulário */}
          <div className="lg:col-span-2 order-1 lg:order-2">
            <CheckoutForm onSubmit={handleSubmit} loading={loading} />
          </div>
        </div>
      </div>
    </div>
  );
}
