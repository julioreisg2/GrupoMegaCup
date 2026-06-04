export type PriceModel =
  | "base_plus_tier_delta"
  | "direct_tier_price"
  | "direct_above_300_only";

export type MaterialType =
  | "acrilico"
  | "aluminio"
  | "porcelana"
  | "vidro"
  | "termico"
  | "diverso"
  | "misto"
  | "a_confirmar";

export type NomeRule =
  | "sem_acrescimo"
  | "gratis_ate_10_depois_199"
  | "sem_cobranca_menos_10"
  | "nao_aplica";

export interface PriceTable {
  base100?: number | null;
  faixa1un?: number | null;
  faixa1a5?: number | null;
  faixa2a5?: number | null;
  faixa6a10?: number | null;
  faixa11a20?: number | null;
  faixa20?: number | null;
  faixa21a30?: number | null;
  faixa30a40?: number | null;
  faixa31a50?: number | null;
  faixa50?: number | null;
  faixa51a99?: number | null;
  faixa60a80?: number | null;
  faixa100?: number | null;
  faixa101a199?: number | null;
  faixa200?: number | null;
  faixa201a299?: number | null;
  faixa300?: number | null;
  acima300?: number | null;
}

export interface ProductRules {
  permiteDegrade: boolean;
  permiteBorda: boolean;
  permiteTransferFrente: boolean;
  permiteTransferFrenteVerso: boolean;
  regraNomes: NomeRule;
  elegivelDescontoVolume: boolean;
  linhaAcqua: boolean;
  pinturaMinima?: number;
}

export interface CatalogProduct {
  id: string;
  slug: string;
  nome: string;
  categoriaMacro: string;
  categoriaDisplay: string;
  subcategoria: string;
  material: MaterialType;
  priceModel: PriceModel;
  priceTable: PriceTable;
  regras: ProductRules;
  observacoes?: string[];
  destaque?: boolean;
  lancamento?: boolean;
  imagem?: string | null;
  galeria?: string[];
  inconsistencias?: string[];
}

export interface PriceOptions {
  quantidade: number;
  degrade?: boolean;
  borda?: boolean;
  transferFrente?: boolean;
  transferFrenteVerso?: boolean;
  nomesIndividuais?: boolean;
  formaPagamento?: "avista" | "cartao";
}

export interface PriceBreakdown {
  precoBase: number;
  acrescimoDegrade: number;
  acrescimoBorda: number;
  acrescimoTransfer: number;
  acrescimoNomes: number;
  descontoVolume: number;
  precoUnitario: number;
  total: number;
  totalComCartao: number;
  acrescimoCartao: number;
  faixaAplicada: string;
  observacoes: string[];
  valido: boolean;
  erros: string[];
}

export interface VolumeDiscount {
  quantidade: number;
  desconto: number;
}
