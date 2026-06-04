import { z } from "zod";

export const PriceModelSchema = z.enum([
  "base_plus_tier_delta",
  "direct_tier_price",
  "direct_above_300_only",
]);

export const MaterialTypeSchema = z.enum([
  "acrilico",
  "aluminio",
  "porcelana",
  "vidro",
  "termico",
  "diverso",
  "misto",
  "a_confirmar",
]);

export const NomeRuleSchema = z.enum([
  "sem_acrescimo",
  "gratis_ate_10_depois_199",
  "sem_cobranca_menos_10",
  "nao_aplica",
]);

export const PriceTableSchema = z.object({
  base100: z.number().nullable().optional(),
  faixa1un: z.number().nullable().optional(),
  faixa1a5: z.number().nullable().optional(),
  faixa2a5: z.number().nullable().optional(),
  faixa6a10: z.number().nullable().optional(),
  faixa11a20: z.number().nullable().optional(),
  faixa20: z.number().nullable().optional(),
  faixa21a30: z.number().nullable().optional(),
  faixa30a40: z.number().nullable().optional(),
  faixa31a50: z.number().nullable().optional(),
  faixa50: z.number().nullable().optional(),
  faixa51a99: z.number().nullable().optional(),
  faixa60a80: z.number().nullable().optional(),
  faixa100: z.number().nullable().optional(),
  faixa101a199: z.number().nullable().optional(),
  faixa200: z.number().nullable().optional(),
  faixa201a299: z.number().nullable().optional(),
  faixa300: z.number().nullable().optional(),
  acima300: z.number().nullable().optional(),
});

export const ProductRulesSchema = z.object({
  permiteDegrade: z.boolean(),
  permiteBorda: z.boolean(),
  permiteTransferFrente: z.boolean(),
  permiteTransferFrenteVerso: z.boolean(),
  regraNomes: NomeRuleSchema,
  elegivelDescontoVolume: z.boolean(),
  linhaAcqua: z.boolean(),
  pinturaMinima: z.number().optional(),
});

export const CatalogProductSchema = z.object({
  id: z.string(),
  slug: z.string(),
  nome: z.string(),
  categoriaMacro: z.string(),
  categoriaDisplay: z.string(),
  subcategoria: z.string(),
  material: MaterialTypeSchema,
  priceModel: PriceModelSchema,
  priceTable: PriceTableSchema,
  regras: ProductRulesSchema,
  observacoes: z.array(z.string()).optional(),
  destaque: z.boolean().optional(),
  lancamento: z.boolean().optional(),
  imagem: z.string().nullable().optional(),
  galeria: z.array(z.string()).optional(),
  inconsistencias: z.array(z.string()).optional(),
});

export const CatalogSchema = z.array(CatalogProductSchema);

export type CatalogProductInput = z.input<typeof CatalogProductSchema>;
export type CatalogProductOutput = z.output<typeof CatalogProductSchema>;
