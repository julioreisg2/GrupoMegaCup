/**
 * Pipeline de importação de catálogo a partir de arquivo XLSX.
 * Execute: npx ts-node src/lib/catalog/import-catalog.ts <caminho-para-planilha.xlsx>
 *
 * Saída: data/catalogo.json + docs/catalogo-validacao.md
 */

import * as path from "path";
import * as fs from "fs";
import { CatalogSchema } from "./schema";
import type { CatalogProduct, MaterialType, PriceModel, NomeRule } from "../pricing/types";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function inferMaterial(nome: string, subcategoria: string): MaterialType {
  const n = nome.toLowerCase();
  const s = subcategoria.toLowerCase();
  if (n.includes("alumin") || s.includes("alumin")) return "aluminio";
  if (n.includes("porcelana") || s.includes("porcelana")) return "porcelana";
  if (n.includes("vidro") || s.includes("vidro")) return "vidro";
  if (n.includes("termico") || n.includes("térmica") || n.includes("thermal") || s.includes("termi")) return "termico";
  if (n.includes("acrilic") || s.includes("acrilic")) return "acrilico";
  return "a_confirmar";
}

function inferPriceModel(row: Record<string, unknown>): PriceModel {
  if (row["acima300"] != null && row["base100"] == null && row["faixa1a5"] == null) {
    return "direct_above_300_only";
  }
  if (row["base100"] != null) return "base_plus_tier_delta";
  return "direct_tier_price";
}

function inferNomeRule(material: MaterialType): NomeRule {
  if (material === "aluminio" || material === "porcelana" || material === "vidro") {
    return "sem_acrescimo";
  }
  if (material === "termico" || material === "diverso") return "nao_aplica";
  return "gratis_ate_10_depois_199";
}

function parseNumber(val: unknown): number | null {
  if (val == null || val === "") return null;
  const n = typeof val === "string" ? parseFloat(val.replace(",", ".")) : Number(val);
  return isNaN(n) ? null : n;
}

interface ImportReport {
  total: number;
  validos: number;
  inconsistencias: Array<{ produto: string; problemas: string[] }>;
}

