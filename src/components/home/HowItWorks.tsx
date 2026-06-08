"use client";

import { MessageSquare, Palette, Package, Truck } from "lucide-react";

const steps = [
  {
    icon: MessageSquare,
    number: "01",
    title: "Escolha o produto",
    description: "Navegue pelo catálogo, simule o preço com as opções que desejar e adicione ao orçamento.",
  },
  {
    icon: Palette,
    number: "02",
    title: "Envie sua arte",
    description: "Nos envie sua logo ou arte pelo WhatsApp. Criamos junto com você se precisar.",
  },
  {
    icon: Package,
    number: "03",
    title: "Produção em 2–5 dias",
    description: "Confirmado o pedido, produzimos com qualidade em até 5 dias úteis.",
  },
  {
    icon: Truck,
    number: "04",
    title: "Retire ou receba",
    description: "Retire grátis em Cruzeiro do Oeste ou solicite entrega. Outras cidades: consulte o frete.",
  },
];

export function HowItWorks() {
  return (
    <section className="py-16 lg:py-24" style={{ backgroundColor: "var(--surface)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-sm font-bold uppercase tracking-widest mb-3" style={{ color: "var(--lime)" }}>
            Simples assim
          </p>
          <h2 className="font-display text-4xl lg:text-5xl font-bold" style={{ color: "var(--text)" }}>
            Como funciona
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <div
              key={i}
              className="relative p-7 rounded-3xl group transition-all duration-300"
              style={{
                backgroundColor: "var(--surface-el)",
                border: "1px solid var(--border)",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--lime)")}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
            >
              {/* Número */}
              <div
                className="absolute -top-4 -right-4 w-10 h-10 rounded-full flex items-center justify-center shadow-lg"
                style={{ backgroundColor: "var(--lime)" }}
              >
                <span className="text-sm font-black" style={{ color: "var(--lime-dark)" }}>{step.number}</span>
              </div>

              {/* Ícone */}
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5"
                style={{ backgroundColor: "rgba(182,255,0,0.08)", border: "1px solid rgba(182,255,0,0.15)" }}
              >
                <step.icon className="w-7 h-7" style={{ color: "var(--lime)" }} />
              </div>

              <h3 className="font-bold text-lg mb-3" style={{ color: "var(--text)" }}>{step.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>{step.description}</p>

              {/* Linha conectora */}
              {i < steps.length - 1 && (
                <div
                  className="hidden lg:block absolute top-12 -right-4 w-8 h-0.5 z-10"
                  style={{ background: "linear-gradient(to right, var(--lime), transparent)" }}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
