import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { siteConfig } from "@/config/site";

const mockups = [
  { emoji: "🥤", label: "Long Drink", grad: "card-img-acrilico", delay: "0s", dur: "3.8s" },
  { emoji: "☕", label: "Porcelana",  grad: "card-img-porcelana", delay: "0.5s", dur: "4.2s" },
  { emoji: "🫗", label: "Térmico",   grad: "card-img-termico",   delay: "0.25s", dur: "3.6s" },
  { emoji: "🍷", label: "Taça Vidro", grad: "card-img-vidro",    delay: "0.75s", dur: "4.5s" },
];

export function Hero() {
  return (
    <section
      className="relative overflow-hidden"
      style={{ backgroundColor: "var(--bg)" }}
    >
      {/* Radial glows de fundo — leves, não intrusivos */}
      <div
        className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(0,213,255,0.06) 0%, transparent 65%)",
          transform: "translate(-30%, -30%)",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(182,255,0,0.05) 0%, transparent 65%)",
          transform: "translate(30%, 30%)",
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20 lg:pt-24 lg:pb-28">
        <div className="grid lg:grid-cols-[1fr_420px] gap-10 lg:gap-16 items-center">

          {/* ── Conteúdo ── */}
          <div>
            {/* H1: 40px mobile → 72px desktop */}
            <h1
              className="font-display font-black text-[2.5rem] sm:text-[3.5rem] lg:text-[4.5rem] leading-[0.95] tracking-tight mb-6 animate-fade-up"
              style={{ color: "var(--text)" }}
            >
              <span style={{ color: "var(--text)" }}>Produtos </span>
              <span style={{ color: "var(--cyan)" }}>personalizados</span>
              <span
                className="block mt-1"
                style={{
                  color: "var(--text)",
                  borderBottom: "3px solid var(--lime)",
                  display: "inline-block",
                  paddingBottom: "2px",
                }}
              >
                para sua marca
              </span>
            </h1>

            <p
              className="text-base sm:text-lg leading-relaxed mb-3 max-w-lg animate-fade-up animate-delay-100"
              style={{ color: "var(--text-muted)" }}
            >
              Copos, canecas, taças e garrafas térmicas com{" "}
              <strong style={{ color: "var(--text)", fontWeight: 600 }}>qualidade premium</strong>{" "}
              e excelente acabamento.
            </p>
            <p
              className="text-sm sm:text-base mb-10 max-w-lg animate-fade-up animate-delay-200"
              style={{ color: "var(--text-soft)" }}
            >
              Escolha seus produtos, defina a quantidade e receba o orçamento pelo WhatsApp.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 mb-12 animate-fade-up animate-delay-300">
              <Link
                href="/catalogo"
                className="btn-lime inline-flex items-center gap-2 px-7 py-4 min-h-[52px] rounded-2xl text-base"
              >
                Ver catálogo
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
              <Link
                href={siteConfig.whatsapp.link}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline inline-flex items-center gap-2 px-7 py-4 min-h-[52px] rounded-2xl text-base"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Falar com atendimento
              </Link>
            </div>

            {/* Stats */}
            {siteConfig.proofSocial.habilitado && (
              <div
                className="flex flex-wrap gap-6 sm:gap-10 pt-8 border-t animate-fade-up animate-delay-400"
                style={{ borderColor: "var(--border)" }}
              >
                {[
                  { val: `${siteConfig.proofSocial.clientes}+`, label: "Clientes atendidos", color: "var(--cyan)" },
                  { val: `${siteConfig.proofSocial.produtos}+`, label: "Produtos no catálogo", color: "var(--lime)" },
                  { val: `${siteConfig.proofSocial.anosDeOperacao} anos`, label: "De experiência", color: "var(--text)" },
                ].map((s) => (
                  <div key={s.label}>
                    <p className="font-display font-black text-3xl" style={{ color: s.color }}>{s.val}</p>
                    <p className="text-sm mt-0.5" style={{ color: "var(--text-soft)" }}>{s.label}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ── Mockups flutuantes ── */}
          <div className="hidden lg:block" aria-hidden="true">
            <div className="grid grid-cols-2 gap-3 h-[380px]">
              {mockups.map((m) => (
                <div
                  key={m.label}
                  className={`animate-float rounded-2xl ${m.grad} flex flex-col items-center justify-center gap-3 border`}
                  style={{
                    borderColor: "var(--border)",
                    animationDelay: m.delay,
                    animationDuration: m.dur,
                    boxShadow: "var(--shadow-md)",
                  }}
                >
                  <span className="text-5xl drop-shadow">{m.emoji}</span>
                  <span
                    className="text-xs font-bold px-3 py-1.5 rounded-full"
                    style={{
                      backgroundColor: "rgba(255,255,255,0.06)",
                      color: "var(--text-muted)",
                      border: "1px solid var(--border)",
                    }}
                  >
                    {m.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Badge flutuante */}
            <div
              className="mt-3 mx-auto w-fit px-5 py-3 rounded-2xl border text-center animate-fade-in animate-delay-500"
              style={{
                backgroundColor: "var(--surface-el)",
                borderColor: "var(--lime)",
                boxShadow: "var(--shadow-lime)",
              }}
            >
              <p className="text-xs font-bold uppercase tracking-wider" style={{ color: "var(--lime)" }}>
                Orçamento em minutos
              </p>
              <p className="text-xs mt-0.5" style={{ color: "var(--text-soft)" }}>via WhatsApp</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
