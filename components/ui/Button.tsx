import { cn } from "@/lib/cn";
import type { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "ghost" | "danger";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
};

const variants: Record<Variant, string> = {
  primary:
    "bg-path text-white shadow-[0_8px_0_#1f6d5c] hover:translate-y-[1px] hover:shadow-[0_7px_0_#1f6d5c] active:translate-y-[6px] active:shadow-none",
  secondary:
    "bg-card text-ink border border-line shadow-[0_6px_0_#d8cdbb] hover:translate-y-[1px] hover:shadow-[0_5px_0_#d8cdbb] active:translate-y-[5px] active:shadow-none",
  ghost: "bg-transparent text-ink-soft hover:text-ink hover:bg-black/5",
  danger:
    "bg-game-deep text-white shadow-[0_8px_0_#8f3d32] hover:translate-y-[1px] hover:shadow-[0_7px_0_#8f3d32] active:translate-y-[6px] active:shadow-none",
};

export function Button({
  variant = "primary",
  className,
  type = "button",
  ...props
}: Props) {
  return (
    <button
      type={type}
      className={cn(
        "focus-ring inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-base font-extrabold tracking-wide transition-transform disabled:pointer-events-none disabled:opacity-50",
        variants[variant],
        className,
      )}
      {...props}
    />
  );
}
