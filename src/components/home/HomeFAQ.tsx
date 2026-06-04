"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";

const faqs = [
  {
    q: "Qual é a quantidade mínima para personalização?",
    a: "Depende do produto. Acrílicos geralmente pedem mínimo de 20 unidades por cor. Alguns itens aceitam quantidades menores. Consulte o simulador em cada produto ou nos pergunte pelo WhatsApp.",
  },
  {
    q: "Como envio minha arte para personalização?",
    a: "Após fechar o orçamento pelo WhatsApp, nos envie sua arte em formato PDF, PNG (alta resolução) ou AI. Se não tiver arte, podemos criar junto com você.",
  },
  {
    q: "Qual é o prazo de produção?",
    a: `${siteConfig.producao.prazoLabel}. O prazo começa a contar após confirmação do pagamento e aprovação da arte.`,
  },
  {
    q: "Como funciona o pagamento?",
    a: "Aceitamos Pix, dinheiro e cartão. Para cartão parcelado em 2x a 5x, há acréscimo de 10% sobre o total.",
  },
  {
    q: "Posso colocar nomes individuais em cada peça?",
    a: "Sim, em muitos produtos como copos acrílicos e canecas. Até 10 unidades, nomes podem ser inclusos sem custo. Acima disso, há acréscimo de R$ 1,99/un. Alumínio e porcelana não cobram extra por nome.",
  },
  {
    q: "O que é acabamento degradê e borda?",
    a: "São opções de personalização para produtos acrílicos. Degradê é a coloração gradual no copo (+R$ 1,00/un). Borda é o acabamento especial na borda do copo (+R$ 0,50/un). Podem ser combinados.",
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-navy-100 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-start justify-between gap-4 py-4 text-left hover:text-navy-600 transition-colors"
      >
        <span className="font-medium text-navy-800">{q}</span>
        <ChevronDown
          className={cn(
            "w-5 h-5 text-navy-400 flex-shrink-0 transition-transform duration-200 mt-0.5",
            open && "rotate-180"
          )}
        />
      </button>
      <div
        className={cn(
          "overflow-hidden transition-all duration-200",
          open ? "max-h-48 pb-4" : "max-h-0"
        )}
      >
        <p className="text-navy-600 text-sm leading-relaxed">{a}</p>
      </div>
    </div>
  );
}

export function HomeFAQ() {
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <p className="text-gold-600 text-sm font-semibold uppercase tracking-wider mb-2">
            Dúvidas
          </p>
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-navy-900">
            Perguntas frequentes
          </h2>
        </div>

        <div className="bg-white rounded-2xl border border-navy-100 shadow-sm p-6 divide-y divide-navy-50">
          {faqs.map((faq, i) => (
            <FAQItem key={i} q={faq.q} a={faq.a} />
          ))}
        </div>

        <p className="text-center text-navy-500 text-sm mt-6">
          Não encontrou sua resposta?{" "}
          <a
            href={siteConfig.whatsapp.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-navy-700 font-medium underline hover:text-navy-900"
          >
            Fale conosco pelo WhatsApp
          </a>
        </p>
      </div>
    </section>
  );
}
