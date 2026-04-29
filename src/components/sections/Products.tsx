import { stories } from "@/data/products";
import { StoryCard } from "../ui/StoryCard";
import { Reveal } from "../ui/Reveal";
import { CornerMotif, Ornament } from "../ui/Ornament";

export function Products() {
  return (
    <section
      id="layanan"
      className="section-glow relative px-5 py-24 lg:px-10"
    >
      <CornerMotif className="absolute left-6 top-8 h-12 w-12 opacity-70" />
      <CornerMotif className="absolute right-6 top-8 h-12 w-12 -scale-x-100 opacity-70" />
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="mb-14 flex flex-col items-center gap-3 text-center">
            <Ornament className="mb-2 w-44 opacity-80" />
            <span className="text-[11px] uppercase tracking-[0.45em] text-gold-400/80">
              Lakon Pilihan
            </span>
            <h2 className="font-display text-4xl tracking-tight text-cream sm:text-5xl md:text-6xl">
              Satyantara&rsquo;s Products
            </h2>
            <p className="max-w-2xl text-parchment/75">
              Tiga lakon yang menjadi pintu masuk pengalaman budaya — dari
              kelahiran sang Werkudara hingga lima saudara penegak dharma.
            </p>
            <div className="gold-divider mt-4 w-full max-w-md" />
          </div>
        </Reveal>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {stories.map((s, i) => (
            <StoryCard
              key={s.slug}
              index={i}
              slug={s.slug}
              title={s.title}
              subtitle={s.subtitle}
              price={s.price}
              delay={i * 120}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
