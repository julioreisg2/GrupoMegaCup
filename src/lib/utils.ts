import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatBRL(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

export function formatBRLShort(value: number): string {
  return `R$ ${value.toFixed(2).replace(".", ",")}`;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export const materialLabels: Record<string, string> = {
  acrilico: "Acrílico",
  aluminio: "Alumínio",
  porcelana: "Porcelana",
  vidro: "Vidro",
  termico: "Térmico",
  diverso: "Outros",
  misto: "Misto",
  a_confirmar: "A confirmar",
};

export const categoriaMacroLabels: Record<string, string> = {
  acrilicos_aluminio_similares: "Acrílicos e Similares",
  porcelana_vidro: "Porcelana e Vidro",
  itens_diversos: "Itens Diversos",
  termicos: "Térmicos",
};
