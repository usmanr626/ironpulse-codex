type PistonProps = {
  idPrefix?: string;
  className?: string;
};

export function Piston({ idPrefix = "piston", className }: PistonProps) {
  const metal = `${idPrefix}-metal`;
  const crown = `${idPrefix}-crown`;
  const side = `${idPrefix}-side`;

  return (
    <g className={`precision-metal ${className ?? ""}`} aria-hidden="true">
      <defs>
        <linearGradient id={metal} x1="-40" x2="42" y1="-70" y2="66" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#f8fafc" />
          <stop offset="25%" stopColor="#b4bac1" />
          <stop offset="64%" stopColor="#585f68" />
          <stop offset="100%" stopColor="#1f2328" />
        </linearGradient>
        <linearGradient id={crown} x1="-36" x2="36" y1="-76" y2="-34" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="44%" stopColor="#9ca3ad" />
          <stop offset="100%" stopColor="#333941" />
        </linearGradient>
        <linearGradient id={side} x1="12" x2="54" y1="-72" y2="70" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#59616b" />
          <stop offset="100%" stopColor="#0b0d10" />
        </linearGradient>
      </defs>
      <path
        d="M -12 -84 C 10 -84 48 -72 48 -54 V 40 C 48 54 38 62 14 62 C 2 62 -7 58 -12 52 C 5 55 22 49 22 38 V -56 C 22 -67 9 -75 -12 -76 Z"
        fill={`url(#${side})`}
        stroke="#ffffff"
        strokeOpacity="0.09"
      />
      <ellipse cx="8" cy="-61" rx="36" ry="17" fill="#e7eaee" fillOpacity="0.2" />
      <path
        d="M -34 -48 C -34 -66 -22 -76 0 -76 C 22 -76 34 -66 34 -48 V 46 C 34 60 24 68 0 68 C -24 68 -34 60 -34 46 Z"
        fill={`url(#${metal})`}
        stroke="#f4f4f5"
        strokeOpacity="0.28"
        strokeWidth="1.6"
      />
      <path
        d="M -31 -49 C -24 -62 -14 -68 0 -68 C 14 -68 24 -62 31 -49 C 22 -40 -22 -40 -31 -49 Z"
        fill={`url(#${crown})`}
      />
      {[-31, -19, -7].map((y) => (
        <path key={y} d={`M -31 ${y} H 31`} stroke="#060606" strokeOpacity="0.5" strokeWidth="3" strokeLinecap="round" />
      ))}
      <circle cx="0" cy="20" r="14" fill="#111318" stroke="#edf0f4" strokeOpacity="0.26" strokeWidth="2" />
      <circle cx="0" cy="20" r="6" fill="#050505" stroke="#ff7a2f" strokeOpacity="0.18" />
      <path d="M -20 51 H 20" stroke="#f8fafc" strokeOpacity="0.2" strokeWidth="2" strokeLinecap="round" />
      <path d="M 18 -52 V 42" stroke="#ffffff" strokeOpacity="0.15" strokeWidth="2" strokeLinecap="round" />
      <path d="M -22 -45 V 38" stroke="#030303" strokeOpacity="0.32" strokeWidth="2" strokeLinecap="round" />
    </g>
  );
}
