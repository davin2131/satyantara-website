import type { Metadata } from "next";
import { AppShell } from "@/components/AppShell";
import { Navbar } from "@/components/sections/Navbar";
import { LegalPageView } from "@/components/sections/LegalPageView";
import { Footer } from "@/components/sections/Footer";
import { getLegalPage, legalPages } from "@/data/legal";

export const metadata: Metadata = {
  title: "Kebijakan Privasi — SATYANTARA",
  description:
    "Kebijakan Privasi SATYANTARA: bagaimana kami mengumpulkan, menggunakan, dan melindungi informasi pribadi pengunjung situs.",
};

export default function PrivasiPage() {
  const page = getLegalPage("privacy", legalPages[0]);
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
