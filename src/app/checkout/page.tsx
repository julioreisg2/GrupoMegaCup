import type { Metadata } from "next";
import { CheckoutClient } from "@/components/checkout/CheckoutClient";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Finalize seu pedido e confirme os dados de entrega.",
};

export default function CheckoutPage() {
  return <CheckoutClient />;
}
