"use client";

import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react";
import type { CatalogProduct, PriceOptions, PriceBreakdown } from "@/lib/pricing/types";

export interface QuoteItem {
  id: string;
  produto: CatalogProduct;
  opcoes: PriceOptions;
  resultado: PriceBreakdown;
  observacoes?: string;
}

interface QuoteCartContextType {
  items: QuoteItem[];
  addItem: (item: Omit<QuoteItem, "id">) => void;
  removeItem: (id: string) => void;
  updateItem: (id: string, item: Partial<Omit<QuoteItem, "id">>) => void;
  clearCart: () => void;
  totalEstimado: number;
}

const STORAGE_KEY = "megacup-orcamento-v1";

const QuoteCartContext = createContext<QuoteCartContextType | null>(null);

export function QuoteCartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<QuoteItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  // Carregar do localStorage na montagem
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as QuoteItem[];
        if (Array.isArray(parsed)) setItems(parsed);
      }
    } catch {
      // ignora erros de parse
    }
    setHydrated(true);
  }, []);

  // Salvar no localStorage a cada mudança
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // ignora erros de storage cheio
    }
  }, [items, hydrated]);

  const addItem = useCallback((item: Omit<QuoteItem, "id">) => {
    const id = `${item.produto.id}-${Date.now()}`;
    setItems((prev) => [...prev, { ...item, id }]);
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const updateItem = useCallback(
    (id: string, partial: Partial<Omit<QuoteItem, "id">>) => {
      setItems((prev) =>
        prev.map((i) => (i.id === id ? { ...i, ...partial } : i))
      );
    },
    []
  );

  const clearCart = useCallback(() => setItems([]), []);

  const totalEstimado = items.reduce(
    (sum, item) => sum + (item.resultado.valido ? item.resultado.total : 0),
    0
  );

  return (
    <QuoteCartContext.Provider
      value={{ items, addItem, removeItem, updateItem, clearCart, totalEstimado }}
    >
      {children}
    </QuoteCartContext.Provider>
  );
}

export function useQuoteCart(): QuoteCartContextType {
  const ctx = useContext(QuoteCartContext);
  if (!ctx) throw new Error("useQuoteCart must be used within QuoteCartProvider");
  return ctx;
}
