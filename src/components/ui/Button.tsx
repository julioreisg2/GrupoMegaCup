"use client";

import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "gold" | "whatsapp";
  size?: "sm" | "md" | "lg" | "xl";
}

const variants = {
  primary:
    "bg-navy-600 text-white hover:bg-navy-700 active:bg-navy-800 shadow-md hover:shadow-lg",
  secondary:
    "bg-navy-100 text-navy-800 hover:bg-navy-200 active:bg-navy-300",
  outline:
    "border-2 border-navy-600 text-navy-600 hover:bg-navy-50 active:bg-navy-100",
  ghost:
    "text-navy-700 hover:bg-navy-50 active:bg-navy-100",
  gold:
    "bg-gold-500 text-navy-950 hover:bg-gold-400 active:bg-gold-600 shadow-gold font-semibold",
  whatsapp:
    "bg-[#25d366] text-white hover:bg-[#20be5a] active:bg-[#1aa84f] shadow-md hover:shadow-lg font-semibold",
};

const sizes = {
  sm:  "px-3 py-1.5 text-sm rounded-lg gap-1.5",
  md:  "px-5 py-2.5 text-base rounded-xl gap-2",
  lg:  "px-6 py-3 text-lg rounded-xl gap-2.5",
  xl:  "px-8 py-4 text-xl rounded-2xl gap-3",
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center font-medium transition-all duration-200",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
