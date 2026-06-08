import Link from "next/link";
import { ArrowRight } from "lucide-react";

const segments = [
  {
    href: "/segmentos/corporativo",
    icon: "🏢",
    title: "Corporativo e Brindes",
    description: "Presenteie clientes, funcionários e parceiros com brindes personalizados com o logo da sua empresa.",
    tags: ["Logo personalizado", "Grandes volumes", "Embalagem especial"],
    bg: "linear-gradient(135deg, #0B1220 0%, #1a3a6a 100%)",
    accent: "var(--cyan)",
  },
  {
    href: "/segmentos/casamentos",
    icon: "💍",
    title: "Casamentos",
    description: "Lembranças únicas para o dia mais especial. Taças, canecas e kits de padrinhos personalizados.",
    tags: ["Kits padrinhos", "Nomes individuais", "Taças"],
    bg: "linear-gradient(135deg, #1a0a1e 0%, #4a1a5a 100%)",
    accent: "#d4a0f0",
  },
  {
    href: "/segmentos/aniversarios",
    icon: "🎂",
    title: "Aniversários",
    description: "Copos e canecas com o tema da sua festa, do infantil ao adulto, prontos para encantar convidados.",
    tags: ["Copos temáticos", "Personalização", "Qualquer tema"],
    bg: "linear-gradient(135deg, #1a0e3a 0%, #3b1e6a 100%)",
    accent: "var(--lime)",
  },
  {
    href: "/segmentos/formaturas",
    icon: "🎓",
    title: "Formaturas",
    description: "Canecas, copos e térmicos com nomes e turma. O presente que a turma vai lembrar sempre.",
    tags: ["Nomes individuais", "Turma completa", "Térmicos a laser"],
    bg: "linear-gradient(135deg, #062a1e 0%, #0e4a35 100%)",
    accent: "#4ade80",
  },
];

export function Segments() {
  return (
    <section className="py-16 lg:py-24" style={{ backgroundColor: "var(--bg)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold uppercase tracking-wider mb-2" style={{ color: "var(--lime)" }}>
            Para cada ocasião
          </p>
          <h2 className="font-display text-4xl lg:text-5xl font-bold" style={{ color: "var(--text)" }}>
            Qual é o seu evento?
          </h2>
          <p className="mt-3 max-w-xl mx-auto" style={{ color: "var(--text-muted)" }}>
            Copos e canecas personalizados para cada momento especial.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {segments.map((seg) => (
            <Link
              key={seg.href}
              href={seg.href}
              className="group relative rounded-2xl p-7 overflow-hidden transition-transform duration-300 hover:scale-[1.02]"
              style={{ background: seg.bg, border: "1px solid var(--border)" }}
            >
              <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full pointer-events-none" style={{ backgroundColor: "rgba(255,255,255,0.04)" }} />

              <span className="text-4xl mb-4 block">{seg.icon}</span>
              <h3 className="font-display text-2xl font-bold mb-2" style={{ color: "var(--text)" }}>
                {seg.title}
              </h3>
              <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
                {seg.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {seg.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2.5 py-1 rounded-full font-medium"
                    style={{ backgroundColor: "rgba(255,255,255,0.08)", color: seg.accent }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-1.5 font-medium text-sm group-hover:gap-3 transition-all" style={{ color: "var(--text)" }}>
                Saiba mais <ArrowRight className="w-4 h-4" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
