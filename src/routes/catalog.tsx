import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { MessageCircle, Search, X } from "lucide-react";
import { z } from "zod";
import { Nav } from "@/components/kubera/Nav";
import { Footer } from "@/components/kubera/Footer";
import { Reveal } from "@/components/kubera/Reveal";
import { fabricDetails, pieces, type FabricKey, type Piece } from "@/data/catalog";

const WHATSAPP_NUMBER = "919821999747";

const LINES: FabricKey[] = ["Dailywear", "Festive", "Resort", "Bridal", "Occasion", "Signature"];

const catalogSearch = z.object({
  line: z.enum(["All", ...LINES] as [string, ...string[]]).catch("All"),
  q: z.string().catch(""),
  sort: z.enum(["line", "name"]).catch("line"),
});

export const Route = createFileRoute("/catalog")({
  validateSearch: catalogSearch,
  head: () => ({
    meta: [
      { title: "Catalog — Kubera Studio India LLP" },
      {
        name: "description",
        content:
          "Browse the full Kubera Studio garment catalog — Dailywear, Festive, Resort, Bridal, Occasion, and Signature lines.",
      },
      { property: "og:title", content: "Catalog — Kubera Studio India LLP" },
      {
        property: "og:description",
        content:
          "Browse every silhouette across our six garment lines. Filter, search, and enquire on WhatsApp.",
      },
    ],
  }),
  component: CatalogPage,
});

function waLinkFor(piece: Piece) {
  const msg = [
    `Hi Kubera Studio — I'd like to enquire about a piece from the catalog.`,
    `Piece: ${piece.name} (${piece.id})`,
    `Line: ${piece.line} · ${piece.silhouette}`,
  ].join("\n\n");
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
}

