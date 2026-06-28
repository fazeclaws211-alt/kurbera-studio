import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Reveal } from "./Reveal";
import f1 from "@/assets/look-festive-1.jpg";
import f2 from "@/assets/look-festive-2.jpg";
import d1 from "@/assets/look-daily-1.jpg";
import d2 from "@/assets/look-daily-2.jpg";
import b1 from "@/assets/look-boutique-1.jpg";
import b2 from "@/assets/look-boutique-2.jpg";
import c1 from "@/assets/look-custom-1.jpg";
import p1 from "@/assets/fabric-prints.jpg";
import c2 from "@/assets/fabric-custom.jpg";

type Cat = "All" | "Dailywear" | "Festive" | "Boutique" | "Custom";

const items: Array<{
  id: string;
  cat: Exclude<Cat, "All">;
  title: string;
  base: string;
  image: string;
}> = [
  { id: "LB/01", cat: "Festive", title: "Vermilion Gold", base: "Festive · Look 01", image: f1 },
  { id: "LB/02", cat: "Dailywear", title: "Cream Field", base: "Dailywear · Look 02", image: d1 },
  { id: "LB/03", cat: "Boutique", title: "Stack Six", base: "Resort · Look 03", image: b1 },
  { id: "LB/04", cat: "Festive", title: "Rose Field", base: "Festive · Look 04", image: f2 },
  { id: "LB/05", cat: "Dailywear", title: "Moss Glow", base: "Dailywear · Look 05", image: d2 },
  { id: "LB/06", cat: "Custom", title: "Atelier 12", base: "Custom · hand-finished", image: c1 },
  { id: "LB/07", cat: "Boutique", title: "Paper & Petal", base: "Resort · Look 07", image: b2 },
  { id: "LB/08", cat: "Festive", title: "Rosewater", base: "Festive · Look 08", image: p1 },
  { id: "LB/09", cat: "Custom", title: "House Suit", base: "Custom · Look 09", image: c2 },
];

const filters: Cat[] = ["All", "Dailywear", "Festive", "Boutique", "Custom"];

export function Lookbook() {
  const [cat, setCat] = useState<Cat>("All");

  const visible = useMemo(
    () => (cat === "All" ? items.slice(0, 9) : items.filter((i) => i.cat === cat).slice(0, 9)),
    [cat],
  );

  return (
    <section id="lookbook" className="bg-paper-deep py-20 md:py-28">
      <div className="mx-auto w-full max-w-7xl px-5 md:px-8">
        <Reveal className="mx-auto flex max-w-3xl flex-col items-center gap-5 text-center">
          <span className="micro-label text-moss">04 — Lookbook Wall</span>
          <h2 className="font-display text-4xl font-medium text-ink md:text-5xl">
            Looks, on the floor.
          </h2>
          <p className="max-w-md text-sm text-ink/70">
            Pieces from the current lines — close-ups, finishes, and the small
            editions we're previewing this season.
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {filters.map((f) => {
              const active = f === cat;
              return (
                <button
                  key={f}
                  onClick={() => setCat(f)}
                  className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
                    active
                      ? "bg-kubera-red text-cream-warm"
                      : "bg-cream-warm text-ink/70 hover:text-kubera-red border border-moss/15"
                  }`}
                >
                  {f}
                </button>
              );
            })}
          </div>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((it, i) => (
            <Reveal key={it.id} delay={i * 50}>
              <Link
                to="/catalog"
                search={{ line: it.cat === "Boutique" ? "Resort" : it.cat === "Custom" ? "Signature" : it.cat }}
                className="group block h-full overflow-hidden rounded-[22px] border border-moss/15 bg-cream-warm"
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img
                    src={it.image}
                    alt={`${it.title} — ${it.base}`}
                    width={800}
                    height={1000}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                  <span className="absolute left-3 top-3 rounded-full bg-cream-warm/95 px-3 py-1 micro-label text-ink">
                    {it.id} — {it.cat}
                  </span>
                </div>
                <div className="flex items-center justify-between p-4">
                  <div>
                    <p className="font-display text-lg text-ink">{it.title}</p>
                    <p className="text-xs text-ink/60">{it.base}</p>
                  </div>
                  <span className="micro-label text-moss opacity-0 transition group-hover:opacity-100">
                    View →
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            to="/catalog"
            className="inline-flex items-center gap-2 rounded-full bg-moss px-5 py-2.5 text-sm font-medium text-cream-warm transition hover:bg-moss-deep"
          >
            Browse all looks →
          </Link>
        </div>
      </div>
    </section>
  );
}
