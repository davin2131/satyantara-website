import type { Metadata } from "next";
import { AppShell } from "@/components/AppShell";
import { Navbar } from "@/components/sections/Navbar";
import { FAQ } from "@/components/sections/FAQ";
import { Footer } from "@/components/sections/Footer";

export const metadata: Metadata = {
  title: "FAQ — SATYANTARA",
  description:
    "Pertanyaan yang sering diajukan tentang SATYANTARA: workshop wayang, paket lakon Bima Bungkus dan Anoman Obong, harga, jadwal, lokasi sanggar, dan cara pemesanan via WhatsApp.",
};

export default function FaqPage() {
  return (
    <AppShell>
      <Navbar />
      <main>
        <FAQ />
      </main>
      <Footer />
    </AppShell>
  );
}
