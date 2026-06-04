"use client";

import { cn } from "@/lib/utils";
import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

export function Input({ label, error, icon, className, id, ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-navy-700">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-navy-400">
            {icon}
          </span>
        )}
        <input
          id={id}
          className={cn(
            "w-full rounded-xl border border-navy-200 bg-white px-4 py-2.5 text-navy-900",
            "placeholder:text-navy-400",
            "focus:outline-none focus:ring-2 focus:ring-navy-500 focus:border-navy-500",
            "disabled:bg-navy-50 disabled:cursor-not-allowed",
            "transition-colors",
            icon && "pl-10",
            error && "border-red-400 focus:ring-red-400",
            className
          )}
          {...props}
        />
      </div>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
