import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  return (
    <nav aria-label="Caminho de navegação" className={cn("flex items-center flex-wrap gap-1 text-sm text-navy-500", className)}>
      {items.map((item, index) => (
        <span key={index} className="flex items-center gap-1">
          {index > 0 && <ChevronRight className="w-3.5 h-3.5 text-navy-300" />}
          {item.href ? (
            <Link
              href={item.href}
              className="hover:text-navy-700 transition-colors"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-navy-700 font-medium">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
