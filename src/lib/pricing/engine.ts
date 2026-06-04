import type {
  CatalogProduct,
  PriceOptions,
  PriceBreakdown,
  PriceTable,
  VolumeDiscount,
} from "./types";

const ACRESCIMO_DEGRADE = 1.0;
const ACRESCIMO_BORDA = 0.5;
const ACRESCIMO_TRANSFER_FRENTE = 0.5;
const ACRESCIMO_TRANSFER_FRENTE_VERSO = 0.8;
const ACRESCIMO_NOMES = 1.99;
const ACRESCIMO_CARTAO = 0.1;
const LIMITE_NOMES_GRATIS = 10;

const DESCONTOS_ACRILICO: VolumeDiscount[] = [
  { quantidade: 300, desconto: 0.3 },
  { quantidade: 500, desconto: 0.5 },
  { quantidade: 1000, desconto: 0.7 },
];

const DESCONTOS_ACQUA: VolumeDiscount[] = [
  { quantidade: 300, desconto: 0.5 },
  { quantidade: 500, desconto: 0.7 },
  { quantidade: 1000, desconto: 1.0 },
];

function getFaixaLabel(quantidade: number): string {
  if (quantidade === 1) return "faixa1un";
  if (quantidade >= 1 && quantidade <= 5) return "faixa1a5";
  if (quantidade >= 2 && quantidade <= 5) return "faixa2a5";
  if (quantidade >= 6 && quantidade <= 10) return "faixa6a10";
  if (quantidade >= 11 && quantidade <= 20) return "faixa11a20";
  if (quantidade === 20) return "faixa20";
  if (quantidade >= 21 && quantidade <= 30) return "faixa21a30";
  if (quantidade >= 30 && quantidade <= 40) return "faixa30a40";
  if (quantidade >= 31 && quantidade <= 50) return "faixa31a50";
  if (quantidade === 50) return "faixa50";
  if (quantidade >= 51 && quantidade <= 99) return "faixa51a99";
  if (quantidade >= 60 && quantidade <= 80) return "faixa60a80";
  if (quantidade === 100) return "faixa100";
  if (quantidade >= 101 && quantidade <= 199) return "faixa101a199";
  if (quantidade === 200) return "faixa200";
  if (quantidade >= 201 && quantidade <= 299) return "faixa201a299";
  if (quantidade >= 300) return "faixa300";
  return "faixa100";
}

function resolvePrecoBase(
  produto: CatalogProduct,
  quantidade: number
): { preco: number | null; faixa: string; erro?: string } {
  const { priceModel, priceTable } = produto;

  if (priceModel === "direct_above_300_only") {
    if (quantidade < 300) {
      return {
        preco: null,
        faixa: "acima300",
        erro: "Este produto está disponível apenas para pedidos acima de 300 unidades.",
      };
    }
    if (priceTable.acima300 == null) {
      return {
        preco: null,
        faixa: "acima300",
        erro: "Preço para acima de 300 unidades não cadastrado. Consulte via WhatsApp.",
      };
    }
    return { preco: priceTable.acima300, faixa: "acima300" };
  }

  if (priceModel === "base_plus_tier_delta") {
    if (priceTable.base100 == null) {
      return {
        preco: null,
        faixa: "base100",
        erro: "Preço base não cadastrado.",
      };
    }
    const delta = resolveDelta(priceTable, quantidade);
    if (delta.erro) return { preco: null, faixa: delta.faixa, erro: delta.erro };
    return { preco: priceTable.base100 + delta.valor, faixa: delta.faixa };
  }

  if (priceModel === "direct_tier_price") {
    return resolveDirectTier(priceTable, quantidade);
  }

  return { preco: null, faixa: "desconhecido", erro: "Modelo de preço desconhecido." };
}

