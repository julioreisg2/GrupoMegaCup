export const siteConfig = {
  name: "Grupo Mega Cup",
  tagline: "Personalizados para seu evento",
  description:
    "Copos, canecas, taças e garrafas térmicas com qualidade premium e excelente acabamento. Personalizados para casamentos, aniversários, formaturas, eventos corporativos e muito mais.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://grupomegacup.com.br",
  cidade: "Cruzeiro do Oeste/PR",
  cnpj: "35.597.661/0001-20",
  whatsapp: {
    numero: "44997680568",
    get link() {
      return `https://wa.me/55${this.numero}`;
    },
  },
  contato: {
    telefone: "(44) 99768-0568",
    email: "",
    instagram: "",
    facebook: "",
  },
  entrega: {
    retiradaGratis: true,
    cruzeirodoOeste: 7.0,
    umuarama: 15.0,
    outrasCidadesLabel: "Consultar CEP",
  },
  producao: {
    prazoMinDias: 2,
    prazoMaxDias: 5,
    prazoLabel: "2 a 5 dias úteis após confirmação do pagamento",
  },
  pagamento: {
    cartaoAcrescimo: 0.1,
    cartaoParcelasMin: 2,
    cartaoParcelasMax: 5,

    // ─── Gateway de pagamento (futuro) ───────────────────────────────────────
    // Para ativar um gateway, preencha as variáveis de ambiente correspondentes
    // e mude `gateway.ativo` para true.
    //
    // Opções suportadas na v2:
    //   "mercadopago" → instalar @mercadopago/sdk-js
    //   "stripe"      → instalar @stripe/stripe-js + stripe
    //   "pagseguro"   → integração via API REST PagBank
    //
    // Variáveis de ambiente necessárias (adicionar no .env.local e na Vercel):
    //   NEXT_PUBLIC_MP_PUBLIC_KEY   → MercadoPago public key
    //   MP_ACCESS_TOKEN             → MercadoPago server-side token
    //   NEXT_PUBLIC_STRIPE_PK       → Stripe publishable key
    //   STRIPE_SECRET_KEY           → Stripe secret key
    //
    gateway: {
      ativo: false,
      provider: null as "mercadopago" | "stripe" | "pagseguro" | null,
      modoTeste: true,
    },
  },
  proofSocial: {
    habilitado: true,
    clientes: 500,
    produtos: 80,
    anosDeOperacao: 5,
  },
  promocao: {
    ativa: true,
    texto: "PROMOÇÃO DE LANÇAMENTO — ATÉ 30% OFF",
    destaque: "",
  },
  metadata: {
    keywords: [
      "copos personalizados",
      "canecas personalizadas",
      "brindes corporativos",
      "copos para festa",
      "caneca com nome",
      "térmicos personalizados",
      "Cruzeiro do Oeste",
      "personalização de copos",
    ],
    ogImage: "/og-image.jpg",
  },
} as const;

export type SiteConfig = typeof siteConfig;
