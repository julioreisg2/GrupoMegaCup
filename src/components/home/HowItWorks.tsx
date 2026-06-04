import { MessageSquare, Palette, Package, Truck } from "lucide-react";

const steps = [
  {
    icon: MessageSquare,
    number: "01",
    title: "Escolha o produto",
    description:
      "Navegue pelo catálogo, simule o preço com as opções que desejar e adicione ao orçamento.",
  },
  {
    icon: Palette,
    number: "02",
    title: "Envie sua arte",
    description:
      "Nos envie sua logo ou arte pelo WhatsApp. Criamos junto com você se precisar.",
  },
  {
    icon: Package,
    number: "03",
    title: "Produção em 2–5 dias",
    description:
      "Confirmado o pedido, produzimos com qualidade em até 5 dias úteis.",
  },
  {
    icon: Truck,
    number: "04",
    title: "Retire ou receba",
    description:
      "Retire grátis em Cruzeiro do Oeste ou solicite entrega. Outras cidades: consulte o frete.",
  },
];

export function HowItWorks() {
  return (
    <section className="py-16 lg:py-24 bg-gradient-to-b from-navy-900 to-navy-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-lime-400 text-sm font-bold uppercase tracking-widest mb-3">
            Simples assim
          </p>
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-white">
            Como funciona
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <div
              key={i}
              className="relative p-7 bg-gradient-to-br from-navy-700 to-navy-800 rounded-3xl border border-navy-600 hover:border-lime-400 transition-all duration-300 group"
            >
              {/* Número destacado */}
              <div className="absolute -top-4 -right-4 w-10 h-10 bg-lime-400 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <span className="text-navy-900 text-sm font-black">{step.number}</span>
              </div>

              {/* Ícone */}
              <div className="w-14 h-14 bg-lime-400/10 rounded-2xl flex items-center justify-center mb-5 group-hover:bg-lime-400/20 transition-colors">
                <step.icon className="w-7 h-7 text-lime-400" />
              </div>

              <h3 className="font-bold text-white text-lg mb-3">{step.title}</h3>
              <p className="text-navy-200 text-sm leading-relaxed">{step.description}</p>

              {/* Linha conectora */}
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 -right-4 w-8 h-1 bg-gradient-to-r from-lime-400 to-transparent z-10" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
