import { Reveal } from "../ui/Reveal";
import { siteCopy } from "@/data/site";

function toEmbedUrl(url: string): string | null {
  try {
    const u = new URL(url);
    const host = u.hostname.replace(/^www\./, "");
    if (host === "youtu.be") {
      const id = u.pathname.slice(1);
      return id ? `https://www.youtube.com/embed/${id}` : null;
    }
    if (host === "youtube.com" || host === "m.youtube.com") {
      const id = u.searchParams.get("v");
      if (id) return `https://www.youtube.com/embed/${id}`;
      const shortsMatch = u.pathname.match(/^\/(?:shorts|embed)\/([^/?]+)/);
      if (shortsMatch) return `https://www.youtube.com/embed/${shortsMatch[1]}`;
      return null;
    }
    if (host === "vimeo.com" || host === "player.vimeo.com") {
      const id = u.pathname.split("/").filter(Boolean).pop();
      return id ? `https://player.vimeo.com/video/${id}` : null;
    }
    return null;
  } catch {
    return null;
  }
}

export function AboutBrief() {
  const c = siteCopy.aboutBrief;
  const embedUrl = c.mediaVideoUrl ? toEmbedUrl(c.mediaVideoUrl) : null;
  const hasMedia = Boolean(embedUrl || c.mediaImageUrl);
  return (
    <section className="section-glow relative px-4 py-10 sm:px-6 sm:py-12 md:px-8 lg:px-10 lg:py-16">
      <div className="mx-auto grid max-w-6xl items-center gap-8 sm:gap-12 md:grid-cols-2">
        <Reveal>
          <p className="mb-3 text-[10px] uppercase tracking-[0.4em] text-gold-400/80 sm:text-[11px] sm:tracking-[0.45em]">
            {c.eyebrow}
          </p>
          {hasMedia ? (
            <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-gold-500/20 bg-coffee-900 shadow-[0_30px_60px_-25px_rgba(0,0,0,0.7)]">
              {embedUrl ? (
                <iframe
                  src={embedUrl}
                  title="AboutBrief video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 h-full w-full"
                />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={c.mediaImageUrl}
                  alt={c.mediaImageAlt ?? c.headingLine2}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              )}
            </div>
          ) : (
            <h2 className="font-display text-3xl leading-[1.1] text-cream min-[400px]:text-4xl sm:text-6xl md:text-7xl">
              <span className="block text-xl font-medium uppercase tracking-[0.25em] text-cream/85 min-[400px]:text-2xl min-[400px]:tracking-[0.3em] sm:text-4xl">
                {c.headingLine1}
              </span>
              <span className="mt-2 block">{c.headingLine2}</span>
              <span className="block text-gold-400">{c.headingLine3}</span>
            </h2>
          )}
        </Reveal>

        <Reveal delay={120}>
          <div className="relative">
            <span className="absolute -left-4 top-0 h-full w-px bg-gradient-to-b from-gold-500/60 via-gold-400/30 to-transparent" />
            <p className="text-sm leading-relaxed text-parchment/85 sm:text-lg">
              {c.body}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-4 text-[10px] uppercase tracking-[0.28em] text-cream/70 sm:mt-8 sm:gap-6 sm:text-xs sm:tracking-[0.32em]">
              {c.stats.map((s) => (
                <Stat key={s.label} label={s.label} value={s.value} />
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex items-baseline gap-2">
      <span className="font-display text-2xl text-gold-300 sm:text-3xl">{value}</span>
      <span>{label}</span>
    </div>
  );
}
