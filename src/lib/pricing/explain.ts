import type { PriceBreakdown, PriceOptions } from "./types";
import type { CatalogProduct } from "./types";
import type { QuoteItem } from "@/components/quote/QuoteCartProvider";
import type { ClienteCheckout } from "@/lib/types/checkout";
import { siteConfig } from "@/config/site";

export function gerarLinhasBreakdown(
  produto: CatalogProduct,
  opcoes: PriceOptions,
  resultado: PriceBreakdown
): Array<{ label: string; valor: string; destaque?: boolean }> {
  const linhas: Array<{ label: string; valor: string; destaque?: boolean }> = [];

  linhas.push({
    label: `Preço base (${opcoes.quantidade} un)`,
    valor: `R$ ${resultado.precoBase.toFixed(2)}/un`,
  });

  if (resultado.acrescimoDegrade > 0)
    linhas.push({
      label: "Acabamento degradê",
      valor: `+ R$ ${resultado.acrescimoDegrade.toFixed(2)}/un`,
    });

  if (resultado.acrescimoBorda > 0)
    linhas.push({
      label: "Borda personalizada",
      valor: `+ R$ ${resultado.acrescimoBorda.toFixed(2)}/un`,
    });

  if (resultado.acrescimoTransfer > 0)
    linhas.push({
      label: opcoes.transferFrenteVerso ? "Transfer frente e verso" : "Transfer frente",
      valor: `+ R$ ${resultado.acrescimoTransfer.toFixed(2)}/un`,
    });

  if (resultado.acrescimoNomes > 0)
    linhas.push({
      label: "Nomes individuais",
      valor: `+ R$ ${resultado.acrescimoNomes.toFixed(2)}/un`,
    });

  if (resultado.descontoVolume > 0)
    linhas.push({
      label: "Desconto por volume",
      valor: `- R$ ${resultado.descontoVolume.toFixed(2)}/un`,
    });

  linhas.push({
    label: "Preço unitário final",
    valor: `R$ ${resultado.precoUnitario.toFixed(2)}/un`,
    destaque: true,
  });

  linhas.push({
    label: `Total (${opcoes.quantidade} un)`,
    valor: `R$ ${resultado.total.toFixed(2)}`,
    destaque: true,
  });

  if (opcoes.formaPagamento === "cartao" && resultado.acrescimoCartao > 0) {
    linhas.push({
      label: "Acréscimo cartão (2x–5x)",
      valor: `+ R$ ${resultado.acrescimoCartao.toFixed(2)}`,
    });
    linhas.push({
      label: "Total com cartão",
      valor: `R$ ${resultado.totalComCartao.toFixed(2)}`,
      destaque: true,
    });
  }

  return linhas;
}

export function gerarMensagemWhatsApp(
  produto: CatalogProduct,
  opcoes: PriceOptions,
  resultado: PriceBreakdown,
  observacoesAdicionais?: string
): string {
  const acabamento = [
    opcoes.degrade && "degradê",
    opcoes.borda && "borda",
    !opcoes.degrade && !opcoes.borda && "padrão",
  ]
    .filter(Boolean)
    .join(" + ");

  const personalizacao = opcoes.transferFrenteVerso
    ? "Frente e verso"
    : opcoes.transferFrente
    ? "Frente"
    : "Sem transfer";

  const pagamento =
    opcoes.formaPagamento === "cartao"
      ? `Cartão 2x–5x (total: R$ ${resultado.totalComCartao.toFixed(2)})`
      : "À vista";

  const linhas = [
    "Olá! Quero um orçamento.",
    "",
    `Produto: ${produto.nome}`,
    `Quantidade: ${opcoes.quantidade} unidades`,
    `Categoria: ${produto.categoriaDisplay}`,
    `Material: ${produto.material}`,
    `Acabamento: ${acabamento}`,
    `Personalização: ${personalizacao}`,
    `Nomes individuais: ${opcoes.nomesIndividuais ? "Sim" : "Não"}`,
    `Preço unitário estimado: R$ ${resultado.precoUnitario.toFixed(2)}`,
    `Total estimado: R$ ${resultado.total.toFixed(2)}`,
    `Forma de pagamento: ${pagamento}`,
    `Prazo: ${siteConfig.producao.prazoLabel}`,
  ];

  if (observacoesAdicionais) {
    linhas.push(`Observações: ${observacoesAdicionais}`);
  }

  return linhas.join("\n");
}

export function gerarMensagemComCheckout(
  items: QuoteItem[],
  cliente: ClienteCheckout,
  frete: number,
  subtotal: number
): string {
  const linhas = [
    "🛒 *NOVO PEDIDO* 🛒",
    "",
    "*DADOS DO CLIENTE:*",
    `Nome: ${cliente.nomeCompleto}`,
    `Telefone: ${cliente.telefone}`,
    `Email: ${cliente.email}`,
    `Endereço: ${cliente.rua}, ${cliente.numero}${cliente.complemento ? `, ${cliente.complemento}` : ""}`,
    `${cliente.cidade} - ${cliente.estado}`,
    `CEP: ${cliente.cep}`,
    "",
    "*PRODUTOS:*",
  ];

  items.forEach((item, i) => {
    const acabamentos = [
      item.opcoes.degrade && "degradê",
      item.opcoes.borda && "borda",
    ]
      .filter(Boolean)
      .join(" + ");

    const personalizacao = item.opcoes.transferFrenteVerso
      ? "Frente e verso"
      : item.opcoes.transferFrente
      ? "Frente"
      : "Sem transfer";

    linhas.push(`${i + 1}. ${item.produto.nome}`);
    linhas.push(`   • Quantidade: ${item.opcoes.quantidade} un`);
    if (acabamentos) linhas.push(`   • Acabamento: ${acabamentos}`);
    if (personalizacao !== "Sem transfer") linhas.push(`   • Personalização: ${personalizacao}`);
    if (item.opcoes.nomesIndividuais) linhas.push(`   • Nomes individuais: Sim`);
    linhas.push(`   • Total: R$ ${item.resultado.total.toFixed(2)}`);
    if (item.observacoes) linhas.push(`   • Observações: ${item.observacoes}`);
    linhas.push("");
  });

  const formaPagamento =
    cliente.formaPagamento === "cartao"
      ? "Cartão (2-5x com +10%)"
      : cliente.formaPagamento === "pix"
      ? "Pix"
      : "Dinheiro";

  linhas.push("*RESUMO FINANCEIRO:*");
  linhas.push(`Subtotal: R$ ${subtotal.toFixed(2)}`);
  linhas.push(`Frete: R$ ${frete.toFixed(2)}`);
  linhas.push(`*TOTAL: R$ ${(subtotal + frete).toFixed(2)}*`);
  linhas.push("");
  linhas.push(`*Forma de Pagamento:* ${formaPagamento}`);
  linhas.push(`*Prazo de Produção:* ${siteConfig.producao.prazoLabel}`);

  return linhas.join("\n");
}

export function gerarLinkWhatsApp(mensagem: string): string {
  const encoded = mensagem
    .split("\n")
    .map((linha) => encodeURIComponent(linha))
    .join("%0A");
  return `https://wa.me/55${siteConfig.whatsapp.numero}?text=${encoded}`;
}