function resolveDelta(
  priceTable: PriceTable,
  quantidade: number
): { valor: number; faixa: string; erro?: string } {
  const tiers: Array<[number, number, keyof PriceTable]> = [
    [1, 1, "faixa1un"],
    [1, 5, "faixa1a5"],
    [2, 5, "faixa2a5"],
    [6, 10, "faixa6a10"],
    [11, 20, "faixa11a20"],
    [20, 20, "faixa20"],
    [21, 30, "faixa21a30"],
    [30, 40, "faixa30a40"],
    [31, 50, "faixa31a50"],
    [50, 50, "faixa50"],
    [51, 99, "faixa51a99"],
    [60, 80, "faixa60a80"],
    [100, 100, "faixa100"],
    [101, 199, "faixa101a199"],
    [200, 200, "faixa200"],
    [201, 299, "faixa201a299"],
    [300, Infinity, "faixa300"],
  ];

  for (const [min, max, key] of tiers) {
    if (quantidade >= min && quantidade <= max) {
      const val = priceTable[key];
      if (val != null) return { valor: val, faixa: key };
    }
  }

  const faixaLabel = getFaixaLabel(quantidade);
  return {
    valor: 0,
    faixa: faixaLabel,
    erro: `Faixa de preço não encontrada para ${quantidade} unidades. Consulte via WhatsApp.`,
  };
}

function resolveDirectTier(
  priceTable: PriceTable,
  quantidade: number
): { preco: number | null; faixa: string; erro?: string } {
  const tiers: Array<[number, number, keyof PriceTable]> = [
    [1, 1, "faixa1un"],
    [1, 5, "faixa1a5"],
    [2, 5, "faixa2a5"],
    [6, 10, "faixa6a10"],
    [11, 20, "faixa11a20"],
    [20, 20, "faixa20"],
    [21, 30, "faixa21a30"],
    [30, 40, "faixa30a40"],
    [31, 50, "faixa31a50"],
    [50, 50, "faixa50"],
    [51, 99, "faixa51a99"],
    [60, 80, "faixa60a80"],
    [100, 100, "faixa100"],
    [101, 199, "faixa101a199"],
    [200, 200, "faixa200"],
    [201, 299, "faixa201a299"],
    [300, Infinity, "faixa300"],
    [300, Infinity, "acima300"],
  ];

  for (const [min, max, key] of tiers) {
    if (quantidade >= min && quantidade <= max) {
      const val = priceTable[key];
      if (val != null) return { preco: val, faixa: key };
    }
  }

  const faixaLabel = getFaixaLabel(quantidade);
  return {
    preco: null,
    faixa: faixaLabel,
    erro: `Faixa de preço não encontrada para ${quantidade} unidades. Consulte via WhatsApp.`,
  };
}

function getDescontoVolume(produto: CatalogProduct, quantidade: number): number {
  if (!produto.regras.elegivelDescontoVolume) return 0;
  const tabela = produto.regras.linhaAcqua ? DESCONTOS_ACQUA : DESCONTOS_ACRILICO;
  let desconto = 0;
  for (const tier of tabela) {
    if (quantidade >= tier.quantidade) desconto = tier.desconto;
  }
  return desconto;
}

function isAcrilicoPequeno(produto: CatalogProduct, quantidade: number): boolean {
  return produto.material === "acrilico" && quantidade < 10;
}

