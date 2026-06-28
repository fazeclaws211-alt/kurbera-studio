const words = [
  "Custom Fabrics",
  "Prints",
  "Fashion Textiles",
  "Studio Sampling",
  "Kubera",
];

export function Marquee() {
  const row = [...words, ...words, ...words];
  return (
    <div className="relative overflow-hidden bg-kubera-red py-5 border-y border-kubera-red-deep/30">
      <div className="flex w-max animate-marquee gap-12 whitespace-nowrap">
        {row.concat(row).map((w, i) => (
          <span key={i} className="flex items-center gap-12">
            <span className="font-display italic text-cream-warm text-2xl md:text-3xl">
              {w}
            </span>
            <span className="text-cream-warm/70 text-xl">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
