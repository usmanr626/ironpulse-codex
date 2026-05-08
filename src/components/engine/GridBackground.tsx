type GridBackgroundProps = {
  className?: string;
};

export function GridBackground({ className = "" }: GridBackgroundProps) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      <div className="technical-grid absolute inset-[-20%] opacity-70" />
      <div className="fine-grid absolute inset-0 opacity-45" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(255,255,255,0.09),transparent_18rem),radial-gradient(circle_at_50%_52%,rgba(255,107,42,0.12),transparent_26rem)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,5,5,0.2),rgba(5,5,5,0.78))]" />
    </div>
  );
}
