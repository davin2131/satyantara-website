"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { createPortal } from "react-dom";

type Props = {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  ariaLabel?: string;
  size?: "md" | "lg";
};

export function Modal({ open, onClose, children, ariaLabel, size = "lg" }: Props) {
  const dialogRef = useRef<HTMLDivElement | null>(null);

  // Lock body scroll while open
  useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [open]);

  // ESC to close
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  // Focus the dialog when opened
  useEffect(() => {
    if (open) dialogRef.current?.focus();
  }, [open]);

  if (typeof window === "undefined") return null;

  const widthClass = size === "lg" ? "max-w-4xl" : "max-w-xl";

  return createPortal(
    <div
      aria-hidden={!open}
      className={`fixed inset-0 z-[100] flex items-center justify-center px-3 py-4 transition-all duration-500 sm:px-4 sm:py-6 ${
        open
          ? "pointer-events-auto opacity-100"
          : "pointer-events-none opacity-0"
      }`}
    >
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Tutup"
        onClick={onClose}
        tabIndex={open ? 0 : -1}
        className={`absolute inset-0 cursor-zoom-out bg-coffee-950/80 backdrop-blur-md transition-opacity duration-500 ${
          open ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Dialog */}
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={ariaLabel}
        tabIndex={-1}
        className={`relative z-10 w-full ${widthClass} max-h-[92vh] overflow-hidden rounded-2xl border border-gold-500/30 bg-gradient-to-br from-coffee-800 via-coffee-900 to-coffee-950 shadow-[0_50px_120px_-20px_rgba(0,0,0,0.8),0_0_0_1px_rgba(212,162,78,0.15)] outline-none transition-all duration-500 sm:rounded-3xl ${
          open
            ? "translate-y-0 scale-100 opacity-100"
            : "pointer-events-none translate-y-6 scale-95 opacity-0"
        }`}
      >
        {/* Decorative gold corner accents */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-400/60 to-transparent"
        />
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold-400/40 to-transparent"
        />

        <button
          type="button"
          onClick={onClose}
          aria-label="Tutup"
          className="absolute right-3 top-3 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full border border-gold-500/30 bg-coffee-950/70 text-cream/85 backdrop-blur transition hover:rotate-90 hover:border-gold-300 hover:text-gold-300 sm:right-4 sm:top-4 sm:h-10 sm:w-10"
        >
          <CloseIcon className="h-4 w-4" />
        </button>

        <div className="max-h-[92vh] overflow-y-auto overscroll-contain">{children}</div>
      </div>
    </div>,
    document.body,
  );
}

function CloseIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      {...props}
    >
      <line x1="6" y1="6" x2="18" y2="18" />
      <line x1="6" y1="18" x2="18" y2="6" />
    </svg>
  );
}
