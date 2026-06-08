"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
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
    a: "Sim, em muitos produtos como copos acrílicos e canecas. Até 10 unidades, nomes podem ser inclusos sem custo. Acima disso, há acréscimo de R$ 1,99/un.",
  },
  {
    q: "O que é acabamento degradê e borda?",
    a: "São opções de personalização para produtos acrílicos. Degradê é a coloração gradual no copo (+R$ 1,00/un). Borda é o acabamento especial na borda do copo (+R$ 0,50/un).",
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: "1px solid var(--border)" }}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-start justify-between gap-4 py-4 text-left transition-colors"
        style={{ color: "var(--text)" }}
      >
        <span className="font-medium text-sm sm:text-base">{q}</span>
        <ChevronDown
          className="w-5 h-5 flex-shrink-0 transition-transform duration-200 mt-0.5"
          style={{
            color: "var(--text-soft)",
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
          }}
        />
      </button>
      <div
        className="overflow-hidden transition-all duration-200"
        style={{ maxHeight: open ? "200px" : "0", paddingBottom: open ? "16px" : "0" }}
      >
        <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>{a}</p>
      </div>
    </div>
  );
}

export function HomeFAQ() {
  return (
    <section className="py-16 lg:py-24" style={{ backgroundColor: "var(--bg-soft)" }}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <p className="text-sm font-bold uppercase tracking-wider mb-2" style={{ color: "var(--cyan)" }}>
            Dúvidas
          </p>
          <h2 className="font-display text-4xl lg:text-5xl font-bold" style={{ color: "var(--text)" }}>
            Perguntas frequentes
          </h2>
        </div>

        <div
          className="rounded-2xl p-6"
          style={{ backgroundColor: "var(--surface)", border: "1px solid var(--border)" }}
        >
          {faqs.map((faq, i) => (
            <FAQItem key={i} q={faq.q} a={faq.a} />
          ))}
        </div>

        <p className="text-center text-sm mt-6" style={{ color: "var(--text-soft)" }}>
          Não encontrou sua resposta?{" "}
          <a
            href={siteConfig.whatsapp.link}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium underline transition-opacity hover:opacity-70"
            style={{ color: "var(--lime)" }}
          >
            Fale conosco pelo WhatsApp
          </a>
        </p>
      </div>
    </section>
  );
}