export async function importarPlanilha(xlsxPath: string): Promise<void> {
  let xlsx: typeof import("xlsx");
  try {
    xlsx = await import("xlsx");
  } catch {
    throw new Error("Pacote 'xlsx' não instalado. Execute: pnpm add xlsx");
  }

  const workbook = xlsx.readFile(xlsxPath);
  const report: ImportReport = { total: 0, validos: 0, inconsistencias: [] };
  const produtos: CatalogProduct[] = [];

  const categoriasMap: Record<string, string> = {
    "Acrílicos, Alumínio e Similares": "acrilicos_aluminio_similares",
    "Porcelana e Vidro": "porcelana_vidro",
    "Itens Diversos": "itens_diversos",
    "Térmicos": "termicos",
  };

  for (const sheetName of workbook.SheetNames) {
    const categoriaMacro = categoriasMap[sheetName];
    if (!categoriaMacro) {
      console.warn(`Aba ignorada: ${sheetName}`);
      continue;
    }

    const ws = workbook.Sheets[sheetName];
    const rows = xlsx.utils.sheet_to_json<Record<string, unknown>>(ws, { defval: null });

    for (const row of rows) {
      const nome = String(row["nome"] ?? row["Produto"] ?? row["PRODUTO"] ?? "").trim();
      if (!nome) continue;

      report.total++;
      const problemas: string[] = [];

      const subcategoria = String(row["subcategoria"] ?? row["Subcategoria"] ?? row["Categoria"] ?? "").trim();
      const material = inferMaterial(nome, subcategoria);
      const priceModel = inferPriceModel(row);

      const priceTable = {
        base100: parseNumber(row["base100"] ?? row["Base 100"] ?? row["BASE 100"]),
        faixa1un: parseNumber(row["faixa1un"] ?? row["1 un"] ?? row["1un"]),
        faixa1a5: parseNumber(row["faixa1a5"] ?? row["1-5"] ?? row["1 a 5"]),
        faixa2a5: parseNumber(row["faixa2a5"] ?? row["2-5"] ?? row["2 a 5"]),
        faixa6a10: parseNumber(row["faixa6a10"] ?? row["6-10"] ?? row["6 a 10"]),
        faixa11a20: parseNumber(row["faixa11a20"] ?? row["11-20"] ?? row["11 a 20"]),
        faixa20: parseNumber(row["faixa20"] ?? row["20"]),
        faixa30a40: parseNumber(row["faixa30a40"] ?? row["30-40"] ?? row["30 a 40"]),
        faixa50: parseNumber(row["faixa50"] ?? row["50"]),
        faixa60a80: parseNumber(row["faixa60a80"] ?? row["60-80"] ?? row["60 a 80"]),
        faixa100: parseNumber(row["faixa100"] ?? row["100"]),
        faixa300: parseNumber(row["faixa300"] ?? row["300"]),
        acima300: parseNumber(row["acima300"] ?? row["Acima 300"] ?? row["+300"]),
      };

      if (priceModel === "base_plus_tier_delta" && priceTable.base100 == null) {
        problemas.push("Campo 'base100' ausente para produto com modelo base_plus_tier_delta.");
      }

      const faixasNulas = Object.entries(priceTable)
        .filter(([k, v]) => v === null && k !== "base100")
        .map(([k]) => k);

      if (faixasNulas.length > 3) {
        problemas.push(`Várias faixas ausentes: ${faixasNulas.join(", ")}.`);
      } else if (faixasNulas.length > 0) {
        problemas.push(`Faixas sem preço: ${faixasNulas.join(", ")}. Consultar via WhatsApp.`);
      }

      if (material === "a_confirmar") {
        problemas.push("Material não identificado automaticamente. Revisar manualmente.");
      }

      const produto: CatalogProduct = {
        id: slugify(nome),
        slug: slugify(nome),
        nome,
        categoriaMacro,
        categoriaDisplay: sheetName,
        subcategoria,
        material,
        priceModel,
        priceTable,
        regras: {
          permiteDegrade: material === "acrilico",
          permiteBorda: material === "acrilico",
          permiteTransferFrente: ["acrilico", "aluminio", "porcelana", "vidro", "diverso"].includes(material),
          permiteTransferFrenteVerso: ["acrilico", "porcelana"].includes(material),
          regraNomes: inferNomeRule(material),
          elegivelDescontoVolume: material === "acrilico",
          linhaAcqua: nome.toLowerCase().includes("acqua") || nome.toLowerCase().includes("acquabio"),
        },
        inconsistencias: problemas.length > 0 ? problemas : undefined,
        imagem: null,
      };

      const parsed = CatalogSchema.element.safeParse(produto);
      if (parsed.success) {
        report.validos++;
        produtos.push(produto);
      } else {
        problemas.push(`Erro de validação Zod: ${parsed.error.message}`);
      }

      if (problemas.length > 0) {
        report.inconsistencias.push({ produto: nome, problemas });
      }
    }
  }

  const outDir = path.resolve(process.cwd(), "data");
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  fs.writeFileSync(path.join(outDir, "catalogo.json"), JSON.stringify(produtos, null, 2), "utf-8");

  const docsDir = path.resolve(process.cwd(), "docs");
  if (!fs.existsSync(docsDir)) fs.mkdirSync(docsDir, { recursive: true });

  const relatorio = gerarRelatorio(report);
  fs.writeFileSync(path.join(docsDir, "catalogo-validacao.md"), relatorio, "utf-8");

  console.log(`\nImportação concluída:`);
  console.log(`  Total de produtos: ${report.total}`);
  console.log(`  Válidos: ${report.validos}`);
  console.log(`  Com inconsistências: ${report.inconsistencias.length}`);
  console.log(`\nArquivos gerados:`);
  console.log(`  data/catalogo.json`);
  console.log(`  docs/catalogo-validacao.md`);
}

function gerarRelatorio(report: ImportReport): string {
  const linhas = [
    "# Relatório de Validação do Catálogo",
    "",
    `**Data de importação:** ${new Date().toLocaleDateString("pt-BR")}`,
    `**Total de produtos:** ${report.total}`,
    `**Produtos válidos:** ${report.validos}`,
    `**Produtos com inconsistências:** ${report.inconsistencias.length}`,
    "",
    "## Inconsistências Encontradas",
    "",
  ];

  if (report.inconsistencias.length === 0) {
    linhas.push("Nenhuma inconsistência encontrada. ✅");
  } else {
    for (const item of report.inconsistencias) {
      linhas.push(`### ${item.produto}`);
      for (const p of item.problemas) {
        linhas.push(`- ⚠️ ${p}`);
      }
      linhas.push("");
    }
  }

  linhas.push("## Regras de Importação", "");
  linhas.push("- Preços ausentes em faixas são marcados como `null` — **nunca** são inventados.");
  linhas.push("- Material inferido automaticamente pelo nome; marcar `a_confirmar` para revisão manual.");
  linhas.push("- Modelo de preço inferido pela presença dos campos `base100` e `acima300`.");

  return linhas.join("\n");
}

if (require.main === module) {
  const xlsxPath = process.argv[2];
  if (!xlsxPath) {
    console.error("Uso: npx ts-node src/lib/catalog/import-catalog.ts <caminho-para-planilha.xlsx>");
    process.exit(1);
  }
  importarPlanilha(xlsxPath).catch(console.error);
}
