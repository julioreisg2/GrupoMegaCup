import catalogData from "../../../data/catalogo.json";
import type { CatalogProduct } from "../pricing/types";
import { CatalogSchema } from "./schema";

let _cached: CatalogProduct[] | null = null;

export function getCatalog(): CatalogProduct[] {
  if (_cached) return _cached;
  const parsed = CatalogSchema.safeParse(catalogData);
  if (!parsed.success) {
    console.error("Erro ao validar catálogo:", parsed.error.flatten());
    return catalogData as CatalogProduct[];
  }
  _cached = parsed.data as CatalogProduct[];
  return _cached;
}

export function getProductBySlug(slug: string): CatalogProduct | null {
  return getCatalog().find((p) => p.slug === slug) ?? null;
}

export function getDestacados(): CatalogProduct[] {
  return getCatalog().filter((p) => p.destaque);
}

export function getLancamentos(): CatalogProduct[] {
  return getCatalog().filter((p) => p.lancamento);
}

export function getCategoriasUnicas(): Array<{ macro: string; display: string }> {
  const map = new Map<string, string>();
  for (const p of getCatalog()) {
    if (!map.has(p.categoriaMacro)) map.set(p.categoriaMacro, p.categoriaDisplay);
  }
  return Array.from(map.entries()).map(([macro, display]) => ({ macro, display }));
}

export function getSubcategoriasUnicas(): string[] {
  return [...new Set(getCatalog().map((p) => p.subcategoria))].sort();
}

export function filterCatalog(params: {
  q?: string;
  categoria?: string;
  subcategoria?: string;
  material?: string;
}): CatalogProduct[] {
  let result = getCatalog();

  if (params.q) {
    const q = params.q.toLowerCase();
    result = result.filter(
      (p) =>
        p.nome.toLowerCase().includes(q) ||
        p.subcategoria.toLowerCase().includes(q) ||
        p.categoriaDisplay.toLowerCase().includes(q)
    );
  }

  if (params.categoria) {
    result = result.filter((p) => p.categoriaMacro === params.categoria);
  }

  if (params.subcategoria) {
    result = result.filter((p) => p.subcategoria === params.subcategoria);
  }

  if (params.material) {
    result = result.filter((p) => p.material === params.material);
  }

  return result;
}
