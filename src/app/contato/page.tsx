import type { Metadata } from "next";
import { MapPin, Clock, MessageSquare } from "lucide-react";
import { siteConfig } from "@/config/site";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";

export const metadata: Metadata = {
  title: "Contato",
  description: `Entre em contato com ${siteConfig.name}. Atendimento pelo WhatsApp em ${siteConfig.cidade}.`,
};

export default function ContatoPage() {
  return (
    <div className="min-h-screen bg-cream">
      <div className="bg-navy-900 text-white py-10 px-4">
        <div className="max-w-4xl mx-auto">
          <p className="text-navy-300 text-sm mb-2">
            <a href="/" className="hover:text-white transition-colors">Início</a> / Contato
          </p>
          <h1 className="font-display text-4xl font-bold">Contato</h1>
          <p className="text-navy-300 mt-2">Fale conosco para tirar dúvidas ou solicitar orçamento.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Contact Info Cards */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-3xl border-2 border-green-300 p-8 hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center">
                  <MessageSquare className="w-8 h-8 text-green-600" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-navy-900">WhatsApp</h3>
                  <p className="text-sm text-navy-600">Resposta em minutos</p>
                </div>
              </div>
              <p className="text-navy-700 mb-6">Canal principal de atendimento. Segunda a sábado, resposta garantida em poucas horas.</p>
              <WhatsAppButton href={siteConfig.whatsapp.link} size="md" className="w-full justify-center">
                Iniciar conversa
              </WhatsAppButton>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-3xl border-2 border-blue-300 p-8">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center">
                  <MapPin className="w-8 h-8 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-navy-900">Localização</h3>
                  <p className="text-sm text-navy-600">{siteConfig.cidade}</p>
                </div>
              </div>
              <ul className="space-y-2 text-navy-700">
                <li className="flex gap-2"><span>✓</span> Retirada grátis</li>
                <li className="flex gap-2"><span>✓</span> Entrega local: R$ 7,00</li>
                <li className="flex gap-2"><span>✓</span> Enviamos para todo Brasil</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-3xl border-2 border-amber-300 p-8">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center">
                  <Clock className="w-8 h-8 text-amber-600" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-navy-900">Prazo de Produção</h3>
                  <p className="text-sm text-navy-600">{siteConfig.producao.prazoLabel}</p>
                </div>
              </div>
              <p className="text-navy-700">Produção rápida, sem comprometer a qualidade. Prazos respeitados sempre.</p>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="bg-gradient-to-br from-navy-900 to-navy-800 rounded-3xl p-10 text-white">
            <h2 className="font-display text-3xl font-bold mb-8">Dúvidas frequentes</h2>
            <div className="space-y-6">
              {[
                { q: "Qual o pedido mínimo?", a: "Acrílicos: 20 un/cor. Outros produtos têm minimums variáveis. Consulte." },
                { q: "Aceitam cartão?", a: "Sim! Pix, dinheiro ou cartão 2x–5x (com acréscimo de 10%)." },
                { q: "Vocês criam a arte?", a: "Sim! Se não tiver arte pronta, criamos junto com você." },
                { q: "Entrega fora da cidade?", a: "Sim. Umuarama: R$ 15. Outras cidades: consulte o CEP." },
              ].map((item, i) => (
                <div key={i} className="border-b border-navy-700 pb-4 last:border-0">
                  <p className="font-bold text-lime-400 text-sm mb-2">{item.q}</p>
                  <p className="text-navy-200">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Banner */}
        <div className="bg-gradient-to-r from-lime-400 to-green-400 rounded-3xl p-12 text-center text-navy-900">
          <h2 className="font-display text-3xl font-bold mb-3">Não encontrou sua resposta?</h2>
          <p className="text-lg mb-8 opacity-90">Fale conosco direto! Adoramos conversar com nossos clientes.</p>
          <WhatsAppButton href={siteConfig.whatsapp.link} size="lg" className="bg-navy-900 text-white hover:bg-navy-800 font-bold">
            Conversar com a gente agora
          </WhatsAppButton>
        </div>
      </div>
    </div>
  );
}
