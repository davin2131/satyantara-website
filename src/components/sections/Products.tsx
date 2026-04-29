import { stories } from "@/data/products";
import { StoryCard } from "../ui/StoryCard";
import { Reveal } from "../ui/Reveal";
import { CornerMotif, Ornament } from "../ui/Ornament";

export function Products() {
  return (
    <section
      id="layanan"
      className="section-glow relative px-4 py-16 sm:px-6 sm:py-20 md:px-8 lg:px-10 lg:py-24"
    >
      <CornerMotif className="absolute left-3 top-5 h-8 w-8 opacity-60 sm:left-6 sm:top-8 sm:h-12 sm:w-12 sm:opacity-70" />
      <CornerMotif className="absolute right-3 top-5 h-8 w-8 -scale-x-100 opacity-60 sm:right-6 sm:top-8 sm:h-12 sm:w-12 sm:opacity-70" />
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="mb-10 flex flex-col items-center gap-3 text-center sm:mb-14">
            <Ornament className="mb-2 w-32 opacity-80 sm:w-44" />
            <span className="text-[10px] uppercase tracking-[0.4em] text-gold-400/80 sm:text-[11px] sm:tracking-[0.45em]">
              Lakon Pilihan
            </span>
            <h2 className="font-display text-3xl leading-tight tracking-tight text-cream min-[400px]:text-4xl sm:text-5xl md:text-6xl">
              Satyantara&rsquo;s Products
            </h2>
            <p className="max-w-2xl text-sm text-parchment/75 sm:text-base">
              Tiga lakon yang menjadi pintu masuk pengalaman budaya — dari
              kelahiran sang Werkudara hingga lima saudara penegak dharma.
            </p>
            <div className="gold-divider mt-4 w-full max-w-md" />
          </div>
        </Reveal>

        <div className="grid items-stretch gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
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
