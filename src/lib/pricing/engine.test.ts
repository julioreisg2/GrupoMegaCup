/**
 * Testes do motor de preços — Grupo Mega Cup
 *
 * Execute: pnpm test
 * (requer configuração do Jest ou Vitest — veja package.json)
 */

import { calcularPreco } from "./engine";
import type { CatalogProduct } from "./types";

const longDrink330: CatalogProduct = {
  id: "longdrink-330ml",
  slug: "long-drink-330ml",
  nome: "Copo Long Drink 330ml",
  categoriaMacro: "acrilicos_aluminio_similares",
  categoriaDisplay: "Acrílicos e Similares",
  subcategoria: "Copos Long Drink",
  material: "acrilico",
  priceModel: "base_plus_tier_delta",
  priceTable: {
    base100: 2.69,
    faixa1a5: 1.0,
    faixa6a10: 0.8,
    faixa11a20: 0.5,
    faixa20: 0.5,
    faixa30a40: 0.3,
    faixa50: 0.2,
    faixa60a80: 0.1,
    faixa100: 0.0,
    faixa300: -0.3,
  },
  regras: {
    permiteDegrade: true,
    permiteBorda: true,
    permiteTransferFrente: true,
    permiteTransferFrenteVerso: true,
    regraNomes: "gratis_ate_10_depois_199",
    elegivelDescontoVolume: true,
    linhaAcqua: false,
    pinturaMinima: 20,
  },
};

const caneca450: CatalogProduct = {
  id: "caneca-450ml",
  slug: "caneca-450ml",
  nome: "Caneca Acrílica 450ml",
  categoriaMacro: "acrilicos_aluminio_similares",
  categoriaDisplay: "Acrílicos e Similares",
  subcategoria: "Canecas Acrílicas",
  material: "acrilico",
  priceModel: "base_plus_tier_delta",
  priceTable: {
    base100: 3.49,
    faixa1a5: 1.5,
    faixa6a10: 1.0,
    faixa11a20: 0.7,
    faixa20: 0.7,
    faixa30a40: 0.4,
    faixa50: 0.3,
    faixa60a80: 0.2,
    faixa100: 0.0,
    faixa300: -0.3,
  },
  regras: {
    permiteDegrade: true,
    permiteBorda: true,
    permiteTransferFrente: true,
    permiteTransferFrenteVerso: true,
    regraNomes: "gratis_ate_10_depois_199",
    elegivelDescontoVolume: true,
    linhaAcqua: false,
    pinturaMinima: 20,
  },
};

const canecaPorcelana: CatalogProduct = {
  id: "caneca-porcelana-325ml",
  slug: "caneca-porcelana-325ml",
  nome: "Caneca de Porcelana 325ml",
  categoriaMacro: "porcelana_vidro",
  categoriaDisplay: "Porcelana e Vidro",
  subcategoria: "Canecas de Porcelana",
  material: "porcelana",
  priceModel: "direct_tier_price",
  priceTable: {
    faixa1a5: 14.9,
    faixa6a10: 12.5,
    faixa11a20: 10.9,
    faixa20: 10.9,
    faixa30a40: 9.5,
    faixa50: 8.9,
    faixa100: 7.9,
    faixa300: 7.49,
  },
  regras: {
    permiteDegrade: false,
    permiteBorda: false,
    permiteTransferFrente: true,
    permiteTransferFrenteVerso: true,
    regraNomes: "sem_acrescimo",
    elegivelDescontoVolume: false,
    linhaAcqua: false,
  },
};

const canecaAluminio: CatalogProduct = {
  id: "caneca-moscow-mule-aluminio",
  slug: "caneca-moscow-mule-aluminio",
  nome: "Caneca Moscow Mule Alumínio 450ml",
  categoriaMacro: "acrilicos_aluminio_similares",
  categoriaDisplay: "Acrílicos e Similares",
  subcategoria: "Canecas de Alumínio",
  material: "aluminio",
  priceModel: "direct_tier_price",
  priceTable: {
    faixa1a5: 12.9,
    faixa6a10: 10.9,
    faixa11a20: 9.5,
    faixa20: 9.5,
    faixa30a40: 8.9,
    faixa50: 8.5,
    faixa100: 7.9,
    faixa300: 7.49,
  },
  regras: {
    permiteDegrade: false,
    permiteBorda: false,
    permiteTransferFrente: true,
    permiteTransferFrenteVerso: false,
    regraNomes: "sem_acrescimo",
    elegivelDescontoVolume: false,
    linhaAcqua: false,
  },
};

const canecaSlimFaltante: CatalogProduct = {
  id: "caneca-slim-330ml",
  slug: "caneca-slim-330ml",
  nome: "Caneca Slim 330ml",
  categoriaMacro: "acrilicos_aluminio_similares",
  categoriaDisplay: "Acrílicos e Similares",
  subcategoria: "Canecas Acrílicas",
  material: "acrilico",
  priceModel: "base_plus_tier_delta",
  priceTable: {
    base100: 3.19,
    faixa1un: 1.5,
    faixa2a5: null,
    faixa6a10: 0.9,
    faixa100: 0.0,
  },
  regras: {
    permiteDegrade: true,
    permiteBorda: true,
    permiteTransferFrente: true,
    permiteTransferFrenteVerso: true,
    regraNomes: "gratis_ate_10_depois_199",
    elegivelDescontoVolume: true,
    linhaAcqua: false,
  },
  inconsistencias: ["Faixa 2-5 unidades sem preço cadastrado. Consulte via WhatsApp."],
};

