"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type CartKind = "lakon" | "rekomendasi" | "mitra";

export type CartItem = {
  id: string; // unique key: `${kind}:${slug}` or `${kind}:${slug}:${bookingDate}`
  kind: CartKind;
  slug: string;
  name: string;
  priceLabel: string;
  priceValue: number; // numeric IDR
  pricePer?: string;
  imageUrl?: string;
  /** ISO date (YYYY-MM-DD) when this item is for a date-bound booking. */
  bookingDate?: string;
  qty: number;
};

type CartCtx = {
  items: CartItem[];
  count: number;
  totalValue: number;
  totalLabel: string;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (item: Omit<CartItem, "qty"> & { qty?: number }) => void;
  removeItem: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
};

const CartContext = createContext<CartCtx | null>(null);

const STORAGE_KEY = "satyantara.cart.v1";

export function parsePriceIDR(label: string): number {
  if (!label) return 0;
  // Strip non-digit chars (Rp, spaces, dots, commas)
  const digits = label.replace(/[^0-9]/g, "");
  return digits ? Number.parseInt(digits, 10) : 0;
}

export function formatIDR(value: number): string {
  if (!Number.isFinite(value) || value <= 0) return "Rp 0";
  return `Rp ${value.toLocaleString("id-ID")}`;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [isOpen, setOpen] = useState(false);

  // Hydrate from localStorage on mount (client-only). setState here is intentional:
  // we cannot read localStorage during SSR, so initial state is `[]` and we
  // overwrite it after mount.
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as CartItem[];
        // eslint-disable-next-line react-hooks/set-state-in-effect
        if (Array.isArray(parsed)) setItems(parsed);
      }
    } catch {
      // ignore
    }
    setHydrated(true);
  }, []);

  // Persist on change (after hydration)
  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // ignore (quota / private mode)
    }
  }, [items, hydrated]);

  const addItem: CartCtx["addItem"] = useCallback((entry) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === entry.id);
      if (existing) {
        return prev.map((i) =>
          i.id === entry.id ? { ...i, qty: i.qty + (entry.qty ?? 1) } : i,
        );
      }
      return [...prev, { ...entry, qty: entry.qty ?? 1 }];
    });
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const setQty = useCallback((id: string, qty: number) => {
    setItems((prev) =>
      qty <= 0
        ? prev.filter((i) => i.id !== id)
        : prev.map((i) => (i.id === id ? { ...i, qty } : i)),
    );
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const openCart = useCallback(() => setOpen(true), []);
  const closeCart = useCallback(() => setOpen(false), []);

  const totalValue = useMemo(
    () => items.reduce((sum, i) => sum + i.priceValue * i.qty, 0),
    [items],
  );
  const count = useMemo(
    () => items.reduce((sum, i) => sum + i.qty, 0),
    [items],
  );

  const value: CartCtx = {
    items,
    count,
    totalValue,
    totalLabel: formatIDR(totalValue),
    isOpen,
    openCart,
    closeCart,
    addItem,
    removeItem,
    setQty,
    clear,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
