import { useMemo, useState } from "react";
import { MessageCircle } from "lucide-react";
import { Reveal } from "./Reveal";
import { fabricDetails, type FabricKey } from "@/data/catalog";


type Mode = "Lookbook preview" | "Custom design" | "Studio appointment";

const modeInfo: Record<Mode, { brief: string; checklist: string[] }> = {
  "Lookbook preview": {
    brief:
      "We'll share a closer look at this line — full lookbook, silhouette notes, and styling references.",
    checklist: [
      "Line you'd like to preview",
      "Occasion or use case",
      "Preferred silhouettes",
      "Where to send the lookbook",
    ],
  },
  "Custom design": {
    brief:
      "Bring a brief. We'll come back with sketches, silhouette options, and a sitting plan before we cut.",
    checklist: [
      "Reference looks or moodboard",
      "Occasion and date",
      "Measurements / current size",
      "Palette preferences",
      "Timeline and city",
    ],
  },
  "Studio appointment": {
    brief:
      "A private viewing at the studio — try the line on, walk through silhouettes, and book a fitting.",
    checklist: [
      "Preferred date and time",
      "Number of guests",
      "Lines you want to see",
      "Notes for our team",
    ],
  },
};

// Replace with the real Kubera WhatsApp number when available.
const WHATSAPP_NUMBER = "919821999747";

export function SampleDesk() {
  const [mode, setMode] = useState<Mode>("Lookbook preview");
  const [focus, setFocus] = useState<FabricKey>("Dailywear");

  const waLink = useMemo(() => {
    const msg = [
      `Hi Kubera Studio — I'd like to start a ${mode.toLowerCase()} enquiry.`,
      `Line: ${focus} (${fabricDetails[focus].code}).`,
      `I can share: ${modeInfo[mode].checklist.join(", ")}.`,
    ].join("\n\n");
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
  }, [mode, focus]);

  const lines = Object.keys(fabricDetails) as FabricKey[];

  return (
    <section id="sample-desk" className="bg-moss text-cream-warm py-20 md:py-28">
      <div className="mx-auto w-full max-w-7xl px-5 md:px-8">
        <Reveal className="mx-auto mb-12 flex max-w-3xl flex-col items-center gap-4 text-center">
          <span className="micro-label text-cream-warm/70">03 — Preview Desk</span>
          <h2 className="font-display text-4xl font-medium md:text-5xl">
            The Preview Desk is open.
          </h2>
          <p className="max-w-md text-cream-warm/80 leading-relaxed">
            Tell us how you'd like to see the line. We'll send the right
            preview — a lookbook, a sketch, or an appointment at the studio.
          </p>
        </Reveal>

        <Reveal className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-16 lg:items-start">
          <div className="rounded-2xl border border-cream-warm/15 bg-moss-deep/50 p-5">
            <p className="micro-label text-cream-warm/60">Choose a line</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {lines.map((l) => {
                const active = l === focus;
                return (
                  <button
                    key={l}
                    onClick={() => setFocus(l)}
                    className={`btn-feel rounded-full px-3 py-1.5 text-xs font-medium transition ${
                      active
                        ? "bg-kubera-red text-cream-warm"
                        : "bg-cream-warm/10 text-cream-warm/80 hover:bg-cream-warm/20"
                    }`}
                  >
                    {l}
                  </button>
                );
              })}
            </div>
            <div className="mt-5 border-t border-cream-warm/15 pt-4">
              <p className="font-display text-3xl">{focus}</p>
              <p className="mt-1 text-sm text-cream-warm/75">
                {fabricDetails[focus].descriptor}
              </p>
              <span className="mt-3 inline-block micro-label rounded-full border border-cream-warm/25 px-3 py-1">
                {fabricDetails[focus].code}
              </span>
            </div>
          </div>


          <div className="rounded-3xl border border-cream-warm/15 bg-paper text-ink p-6 md:p-8">
            <div className="flex flex-wrap gap-2">
              {(Object.keys(modeInfo) as Mode[]).map((m) => {
                const active = mode === m;
                return (
                  <button
                    key={m}
                    onClick={() => setMode(m)}
                    className={`btn-feel rounded-full px-4 py-2 text-sm font-medium transition ${
                      active
                        ? "bg-kubera-red text-cream-warm"
                        : "bg-paper-deep text-ink/75 hover:bg-moss/10"
                    }`}
                  >
                    {m}
                  </button>
                );
              })}
            </div>

            <div className="mt-6 rounded-2xl bg-cream-warm p-5 md:p-6 border border-moss/15">
              <p className="micro-label text-moss">Selected: {mode}</p>
              <p className="mt-3 font-display text-xl text-ink leading-snug">
                {modeInfo[mode].brief}
              </p>

              <p className="mt-5 micro-label text-ink/60">Share with us</p>
              <ul className="mt-2 grid gap-1.5 sm:grid-cols-2">
                {modeInfo[mode].checklist.map((c) => (
                  <li key={c} className="flex items-start gap-2 text-sm text-ink/80">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-kubera-red" />
                    {c}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6">
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-feel inline-flex items-center gap-2 rounded-full bg-kubera-red px-5 py-2.5 text-sm font-medium text-cream-warm transition hover:bg-kubera-red-deep"
              >
                <MessageCircle size={16} />
                Request on WhatsApp
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
