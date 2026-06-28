import { MessageCircle } from "lucide-react";
import { Reveal } from "./Reveal";

const WHATSAPP_NUMBER = "919821999747";

const waMessage = [
  `Hi Kubera Studio,`,
  ``,
  `I'd like to start a conversation about a preview.`,
].join("\n");

const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(waMessage)}`;

export function Contact() {
  return (
    <section id="contact" className="bg-paper py-20 md:py-28">
      <div className="mx-auto w-full max-w-4xl px-5 md:px-8">
        <Reveal className="mx-auto flex max-w-3xl flex-col items-center gap-4 text-center">
          <span className="micro-label text-moss">05 — Contact</span>
          <h2 className="font-display text-4xl font-medium text-ink md:text-5xl">
            Start a conversation on WhatsApp.
          </h2>
          <p className="max-w-md text-ink/75 leading-relaxed">
            Tell us the line, the occasion, and the timeline — we'll come back
            with the right lookbook or studio appointment.
          </p>

          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-feel mt-4 inline-flex items-center gap-2 rounded-full bg-moss px-6 py-3 text-sm font-medium text-cream-warm transition hover:bg-moss-deep"
          >
            <MessageCircle size={16} />
            Message us on WhatsApp
          </a>
        </Reveal>

        <Reveal className="mx-auto mt-12 grid max-w-2xl gap-4 sm:grid-cols-2">
          <Row label="Studio" value="Kubera Studio India LLP" />
          <Row label="Hours" value="Mon–Sat · 10:00–18:30 IST" />
        </Reveal>

        <Reveal className="mx-auto mt-8 max-w-2xl rounded-2xl border border-moss/20 bg-cream-warm p-5 text-center">
          <p className="micro-label text-moss">A quiet promise</p>
          <p className="mt-2 font-display italic text-lg text-ink">
            "We won't show you a piece we wouldn't wear ourselves."
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-moss/15 pb-2">
      <span className="micro-label text-ink/55">{label}</span>
      <span className="font-display text-ink">{value}</span>
    </div>
  );
}
