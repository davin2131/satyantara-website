import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { HeroCarousel } from "@/components/sections/HeroCarousel";
import { AboutBrief } from "@/components/sections/AboutBrief";
import { Products } from "@/components/sections/Products";
import { ProductDetail } from "@/components/sections/ProductDetail";
import { Recommendations } from "@/components/sections/Recommendations";
import { ProductMitra } from "@/components/sections/ProductMitra";
import { TentangKami } from "@/components/sections/TentangKami";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <HeroCarousel />
        <AboutBrief />
        <Products />
        <ProductDetail />
        <Recommendations />
        <ProductMitra />
        <TentangKami />
      </main>
      <Footer />
    </>
  );
}
