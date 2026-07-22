export function Monogram({ className = "" }: { className?: string }) {
  return (
    <span
      className={`font-script rose-text rose-glow inline-block leading-none select-none ${className}`}
      aria-hidden="true"
    >
      B
    </span>
  );
}

export function Wordmark({
  compact = false,
  className = "",
}: {
  compact?: boolean;
  className?: string;
}) {
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      {compact && <Monogram className="text-3xl -mt-1" />}
      <span className="flex flex-col">
        <span className="rose-text font-display tracking-[0.42em] text-sm font-medium uppercase">
          By&nbsp;Bobbie
        </span>
        {!compact && (
          <span className="text-cream/50 tracking-[0.35em] text-[0.6rem] uppercase mt-1">
            Mobile Lash Artist
          </span>
        )}
      </span>
    </span>
  );
}
