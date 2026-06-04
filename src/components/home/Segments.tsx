import Link from "next/link";
import { ArrowRight } from "lucide-react";

const segments = [
  {
    href: "/segmentos/corporativo",
    icon: "🏢",
    title: "Corporativo e Brindes",
    description:
      "Presenteie clientes, funcionários e parceiros com brindes personalizados com o logo da sua empresa.",
    tags: ["Logo personalizado", "Grandes volumes", "Embalagem especial"],
    bg: "bg-navy-800",
    accent: "text-gold-400",
  },
  {
    href: "/segmentos/casamentos",
    icon: "💍",
    title: "Casamentos",
    description:
      "Lembranças únicas para o dia mais especial. Taças, canecas e kits de padrinhos personalizados.",
    tags: ["Kits padrinhos", "Nomes individuais", "Taças"],
    bg: "bg-rose-900",
    accent: "text-rose-300",
  },
  {
    href: "/segmentos/aniversarios",
    icon: "🎂",
    title: "Aniversários",
    description:
      "Copos e canecas com o tema da sua festa, do infantil ao adulto, prontos para encantar convidados.",
    tags: ["Copos temáticos", "Personalização", "Qualquer tema"],
    bg: "bg-violet-900",
    accent: "text-violet-300",
  },
  {
    href: "/segmentos/formaturas",
    icon: "🎓",
    title: "Formaturas",
    description:
      "Canecas, copos e térmicos com nomes e turma. O presente que a turma vai lembrar sempre.",
    tags: ["Nomes individuais", "Turma completa", "Térmicos a laser"],
    bg: "bg-emerald-900",
    accent: "text-emerald-300",
  },
];

export function Segments() {
  return (
    <section className="py-16 lg:py-24 bg-navy-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-gold-400 text-sm font-semibold uppercase tracking-wider mb-2">
            Para cada ocasião
          </p>
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-white">
            Qual é o seu evento?
          </h2>
          <p className="text-navy-300 mt-3 max-w-xl mx-auto">
            Copos e canecas personalizados para cada momento especial. Encontre o segmento certo para você.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {segments.map((seg) => (
            <Link
              key={seg.href}
              href={seg.href}
              className={`group relative ${seg.bg} rounded-2xl p-7 overflow-hidden hover:scale-[1.02] transition-transform duration-300`}
            >
              {/* Decoração */}
              <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-white/5 pointer-events-none" />

              <span className="text-4xl mb-4 block">{seg.icon}</span>
              <h3 className={`font-display text-2xl font-bold text-white mb-2`}>
                {seg.title}
              </h3>
              <p className="text-white/70 text-sm leading-relaxed mb-4">
                {seg.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {seg.tags.map((tag) => (
                  <span
                    key={tag}
                    className={`text-xs px-2.5 py-1 bg-white/10 ${seg.accent} rounded-full font-medium`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-1.5 text-white font-medium text-sm group-hover:gap-3 transition-all">
                Saiba mais <ArrowRight className="w-4 h-4" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
