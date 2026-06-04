"use client";

import { useState } from "react";
import { AlertCircle, Check, Loader2, MapPin } from "lucide-react";
import { siteConfig } from "@/config/site";
import type { ClienteCheckout } from "@/lib/types/checkout";

interface ViaCepResponse {
  cep: string;
  localidade: string;
  uf: string;
  erro?: boolean;
}

function calcularFrete(cidade: string, uf: string): number | null {
  const c = cidade.toLowerCase();
  if (c.includes("cruzeiro do oeste")) return siteConfig.entrega.cruzeirodoOeste;
  if (c.includes("umuarama")) return siteConfig.entrega.umuarama;
  return null;
}

interface CheckoutFormProps {
  onSubmit: (cliente: ClienteCheckout, frete: number) => void;
  loading?: boolean;
}

const ESTADOS = ["PR", "SP", "RS", "SC", "MG", "RJ", "BA", "PE", "CE", "PA"];

export function CheckoutForm({ onSubmit, loading = false }: CheckoutFormProps) {
  const [cliente, setCliente] = useState<ClienteCheckout>({
    nomeCompleto: "",
    email: "",
    telefone: "",
    cep: "",
    rua: "",
    numero: "",
    complemento: "",
    cidade: "",
    estado: "PR",
    formaPagamento: "pix",
  });

  const [frete, setFrete] = useState<number | null>(null);
  const [freteLoading, setFreteLoading] = useState(false);
  const [erros, setErros] = useState<Partial<Record<keyof ClienteCheckout, string>>>({});
  const [enviado, setEnviado] = useState(false);

  const handleBuscarFrete = async () => {
    const cepLimpo = cliente.cep.replace(/\D/g, "");
    if (cepLimpo.length !== 8) {
      setErros((prev) => ({ ...prev, cep: "CEP inválido" }));
      return;
    }

    setFreteLoading(true);
    try {
      const res = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
      const data: ViaCepResponse = await res.json();

      if (data.erro) {
        setErros((prev) => ({ ...prev, cep: "CEP não encontrado" }));
        setFreteLoading(false);
        return;
      }

      handleChange("cidade", data.localidade);
      handleChange("estado", data.uf);

      const freteCalculado = calcularFrete(data.localidade, data.uf);
      setFrete(freteCalculado || 0);
      setErros((prev) => ({ ...prev, cep: undefined }));
    } catch {
      setErros((prev) => ({ ...prev, cep: "Erro ao buscar CEP" }));
    }
    setFreteLoading(false);
  };

  const handleChange = (field: keyof ClienteCheckout, value: string) => {
    setCliente((prev) => ({ ...prev, [field]: value }));
    if (erros[field]) {
      setErros((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const formatarTelefone = (value: string): string => {
    const numeros = value.replace(/\D/g, "").slice(0, 11);
    if (numeros.length <= 2) return numeros;
    if (numeros.length <= 7) return `(${numeros.slice(0, 2)}) ${numeros.slice(2)}`;
    return `(${numeros.slice(0, 2)}) ${numeros.slice(2, 7)}-${numeros.slice(7)}`;
  };

  const validar = (): boolean => {
    const novosErros: typeof erros = {};

    if (!cliente.nomeCompleto.trim()) novosErros.nomeCompleto = "Nome obrigatório";
    if (!cliente.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) novosErros.email = "Email inválido";
    if (cliente.telefone.replace(/\D/g, "").length < 11) novosErros.telefone = "Telefone incompleto";
    if (cliente.cep.replace(/\D/g, "").length !== 8) novosErros.cep = "CEP inválido";
    if (!cliente.rua.trim()) novosErros.rua = "Rua obrigatória";
    if (!cliente.numero.trim()) novosErros.numero = "Número obrigatório";
    if (!cliente.cidade.trim()) novosErros.cidade = "Cidade obrigatória";
    if (frete === null) novosErros.cep = "Verifique o CEP para calcular frete";

    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validar() && frete !== null) {
      setEnviado(true);
      onSubmit(cliente, frete);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Dados Pessoais */}
      <div>
        <h3 className="font-bold text-sm mb-3" style={{ color: "var(--text)" }}>
          Dados Pessoais
        </h3>
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-medium mb-1" style={{ color: "var(--text-soft)" }}>
              Nome completo *
            </label>
            <input
              type="text"
              value={cliente.nomeCompleto}
              onChange={(e) => handleChange("nomeCompleto", e.target.value)}
              placeholder="João Silva"
              className="w-full px-3 py-2 rounded-lg border text-sm"
              style={{
                backgroundColor: "var(--surface-el)",
                borderColor: erros.nomeCompleto ? "#ef4444" : "var(--border)",
                color: "var(--text)",
              }}
              disabled={loading}
            />
            {erros.nomeCompleto && (
              <p className="text-xs mt-1 text-red-400">{erros.nomeCompleto}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-medium mb-1" style={{ color: "var(--text-soft)" }}>
              Email *
            </label>
            <input
              type="email"
              value={cliente.email}
              onChange={(e) => handleChange("email", e.target.value)}
              placeholder="joao@email.com"
              className="w-full px-3 py-2 rounded-lg border text-sm"
              style={{
                backgroundColor: "var(--surface-el)",
                borderColor: erros.email ? "#ef4444" : "var(--border)",
                color: "var(--text)",
              }}
              disabled={loading}
            />
            {erros.email && <p className="text-xs mt-1 text-red-400">{erros.email}</p>}
          </div>

          <div>
            <label className="block text-xs font-medium mb-1" style={{ color: "var(--text-soft)" }}>
              Telefone/WhatsApp *
            </label>
            <input
              type="text"
              value={cliente.telefone}
              onChange={(e) => handleChange("telefone", formatarTelefone(e.target.value))}
              placeholder="(44) 99999-9999"
              className="w-full px-3 py-2 rounded-lg border text-sm"
              style={{
                backgroundColor: "var(--surface-el)",
                borderColor: erros.telefone ? "#ef4444" : "var(--border)",
                color: "var(--text)",
              }}
              disabled={loading}
            />
            {erros.telefone && <p className="text-xs mt-1 text-red-400">{erros.telefone}</p>}
          </div>
        </div>
      </div>

      {/* Endereço */}
      <div>
        <h3 className="font-bold text-sm mb-3" style={{ color: "var(--text)" }}>
          Endereço de Entrega
        </h3>
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-medium mb-1" style={{ color: "var(--text-soft)" }}>
              CEP *
            </label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <MapPin
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
                  style={{ color: "var(--text-soft)", transform: "translateY(-50%)" }}
                />
                <input
                  type="text"
                  value={cliente.cep}
                  onChange={(e) => {
                    const cep = e.target.value.replace(/\D/g, "").slice(0, 8);
                    const formatted = cep.length > 5 ? `${cep.slice(0, 5)}-${cep.slice(5)}` : cep;
                    handleChange("cep", formatted);
                  }}
                  placeholder="00000-000"
                  className="w-full pl-9 pr-3 py-2 rounded-lg border text-sm"
                  style={{
                    backgroundColor: "var(--surface-el)",
                    borderColor: erros.cep ? "#ef4444" : "var(--border)",
                    color: "var(--text)",
                  }}
                  disabled={loading || freteLoading}
                />
              </div>
              <button
                type="button"
                onClick={handleBuscarFrete}
                disabled={freteLoading || cliente.cep.length < 9}
                className="px-4 py-2 rounded-lg font-medium text-sm flex items-center gap-2"
                style={{
                  backgroundColor: "var(--cyan)",
                  color: "var(--cyan-dark)",
                  opacity: freteLoading || cliente.cep.length < 9 ? 0.5 : 1,
                  transition: "opacity 0.2s",
                }}
              >
                {freteLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "OK"}
              </button>
            </div>
            {erros.cep && <p className="text-xs mt-1 text-red-400">{erros.cep}</p>}
            {frete !== null && !erros.cep && (
              <p className="text-xs mt-1" style={{ color: "var(--lime)" }}>
                ✓ Frete: R$ {frete.toFixed(2)}
              </p>
            )}
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="block text-xs font-medium mb-1" style={{ color: "var(--text-soft)" }}>
                Rua *
              </label>
              <input
                type="text"
                value={cliente.rua}
                onChange={(e) => handleChange("rua", e.target.value)}
                placeholder="Rua..."
                className="w-full px-3 py-2 rounded-lg border text-sm"
                style={{
                  backgroundColor: "var(--surface-el)",
                  borderColor: erros.rua ? "#ef4444" : "var(--border)",
                  color: "var(--text)",
                }}
                disabled={loading}
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1" style={{ color: "var(--text-soft)" }}>
                Número *
              </label>
              <input
                type="text"
                value={cliente.numero}
                onChange={(e) => handleChange("numero", e.target.value)}
                placeholder="123"
                className="w-full px-3 py-2 rounded-lg border text-sm"
                style={{
                  backgroundColor: "var(--surface-el)",
                  borderColor: erros.numero ? "#ef4444" : "var(--border)",
                  color: "var(--text)",
                }}
                disabled={loading}
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1" style={{ color: "var(--text-soft)" }}>
                Complemento
              </label>
              <input
                type="text"
                value={cliente.complemento || ""}
                onChange={(e) => handleChange("complemento", e.target.value)}
                placeholder="Apto 45"
                className="w-full px-3 py-2 rounded-lg border text-sm"
                style={{
                  backgroundColor: "var(--surface-el)",
                  borderColor: "var(--border)",
                  color: "var(--text)",
                }}
                disabled={loading}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-xs font-medium mb-1" style={{ color: "var(--text-soft)" }}>
                Cidade *
              </label>
              <input
                type="text"
                value={cliente.cidade}
                onChange={(e) => handleChange("cidade", e.target.value)}
                placeholder="Cruzeiro do Oeste"
                className="w-full px-3 py-2 rounded-lg border text-sm"
                style={{
                  backgroundColor: "var(--surface-el)",
                  borderColor: erros.cidade ? "#ef4444" : "var(--border)",
                  color: "var(--text)",
                }}
                disabled={loading}
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1" style={{ color: "var(--text-soft)" }}>
                Estado *
              </label>
              <select
                value={cliente.estado}
                onChange={(e) => handleChange("estado", e.target.value)}
                className="w-full px-3 py-2 rounded-lg border text-sm"
                style={{
                  backgroundColor: "var(--surface-el)",
                  borderColor: "var(--border)",
                  color: "var(--text)",
                }}
                disabled={loading}
              >
                {ESTADOS.map((uf) => (
                  <option key={uf} value={uf}>
                    {uf}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Forma de Pagamento */}
      <div>
        <h3 className="font-bold text-sm mb-3" style={{ color: "var(--text)" }}>
          Forma de Pagamento
        </h3>
        <div className="space-y-2">
          {(["pix", "dinheiro", "cartao"] as const).map((forma) => (
            <label
              key={forma}
              className="flex items-center gap-3 p-2 rounded-lg cursor-pointer transition"
              style={{
                backgroundColor:
                  cliente.formaPagamento === forma ? "rgba(182,255,0,0.08)" : "transparent",
                borderColor: cliente.formaPagamento === forma ? "var(--lime)" : "transparent",
                border: "1px solid",
              }}
            >
              <input
                type="radio"
                value={forma}
                checked={cliente.formaPagamento === forma}
                onChange={(e) => handleChange("formaPagamento", e.target.value)}
                disabled={loading}
                style={{ accentColor: "var(--lime)" }}
              />
              <span style={{ color: "var(--text)", fontSize: "0.875rem" }}>
                {forma === "pix" && "Pix"}
                {forma === "dinheiro" && "Dinheiro (à vista)"}
                {forma === "cartao" && "Cartão (2-5x com +10%)"}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Botão Submit */}
      <button
        type="submit"
        disabled={loading || enviado}
        className="w-full py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition"
        style={{
          backgroundColor: enviado ? "rgba(34,197,94,0.5)" : "var(--lime)",
          color: enviado ? "#fff" : "var(--lime-dark)",
          opacity: loading ? 0.6 : 1,
        }}
      >
        {loading && <Loader2 className="w-4 h-4 animate-spin" />}
        {enviado && <Check className="w-4 h-4" />}
        {enviado ? "Pedido Enviado!" : "Confirmar Pedido"}
      </button>
    </form>
  );
}
