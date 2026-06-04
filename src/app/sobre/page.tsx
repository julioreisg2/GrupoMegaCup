import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Sobre nós",
  description: `Conheça a ${siteConfig.name}, especializada em copos, canecas e térmicos personalizados em ${siteConfig.cidade}.`,
};

export default function SobrePage() {
  return (
    <div className="min-h-screen bg-cream">
      <div className="bg-navy-900 text-white py-10 px-4">
        <div className="max-w-4xl mx-auto">
          <p className="text-navy-300 text-sm mb-2">
            <Link href="/" className="hover:text-white transition-colors">Início</Link> / Sobre nós
          </p>
          <h1 className="font-display text-4xl font-bold">Sobre a Grupo Mega Cup</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16 space-y-20">
        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-display text-4xl font-bold text-navy-900 mb-6">Nossa história</h2>
            <div className="space-y-4 text-navy-600 leading-relaxed">
              <p>A <strong className="text-navy-800">Grupo Mega Cup</strong> nasceu com uma visão clara: transformar momentos especiais em memórias duradouras através de produtos personalizados de qualidade excepcional.</p>
              <p>Começamos em Cruzeiro do Oeste/PR focando em copos e canecas. Hoje, com mais de 140 produtos em catálogo, atendemos empresas, casamentos, aniversários e formaturas em toda a região.</p>
              <p>Cada produto que sai de nossas mãos leva uma promessa: qualidade, precisão e comprometimento com seu sucesso.</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6">
            {[
              { number: "140+", label: "Produtos" },
              { number: "5K+", label: "Clientes" },
              { number: "2-5", label: "Dias de prazo" },
              { number: "24h", label: "Resposta WhatsApp" }
            ].map((stat, i) => (
              <div key={i} className="bg-gradient-to-br from-lime-50 to-lime-100 rounded-2xl p-6 text-center border border-lime-200">
                <div className="font-display text-3xl font-bold text-lime-600 mb-2">{stat.number}</div>
                <div className="text-sm text-navy-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gradient-to-br from-navy-800 to-navy-900 text-white rounded-3xl p-10 border border-navy-700">
            <h3 className="font-display text-3xl font-bold mb-4">Nossa missão</h3>
            <p className="text-navy-200 text-lg leading-relaxed">
              Tornar cada evento especial e cada presente memorável, oferecendo produtos personalizados de qualidade premium com atendimento próximo, prazo confiável e transparência total.
            </p>
          </div>

          <div className="space-y-4">
            {[
              { icon: "⭐", title: "Qualidade que impressiona", desc: "Acabamento impecável em cada peça" },
              { icon: "🎯", title: "Personalização autêntica", desc: "Sua marca, sua história" },
              { icon: "💳", title: "Preços transparentes", desc: "Sem surpresas, sem taxas escondidas" },
              { icon: "⏱️", title: "Prazo que respeitamos", desc: "2-5 dias úteis, sempre" }
            ].map((value, i) => (
              <div key={i} className="bg-white border border-navy-100 rounded-2xl p-5 flex gap-4 hover:border-lime-400 hover:shadow-lg transition-all">
                <span className="text-3xl">{value.icon}</span>
                <div>
                  <h4 className="font-bold text-navy-900">{value.title}</h4>
                  <p className="text-sm text-navy-500">{value.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-lime-400 to-lime-500 rounded-3xl p-12 text-center text-navy-900">
          <h3 className="font-display text-3xl font-bold mb-3">Pronto para criar algo especial?</h3>
          <p className="text-lg mb-8 opacity-90">Explore nosso catálogo ou converse conosco para descobrir as possibilidades infinitas.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/catalogo" className="inline-flex items-center gap-2 px-8 py-3 bg-navy-900 text-white font-bold rounded-xl hover:bg-navy-800 transition-all">
              Ver catálogo completo <ArrowRight className="w-4 h-4" />
            </Link>
            <WhatsAppButton href={siteConfig.whatsapp.link} size="md" className="bg-white text-lime-600 hover:bg-gray-100">
              Conversar agora
            </WhatsAppButton>
          </div>
        </div>
      </div>
    </div>
  );
}
