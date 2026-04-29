type Props = {
  className?: string;
};

export function Ornament({ className }: Props) {
  return (
    <svg
      viewBox="0 0 240 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <defs>
        <linearGradient id="ornGrad" x1="0%" x2="100%" y1="50%" y2="50%">
          <stop offset="0%" stopColor="#d4a24e" stopOpacity="0" />
          <stop offset="50%" stopColor="#f5d691" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#d4a24e" stopOpacity="0" />
        </linearGradient>
      </defs>
      <line x1="0" y1="16" x2="92" y2="16" stroke="url(#ornGrad)" strokeWidth="1" />
      <line x1="148" y1="16" x2="240" y2="16" stroke="url(#ornGrad)" strokeWidth="1" />
      <g transform="translate(120,16)" fill="none" stroke="#d4a24e" strokeWidth="1.1" strokeLinecap="round">
        <path d="M-22 0 Q-12 -10 0 -14 Q12 -10 22 0 Q12 10 0 14 Q-12 10 -22 0 Z" />
        <circle cx="0" cy="0" r="3.5" fill="#f5d691" stroke="none" />
        <path d="M-30 0 L-26 0 M30 0 L26 0" />
        <path d="M0 -20 L0 -16 M0 20 L0 16" opacity="0.6" />
      </g>
    </svg>
  );
}

export function SectionDivider({
  className,
  variant = "diamond",
}: Props & { variant?: "diamond" | "lotus" | "wayang" }) {
  return (
    <div
      role="separator"
      aria-hidden
      className={`relative mx-auto flex w-full max-w-6xl items-center justify-center px-5 py-10 lg:px-10 ${className ?? ""}`}
    >
      <span className="h-px flex-1 bg-gradient-to-r from-transparent via-gold-500/60 to-gold-400/30" />
      <span className="mx-4 inline-flex h-10 w-10 items-center justify-center">
        {variant === "diamond" && <DiamondMark className="h-9 w-9" />}
        {variant === "lotus" && <LotusMark className="h-10 w-10" />}
        {variant === "wayang" && <WayangMark className="h-10 w-10" />}
      </span>
      <span className="h-px flex-1 bg-gradient-to-l from-transparent via-gold-500/60 to-gold-400/30" />
    </div>
  );
}

function DiamondMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 36 36" className={className} aria-hidden>
      <defs>
        <linearGradient id="diamondMark" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f5d691" />
          <stop offset="100%" stopColor="#b8862f" />
        </linearGradient>
      </defs>
      <g fill="none" stroke="url(#diamondMark)" strokeWidth="1.1" strokeLinecap="round">
        <path d="M18 4 L30 18 L18 32 L6 18 Z" />
        <path d="M18 9 L25 18 L18 27 L11 18 Z" opacity="0.7" />
      </g>
      <circle cx="18" cy="18" r="2.4" fill="#f5d691" />
      <g stroke="#d4a24e" strokeWidth="0.8" strokeLinecap="round" opacity="0.7">
        <line x1="2" y1="18" x2="6" y2="18" />
        <line x1="30" y1="18" x2="34" y2="18" />
      </g>
    </svg>
  );
}

function LotusMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden>
      <g fill="none" stroke="#d4a24e" strokeWidth="1.1" strokeLinecap="round">
        <path d="M20 6 Q24 16 20 24 Q16 16 20 6 Z" fill="#f5d691" fillOpacity="0.18" />
        <path d="M8 14 Q14 18 20 24 Q14 20 8 14 Z" fill="#f5d691" fillOpacity="0.12" />
        <path d="M32 14 Q26 18 20 24 Q26 20 32 14 Z" fill="#f5d691" fillOpacity="0.12" />
        <circle cx="20" cy="26" r="2.2" fill="#f5d691" stroke="none" />
      </g>
    </svg>
  );
}

function WayangMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden>
      <g fill="none" stroke="#d4a24e" strokeWidth="1.1" strokeLinecap="round">
        <path d="M20 4 Q24 14 20 22 Q26 26 24 34 L20 36 L16 34 Q14 26 20 22 Q16 14 20 4 Z" fill="#f5d691" fillOpacity="0.15" />
        <circle cx="20" cy="14" r="1.4" fill="#f5d691" stroke="none" />
      </g>
    </svg>
  );
}

export function CornerMotif({ className }: Props) {
  return (
    <svg
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <g stroke="#d4a24e" strokeWidth="0.9" fill="none" opacity="0.55">
        <path d="M2 38 L2 2 L38 2" />
        <path d="M10 30 Q10 10 30 10" />
        <path d="M2 22 Q22 22 22 2" opacity="0.7" />
        <circle cx="10" cy="10" r="2.4" fill="#f5d691" stroke="none" />
        <circle cx="22" cy="2" r="1.4" fill="#d4a24e" stroke="none" opacity="0.7" />
        <circle cx="2" cy="22" r="1.4" fill="#d4a24e" stroke="none" opacity="0.7" />
      </g>
    </svg>
  );
}
