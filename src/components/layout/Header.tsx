"use client";

import Link from "next/link";
import { useState } from "react";
import { ShoppingBag, Menu, X } from "lucide-react";
import { siteConfig } from "@/config/site";
import { useQuoteCart } from "@/components/quote/QuoteCartProvider";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/",                         label: "Início" },
  { href: "/catalogo",                 label: "Produtos" },
  { href: "/segmentos/corporativo",    label: "Corporativo" },
  { href: "/segmentos/casamentos",     label: "Casamentos" },
  { href: "/segmentos/aniversarios",   label: "Aniversários" },
  { href: "/segmentos/formaturas",     label: "Formaturas" },
  { href: "/sobre",                    label: "Sobre" },
  { href: "/contato",                  label: "Contato" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const { items } = useQuoteCart();

  return (
    <>
      {/* Top promo bar — verde-limão com texto preto */}
      {siteConfig.promocao.ativa && (
        <div
          className="text-center py-2.5 px-4 text-xs font-bold uppercase tracking-widest"
          style={{ backgroundColor: "var(--lime)", color: "var(--lime-dark)" }}
        >
          {siteConfig.promocao.texto}
        </div>
      )}

      <header
        className="sticky top-0 z-50 border-b header-glass"
        style={{ borderColor: "var(--border)" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 flex-shrink-0">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center text-xs font-display font-black"
              style={{ backgroundColor: "var(--surface-el)", color: "var(--lime)", border: "1px solid var(--border)" }}
            >
              GMC
            </div>
            <div className="hidden sm:block leading-tight">
              <span
                className="font-display font-bold text-sm block"
                style={{ color: "var(--text)" }}
              >
                Grupo Mega Cup
              </span>
              <span className="text-[11px]" style={{ color: "var(--text-soft)" }}>Personalizados</span>
            </div>
          </Link>

          {/* Nav desktop */}
          <nav className="hidden lg:flex items-center gap-0.5">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="px-3 py-2 text-sm font-medium rounded-lg transition-all duration-150 hover:text-[var(--lime)] hover:bg-[var(--surface)]"
                style={{ color: "var(--text-muted)" }}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Ações */}
          <div className="flex items-center gap-2">
            {/* WhatsApp */}
            <Link
              href={siteConfig.whatsapp.link}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-wa hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              WhatsApp
            </Link>

            {/* Orçamento */}
            <Link
              href="/orcamento"
              className="relative flex items-center justify-center w-10 h-10 rounded-xl border transition-colors hover:border-[var(--lime)]"
              style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)", color: "var(--text)" }}
              aria-label={`Orçamento — ${items.length} ${items.length === 1 ? "item" : "itens"}`}
            >
              <ShoppingBag className="w-5 h-5" aria-hidden="true" />
              {items.length > 0 && (
                <span
                  className="absolute -top-1.5 -right-1.5 w-5 h-5 text-[10px] font-black rounded-full flex items-center justify-center animate-pop-in"
                  style={{ backgroundColor: "var(--lime)", color: "var(--lime-dark)" }}
                >
                  {items.length > 9 ? "9+" : items.length}
                </span>
              )}
            </Link>

            {/* Menu mobile */}
            <button
              onClick={() => setOpen(!open)}
              className="lg:hidden flex items-center justify-center w-10 h-10 rounded-xl border transition-colors"
              style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)", color: "var(--text)" }}
              aria-label={open ? "Fechar menu" : "Abrir menu"}
              aria-expanded={open}
            >
              {open
                ? <X className="w-5 h-5" aria-hidden="true" />
                : <Menu className="w-5 h-5" aria-hidden="true" />
              }
            </button>
          </div>
        </div>

        {/* Mobile drawer */}
        <div
          className={cn(
            "lg:hidden border-t overflow-hidden transition-all duration-300 ease-in-out",
            open ? "max-h-[480px] opacity-100" : "max-h-0 opacity-0"
          )}
          style={{ borderColor: "var(--border)", backgroundColor: "var(--bg-soft)" }}
        >
          <nav className="px-4 py-4 flex flex-col gap-1">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="px-4 py-3 text-sm font-medium rounded-xl border border-transparent transition-all hover:border-[var(--border)] hover:bg-[var(--surface)]"
                style={{ color: "var(--text-muted)" }}
              >
                {l.label}
              </Link>
            ))}
            <Link
              href={siteConfig.whatsapp.link}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="btn-wa mt-2 flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm"
            >
              Falar no WhatsApp
            </Link>
          </nav>
        </div>
      </header>
    </>
  );
}
