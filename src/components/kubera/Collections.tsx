import { Reveal } from "./Reveal";
import cotton from "@/assets/fabric-cotton.jpg";
import linen from "@/assets/fabric-linen.jpg";
import prints from "@/assets/fabric-prints.jpg";
import embroidery from "@/assets/fabric-embroidery.jpg";
import blends from "@/assets/fabric-blends.jpg";
import custom from "@/assets/fabric-custom.jpg";

export type FabricKey =
  | "Cotton"
  | "Linen"
  | "Prints"
  | "Embroidery"
  | "Blends"
  | "Custom";

export const fabricDetails: Record<
  FabricKey,
  { code: string; gsm: string; descriptor: string; swatches: string[] }
> = {
  Cotton: {
    code: "KB-CT",
    gsm: "120-180 GSM",
    descriptor: "Breathable, daily-wear friendly, takes prints cleanly.",
    swatches: ["var(--cream-warm)", "var(--paper-deep)", "var(--blush)"],
  },
  Linen: {
    code: "KB-LN",
    gsm: "140-220 GSM",
    descriptor: "Crisp drape with a natural slub. Holds dye softly.",
    swatches: ["var(--paper-deep)", "var(--olive)", "var(--cream-warm)"],
  },
  Prints: {
    code: "KB-PR",
    gsm: "90-140 GSM",
    descriptor: "Block, screen, and digital — boutique-scale print runs.",
    swatches: ["var(--kubera-red)", "var(--blush)", "var(--cream-warm)"],
  },
  Embroidery: {
    code: "KB-EM",
    gsm: "Base + thread",
    descriptor: "Hand and machine work in moss, olive, gold, and pearl.",
    swatches: ["var(--moss)", "var(--gold)", "var(--olive)"],
  },
  Blends: {
    code: "KB-BL",
    gsm: "100-200 GSM",
    descriptor: "Silk-cotton, linen-viscose, and considered modal mixes.",
    swatches: ["var(--blush)", "var(--olive)", "var(--paper-deep)"],
  },
  Custom: {
    code: "KB-CS",
    gsm: "Spec to brief",
    descriptor: "Build a fabric from base, weight, finish, and print up.",
    swatches: ["var(--kubera-red)", "var(--moss)", "var(--blush)"],
  },
};

const cards: Array<{ key: FabricKey; image: string }> = [
  { key: "Cotton", image: cotton },
  { key: "Linen", image: linen },
  { key: "Prints", image: prints },
  { key: "Embroidery", image: embroidery },
  { key: "Blends", image: blends },
  { key: "Custom", image: custom },
];

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
        <Reveal className="flex flex-col items-start gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="micro-label text-moss">02 — Catalogue</span>
            <h2 className="mt-3 font-display text-4xl font-medium text-ink md:text-5xl">
              Pick a fabric direction.
            </h2>
          </div>
          <p className="max-w-md text-sm text-ink/70">
            Tap a card to load it into the Sample Desk. Each direction is a real
            base we sample, print, and run for collections.
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
                  {/* corner notch */}
                  <span className="absolute right-4 top-4 z-10 rounded-full bg-paper px-2.5 py-0.5 micro-label text-ink/70 border border-moss/15">
                    {d.code}
                  </span>

                  <div className="relative overflow-hidden rounded-2xl">
                    <img
                      src={c.image}
                      alt={`${c.key} fabric swatch`}
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
                    <span className="micro-label text-ink/55">{d.gsm}</span>
                    <span
                      className={`micro-label transition ${
                        active ? "text-kubera-red" : "text-moss group-hover:text-kubera-red"
                      }`}
                    >
                      {active ? "On the desk →" : "Load to desk →"}
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
