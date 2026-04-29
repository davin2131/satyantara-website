import { AppShell } from "@/components/AppShell";
import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { HeroCarousel } from "@/components/sections/HeroCarousel";
import { AboutBrief } from "@/components/sections/AboutBrief";
import { Products } from "@/components/sections/Products";
import { Recommendations } from "@/components/sections/Recommendations";
import { ProductMitra } from "@/components/sections/ProductMitra";
import { TentangKami } from "@/components/sections/TentangKami";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <AppShell>
      <Navbar />
      <main>
        <Hero />
        <HeroCarousel />
        <AboutBrief />
        <Products />
        <Recommendations />
        <ProductMitra />
        <TentangKami />
      </main>
      <Footer />
    </AppShell>
  );
}
