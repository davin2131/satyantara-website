import type { SVGProps } from "react";

export function Gunungan({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 400 480"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Ornamen Gunungan Wayang"
      className={className}
      {...props}
    >
      <defs>
        <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f5d691" />
          <stop offset="50%" stopColor="#d4a24e" />
          <stop offset="100%" stopColor="#b8862f" />
        </linearGradient>
        <radialGradient id="goldGlow" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor="#f2c97c" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#f2c97c" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Soft golden halo */}
      <ellipse cx="200" cy="240" rx="190" ry="220" fill="url(#goldGlow)" />

      {/* Three peaks */}
      <g fill="url(#goldGrad)" stroke="#7a4d18" strokeWidth="1.2">
        {/* Left peak */}
        <path d="M85 410 L85 250 Q85 190 130 140 L160 110 Q165 105 168 115 L168 410 Z" />
        {/* Right peak */}
        <path d="M315 410 L315 250 Q315 190 270 140 L240 110 Q235 105 232 115 L232 410 Z" />
        {/* Center tall peak */}
        <path d="M168 410 L168 200 Q168 120 200 60 Q232 120 232 200 L232 410 Z" />
      </g>

      {/* Inner filigree — center peak */}
      <g
        fill="none"
        stroke="#3d2817"
        strokeWidth="1.6"
        strokeLinecap="round"
        opacity="0.9"
      >
        <path d="M200 90 Q210 130 200 170 Q190 130 200 90 Z" />
        <circle cx="200" cy="200" r="14" />
        <path d="M186 200 Q200 220 214 200" />
        <path d="M186 200 Q200 180 214 200" />
        <path d="M170 240 Q200 270 230 240" />
        <path d="M170 280 Q185 295 200 280 Q215 295 230 280" />
        <path d="M180 320 L200 310 L220 320" />
        <path d="M180 320 L200 330 L220 320" />
        <path d="M185 360 Q200 350 215 360 Q200 380 185 360 Z" />
      </g>

      {/* Inner filigree — side peaks */}
      <g
        fill="none"
        stroke="#3d2817"
        strokeWidth="1.4"
        strokeLinecap="round"
        opacity="0.85"
      >
        <path d="M105 200 Q120 220 140 200" />
        <path d="M105 240 Q120 260 140 240" />
        <path d="M100 290 Q122 310 145 290" />
        <path d="M100 340 Q122 360 145 340" />
        <circle cx="122" cy="170" r="6" />

        <path d="M260 200 Q280 220 295 200" />
        <path d="M260 240 Q280 260 295 240" />
        <path d="M255 290 Q278 310 300 290" />
        <path d="M255 340 Q278 360 300 340" />
        <circle cx="278" cy="170" r="6" />
      </g>

      {/* Door / candi at base */}
      <g fill="#7a4d18">
        <rect x="178" y="380" width="44" height="50" rx="3" />
      </g>
      <g
        fill="none"
        stroke="#f5d691"
        strokeWidth="1.2"
        strokeLinecap="round"
      >
        <path d="M183 430 L183 392 Q183 386 200 386 Q217 386 217 392 L217 430" />
        <path d="M200 393 L200 425" />
      </g>

      {/* Base shadow */}
      <ellipse cx="200" cy="445" rx="120" ry="8" fill="#1a0f06" opacity="0.6" />
    </svg>
  );
}
