type GlowCoreProps = {
  className?: string;
};

export function GlowCore({ className }: GlowCoreProps) {
  return (
    <g className={className} aria-hidden="true">
      <path
        d="M 334 360 C 392 320 454 318 502 356 C 552 395 611 393 674 348"
        fill="none"
        stroke="#ff6b2a"
        strokeOpacity="0.34"
        strokeWidth="6"
        strokeLinecap="round"
        className="internal-glow"
      />
      <path
        d="M 363 438 H 638"
        fill="none"
        stroke="#ff9a3d"
        strokeOpacity="0.24"
        strokeWidth="5"
        strokeLinecap="round"
        className="internal-glow"
      />
      <path
        d="M 407 493 C 459 517 543 517 594 493"
        fill="none"
        stroke="#d94319"
        strokeOpacity="0.28"
        strokeWidth="4"
        strokeLinecap="round"
        className="internal-glow"
      />
    </g>
  );
}
