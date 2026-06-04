"use client";

import { useState } from "react";
import { Truck, Loader2, MapPin, CheckCircle2, AlertCircle } from "lucide-react";
import { siteConfig } from "@/config/site";

interface ViaCepResponse { cep: string; localidade: string; uf: string; erro?: boolean; }

interface ShippingResult { tipo: "fixo" | "consultar"; valor: number | null; label: string; descricao: string; cidade: string; uf: string; }

function calcFrete(cidade: string, uf: string): ShippingResult {
  const c = cidade.toLowerCase();
  const u = uf.toUpperCase();
  if (c.includes("cruzeiro do oeste")) return { tipo: "fixo", valor: siteConfig.entrega.cruzeirodoOeste, label: `R$ ${siteConfig.entrega.cruzeirodoOeste.toFixed(2).replace(".", ",")}`, descricao: "Entrega em Cruzeiro do Oeste", cidade, uf: u };
  if (c.includes("umuarama")) return { tipo: "fixo", valor: siteConfig.entrega.umuarama, label: `R$ ${siteConfig.entrega.umuarama.toFixed(2).replace(".", ",")}`, descricao: "Entrega em Umuarama", cidade, uf: u };
  return { tipo: "consultar", valor: null, label: "Consultar", descricao: `Frete para ${cidade}/${u} sob consulta.`, cidade, uf: u };
}

function fmtCEP(v: string) { return v.replace(/\D/g, "").slice(0, 8).replace(/(\d{5})(\d)/, "$1-$2"); }

export function ShippingCalculator() {
  const [cep, setCep] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ShippingResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function buscar() {
    const raw = cep.replace(/\D/g, "");
    if (raw.length !== 8) { setError("Digite um CEP válido com 8 dígitos."); return; }
    setLoading(true); setError(null); setResult(null);
    try {
      const r = await fetch(`https://viacep.com.br/ws/${raw}/json/`);
      if (!r.ok) throw new Error();
      const d: ViaCepResponse = await r.json();
      if (d.erro) { setError("CEP não encontrado."); return; }
      setResult(calcFrete(d.localidade, d.uf));
    } catch { setError("Não foi possível consultar o CEP. Tente novamente."); }
    finally { setLoading(false); }
  }

  return (
    <div className="rounded-2xl border p-4" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
      <div className="flex items-center gap-2 mb-3">
        <Truck className="w-4 h-4" style={{ color: "var(--cyan)" }} aria-hidden="true" />
        <span className="text-sm font-semibold" style={{ color: "var(--text)" }}>Calcular frete</span>
      </div>

      <div className="flex gap-2">
        <div className="relative flex-1">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "var(--text-soft)" }} aria-hidden="true" />
          <input
            type="text"
            inputMode="numeric"
            value={cep}
            onChange={(e) => { setCep(fmtCEP(e.target.value)); setError(null); setResult(null); }}
            onKeyDown={(e) => e.key === "Enter" && buscar()}
            placeholder="00000-000…"
            autoComplete="postal-code"
            name="cep"
            maxLength={9}
            className="w-full pl-9 pr-3 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-[var(--lime)]"
            style={{ backgroundColor: "var(--surface-el)", borderColor: "var(--border)", color: "var(--text)" }}
          />
        </div>
        <button
          onClick={buscar}
          disabled={loading || cep.replace(/\D/g, "").length < 8}
          className="btn-cyan px-4 py-2.5 rounded-xl text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed min-w-[56px] flex items-center justify-center"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" /> : "OK"}
        </button>
      </div>

      {result && (
        <div className="mt-3 p-3 rounded-xl border" style={{ borderColor: "var(--border)", backgroundColor: "var(--surface-el)" }}>
          <div className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 mt-0.5 text-emerald-400 flex-shrink-0" aria-hidden="true" />
            <div>
              <p className="text-sm font-semibold" style={{ color: "var(--text)" }}>{result.cidade}/{result.uf}</p>
              <p className="text-sm" style={{ color: "var(--text-muted)" }}>{result.descricao}</p>
              {result.tipo === "fixo" && (
                <p className="font-display font-black text-xl mt-1" style={{ color: "var(--lime)" }}>{result.label}</p>
              )}
              {result.tipo === "consultar" && (
                <a
                  href={`${siteConfig.whatsapp.link}?text=${encodeURIComponent(`Olá! Quero saber o frete para ${result.cidade}/${result.uf} (CEP ${cep}).`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-wa inline-block mt-2 text-xs px-3 py-1.5 rounded-lg"
                >
                  Consultar no WhatsApp →
                </a>
              )}
            </div>
          </div>
        </div>
      )}

      {!result && !error && (
        <div className="mt-3 grid grid-cols-3 gap-2 text-center text-xs" style={{ color: "var(--text-soft)" }}>
          {[["Grátis", "Retirada"], ["R$ 7,00", "Cruzeiro do O."], ["R$ 15,00", "Umuarama"]].map(([v, l]) => (
            <div key={l} className="p-2 rounded-lg" style={{ backgroundColor: "var(--surface-el)" }}>
              <p className="font-bold" style={{ color: "var(--text)" }}>{v}</p>
              <p>{l}</p>
            </div>
          ))}
        </div>
      )}

      {error && (
        <div className="mt-3 flex items-center gap-2 text-sm text-red-400">
          <AlertCircle className="w-4 h-4 flex-shrink-0" aria-hidden="true" /> {error}
        </div>
      )}
    </div>
  );
}
