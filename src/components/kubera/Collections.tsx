import { Link } from "@tanstack/react-router";
import { Reveal } from "./Reveal";
import { fabricDetails, type FabricKey } from "@/data/catalog";

export { fabricDetails };
export type { FabricKey };

const cards: Array<{ key: FabricKey; image: string }> = (
  ["Dailywear", "Festive", "Resort", "Bridal", "Occasion", "Signature"] as FabricKey[]
).map((k) => ({ key: k, image: fabricDetails[k].cover }));


export function Collections() {
  return (
    <section id="collections" className="bg-paper py-20 md:py-28">
      <div className="mx-auto w-full max-w-7xl px-5 md:px-8">
        <Reveal className="mx-auto flex max-w-3xl flex-col items-center gap-4 text-center">
          <span className="micro-label text-moss">02 — Garment Lines</span>
          <h2 className="font-display text-4xl font-medium text-ink md:text-5xl">
            Six lines, one house.
          </h2>
          <p className="max-w-md text-sm text-ink/70">
            Each line is a current direction from the house — a coordinated set
            of pieces. Browse the full catalog to see every silhouette.
          </p>
          <Link
            to="/catalog"
            className="mt-3 inline-flex items-center gap-2 rounded-full bg-kubera-red px-5 py-2.5 text-sm font-medium text-cream-warm transition hover:bg-kubera-red-deep"
          >
            Open the catalog →
          </Link>
        </Reveal>

        <div className="mt-12 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3">
          {cards.map((c, i) => {
            const d = fabricDetails[c.key];
            return (
              <Reveal key={c.key} delay={i * 60}>
                <Link
                  to="/catalog"
                  search={{ line: c.key }}
                  className="cloth-card group relative block w-full overflow-hidden rounded-[22px] border border-moss/15 bg-cream-warm p-3 text-left transition hover:border-kubera-red/50"
                >
                  <div className="relative overflow-hidden rounded-2xl">
                    <img
                      src={c.image}
                      alt={`${c.key} garment line`}
                      width={1024}
                      height={1024}
                      loading="lazy"
                      className="cloth-image h-44 w-full object-cover sm:h-56"
                    />
                    <span className="absolute right-3 top-3 rounded-full bg-paper px-2.5 py-0.5 micro-label text-ink/70 border border-moss/15">
                      {d.code}
                    </span>
                  </div>
                  <div className="mt-3 flex items-center justify-between gap-2">
                    <p className="font-display text-lg text-ink sm:text-xl">{c.key}</p>
                    <span className="micro-label text-moss group-hover:text-kubera-red">
                      View →
                    </span>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

