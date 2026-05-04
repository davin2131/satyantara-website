"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useCart } from "../cart/CartContext";
import { siteCopy } from "@/data/site";

type NavItem = {
  label: string;
  href: string;
  /** When true, render with next/link (real page navigation) instead of an anchor link. */
  page?: boolean;
};

type ExploreItem = {
  label: string;
  href: string;
  description: string;
  thumb: string;
};

const navItems: NavItem[] = [
  { label: "Beranda", href: "#beranda" },
  { label: "Jadwal", href: "/jadwal", page: true },
  { label: "FAQ", href: "/faq", page: true },
  { label: "Tentang Kami", href: "/tentang-kami", page: true },
];

type ExploreKey = "galeri" | "ensiklopedia" | "peta" | "permainan";

const defaultExploreThumbs: Record<ExploreKey, string> = {
  galeri: "/wayang/bima.jpg",
  ensiklopedia: "/wayang/arjuna.jpg",
  peta: "/provinces/jawa-tengah.jpg",
  permainan: "/wayang/anoman.jpg",
};

const baseExploreItems: (ExploreItem & { key: ExploreKey })[] = [
  {
    key: "galeri",
    label: "Galeri",
    href: "/galeri",
    description: "Arsip foto pertunjukan wayang, workshop, dan momen sanggar.",
    thumb: defaultExploreThumbs.galeri,
  },
  {
    key: "ensiklopedia",
    label: "Ensiklopedia Wayang",
    href: "/ensiklopedia-wayang",
    description: "15 tokoh: Pandawa, Kurawa, Punakawan, Dewa & Pahlawan.",
    thumb: defaultExploreThumbs.ensiklopedia,
  },
  {
    key: "peta",
    label: "Peta Budaya",
    href: "/peta-budaya",
    description: "38 provinsi Indonesia: tarian, musik, rumah adat, kuliner.",
    thumb: defaultExploreThumbs.peta,
  },
  {
    key: "permainan",
    label: "Permainan",
    href: "/permainan",
    description: "Tebak Tokoh — gamifikasi edukasi, 10 soal acak per sesi.",
    thumb: defaultExploreThumbs.permainan,
  },
];

/**
 * Resolve the URL for an anchor-style nav item so it works from any route.
 * On the home page we keep plain `#anchor` (smooth scroll, no full reload).
 * On other routes we use `/` + `#anchor` and rely on next/link for SPA-style nav.
 */
