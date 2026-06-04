import { Shield, Zap, Star } from "lucide-react";

const pillars = [
  { icon: Star,   title: "Qualidade premium",        desc: "Materiais selecionados e durabilidade.", accent: "var(--lime)" },
  { icon: Shield, title: "Personalização completa",   desc: "Sua marca do seu jeito.", accent: "var(--cyan)" },
  { icon: Zap,    title: "Entrega rápida e segura",   desc: "Para todo o Brasil com rastreio.", accent: "var(--lime)" },
];

export function TrustSection() {
  return (
    <section className="py-16 lg:py-20" style={{ backgroundColor: "var(--bg)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
          {pillars.map((p) => (
            <div
              key={p.title}
              className="p-6 rounded-2xl border"
              style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                style={{ backgroundColor: "var(--surface-el)", border: `1px solid ${p.accent}44` }}
              >
                <p.icon className="w-6 h-6" style={{ color: p.accent }} aria-hidden="true" />
              </div>
              <h3 className="font-display font-bold text-lg mb-1" style={{ color: "var(--text)" }}>{p.title}</h3>
              <p className="text-sm" style={{ color: "var(--text-muted)" }}>{p.desc}</p>
            </div>
          ))}
        </div>

        {/* Fretes */}
        <div className="p-6 rounded-2xl border" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
          <p className="text-xs font-black uppercase tracking-widest mb-4 text-center" style={{ color: "var(--cyan)" }}>Entrega e Frete</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            {[
              { val: "Grátis", desc: "Retirada em Cruzeiro do Oeste" },
              { val: "R$ 7,00", desc: "Entrega em Cruzeiro do Oeste" },
              { val: "R$ 15,00", desc: "Entrega em Umuarama" },
            ].map((f) => (
              <div key={f.desc}>
                <p className="font-display font-black text-2xl" style={{ color: "var(--lime)" }}>{f.val}</p>
                <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>{f.desc}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-xs mt-4" style={{ color: "var(--text-soft)" }}>
            Outras cidades: consulte o frete pelo WhatsApp informando o CEP.
          </p>
        </div>
      </div>
    </section>
  );
}
