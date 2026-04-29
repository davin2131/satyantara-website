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
