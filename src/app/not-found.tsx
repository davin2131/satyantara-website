import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { AppShell } from "@/components/AppShell";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";

export const metadata: Metadata = {
  title: "Halaman Tidak Ditemukan — SATYANTARA",
  description:
    "Halaman yang kamu cari tidak ada atau sudah dipindahkan. Kembali ke beranda SATYANTARA.",
};

export default function NotFound() {
  return (
    <AppShell>
      <Navbar />
      <main className="relative flex min-h-[100svh] items-center justify-center px-4 pb-16 pt-28 sm:px-6 sm:pb-20 sm:pt-32">
        <div
          className="pointer-events-none absolute inset-0 -z-10 opacity-60"
          style={{
            backgroundImage:
              "radial-gradient(ellipse at 50% 30%, rgba(212,162,78,0.18) 0%, rgba(212,162,78,0) 60%)",
          }}
        />
        <div className="relative mx-auto flex max-w-2xl flex-col items-center gap-6 text-center sm:gap-8">
          <p className="flex items-center gap-2 text-[9px] font-medium uppercase tracking-[0.4em] text-gold-400 sm:gap-3 sm:text-[11px] sm:tracking-[0.5em]">
            <span className="h-px w-6 bg-gold-500/60 sm:w-10" />
            Lakon Tersesat
            <span className="h-px w-6 bg-gold-500/60 sm:w-10" />
          </p>

          <Image
            src="/satyantara-hero-logo.png"
            alt="SATYANTARA"
            width={713}
            height={556}
            priority
            className="h-32 w-auto opacity-90 drop-shadow-[0_0_40px_rgba(212,162,78,0.4)] sm:h-44"
          />

          <h1 className="font-display text-5xl leading-none text-cream sm:text-7xl">
            <span className="shimmer-text">404</span>
          </h1>

          <h2 className="font-display text-2xl leading-tight text-cream sm:text-3xl">
            Halaman Tidak Ditemukan
          </h2>

          <p className="max-w-md text-sm leading-relaxed text-parchment/90 sm:text-base">
            Sepertinya lakon yang kamu cari belum dimainkan, atau dalang kami sudah memindahkannya ke panggung lain. Jangan khawatir — pintu menuju cerita SATYANTARA selalu terbuka.
          </p>

          <div className="mt-2 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Link
              href="/"
              className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full bg-gradient-to-b from-gold-300 to-gold-500 px-6 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-coffee-950 shadow-[0_10px_30px_-8px_rgba(212,162,78,0.6)] transition hover:from-gold-400 hover:to-gold-600 sm:px-7 sm:text-sm"
            >
              Kembali ke Beranda
            </Link>
            <Link
              href="/peta-budaya"
              className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full border border-gold-500/40 px-6 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-cream transition hover:border-gold-300 hover:bg-gold-500/10 hover:text-gold-200 sm:px-7 sm:text-sm"
            >
              Jelajah Peta Budaya
            </Link>
          </div>

          <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-parchment/80 sm:text-sm">
            <li>
              <Link href="/galeri" className="hover:text-gold-300">
                Galeri
              </Link>
            </li>
            <li>
              <Link href="/ensiklopedia-wayang" className="hover:text-gold-300">
                Ensiklopedia
              </Link>
            </li>
            <li>
              <Link href="/permainan" className="hover:text-gold-300">
                Permainan
              </Link>
            </li>
            <li>
              <Link href="/faq" className="hover:text-gold-300">
                FAQ
              </Link>
            </li>
          </ul>
        </div>
      </main>
      <Footer />
    </AppShell>
  );
}
