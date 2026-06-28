type Size = "nav" | "hero" | "footer" | "card";

const sizes: Record<Size, { script: string; sub: string; gap: string; flower: string }> = {
  nav: { script: "text-4xl leading-[1.15] pt-1 pb-0.5", sub: "text-[9px]", gap: "mt-0", flower: "h-6 w-10 -ml-1" },
  hero: { script: "text-[8rem] md:text-[12rem] leading-[1] pt-3 pb-2", sub: "text-sm", gap: "mt-4", flower: "h-20 w-32 -ml-2 md:h-28 md:w-44" },
  footer: { script: "text-5xl leading-[1.15] pt-1 pb-1", sub: "text-[10px]", gap: "mt-1", flower: "h-8 w-14 -ml-1" },
  card: { script: "text-6xl leading-[1.15] pt-1 pb-1", sub: "text-[10px]", gap: "mt-1", flower: "h-10 w-16 -ml-1" },
};

export function KuberaFlourish({ className = "" }: { className?: string }) {
  // Vine + 5-petal blush flower — matches the brand mark
  return (
    <svg
      viewBox="0 0 80 40"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* curly vine */}
      <path
        d="M2,28 C12,18 22,34 32,24 C40,16 48,30 56,22"
        stroke="var(--olive)"
        strokeWidth="1.4"
        strokeLinecap="round"
        fill="none"
      />
      {/* small leaf */}
      <path
        d="M22,26 C24,20 30,20 30,24 C28,28 22,30 22,26 Z"
        fill="var(--moss)"
        opacity="0.85"
      />
      {/* flower petals */}
      <g transform="translate(62 18)">
        {[0, 72, 144, 216, 288].map((deg) => (
          <ellipse
            key={deg}
            cx="0"
            cy="-5"
            rx="3.4"
            ry="5"
            fill="var(--blush)"
            transform={`rotate(${deg})`}
          />
        ))}
        <circle r="2.4" fill="var(--gold, #C9A24B)" />
      </g>
    </svg>
  );
}

export function KuberaWordmark({
  size = "nav",
  tagline = false,
  className = "",
}: {
  size?: Size;
  tagline?: boolean;
  className?: string;
}) {
  const s = sizes[size];
  return (
    <div className={`inline-flex flex-col overflow-visible ${className}`}>
      <div className="inline-flex items-end overflow-visible">
        <span
          className={`font-script text-kubera-red overflow-visible ${s.script}`}
          style={{ transform: "rotate(-1.5deg)", display: "inline-block", transformOrigin: "left center" }}
        >
          Kubera
        </span>
        <KuberaFlourish className={`${s.flower} mb-1 shrink-0`} />
      </div>
      <span className={`micro-label text-ink/80 ${s.sub} ${s.gap}`}>
        Studio India LLP
      </span>
      {tagline && (
        <span className="mt-2 font-display italic text-olive text-sm">
          The House of Fashion
        </span>
      )}
    </div>
  );
}
