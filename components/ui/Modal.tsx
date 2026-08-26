"use client";

import { cn } from "@/lib/cn";
import { motion } from "framer-motion";
import type { ReactNode } from "react";

type Props = {
  open: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
  labelledBy?: string;
};

export function Modal({ open, title, onClose, children }: Props) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center p-4 sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <button
        className="absolute inset-0 bg-ink/40"
        aria-label="Fermer"
        onClick={onClose}
      />
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        className={cn(
          "relative z-10 w-full max-w-md rounded-3xl bg-card p-6 shadow-[0_24px_60px_rgba(28,36,48,0.22)]",
        )}
      >
        <h2 className="font-display text-2xl text-ink">{title}</h2>
        <div className="mt-4 text-ink-soft">{children}</div>
      </motion.div>
    </div>
  );
}