function CatalogPage() {
  const search = Route.useSearch();
  const navigate = Route.useNavigate();
  const { line, q, sort } = search;

  const [preview, setPreview] = useState<Piece | null>(null);

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    let list = pieces.filter((p) => (line === "All" ? true : p.line === line));
    if (term) {
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(term) ||
          p.silhouette.toLowerCase().includes(term) ||
          p.tags.some((t) => t.toLowerCase().includes(term)) ||
          p.id.toLowerCase().includes(term),
      );
    }
    if (sort === "name") {
      list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    } else {
      const order = new Map(LINES.map((l, i) => [l, i]));
      list = [...list].sort(
        (a, b) =>
          (order.get(a.line)! - order.get(b.line)!) || a.id.localeCompare(b.id),
      );
    }
    return list;
  }, [line, q, sort]);

  const setLine = (l: string) =>
    navigate({ search: (prev: typeof search) => ({ ...prev, line: l }) });
  const setQ = (val: string) =>
    navigate({ search: (prev: typeof search) => ({ ...prev, q: val }), replace: true });
  const setSort = (s: "line" | "name") =>
    navigate({ search: (prev: typeof search) => ({ ...prev, sort: s }) });


  const grouped = useMemo(() => {
    if (sort === "name" || line !== "All") return null;
    const map = new Map<FabricKey, Piece[]>();
    for (const p of filtered) {
      const arr = map.get(p.line) ?? [];
      arr.push(p);
      map.set(p.line, arr);
    }
    return Array.from(map.entries());
  }, [filtered, sort, line]);

  return (
    <div className="min-h-screen bg-paper">
      <Nav />
      <main>
        <section className="border-b border-moss/15 bg-paper-deep">
          <div className="mx-auto w-full max-w-7xl px-5 py-12 md:px-8 md:py-16">
            <Reveal className="mx-auto flex max-w-3xl flex-col items-center gap-4 text-center">
              <span className="micro-label text-moss">The Catalog</span>
              <h1 className="font-display text-4xl font-medium text-ink md:text-5xl">
                Every silhouette, in one room.
              </h1>
              <p className="max-w-xl text-sm text-ink/70">
                Browse pieces across our six garment lines. Filter by line,
                search by silhouette, and start a WhatsApp enquiry for any
                piece you'd like to preview.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="sticky top-[60px] z-30 border-b border-moss/15 bg-paper/95 backdrop-blur-md md:top-[68px]">
          <div className="mx-auto w-full max-w-7xl px-5 py-4 md:px-8">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div className="flex flex-wrap gap-2">
                {(["All", ...LINES] as const).map((l) => {
                  const active = line === l;
                  return (
                    <button
                      key={l}
                      onClick={() => setLine(l)}
                      className={`btn-feel rounded-full px-3.5 py-1.5 text-xs font-medium transition ${
                        active
                          ? "bg-kubera-red text-cream-warm"
                          : "bg-cream-warm text-ink/75 border border-moss/15 hover:text-kubera-red"
                      }`}
                    >
                      {l}
                      {l !== "All" && (
                        <span className="ml-1.5 text-[10px] opacity-60">
                          ({pieces.filter((p) => p.line === l).length})
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              <div className="flex items-center gap-2">
                <label className="relative flex items-center">
                  <Search size={14} className="absolute left-3 text-ink/40" />
                  <input
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                    placeholder="Search pieces, silhouettes…"
                    className="w-full rounded-full border border-moss/20 bg-cream-warm py-1.5 pl-8 pr-3 text-sm text-ink placeholder:text-ink/45 focus:border-kubera-red focus:outline-none md:w-64"
                  />
                </label>
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value as "line" | "name")}
                  className="btn-feel rounded-full border border-moss/20 bg-cream-warm px-3 py-1.5 text-xs text-ink/75 focus:border-kubera-red focus:outline-none"
                >
                  <option value="line">Sort: by line</option>
                  <option value="name">Sort: A–Z</option>
                </select>
              </div>
            </div>
            <p className="mt-3 text-xs text-ink/55">
              {filtered.length} {filtered.length === 1 ? "piece" : "pieces"}
              {line !== "All" && ` in ${line}`}
              {q && ` matching "${q}"`}
            </p>
          </div>
        </section>

        <section className="bg-paper py-12 md:py-16">
          <div className="mx-auto w-full max-w-7xl px-5 md:px-8">
            {filtered.length === 0 ? (
              <div className="rounded-2xl border border-moss/15 bg-cream-warm p-10 text-center">
                <p className="font-display text-2xl text-ink">No pieces found.</p>
                <p className="mt-2 text-sm text-ink/65">
                  Try a different line or clear the search.
                </p>
              </div>
            ) : grouped ? (
              <div className="space-y-14">
                {grouped.map(([groupLine, items]) => (
                  <div key={groupLine}>
                    <div className="mb-6 flex items-end justify-between gap-4 border-b border-moss/15 pb-3">
                      <div>
                        <span className="micro-label text-moss">
                          {fabricDetails[groupLine].code} · {fabricDetails[groupLine].season}
                        </span>
                        <h2 className="mt-1 font-display text-3xl text-ink md:text-4xl">
                          {groupLine}
                        </h2>
                      </div>
                      <span className="text-xs text-ink/55">
                        {items.length} {items.length === 1 ? "piece" : "pieces"}
                      </span>
                    </div>
                    <PieceGrid items={items} onPreview={setPreview} />
                  </div>
                ))}
              </div>
            ) : (
              <PieceGrid items={filtered} onPreview={setPreview} />
            )}
          </div>
        </section>

        <section className="border-t border-moss/15 bg-paper-deep py-12">
          <div className="mx-auto w-full max-w-3xl px-5 text-center md:px-8">
            <p className="font-display text-2xl text-ink md:text-3xl">
              Found a piece you'd like to see?
            </p>
            <p className="mt-2 text-sm text-ink/65">
              Head back to the Preview Desk to request a lookbook, sketch, or
              studio appointment.
            </p>
            <Link
              to="/"
              hash="sample-desk"
              className="btn-feel mt-5 inline-flex items-center gap-2 rounded-full bg-moss px-5 py-2.5 text-sm font-medium text-cream-warm transition hover:bg-moss-deep"
            >
              Open the Preview Desk →
            </Link>
          </div>
        </section>
      </main>
      <Footer />

      {preview && <PreviewDrawer piece={preview} onClose={() => setPreview(null)} />}
    </div>
  );
}

function PieceGrid({
  items,
  onPreview,
}: {
  items: Piece[];
  onPreview: (p: Piece) => void;
}) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
      {items.map((p, i) => (
        <Reveal key={p.id} delay={Math.min(i * 30, 240)}>
          <button
            onClick={() => onPreview(p)}
            className="btn-feel group block w-full overflow-hidden rounded-2xl border border-moss/15 bg-cream-warm text-left transition hover:border-kubera-red/50 hover:shadow-[0_20px_40px_-30px_rgba(63,90,58,0.4)]"
          >
            <div className="relative overflow-hidden">
              <img
                src={p.image}
                alt={`${p.name} — ${p.silhouette}`}
                width={800}
                height={1000}
                loading="lazy"
                className="h-56 w-full object-cover transition-transform duration-700 group-hover:scale-[1.05] sm:h-64 md:h-72"
              />
              <span className="absolute left-2 top-2 rounded-full bg-cream-warm/95 px-2 py-0.5 micro-label text-ink">
                {p.id}
              </span>
            </div>
            <div className="p-3 md:p-4">
              <p className="font-display text-base text-ink md:text-lg leading-snug">
                {p.name}
              </p>
              <p className="mt-0.5 text-xs text-ink/60">{p.silhouette}</p>
              <div className="mt-2 flex flex-wrap gap-1">
                {p.tags.slice(0, 2).map((t) => (
                  <span
                    key={t}
                    className="rounded-full bg-paper-deep px-2 py-0.5 text-[10px] text-ink/65"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </button>
        </Reveal>
      ))}
    </div>
  );
}

function PreviewDrawer({ piece, onClose }: { piece: Piece; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-[80] flex items-end justify-center bg-ink/50 p-0 backdrop-blur-sm sm:items-center sm:p-6"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl overflow-hidden rounded-t-3xl bg-paper sm:rounded-3xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="btn-feel absolute right-3 top-3 z-10 rounded-full bg-cream-warm/95 p-2 text-ink/70 transition hover:text-kubera-red"
          aria-label="Close"
        >
          <X size={16} />
        </button>
        <div className="grid sm:grid-cols-2">
          <img
            src={piece.image}
            alt={piece.name}
            className="h-64 w-full object-cover sm:h-full sm:max-h-[70vh]"
          />
          <div className="p-6 sm:p-8">
            <span className="micro-label text-moss">
              {piece.id} · {piece.line}
            </span>
            <h3 className="mt-2 font-display text-3xl text-ink">{piece.name}</h3>
            <p className="mt-1 text-sm text-ink/65">{piece.silhouette}</p>
            <p className="mt-4 text-sm text-ink/80 leading-relaxed">{piece.notes}</p>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {piece.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full bg-paper-deep px-2.5 py-0.5 text-[11px] text-ink/70"
                >
                  {t}
                </span>
              ))}
            </div>
            <a
              href={waLinkFor(piece)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-feel mt-6 inline-flex items-center gap-2 rounded-full bg-kubera-red px-5 py-2.5 text-sm font-medium text-cream-warm transition hover:bg-kubera-red-deep"
            >
              <MessageCircle size={16} />
              Enquire on WhatsApp
            </a>
            <p className="mt-3 text-xs text-ink/50">
              Pricing on request. Made-to-measure available.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
