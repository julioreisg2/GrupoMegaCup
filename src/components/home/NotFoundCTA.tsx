import { siteConfig } from "@/config/site";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";

export function NotFoundCTA() {
  return (
    <section className="py-14 bg-navy-50 border-t border-navy-100">
      <div className="max-w-2xl mx-auto px-4 text-center">
        <h2 className="font-display text-3xl font-bold text-navy-900 mb-3">
          Não encontrou o que procura?
        </h2>
        <p className="text-navy-600 mb-6">
          Fale diretamente conosco! Temos ainda mais opções e fazemos orçamentos personalizados.
        </p>
        <WhatsAppButton href={siteConfig.whatsapp.link} size="lg">
          Fale Conosco no WhatsApp
        </WhatsAppButton>
      </div>
    </section>
  );
}
