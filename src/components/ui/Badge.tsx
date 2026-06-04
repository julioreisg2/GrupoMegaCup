import { cn } from "@/lib/utils";

interface BadgeProps {
  variant?: "default" | "gold" | "green" | "red" | "outline" | "navy";
  size?: "sm" | "md";
  children: React.ReactNode;
  className?: string;
}

const variants = {
  default: "bg-navy-100 text-navy-700",
  gold:    "bg-gold-100 text-gold-700 border border-gold-300",
  green:   "bg-emerald-100 text-emerald-700",
  red:     "bg-red-100 text-red-700",
  outline: "border border-navy-300 text-navy-600",
  navy:    "bg-navy-600 text-white",
};

const sizes = {
  sm: "px-2 py-0.5 text-xs",
  md: "px-3 py-1 text-sm",
};

export function Badge({
  variant = "default",
  size = "sm",
  children,
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 font-medium rounded-full",
        variants[variant],
        sizes[size],
        className
      )}
    >
      {children}
    </span>
  );
}
