type CrankshaftProps = {
  idPrefix?: string;
  className?: string;
};

export function Crankshaft({ idPrefix = "crankshaft", className }: CrankshaftProps) {
  const metal = `${idPrefix}-metal`;
  const dark = `${idPrefix}-dark`;
  const side = `${idPrefix}-side`;

  return (
    <g className={`precision-metal ${className ?? ""}`} aria-hidden="true">
      <defs>
        <linearGradient id={metal} x1="-180" x2="180" y1="-30" y2="50" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#f3f4f6" />
          <stop offset="22%" stopColor="#8e949d" />
          <stop offset="58%" stopColor="#4a5058" />
          <stop offset="100%" stopColor="#171a1f" />
        </linearGradient>
        <linearGradient id={dark} x1="0" x2="0" y1="-40" y2="60" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#6b7280" />
          <stop offset="100%" stopColor="#08090a" />
        </linearGradient>
        <linearGradient id={side} x1="-168" x2="210" y1="-52" y2="34" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#555d66" />
          <stop offset="100%" stopColor="#050607" />
        </linearGradient>
      </defs>
      <path d="M -168 -17 H 208" stroke={`url(#${side})`} strokeWidth="22" strokeLinecap="round" opacity="0.7" />
      <path d="M -188 0 H 188" stroke={`url(#${metal})`} strokeWidth="24" strokeLinecap="round" />
      <path d="M -188 -8 H 188" stroke="#ffffff" strokeOpacity="0.18" strokeWidth="3" strokeLinecap="round" />
      <path d="M -168 8 H 168" stroke="#050505" strokeOpacity="0.46" strokeWidth="2" strokeLinecap="round" />
      {[-126, -42, 42, 126].map((x, index) => (
        <g key={x} transform={`translate(${x} ${index % 2 === 0 ? -20 : 20})`}>
          <ellipse cx="12" cy="-10" rx="38" ry="26" fill="#08090b" fillOpacity="0.7" />
          <ellipse cx="0" cy="0" rx="38" ry="26" fill={`url(#${dark})`} stroke="#e5e7eb" strokeOpacity="0.24" strokeWidth="2" />
          <circle cx="0" cy="0" r="13" fill="#050505" stroke="#f8fafc" strokeOpacity="0.2" />
          <path d="M -26 -4 H 26" stroke="#ff7a2f" strokeOpacity="0.22" strokeWidth="2" strokeLinecap="round" />
        </g>
      ))}
      <circle cx="-190" cy="0" r="20" fill={`url(#${metal})`} stroke="#f8fafc" strokeOpacity="0.2" />
      <circle cx="190" cy="0" r="20" fill={`url(#${metal})`} stroke="#f8fafc" strokeOpacity="0.2" />
    </g>
  );
}
