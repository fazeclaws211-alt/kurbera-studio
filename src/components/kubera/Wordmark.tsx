type Size = "nav" | "hero" | "footer" | "card";

const sizes: Record<Size, { script: string; sub: string; gap: string }> = {
  nav: { script: "text-4xl leading-none", sub: "text-[9px]", gap: "-mt-0.5" },
  hero: { script: "text-[8rem] md:text-[12rem] leading-[0.85]", sub: "text-sm", gap: "mt-4" },
  footer: { script: "text-5xl leading-none", sub: "text-[10px]", gap: "mt-1" },
  card: { script: "text-6xl leading-none", sub: "text-[10px]", gap: "mt-1" },
};

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
    <div className={`inline-flex flex-col ${className}`}>
      <span
        className={`font-script text-kubera-red ${s.script}`}
        style={{ transform: "rotate(-1.5deg)", display: "inline-block" }}
      >
        Kubera
      </span>
      <span className={`micro-label text-ink/80 ${s.sub} ${s.gap}`}>
        Studio India LLP
      </span>
      {tagline && (
        <span className="mt-2 font-display italic text-olive text-sm">
          The House of Fashion &amp; Fabric
        </span>
      )}
    </div>
  );
}
