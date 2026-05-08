type TechnicalLabelProps = {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  label: string;
  align?: "left" | "right";
  className?: string;
};

export function TechnicalLabel({
  x,
  y,
  targetX,
  targetY,
  label,
  align = "left",
  className,
}: TechnicalLabelProps) {
  const textAnchor = align === "right" ? "end" : "start";
  const lineEndX = align === "right" ? x - 18 : x + 18;

  return (
    <g className={className} aria-hidden="true">
      <path
        d={`M ${targetX} ${targetY} L ${lineEndX} ${y}`}
        stroke="#f5f5f5"
        strokeOpacity="0.34"
        strokeWidth="1"
        strokeDasharray="4 6"
      />
      <circle cx={targetX} cy={targetY} r="3" fill="#ff7a2f" fillOpacity="0.88" />
      <text
        x={x}
        y={y + 4}
        textAnchor={textAnchor}
        fill="#f4f4f5"
        fillOpacity="0.82"
        fontSize="13"
        letterSpacing="1.2"
        fontFamily="ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif"
      >
        {label}
      </text>
    </g>
  );
}
