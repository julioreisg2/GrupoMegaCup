import { siteConfig } from "@/config/site";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";

export function NotFoundCTA() {
  return (
    <section
      className="py-14 border-t"
      style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}
    >
      <div className="max-w-2xl mx-auto px-4 text-center">
        <h2 className="font-display text-3xl font-bold mb-3" style={{ color: "var(--text)" }}>
          Não encontrou o que procura?
        </h2>
        <p className="mb-6" style={{ color: "var(--text-muted)" }}>
          Fale diretamente conosco! Temos ainda mais opções e fazemos orçamentos personalizados.
        </p>
        <WhatsAppButton href={siteConfig.whatsapp.link} size="lg">
          Fale Conosco no WhatsApp
        </WhatsAppButton>
      </div>
    </section>
  );
}
