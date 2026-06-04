export interface ClienteCheckout {
  nomeCompleto: string;
  email: string;
  telefone: string;
  cep: string;
  rua: string;
  numero: string;
  complemento?: string;
  cidade: string;
  estado: string;
  formaPagamento: "pix" | "dinheiro" | "cartao";
}

export interface EnderecoCalculado {
  cep: string;
  cidade: string;
  estado: string;
  erro?: string;
}

export interface ResumoCheckout {
  subtotal: number;
  frete: number;
  total: number;
  formaPagamento: string;
}
