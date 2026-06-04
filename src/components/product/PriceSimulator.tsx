"use client";

import { useState, useMemo, useEffect } from "react";
import { Plus, Minus, ShoppingBag, AlertTriangle, Check } from "lucide-react";
import { calcularPreco } from "@/lib/pricing/engine";
import { gerarLinhasBreakdown, gerarMensagemWhatsApp, gerarLinkWhatsApp } from "@/lib/pricing/explain";
import { formatBRLShort } from "@/lib/utils";
import { useQuoteCart } from "@/components/quote/QuoteCartProvider";
import { ShippingCalculator } from "@/components/quote/ShippingCalculator";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";
import type { CatalogProduct, PriceOptions } from "@/lib/pricing/types";

export function PriceSimulator({ produto }: { produto: CatalogProduct }) {
  const { addItem } = useQuoteCart();
  const [quantidade, setQuantidade] = useState(100);
  const [inputQtd, setInputQtd] = useState("100");
  const [degrade, setDegrade] = useState(false);
  const [borda, setBorda] = useState(false);
  const [transferFrente, setTransferFrente] = useState(false);
  const [transferFrenteVerso, setTransferFrenteVerso] = useState(false);
  const [nomesIndividuais, setNomesIndividuais] = useState(false);
  const [formaPagamento, setFormaPagamento] = useState<"avista" | "cartao">("avista");
  const [observacoes, setObservacoes] = useState("");
  const [adicionado, setAdicionado] = useState(false);
  const [showMobileCTA, setShowMobileCTA] = useState(false);

  const opcoes: PriceOptions = useMemo(() => ({
    quantidade, degrade, borda,
    transferFrente: transferFrente && !transferFrenteVerso,
    transferFrenteVerso, nomesIndividuais, formaPagamento,
  }), [quantidade, degrade, borda, transferFrente, transferFrenteVerso, nomesIndividuais, formaPagamento]);

  const resultado   = useMemo(() => calcularPreco(produto, opcoes), [produto, opcoes]);
  const breakdown   = useMemo(() => gerarLinhasBreakdown(produto, opcoes, resultado), [produto, opcoes, resultado]);
  const mensagem    = useMemo(() => gerarMensagemWhatsApp(produto, opcoes, resultado, observacoes), [produto, opcoes, resultado, observacoes]);
  const linkWhats   = useMemo(() => gerarLinkWhatsApp(mensagem), [mensagem]);

  useEffect(() => {
    const fn = () => setShowMobileCTA(window.scrollY > 320);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  function handleQtdChange(v: string) {
    setInputQtd(v);
    const n = parseInt(v, 10);
    if (!isNaN(n) && n > 0 && n <= 10000) setQuantidade(n);
  }
  function step(d: number) {
    const s = [1, 5, 10, 20, 30, 50, 100, 200, 300, 500, 1000];
    const up = s.find((x) => x > quantidade + Math.sign(d));
    const dn = [...s].reverse().find((x) => x < quantidade + Math.sign(d));
    const n = d > 0 ? (up ?? quantidade + 1) : (dn ?? Math.max(1, quantidade - 1));
    setQuantidade(n); setInputQtd(String(n));
  }
  function handleAdd() {
    addItem({ produto, opcoes, resultado, observacoes });
    setAdicionado(true);
    setTimeout(() => setAdicionado(false), 2500);
  }

  return (
    <>
      <div className="space-y-5">
        {produto.inconsistencias?.length ? (
          <div className="flex gap-2 p-3 rounded-xl border" style={{ backgroundColor: "rgba(245,158,11,0.08)", borderColor: "rgba(245,158,11,0.25)" }}>
            <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" aria-hidden="true" />
            <div className="text-sm text-amber-300 space-y-1" aria-live="polite">
              {produto.inconsistencias.map((x, i) => <p key={i}>{x}</p>)}
            </div>
          </div>
        ) : null}

        {/* Quantidade */}
        <div>
          <label htmlFor="qtd" className="block text-sm font-semibold mb-2" style={{ color: "var(--text)" }}>
            Quantidade
          </label>
          <div className="flex items-center gap-2">
            {[{ fn: () => step(-1), label: "Diminuir" }, null, { fn: () => step(1), label: "Aumentar" }].map((b, i) =>
              b === null ? (
                <input
                  key="input"
                  id="qtd"
                  type="number"
                  inputMode="numeric"
                  name="quantidade"
                  min={1} max={10000}
                  value={inputQtd}
                  onChange={(e) => handleQtdChange(e.target.value)}
                  className="w-24 text-center rounded-xl py-2.5 text-sm font-bold border focus:outline-none focus:ring-2 focus:ring-[var(--lime)]"
                  style={{ backgroundColor: "var(--surface-el)", borderColor: "var(--border)", color: "var(--text)" }}
                />
              ) : (
                <button
                  key={i}
                  onClick={b.fn}
                  aria-label={`${b.label} quantidade`}
                  className="w-11 h-11 rounded-xl border flex items-center justify-center transition-all hover:border-[var(--lime)] hover:text-[var(--lime)]"
                  style={{ backgroundColor: "var(--surface-el)", borderColor: "var(--border)", color: "var(--text-muted)" }}
                >
                  {i === 0 ? <Minus className="w-4 h-4" aria-hidden="true" /> : <Plus className="w-4 h-4" aria-hidden="true" />}
                </button>
              )
            )}
            <span className="text-sm" style={{ color: "var(--text-soft)" }}>unidades</span>
          </div>
        </div>

        {/* Acabamento */}
        {(produto.regras.permiteDegrade || produto.regras.permiteBorda) && (
          <div>
            <p className="text-sm font-semibold mb-2" style={{ color: "var(--text)" }}>Acabamento</p>
            <div className="flex flex-wrap gap-2">
              <Chip active={!degrade && !borda} onClick={() => { setDegrade(false); setBorda(false); }} label="Padrão" sub="sem acréscimo" />
              {produto.regras.permiteDegrade && <Chip active={degrade} onClick={() => setDegrade(!degrade)} label="Degradê" sub="+R$ 1,00/un" />}
              {produto.regras.permiteBorda   && <Chip active={borda}   onClick={() => setBorda(!borda)}     label="Borda"   sub="+R$ 0,50/un" />}
            </div>
          </div>
        )}

        {/* Transfer */}
        {(produto.regras.permiteTransferFrente || produto.regras.permiteTransferFrenteVerso) && (
          <div>
            <p className="text-sm font-semibold mb-2" style={{ color: "var(--text)" }}>Personalização</p>
            <div className="flex flex-wrap gap-2">
              <Chip active={!transferFrente && !transferFrenteVerso} onClick={() => { setTransferFrente(false); setTransferFrenteVerso(false); }} label="Padrão" sub="sem transfer" />
              {produto.regras.permiteTransferFrente && (
                <Chip active={transferFrente && !transferFrenteVerso} onClick={() => { setTransferFrente(true); setTransferFrenteVerso(false); }}
                  label="Transfer Frente" sub={quantidade < 10 && produto.material === "acrilico" ? "grátis" : "+R$ 0,50/un"} />
              )}
              {produto.regras.permiteTransferFrenteVerso && (
                <Chip active={transferFrenteVerso} onClick={() => { setTransferFrenteVerso(true); setTransferFrente(false); }}
                  label="Frente e Verso" sub={quantidade < 10 && produto.material === "acrilico" ? "grátis" : "+R$ 0,80/un"} />
              )}
            </div>
          </div>
        )}

        {/* Nomes individuais */}
        {produto.regras.regraNomes !== "nao_aplica" && (
          <div className="flex items-center gap-3">
            <button
              role="switch" aria-checked={nomesIndividuais} aria-label="Nomes individuais"
              onClick={() => setNomesIndividuais(!nomesIndividuais)}
              className="relative w-12 h-6 rounded-full flex-shrink-0 border transition-colors duration-200"
              style={{
                backgroundColor: nomesIndividuais ? "var(--lime)" : "var(--surface-el)",
                borderColor: nomesIndividuais ? "var(--lime)" : "var(--border)",
              }}
            >
              <span
                className="absolute top-0.5 w-4.5 h-4.5 rounded-full shadow transition-transform duration-200"
                style={{
                  left: "2px",
                  backgroundColor: nomesIndividuais ? "var(--lime-dark)" : "var(--text-soft)",
                  transform: nomesIndividuais ? "translateX(22px)" : "translateX(0)",
                }}
              />
            </button>
            <div>
              <p className="text-sm font-medium" style={{ color: "var(--text)" }}>Nomes individuais</p>
              <p className="text-xs" style={{ color: "var(--text-soft)" }}>
                {produto.regras.regraNomes === "gratis_ate_10_depois_199" || produto.regras.regraNomes === "sem_cobranca_menos_10"
                  ? "Grátis até 10 un • +R$ 1,99/un acima"
                  : "Sem acréscimo"}
              </p>
            </div>
          </div>
        )}

        {/* Pagamento */}
        <div>
          <p className="text-sm font-semibold mb-2" style={{ color: "var(--text)" }}>Pagamento</p>
          <div className="flex gap-2">
            <Chip active={formaPagamento === "avista"} onClick={() => setFormaPagamento("avista")} label="À vista" sub="Pix/Dinheiro" />
            <Chip active={formaPagamento === "cartao"} onClick={() => setFormaPagamento("cartao")} label="Cartão 2x–5x" sub="+10%" />
          </div>
        </div>

        {/* Resumo de preço */}
        <div className="rounded-2xl border p-4 space-y-2" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
          <p className="text-[10px] font-black uppercase tracking-widest mb-3" style={{ color: "var(--text-soft)" }}>Resumo</p>
          {breakdown.map((linha, i) => (
            <div
              key={i}
              className={cn("flex items-baseline justify-between text-sm", linha.destaque && "pt-3 border-t")}
              style={{ color: "var(--text)", borderColor: "var(--border)" }}
            >
              <span style={{ color: linha.destaque ? "var(--text-muted)" : "var(--text-soft)" }}>{linha.label}</span>
              <span className={linha.destaque ? "font-display font-black text-xl" : "font-medium"} style={{ color: linha.destaque ? "var(--lime)" : "var(--text)" }}>
                {linha.valor}
              </span>
            </div>
          ))}
          {!resultado.valido && resultado.erros.map((e, i) => (
            <p key={i} className="text-xs text-red-400 mt-1" aria-live="polite">{e}</p>
          ))}
          {resultado.observacoes.length > 0 && (
            <div className="pt-2 border-t space-y-1" style={{ borderColor: "var(--border)" }}>
              {resultado.observacoes.map((o, i) => (
                <p key={i} className="text-xs" style={{ color: "var(--text-soft)" }}>{o}</p>
              ))}
            </div>
          )}
        </div>

        {/* Observações */}
        <div>
          <label htmlFor="obs" className="block text-sm font-medium mb-1.5" style={{ color: "var(--text)" }}>
            Observações <span style={{ color: "var(--text-soft)" }}>(opcional)</span>
          </label>
          <textarea
            id="obs" name="observacoes" rows={2}
            value={observacoes} onChange={(e) => setObservacoes(e.target.value)}
            placeholder="Arte especial, cores, prazo…"
            className="w-full rounded-xl px-3 py-2.5 text-sm border focus:outline-none focus:ring-2 focus:ring-[var(--lime)] resize-none"
            style={{ backgroundColor: "var(--surface-el)", borderColor: "var(--border)", color: "var(--text)" }}
          />
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleAdd}
            disabled={!resultado.valido}
            className={cn("flex-1 flex items-center justify-center gap-2 py-3.5 min-h-[52px] rounded-xl font-semibold transition-all", adicionado ? "" : "btn-cyan")}
            style={adicionado ? { backgroundColor: "rgba(34,197,94,0.12)", color: "#4ade80", border: "1px solid rgba(34,197,94,0.3)" } : {}}
            aria-label={adicionado ? "Adicionado ao orçamento" : "Adicionar ao orçamento"}
          >
            {adicionado
              ? <><Check className="w-5 h-5" aria-hidden="true" /> Adicionado!</>
              : <><ShoppingBag className="w-5 h-5" aria-hidden="true" /> Adicionar ao orçamento</>
            }
          </button>

          <a
            href={linkWhats}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-wa flex-1 flex items-center justify-center gap-2 py-3.5 min-h-[52px] rounded-xl font-semibold"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Pedir no WhatsApp
          </a>
        </div>

        <p className="text-xs text-center" style={{ color: "var(--text-soft)" }}>
          {siteConfig.producao.prazoLabel}
        </p>

        <ShippingCalculator />
      </div>

      {/* CTA sticky mobile */}
      <div
        className={cn("sticky-cta-enter fixed bottom-0 left-0 right-0 z-40 px-4 py-3 border-t sm:hidden", showMobileCTA ? "translate-y-0 opacity-100" : "translate-y-full opacity-0")}
        style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}
      >
        <div className="flex items-center gap-2 max-w-lg mx-auto">
          <div className="flex-1 min-w-0">
            <p className="text-[10px] leading-none mb-0.5" style={{ color: "var(--text-soft)" }}>Total estimado</p>
            <p className="font-display font-black text-base leading-none" style={{ color: "var(--lime)" }}>
              {formatBRLShort(resultado.total)}
            </p>
          </div>
          <button
            onClick={handleAdd}
            disabled={!resultado.valido}
            className={cn("flex items-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-bold flex-shrink-0 transition-all", adicionado ? "" : "btn-cyan")}
            style={adicionado ? { backgroundColor: "rgba(34,197,94,0.12)", color: "#4ade80", border: "1px solid rgba(34,197,94,0.3)" } : {}}
            aria-label={adicionado ? "Adicionado" : "Adicionar ao orçamento"}
          >
            {adicionado ? <Check className="w-4 h-4" aria-hidden="true" /> : <ShoppingBag className="w-4 h-4" aria-hidden="true" />}
            {adicionado ? "Adicionado!" : "Orçamento"}
          </button>
          <a
            href={linkWhats}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-wa flex items-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-bold flex-shrink-0"
          >
            Pedir agora
          </a>
        </div>
      </div>

    </>
  );
}

function Chip({ active, onClick, label, sub }: { active: boolean; onClick: () => void; label: string; sub?: string }) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-start px-4 py-2.5 min-h-[48px] rounded-xl border text-sm justify-center transition-all duration-150"
      style={{
        backgroundColor: active ? "var(--lime)" : "var(--surface-el)",
        borderColor:     active ? "var(--lime)" : "var(--border)",
        color:           active ? "var(--lime-dark)" : "var(--text)",
        transform:       active ? "scale(1.02)" : "scale(1)",
        boxShadow:       active ? "var(--shadow-lime)" : "none",
      }}
    >
      <span className="font-semibold leading-tight">{label}</span>
      {sub && (
        <span className="text-xs mt-0.5 leading-tight" style={{ color: active ? "rgba(2,6,23,0.6)" : "var(--text-soft)" }}>
          {sub}
        </span>
      )}
    </button>
  );
}
