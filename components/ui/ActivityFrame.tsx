"use client";

import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

type Props = {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  onBack?: () => void;
  backLabel?: string;
  children: ReactNode;
  variant?: "default" | "boss";
};

export function ActivityFrame({
  title,
  subtitle,
  eyebrow,
  onBack,
  backLabel = "Retour au plateau",
  children,
  variant = "default",
}: Props) {
  return (
    <div
      className={cn(
        "fixed inset-0 z-30 overflow-y-auto",
        variant === "boss"
          ? "bg-[#17141f]"
          : "bg-board-bg/95 backdrop-blur-sm",
      )}
    >
      <div className="mx-auto flex min-h-full w-full max-w-2xl flex-col px-4 py-5 sm:py-8">
        {onBack ? (
          <button
            type="button"
            onClick={onBack}
            className={cn(
              "focus-ring self-start rounded-full px-3 py-1 text-sm font-bold",
              variant === "boss" ? "text-white/70 hover:text-white" : "text-ink-soft hover:text-ink",
            )}
          >
            ← {backLabel}
          </button>
        ) : null}
        <header className="mt-3 text-center">
          {eyebrow ? (
            <p
              className={cn(
                "text-xs font-extrabold uppercase tracking-[0.22em]",
                variant === "boss" ? "text-gold" : "text-path",
              )}
            >
              {eyebrow}
            </p>
          ) : null}
          <h1
            className={cn(
              "font-display mt-1 text-3xl sm:text-4xl",
              variant === "boss" ? "text-white" : "text-ink",
            )}
          >
            {title}
          </h1>
          {subtitle ? (
            <p
              className={cn(
                "mt-2 text-base",
                variant === "boss" ? "text-white/70" : "text-ink-soft",
              )}
            >
              {subtitle}
            </p>
          ) : null}
        </header>
        <div className="mt-6 flex-1">{children}</div>
      </div>
    </div>
  );
}
