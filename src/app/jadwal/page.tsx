import type { Metadata } from "next";
import { AppShell } from "@/components/AppShell";
import { Navbar } from "@/components/sections/Navbar";
import { JadwalAcara } from "@/components/sections/JadwalAcara";
import { Footer } from "@/components/sections/Footer";

export const metadata: Metadata = {
  title: "Jadwal Acara — SATYANTARA",
  description:
    "Jadwal pertunjukan wayang, workshop, festival, dan acara budaya dari SATYANTARA dan sanggar mitra di Solo (Surakarta).",
};

export default function JadwalPage() {
  return (
    <AppShell>
      <Navbar />
      <main>
        <JadwalAcara />
      </main>
      <Footer />
    </AppShell>
  );
}
