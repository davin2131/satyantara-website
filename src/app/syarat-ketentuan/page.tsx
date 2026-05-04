import type { Metadata } from "next";
import { AppShell } from "@/components/AppShell";
import { Navbar } from "@/components/sections/Navbar";
import { LegalPageView } from "@/components/sections/LegalPageView";
import { Footer } from "@/components/sections/Footer";
import { getLegalPage, legalPages } from "@/data/legal";

export const metadata: Metadata = {
  title: "Syarat & Ketentuan — SATYANTARA",
  description:
    "Syarat & Ketentuan penggunaan situs SATYANTARA: aturan pemesanan paket lakon, workshop, hak cipta, dan tanggung jawab pengguna.",
};

export default function SyaratPage() {
  const page = getLegalPage(
    "terms",
    legalPages.find((p) => p.kind === "terms") ?? legalPages[0],
  );
  return (
    <AppShell>
      <Navbar />
      <main>
        <LegalPageView page={page} />
      </main>
      <Footer />
    </AppShell>
  );
}
