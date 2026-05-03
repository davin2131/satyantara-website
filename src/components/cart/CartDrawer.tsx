"use client";

import { useEffect } from "react";
import { useCart, formatIDR } from "./CartContext";
import { siteCopy } from "@/data/site";

function getWhatsappNumber(): string {
  // Find whatsapp contact from siteSettings; extract digits only
  const wa = siteCopy.footer?.contacts?.find((c) => c.kind === "whatsapp");
  // Prefer href (e.g. https://wa.me/628xxx) then value
  const raw = wa?.href || wa?.value || "";
  const digits = raw.replace(/[^0-9]/g, "");
  // If number starts with 0, replace leading 0 with 62 (Indonesia)
  if (digits.startsWith("0")) return `62${digits.slice(1)}`;
  return digits;
}

export function CartDrawer() {
  const {
    items,
    count,
    totalLabel,
    isOpen,
    closeCart,
    setQty,
    removeItem,
  } = useCart();

  // Lock body scroll when open
  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  // ESC to close
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCart();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, closeCart]);

  function buildWhatsappMessage(): string {
    const lines: string[] = ["Halo Satyantara, saya mau pesan:", ""];
    items.forEach((it, idx) => {
      const subtotal = it.priceValue * it.qty;
      lines.push(
        `${idx + 1}. ${it.name} x${it.qty} — ${formatIDR(subtotal)}`,
      );
    });
    lines.push("", `Total: ${totalLabel}`, "", "Mohon info ketersediaan & cara pembayaran. Terima kasih.");
    return lines.join("\n");
  }

  function handleCheckout() {
    if (items.length === 0) return;
    const number = getWhatsappNumber();
    const text = encodeURIComponent(buildWhatsappMessage());
    const url = number
      ? `https://wa.me/${number}?text=${text}`
      : `https://wa.me/?text=${text}`;
    if (typeof window !== "undefined") {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  }

  return (
    <>
      {/* Backdrop */}
      <div
        aria-hidden={!isOpen}
        onClick={closeCart}
        className={`fixed inset-0 z-[60] bg-coffee-950/70 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      {/* Drawer */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Keranjang belanja"
        aria-hidden={!isOpen}
        className={`fixed inset-y-0 right-0 z-[70] flex w-full max-w-md flex-col border-l border-gold-500/20 bg-coffee-900 shadow-[-30px_0_60px_-20px_rgba(0,0,0,0.7)] transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <header className="flex items-center justify-between border-b border-gold-500/15 px-5 py-4 sm:px-6">
          <div className="flex items-center gap-3">
            <BagIcon className="h-5 w-5 text-gold-300" />
            <h2 className="font-display text-lg text-cream sm:text-xl">
              Keranjang
              <span className="ml-2 text-xs font-normal uppercase tracking-[0.3em] text-cream/55">
                {count} {count === 1 ? "item" : "items"}
              </span>
            </h2>
          </div>
          <button
            type="button"
            onClick={closeCart}
            aria-label="Tutup keranjang"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-gold-500/30 text-cream/80 transition hover:border-gold-400 hover:text-gold-300"
          >
            <XIcon className="h-4 w-4" />
          </button>
        </header>

        {/* Items list */}
        <div className="flex-1 overflow-y-auto px-5 py-4 sm:px-6">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-3 py-16 text-center">
              <BagIcon className="h-10 w-10 text-gold-500/50" />
              <p className="font-display text-lg text-cream">
                Keranjang masih kosong
              </p>
              <p className="max-w-xs text-sm text-parchment/65">
                Pilih produk dari Lakon, Rekomendasi, atau Produk Mitra untuk
                memulai pesanan.
              </p>
            </div>
          ) : (
            <ul className="space-y-3">
              {items.map((it) => (
                <li
                  key={it.id}
                  className="flex gap-3 rounded-2xl border border-gold-500/15 bg-coffee-800/60 p-3"
                >
                  <div className="relative h-20 w-20 flex-none overflow-hidden rounded-xl bg-coffee-950/60">
                    {it.imageUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={it.imageUrl}
                        alt={it.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-gold-500/50">
                        <BagIcon className="h-6 w-6" />
                      </div>
                    )}
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col">
                    <p className="truncate text-sm font-semibold text-cream">
                      {it.name}
                    </p>
                    <p className="mt-0.5 text-[11px] uppercase tracking-[0.25em] text-cream/50">
                      {kindLabel(it.kind)}
                    </p>
                    <p className="mt-1 text-xs text-gold-300">
                      {formatIDR(it.priceValue)}
                      {it.pricePer && (
                        <span className="text-cream/45">{it.pricePer}</span>
                      )}
                    </p>
                    <div className="mt-auto flex items-center justify-between gap-3 pt-2">
                      <div className="inline-flex items-center rounded-full border border-gold-500/30">
                        <button
                          type="button"
                          onClick={() => setQty(it.id, it.qty - 1)}
                          aria-label="Kurangi jumlah"
                          className="inline-flex h-7 w-7 items-center justify-center text-cream/80 transition hover:text-gold-300"
                        >
                          <MinusIcon className="h-3 w-3" />
                        </button>
                        <span className="min-w-[1.5rem] text-center text-sm text-cream">
                          {it.qty}
                        </span>
                        <button
                          type="button"
                          onClick={() => setQty(it.id, it.qty + 1)}
                          aria-label="Tambah jumlah"
                          className="inline-flex h-7 w-7 items-center justify-center text-cream/80 transition hover:text-gold-300"
                        >
                          <PlusIcon className="h-3 w-3" />
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeItem(it.id)}
                        className="text-[11px] uppercase tracking-[0.2em] text-cream/55 transition hover:text-rose-300"
                      >
                        Hapus
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer / Total + checkout */}
        {items.length > 0 && (
          <footer className="border-t border-gold-500/15 bg-coffee-950/40 px-5 py-4 sm:px-6">
            <div className="mb-3 flex items-baseline justify-between">
              <span className="text-xs uppercase tracking-[0.3em] text-cream/65">
                Total
              </span>
              <span className="font-display text-2xl text-gold-300">
                {totalLabel}
              </span>
            </div>
            <button
              type="button"
              onClick={handleCheckout}
              className="inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-gradient-to-b from-emerald-400 to-emerald-600 px-5 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-coffee-950 shadow-[0_15px_40px_-15px_rgba(16,185,129,0.6)] transition-transform hover:scale-[1.01]"
            >
              <WhatsAppIcon className="h-4 w-4" />
              Pesan via WhatsApp
            </button>
            <p className="mt-2 text-center text-[10px] text-cream/45">
              Pembayaran & konfirmasi pesanan via chat WhatsApp.
            </p>
          </footer>
        )}
      </aside>
    </>
  );
}

function kindLabel(kind: "lakon" | "rekomendasi" | "mitra"): string {
  if (kind === "lakon") return "Lakon";
  if (kind === "rekomendasi") return "Rekomendasi";
  return "Produk Mitra";
}

function BagIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M5 7h14l-1.2 12.2A2 2 0 0 1 15.8 21H8.2a2 2 0 0 1-2-1.8L5 7Z" />
      <path d="M9 7V5a3 3 0 0 1 6 0v2" />
    </svg>
  );
}

function XIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      {...props}
    >
      <line x1="6" y1="6" x2="18" y2="18" />
      <line x1="18" y1="6" x2="6" y2="18" />
    </svg>
  );
}

function PlusIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      {...props}
    >
      <line x1="12" y1="6" x2="12" y2="18" />
      <line x1="6" y1="12" x2="18" y2="12" />
    </svg>
  );
}

function MinusIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      {...props}
    >
      <line x1="6" y1="12" x2="18" y2="12" />
    </svg>
  );
}

function WhatsAppIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M20.52 3.48A11.94 11.94 0 0 0 12.06 0C5.55 0 .26 5.28.26 11.78c0 2.07.54 4.1 1.57 5.88L0 24l6.49-1.7a11.84 11.84 0 0 0 5.57 1.41h.01c6.51 0 11.79-5.28 11.79-11.78a11.7 11.7 0 0 0-3.34-8.45ZM12.06 21.5h-.01a9.74 9.74 0 0 1-4.95-1.36l-.36-.21-3.85 1.01 1.03-3.75-.23-.39A9.7 9.7 0 0 1 2.34 11.78c0-5.4 4.4-9.79 9.81-9.79 2.62 0 5.08 1.02 6.93 2.87a9.71 9.71 0 0 1 2.86 6.93c0 5.4-4.4 9.79-9.88 9.79Zm5.36-7.32c-.29-.15-1.74-.86-2.01-.96-.27-.1-.47-.15-.66.15-.2.29-.76.96-.93 1.16-.17.2-.35.22-.64.07-.29-.15-1.24-.46-2.36-1.45-.87-.78-1.46-1.74-1.63-2.03-.17-.29-.02-.45.13-.6.13-.13.29-.34.43-.51.15-.17.2-.29.29-.49.1-.2.05-.37-.02-.51-.07-.15-.66-1.59-.9-2.18-.24-.57-.48-.49-.66-.5h-.56c-.2 0-.51.07-.78.37-.27.29-1.02 1-1.02 2.43 0 1.43 1.04 2.81 1.18 3 .15.2 2.05 3.13 4.97 4.39.69.3 1.23.48 1.65.62.69.22 1.32.19 1.82.12.55-.08 1.74-.71 1.99-1.4.24-.69.24-1.27.17-1.4-.07-.13-.27-.2-.56-.34Z" />
    </svg>
  );
}