function resolveAnchor(href: string, pathname: string | null): string {
  if (!href.startsWith("#")) return href;
  return pathname === "/" ? href : `/${href}`;
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [exploreOpen, setExploreOpen] = useState(false);
  const [exploreMobileOpen, setExploreMobileOpen] = useState(false);
  const pathname = usePathname();
  const { count, openCart } = useCart();

  const navbar = siteCopy.navbar;
  const exploreItems: ExploreItem[] = baseExploreItems.map((item) => {
    const override = navbar.exploreThumbs?.[item.key];
    return {
      label: item.label,
      href: item.href,
      description: item.description,
      thumb: override?.url ?? item.thumb,
    };
  });
  const isExploreActive = exploreItems.some((item) => pathname === item.href);

  // Trivia rotasi di footer mega-menu. Pakai array kalau ada, fallback ke
  // exploreFooterNote (legacy single string) kalau array kosong.
  const triviaList: string[] =
    navbar.exploreFooterNotes && navbar.exploreFooterNotes.length > 0
      ? navbar.exploreFooterNotes
      : navbar.exploreFooterNote
        ? [navbar.exploreFooterNote]
        : [];
  const [triviaIndex, setTriviaIndex] = useState(0);
  const [triviaVisible, setTriviaVisible] = useState(true);

  // Cart hanya relevan di halaman komersial (Beranda).
  // Tetap muncul kalau ada item, supaya user bisa checkout dari mana saja.
  const showCart = pathname === "/" || count > 0;

  // Refs untuk click-outside dan focus management.
  const desktopWrapperRef = useRef<HTMLLIElement | null>(null);
  const exploreButtonRef = useRef<HTMLButtonElement | null>(null);
  const megapanelRef = useRef<HTMLDivElement | null>(null);
  const closeTimerRef = useRef<number | null>(null);

  // Hover dengan delay supaya cursor sempat masuk dari trigger ke panel
  // (mega-menu pattern: open instan, close debounced ~140ms).
  const cancelHoverClose = () => {
    if (closeTimerRef.current !== null) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  };
  const openExploreHover = () => {
    cancelHoverClose();
    setExploreOpen(true);
  };
  const scheduleExploreClose = () => {
    cancelHoverClose();
    closeTimerRef.current = window.setTimeout(() => {
      setExploreOpen(false);
      closeTimerRef.current = null;
    }, 140);
  };

  // Cleanup timer saat unmount.
  useEffect(() => {
    return () => {
      if (closeTimerRef.current !== null) {
        window.clearTimeout(closeTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Tutup semua menu otomatis saat route berganti.
  useEffect(() => {
    /* eslint-disable react-hooks/set-state-in-effect */
    setMobileOpen(false);
    setExploreOpen(false);
    setExploreMobileOpen(false);
    /* eslint-enable react-hooks/set-state-in-effect */
  }, [pathname]);

  // Esc close (desktop mega-panel + mobile drawer).
  useEffect(() => {
    if (!exploreOpen && !mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (exploreOpen) {
          setExploreOpen(false);
          exploreButtonRef.current?.focus();
        }
        if (mobileOpen) setMobileOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [exploreOpen, mobileOpen]);

  // Click-outside untuk mega-panel desktop.
  useEffect(() => {
    if (!exploreOpen) return;
    const onClick = (e: MouseEvent) => {
      const wrapper = desktopWrapperRef.current;
      const panel = megapanelRef.current;
      const target = e.target as Node;
      if (wrapper?.contains(target)) return;
      if (panel?.contains(target)) return;
      setExploreOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [exploreOpen]);

  // Rotasi trivia di footer mega-menu: hanya jalan saat panel terbuka,
  // ganti tiap 5 detik dengan fade transition (220ms fade-out → swap → fade-in).
  useEffect(() => {
    if (!exploreOpen) return;
    if (triviaList.length <= 1) return;
    const interval = window.setInterval(() => {
      setTriviaVisible(false);
      window.setTimeout(() => {
        setTriviaIndex((i) => (i + 1) % triviaList.length);
        setTriviaVisible(true);
      }, 220);
    }, 5000);
    return () => window.clearInterval(interval);
  }, [exploreOpen, triviaList.length]);

  // Body scroll lock saat mobile drawer terbuka.
  useEffect(() => {
    if (typeof document === "undefined") return;
    const previous = document.body.style.overflow;
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = previous;
    };
  }, [mobileOpen]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-coffee-950/85 backdrop-blur-md border-b border-gold-500/20"
          : "bg-coffee-900/40 backdrop-blur-sm border-b border-transparent"
      }`}
    >
      <nav
        className="relative mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-2.5 sm:gap-6 sm:px-6 sm:py-3 md:px-8 lg:px-10"
        aria-label="Navigasi utama"
      >
        <Link
          href={pathname === "/" ? "#beranda" : "/#beranda"}
          className="flex min-h-[44px] items-center"
          aria-label="Satyantara — beranda"
        >
          <Image
            src="/satyantara-logo.png"
            alt="SATYANTARA"
            width={773}
            height={256}
            priority
            className="h-10 w-auto drop-shadow-[0_0_18px_rgba(212,162,78,0.35)] sm:h-12"
          />
        </Link>

        <ul className="hidden items-center gap-7 lg:flex xl:gap-9">
          {/* Beranda */}
          <li>
            <Link
              href={resolveAnchor("#beranda", pathname)}
              className="group relative text-[12px] font-medium uppercase tracking-[0.24em] text-cream/90 transition-colors hover:text-gold-300 xl:text-[13px] xl:tracking-[0.28em]"
            >
              Beranda
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-gold-400 transition-all duration-500 group-hover:w-full" />
            </Link>
          </li>

          {/* Eksplorasi (mega-menu trigger) */}
          <li
            ref={desktopWrapperRef}
            onMouseEnter={openExploreHover}
            onMouseLeave={scheduleExploreClose}
            onFocus={openExploreHover}
            className="relative"
          >
            <button
              ref={exploreButtonRef}
              type="button"
              aria-haspopup="true"
              aria-expanded={exploreOpen}
              aria-controls="megamenu-eksplorasi"
              onClick={() => setExploreOpen((v) => !v)}
              className={`group relative inline-flex items-center gap-1.5 text-[12px] font-medium uppercase tracking-[0.24em] transition-colors xl:text-[13px] xl:tracking-[0.28em] ${
                isExploreActive || exploreOpen
                  ? "text-gold-300"
                  : "text-cream/90 hover:text-gold-300"
              }`}
            >
              {navbar.exploreLabel}
              <ChevronDownIcon
                className={`h-3 w-3 transition-transform duration-300 ${
                  exploreOpen ? "rotate-180" : ""
                }`}
              />
              <span
                className={`absolute -bottom-1 left-0 h-px bg-gold-400 transition-all duration-500 ${
                  isExploreActive || exploreOpen ? "w-full" : "w-0 group-hover:w-full"
                }`}
              />
            </button>
          </li>

          {/* Jadwal, FAQ, Tentang Kami */}
          {navItems.slice(1).map((item) => (
            <li key={item.href}>
              <Link
                href={item.page ? item.href : resolveAnchor(item.href, pathname)}
                className={`group relative text-[12px] font-medium uppercase tracking-[0.24em] transition-colors xl:text-[13px] xl:tracking-[0.28em] ${
                  pathname === item.href
                    ? "text-gold-300"
                    : "text-cream/90 hover:text-gold-300"
                }`}
              >
                {item.label}
                <span
                  className={`absolute -bottom-1 left-0 h-px bg-gold-400 transition-all duration-500 ${
                    pathname === item.href ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2 sm:gap-3">
          {showCart && (
            <button
              type="button"
              aria-label={`Keranjang (${count} item)`}
              onClick={openCart}
              className="relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-gold-500/30 text-cream/90 transition-all hover:border-gold-400 hover:text-gold-300"
            >
              <BagIcon className="h-4 w-4" />
              {count > 0 && (
                <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-gold-500 px-1 text-[10px] font-semibold text-coffee-950">
                  {count}
                </span>
              )}
            </button>
          )}

          <button
            type="button"
            aria-label={mobileOpen ? "Tutup menu" : "Buka menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-drawer"
            onClick={() => setMobileOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-gold-500/30 text-cream/90 transition hover:border-gold-400 lg:hidden"
          >
            {mobileOpen ? <XIcon className="h-4 w-4" /> : <MenuIcon className="h-4 w-4" />}
          </button>
        </div>
      </nav>

      {/* Desktop mega-menu panel */}
      <div
        id="megamenu-eksplorasi"
        ref={megapanelRef}
        role="region"
        aria-label={navbar.exploreLabel}
        aria-hidden={!exploreOpen}
        onMouseEnter={openExploreHover}
        onMouseLeave={scheduleExploreClose}
        className={`absolute inset-x-0 top-full hidden overflow-hidden border-b border-gold-500/20 bg-coffee-950/97 backdrop-blur-md shadow-[0_30px_60px_-20px_rgba(0,0,0,0.7)] transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] lg:block ${
          exploreOpen
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-2 opacity-0"
        }`}
      >
        <div className="mx-auto grid max-w-7xl gap-9 px-8 pb-10 pt-8 lg:px-10 lg:grid-cols-[280px_1fr]">
          <aside className="border-r border-gold-500/15 pr-6">
            <p className="mb-2.5 text-[10px] font-semibold uppercase tracking-[0.36em] text-gold-300">
              {navbar.exploreEyebrow}
            </p>
            <h2 className="mb-3 whitespace-pre-line font-display text-[28px] leading-[1.15] text-cream">
              {navbar.exploreTitle}
            </h2>
            <p className="text-[13px] leading-[1.55] text-parchment/90">
              {navbar.exploreBody}
            </p>
          </aside>

          <div>
            <ul className="grid gap-3 sm:grid-cols-2">
              {exploreItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setExploreOpen(false)}
                    className="group flex items-center gap-4 rounded-2xl border border-gold-500/15 bg-coffee-900/40 p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-gold-400/45 hover:bg-coffee-900/70 hover:shadow-[0_18px_36px_-18px_rgba(212,162,78,0.45)]"
                  >
                    <span
                      className="h-16 w-16 flex-none rounded-xl border border-gold-500/20 bg-cover bg-center bg-no-repeat shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)]"
                      style={{ backgroundImage: `url('${item.thumb}')` }}
                      aria-hidden
                    />
                    <span className="flex-1">
                      <span className="block font-display text-[17px] leading-tight text-cream group-hover:text-gold-100">
                        {item.label}
                      </span>
                      <span className="mt-1 block text-[12.5px] leading-[1.5] text-parchment/85">
                        {item.description}
                      </span>
                    </span>
                    <span className="text-gold-300 transition-transform duration-300 group-hover:translate-x-1" aria-hidden>
                      →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            {triviaList.length > 0 ? (
              <div
                className="mt-5 border-t border-gold-500/15 pt-4"
                role="region"
                aria-live="polite"
                aria-atomic="true"
              >
                <p
                  className={`min-h-[1.5em] text-[12px] text-parchment/80 transition-opacity duration-200 ease-out ${
                    triviaVisible ? "opacity-100" : "opacity-0"
                  }`}
                >
                  {triviaList[triviaIndex] ?? triviaList[0]}
                </p>
              </div>
            ) : null}
          </div>
        </div>
      </div>

      {/* Mobile drawer + backdrop */}
      <button
        type="button"
        aria-hidden={!mobileOpen}
        tabIndex={-1}
        onClick={() => setMobileOpen(false)}
        className={`fixed inset-0 top-[var(--nav-h,64px)] z-40 cursor-default bg-coffee-950/60 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          mobileOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
        style={{ top: 64 }}
      />
      <div
        id="mobile-drawer"
        aria-hidden={!mobileOpen}
        className={`absolute inset-x-0 top-full overflow-hidden border-t border-gold-500/15 bg-coffee-950/97 backdrop-blur-md transition-[max-height,opacity] duration-500 lg:hidden ${
          mobileOpen
            ? "max-h-[calc(100dvh-64px)] opacity-100"
            : "pointer-events-none max-h-0 opacity-0"
        }`}
      >
        <div className="mx-auto flex max-h-[calc(100dvh-64px)] max-w-7xl flex-col gap-1 overflow-y-auto px-5 py-4">
          {/* Beranda */}
          <Link
            href={resolveAnchor("#beranda", pathname)}
            onClick={() => setMobileOpen(false)}
            className="block rounded-lg px-3 py-3 text-sm font-medium uppercase tracking-[0.28em] text-cream/90 transition hover:bg-gold-500/10 hover:text-gold-300"
          >
            Beranda
          </Link>

          {/* Eksplorasi (accordion) */}
          <div className="rounded-lg">
            <button
              type="button"
              aria-expanded={exploreMobileOpen}
              aria-controls="mobile-explore"
              onClick={() => setExploreMobileOpen((v) => !v)}
              className="flex w-full items-center justify-between gap-3 rounded-lg px-3 py-3 text-left text-sm font-medium uppercase tracking-[0.28em] text-cream/90 transition hover:bg-gold-500/10 hover:text-gold-300"
            >
              <span>{navbar.exploreLabel}</span>
              <ChevronDownIcon
                className={`h-3.5 w-3.5 flex-none transition-transform duration-300 ${
                  exploreMobileOpen ? "rotate-180 text-gold-300" : ""
                }`}
              />
            </button>
            <div
              id="mobile-explore"
              aria-hidden={!exploreMobileOpen}
              className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                exploreMobileOpen
                  ? "grid-rows-[1fr] opacity-100"
                  : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <ul className="space-y-1 px-1 pb-2 pt-1">
                  {exploreItems.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={() => setMobileOpen(false)}
                        className="flex items-center gap-3 rounded-lg border border-gold-500/15 bg-coffee-900/50 px-3 py-2.5 transition hover:border-gold-400/40 hover:bg-coffee-900/80"
                      >
                        <span
                          className="h-10 w-10 flex-none rounded-md border border-gold-500/20 bg-cover bg-center"
                          style={{ backgroundImage: `url('${item.thumb}')` }}
                          aria-hidden
                        />
                        <span className="flex-1">
                          <span className="block font-display text-[15px] text-cream">
                            {item.label}
                          </span>
                          <span className="mt-0.5 block text-[12px] leading-snug text-parchment/85">
                            {item.description}
                          </span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Jadwal, FAQ, Tentang Kami */}
          {navItems.slice(1).map((item) => (
            <Link
              key={item.href}
              href={item.page ? item.href : resolveAnchor(item.href, pathname)}
              onClick={() => setMobileOpen(false)}
              className="block rounded-lg px-3 py-3 text-sm font-medium uppercase tracking-[0.28em] text-cream/90 transition hover:bg-gold-500/10 hover:text-gold-300"
            >
              {item.label}
            </Link>
          ))}

        </div>
      </div>
    </header>
  );
}

function BagIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  );
}

function MenuIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      {...props}
    >
      <line x1="4" y1="7" x2="20" y2="7" />
      <line x1="4" y1="12" x2="20" y2="12" />
      <line x1="4" y1="17" x2="20" y2="17" />
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
      <line x1="6" y1="18" x2="18" y2="6" />
    </svg>
  );
}

function ChevronDownIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}


