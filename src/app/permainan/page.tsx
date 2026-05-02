import type { Metadata } from "next";
import { AppShell } from "@/components/AppShell";
import { Navbar } from "@/components/sections/Navbar";
import { GuessWayangGame } from "@/components/sections/GuessWayangGame";
import { Footer } from "@/components/sections/Footer";

export const metadata: Metadata = {
  title: "Permainan Tebak Tokoh Wayang — SATYANTARA",
  description:
    "Permainan edukasi: tebak tokoh wayang dari petunjuk singkat. Asah pengetahuan tentang Pandawa, Kurawa, Punakawan, dan Dewa-Pahlawan.",
};

export default function PermainanPage() {
  return (
    <AppShell>
      <Navbar />
      <main>
        <GuessWayangGame />
      </main>
      <Footer />
    </AppShell>
  );
}