export function calcularPreco(
  produto: CatalogProduct,
  opcoes: PriceOptions
): PriceBreakdown {
  const { quantidade, formaPagamento } = opcoes;
  const observacoes: string[] = [];
  const erros: string[] = [];

  const baseResult = resolvePrecoBase(produto, quantidade);
  if (baseResult.erro) {
    erros.push(baseResult.erro);
  }

  if (produto.inconsistencias && produto.inconsistencias.length > 0) {
    observacoes.push(...produto.inconsistencias);
  }

  const precoBase = baseResult.preco ?? 0;
  const ehAcrilicoPequeno = isAcrilicoPequeno(produto, quantidade);

  let acrescimoDegrade = 0;
  if (opcoes.degrade && produto.regras.permiteDegrade) {
    acrescimoDegrade = ACRESCIMO_DEGRADE;
  }

  let acrescimoBorda = 0;
  if (opcoes.borda && produto.regras.permiteBorda) {
    acrescimoBorda = ACRESCIMO_BORDA;
  }

  let acrescimoTransfer = 0;
  if (opcoes.transferFrenteVerso && produto.regras.permiteTransferFrenteVerso) {
    if (!ehAcrilicoPequeno) {
      acrescimoTransfer = ACRESCIMO_TRANSFER_FRENTE_VERSO;
    }
  } else if (opcoes.transferFrente && produto.regras.permiteTransferFrente) {
    if (!ehAcrilicoPequeno) {
      acrescimoTransfer = ACRESCIMO_TRANSFER_FRENTE;
    }
  }

  if (ehAcrilicoPequeno && (opcoes.transferFrente || opcoes.transferFrenteVerso)) {
    observacoes.push("Transfer gratuito para pedidos abaixo de 10 unidades em acrílico.");
  }

  let acrescimoNomes = 0;
  const regra = produto.regras.regraNomes;

  if (opcoes.nomesIndividuais) {
    if (regra === "gratis_ate_10_depois_199") {
      if (quantidade > LIMITE_NOMES_GRATIS) {
        acrescimoNomes = ACRESCIMO_NOMES;
        observacoes.push(
          `Nomes individuais: gratuito até 10 un, +R$ ${ACRESCIMO_NOMES.toFixed(2)}/un acima disso.`
        );
      } else {
        observacoes.push("Nomes individuais inclusos (até 10 unidades).");
      }
    } else if (regra === "sem_cobranca_menos_10") {
      if (ehAcrilicoPequeno) {
        observacoes.push("Nomes individuais gratuitos para pedidos abaixo de 10 unidades.");
      } else {
        acrescimoNomes = ACRESCIMO_NOMES;
        observacoes.push(`Nomes individuais: +R$ ${ACRESCIMO_NOMES.toFixed(2)}/un.`);
      }
    } else if (regra === "sem_acrescimo") {
      observacoes.push("Nomes individuais sem acréscimo.");
    } else if (regra === "nao_aplica") {
      observacoes.push("Este produto não suporta nomes individuais.");
      acrescimoNomes = 0;
    }
  }

  const descontoVolume = getDescontoVolume(produto, quantidade);
  if (descontoVolume > 0) {
    observacoes.push(`Desconto por volume aplicado: -R$ ${descontoVolume.toFixed(2)}/un.`);
  }

  const precoUnitario =
    precoBase +
    acrescimoDegrade +
    acrescimoBorda +
    acrescimoTransfer +
    acrescimoNomes -
    descontoVolume;

  const total = precoUnitario * quantidade;
  const acrescimoCartaoValor =
    formaPagamento === "cartao" ? total * ACRESCIMO_CARTAO : 0;
  const totalComCartao = total + acrescimoCartaoValor;

  if (produto.regras.pinturaMinima && quantidade < produto.regras.pinturaMinima) {
    observacoes.push(
      `Pedido mínimo de ${produto.regras.pinturaMinima} unidades por cor para este produto.`
    );
  }

  return {
    precoBase,
    acrescimoDegrade,
    acrescimoBorda,
    acrescimoTransfer,
    acrescimoNomes,
    descontoVolume,
    precoUnitario: Math.max(0, precoUnitario),
    total: Math.max(0, total),
    totalComCartao: Math.max(0, totalComCartao),
    acrescimoCartao: acrescimoCartaoValor,
    faixaAplicada: baseResult.faixa,
    observacoes,
    valido: erros.length === 0,
    erros,
  };
}

export function precoAPartirDe(produto: CatalogProduct): number | null {
  const opcoes: PriceOptions = { quantidade: 100 };
  const resultado = calcularPreco(produto, opcoes);
  if (!resultado.valido) {
    const opcoes50: PriceOptions = { quantidade: 50 };
    const r50 = calcularPreco(produto, opcoes50);
    if (r50.valido) return r50.precoUnitario;
    return null;
  }
  return resultado.precoUnitario;
}
