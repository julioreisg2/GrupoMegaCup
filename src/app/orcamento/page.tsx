import type { Metadata } from "next";
import { QuoteCartPage } from "@/components/quote/QuoteCartPage";

export const metadata: Metadata = {
  title: "Meu Orçamento",
  description: "Revise seus produtos selecionados e envie o orçamento pelo WhatsApp.",
};

export default function OrcamentoPage() {
  return <QuoteCartPage />;
}