// --- TESTES ---

describe("Motor de Preços — Grupo Mega Cup", () => {
  describe("Long Drink 330ml", () => {
    test("100 unidades padrão = R$ 2,69/un", () => {
      const r = calcularPreco(longDrink330, { quantidade: 100 });
      expect(r.valido).toBe(true);
      expect(r.precoUnitario).toBeCloseTo(2.69, 2);
    });

    test("100 unidades padrão — total = R$ 269,00", () => {
      const r = calcularPreco(longDrink330, { quantidade: 100 });
      expect(r.total).toBeCloseTo(269.0, 2);
    });
  });

  describe("Caneca Acrílica 450ml", () => {
    test("100 unidades padrão = R$ 3,49/un", () => {
      const r = calcularPreco(caneca450, { quantidade: 100 });
      expect(r.precoUnitario).toBeCloseTo(3.49, 2);
    });

    test("100 unidades com degradê = R$ 4,49/un", () => {
      const r = calcularPreco(caneca450, { quantidade: 100, degrade: true });
      expect(r.precoUnitario).toBeCloseTo(4.49, 2);
    });

    test("100 unidades com degradê + borda = R$ 4,99/un", () => {
      const r = calcularPreco(caneca450, { quantidade: 100, degrade: true, borda: true });
      expect(r.precoUnitario).toBeCloseTo(4.99, 2);
    });

    test("acréscimo degradê = +R$ 1,00", () => {
      const r = calcularPreco(caneca450, { quantidade: 100, degrade: true });
      expect(r.acrescimoDegrade).toBeCloseTo(1.0, 2);
    });

    test("acréscimo borda = +R$ 0,50", () => {
      const r = calcularPreco(caneca450, { quantidade: 100, borda: true });
      expect(r.acrescimoBorda).toBeCloseTo(0.5, 2);
    });
  });

  describe("Porcelana — preço direto por faixa", () => {
    test("100 unidades = R$ 7,90/un", () => {
      const r = calcularPreco(canecaPorcelana, { quantidade: 100 });
      expect(r.precoUnitario).toBeCloseTo(7.9, 2);
    });

    test("6 a 10 unidades = R$ 12,50/un", () => {
      const r = calcularPreco(canecaPorcelana, { quantidade: 8 });
      expect(r.precoUnitario).toBeCloseTo(12.5, 2);
    });
  });

  describe("Alumínio — sem acréscimo de nome", () => {
    test("nome individual em alumínio = R$ 0 de acréscimo", () => {
      const r = calcularPreco(canecaAluminio, {
        quantidade: 50,
        nomesIndividuais: true,
      });
      expect(r.acrescimoNomes).toBe(0);
    });

    test("100 unidades = R$ 7,90/un sem transferência", () => {
      const r = calcularPreco(canecaAluminio, { quantidade: 100 });
      expect(r.precoUnitario).toBeCloseTo(7.9, 2);
    });
  });

  describe("Acrílico com menos de 10 unidades", () => {
    test("5 unidades — sem cobrança de nome nem transfer", () => {
      const r = calcularPreco(longDrink330, {
        quantidade: 5,
        nomesIndividuais: true,
        transferFrente: true,
      });
      expect(r.acrescimoNomes).toBe(0);
      expect(r.acrescimoTransfer).toBe(0);
    });
  });

  describe("Pagamento no cartão", () => {
    test("cartão 2x–5x adiciona 10% sobre o total", () => {
      const r = calcularPreco(longDrink330, {
        quantidade: 100,
        formaPagamento: "cartao",
      });
      expect(r.acrescimoCartao).toBeCloseTo(r.total * 0.1, 2);
      expect(r.totalComCartao).toBeCloseTo(r.total * 1.1, 2);
    });
  });

  describe("Descontos por volume — acrílicos comuns", () => {
    test("300 unidades = -R$ 0,30/un", () => {
      const r = calcularPreco(longDrink330, { quantidade: 300 });
      expect(r.descontoVolume).toBeCloseTo(0.3, 2);
    });

    test("500 unidades = -R$ 0,50/un", () => {
      const r = calcularPreco(longDrink330, { quantidade: 500 });
      expect(r.descontoVolume).toBeCloseTo(0.5, 2);
    });

    test("1000 unidades = -R$ 0,70/un", () => {
      const r = calcularPreco(longDrink330, { quantidade: 1000 });
      expect(r.descontoVolume).toBeCloseTo(0.7, 2);
    });
  });

  describe("Faixa ausente gera validação, não preço inventado", () => {
    test("Caneca Slim 330ml faixa 2-5 retorna inconsistência registrada", () => {
      expect(canecaSlimFaltante.inconsistencias).toBeDefined();
      expect(canecaSlimFaltante.inconsistencias!.length).toBeGreaterThan(0);
    });

    test("Caneca Slim 330ml em 3 unidades — preço inválido (faixa nula)", () => {
      const r = calcularPreco(canecaSlimFaltante, { quantidade: 3 });
      expect(r.valido).toBe(false);
      expect(r.erros.length).toBeGreaterThan(0);
    });
  });

  describe("Nomes individuais acrílico > 10 unidades", () => {
    test("15 unidades com nome = +R$ 1,99/un", () => {
      const r = calcularPreco(longDrink330, {
        quantidade: 15,
        nomesIndividuais: true,
      });
      expect(r.acrescimoNomes).toBeCloseTo(1.99, 2);
    });
  });
});
