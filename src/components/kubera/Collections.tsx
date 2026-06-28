import { Link } from "@tanstack/react-router";
import { Reveal } from "./Reveal";
import { fabricDetails, type FabricKey } from "@/data/catalog";

export { fabricDetails };
export type { FabricKey };

const cards: Array<{ key: FabricKey; image: string }> = (
  ["Dailywear", "Festive", "Resort", "Bridal", "Occasion", "Signature"] as FabricKey[]
).map((k) => ({ key: k, image: fabricDetails[k].cover }));


export function Collections({
  selected,
  onSelect,
}: {
  selected: FabricKey;
  onSelect: (k: FabricKey) => void;
}) {
  return (
    <section id="collections" className="bg-paper py-20 md:py-28">
      <div className="mx-auto w-full max-w-7xl px-5 md:px-8">
        <Reveal className="mx-auto flex max-w-3xl flex-col items-center gap-4 text-center">
          <span className="micro-label text-moss">02 — Garment Lines</span>
          <h2 className="font-display text-4xl font-medium text-ink md:text-5xl">
            Browse a garment line.
          </h2>
          <p className="max-w-md text-sm text-ink/70">
            Tap a card to load it into the Preview Desk. Each line is a current
            direction from the house — built as a coordinated set of looks.
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((c, i) => {
            const d = fabricDetails[c.key];
            const active = c.key === selected;
            return (
              <Reveal key={c.key} delay={i * 60}>
                <button
                  onClick={() => onSelect(c.key)}
                  className={`cloth-card group relative block w-full overflow-hidden rounded-[22px] border bg-cream-warm p-4 text-left transition ${
                    active
                      ? "border-kubera-red shadow-[0_24px_50px_-30px_rgba(226,56,45,0.45)]"
                      : "border-moss/15"
                  }`}
                >
                  <span className="absolute right-4 top-4 z-10 rounded-full bg-paper px-2.5 py-0.5 micro-label text-ink/70 border border-moss/15">
                    {d.code}
                  </span>

                  <div className="relative overflow-hidden rounded-2xl">
                    <img
                      src={c.image}
                      alt={`${c.key} garment line moodboard`}
                      width={1024}
                      height={1024}
                      loading="lazy"
                      className="cloth-image h-64 w-full object-cover"
                    />
                  </div>

                  <div className="mt-4 flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <p className="font-display text-2xl text-ink">{c.key}</p>
                      <p className="mt-1 text-sm text-ink/65 leading-snug">
                        {d.descriptor}
                      </p>
                    </div>
                    <div className="flex shrink-0 -space-x-1.5">
                      {d.swatches.map((s, idx) => (
                        <span
                          key={idx}
                          className="h-5 w-5 rounded-full border-2 border-cream-warm"
                          style={{ background: s }}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <span className="micro-label text-ink/55">{d.season}</span>
                    <span
                      className={`micro-label transition ${
                        active ? "text-kubera-red" : "text-moss group-hover:text-kubera-red"
                      }`}
                    >
                      {active ? "On the desk →" : "Preview line →"}
                    </span>
                  </div>
                </button>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
