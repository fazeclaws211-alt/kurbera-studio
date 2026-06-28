import { useMemo, useState } from "react";
import { MessageCircle } from "lucide-react";
import { Reveal } from "./Reveal";
import type { FabricKey } from "./Collections";
import { fabricDetails } from "./Collections";

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
const WHATSAPP_NUMBER = "919999999999";

export function SampleDesk({ focus }: { focus: FabricKey }) {
  const [mode, setMode] = useState<Mode>("Lookbook preview");

  const waLink = useMemo(() => {
    const msg = [
      `Hi Kubera Studio — I'd like to start a ${mode.toLowerCase()} enquiry.`,
      `Line: ${focus} (${fabricDetails[focus].code}).`,
      `I can share: ${modeInfo[mode].checklist.join(", ")}.`,
    ].join("\n\n");
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
  }, [mode, focus]);

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
            <p className="micro-label text-cream-warm/60">Currently focused on</p>
            <div className="mt-2 flex items-center justify-between gap-4">
              <div>
                <p className="font-display text-3xl">{focus}</p>
                <p className="text-sm text-cream-warm/75">
                  {fabricDetails[focus].descriptor}
                </p>
              </div>
              <span className="micro-label rounded-full border border-cream-warm/25 px-3 py-1">
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
                    className={`rounded-full px-4 py-2 text-sm font-medium transition ${
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

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-kubera-red px-5 py-2.5 text-sm font-medium text-cream-warm transition hover:bg-kubera-red-deep"
              >
                <MessageCircle size={16} />
                Request on WhatsApp
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full border border-moss/30 px-5 py-2.5 text-sm font-medium text-moss transition hover:bg-moss hover:text-cream-warm"
              >
                Send a written enquiry
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
