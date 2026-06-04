import type { Metadata } from "next";
import Link from "next/link";
import { getCatalog } from "@/lib/catalog/get-catalog";
import { ProductCard } from "@/components/catalog/ProductCard";
import { siteConfig } from "@/config/site";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Lembranças para Casamentos",
  description: "Taças, canecas e kits de padrinhos personalizados para casamentos e bodas. Nomes individuais e embalagens especiais.",
};

export default function CasamentosPage() {
  const produtos = getCatalog()
    .filter((p) => ["vidro", "porcelana", "acrilico"].includes(p.material) || p.subcategoria.toLowerCase().includes("padrinho"))
    .slice(0, 8);

  return (
    <div className="min-h-screen">
      <div className="bg-rose-900 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-4xl block mb-4">💍</span>
          <p className="text-rose-300 text-sm font-semibold uppercase tracking-wider mb-3">Segmento</p>
          <h1 className="font-display text-5xl font-bold mb-4">Casamentos</h1>
          <p className="text-rose-200 text-lg max-w-2xl mx-auto mb-8">
            Lembranças únicas para o dia mais especial. Taças, canecas e kits de padrinhos com o nome
            de cada convidado. Produção personalizada para o grande dia.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/catalogo" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-rose-900 font-semibold rounded-xl hover:bg-rose-50 transition-colors">
              Ver catálogo <ArrowRight className="w-4 h-4" />
            </Link>
            <WhatsAppButton href={siteConfig.whatsapp.link} size="md">Solicitar orçamento</WhatsAppButton>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="font-display text-3xl font-bold text-navy-900 mb-6">Produtos para Casamentos</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {produtos.map((p) => <ProductCard key={p.id} produto={p} />)}
        </div>
        <div className="mt-8 text-center">
          <Link href="/catalogo" className="inline-flex items-center gap-2 px-6 py-3 border-2 border-navy-600 text-navy-600 font-semibold rounded-xl hover:bg-navy-50 transition-colors">
            Ver catálogo completo <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
