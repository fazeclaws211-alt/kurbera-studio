import { useMemo, useState } from "react";
import { Copy, MessageCircle, Send, Check } from "lucide-react";
import { z } from "zod";
import { Reveal } from "./Reveal";

const WHATSAPP_NUMBER = "919999999999";
const STUDIO_EMAIL = "studio@kubera.in";

const schema = z.object({
  name: z.string().trim().min(1, "Add your name").max(80),
  brand: z.string().trim().max(120).optional().or(z.literal("")),
  need: z.string().min(1, "Pick a fabric need"),
  quantity: z.string().trim().max(60).optional().or(z.literal("")),
  message: z.string().trim().min(1, "Add a short brief").max(1200),
});

const needs = [
  "Cotton",
  "Linen",
  "Prints",
  "Embroidery",
  "Blends",
  "Custom build",
  "Not sure yet",
];

export function Contact() {
  const [form, setForm] = useState({
    name: "",
    brand: "",
    need: "",
    quantity: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState(false);
  const [sent, setSent] = useState(false);

  const waMessage = useMemo(() => {
    return [
      `Hi Kubera Studio,`,
      ``,
      `Name: ${form.name || "—"}`,
      `Brand: ${form.brand || "—"}`,
      `Fabric need: ${form.need || "—"}`,
      `Approx. quantity: ${form.quantity || "—"}`,
      ``,
      `Brief:`,
      form.message || "—",
    ].join("\n");
  }, [form]);

  const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(waMessage)}`;

  const validate = () => {
    const r = schema.safeParse(form);
    if (!r.success) {
      const e: Record<string, string> = {};
      for (const issue of r.error.issues) {
        const k = issue.path[0] as string;
        if (!e[k]) e[k] = issue.message;
      }
      setErrors(e);
      return false;
    }
    setErrors({});
    return true;
  };

  const onSend = () => {
    if (!validate()) return;
    const subject = encodeURIComponent(`Fabric enquiry — ${form.name}`);
    const body = encodeURIComponent(waMessage);
    window.location.href = `mailto:${STUDIO_EMAIL}?subject=${subject}&body=${body}`;
    setSent(true);
    setTimeout(() => setSent(false), 2400);
  };

  const onCopy = async () => {
    if (!validate()) return;
    try {
      await navigator.clipboard.writeText(waMessage);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* noop */
    }
  };

  const onWa = (e: React.MouseEvent) => {
    if (!validate()) {
      e.preventDefault();
    }
  };

  return (
    <section id="contact" className="bg-paper py-20 md:py-28">
      <div className="mx-auto w-full max-w-6xl px-5 md:px-8">
        <Reveal className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div>
            <span className="micro-label text-moss">05 — Enquire</span>
            <h2 className="mt-3 font-display text-4xl font-medium text-ink md:text-5xl">
              Send a clean fabric enquiry.
            </h2>
            <p className="mt-5 max-w-md text-ink/75 leading-relaxed">
              The clearer your brief, the closer the first sample. Tell us the
              fabric, the use, the quantity, and the timeline — we'll come back
              with the right base.
            </p>

            <div className="mt-8 space-y-4 text-sm">
              <Row label="Studio" value="Kubera Studio India LLP" />
              <Row label="Mail" value={STUDIO_EMAIL} />
              <Row label="WhatsApp" value="+91 99999 99999" />
              <Row label="Hours" value="Mon–Sat · 10:00–18:30 IST" />
            </div>

            <div className="mt-8 rounded-2xl border border-moss/20 bg-cream-warm p-5">
              <p className="micro-label text-moss">A quiet promise</p>
              <p className="mt-2 font-display italic text-lg text-ink">
                "We won't send you a fabric we wouldn't run in our own collection."
              </p>
            </div>
          </div>

          <div className="rounded-3xl border border-moss/15 bg-cream-warm p-6 md:p-8">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Name" error={errors.name}>
                <input
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  className="input-base"
                  placeholder="Your name"
                />
              </Field>
              <Field label="Brand / company" error={errors.brand}>
                <input
                  value={form.brand}
                  onChange={(e) => setForm((f) => ({ ...f, brand: e.target.value }))}
                  className="input-base"
                  placeholder="Optional"
                />
              </Field>
              <Field label="Fabric need" error={errors.need}>
                <select
                  value={form.need}
                  onChange={(e) => setForm((f) => ({ ...f, need: e.target.value }))}
                  className="input-base"
                >
                  <option value="">Select one</option>
                  {needs.map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Approx. quantity" error={errors.quantity}>
                <input
                  value={form.quantity}
                  onChange={(e) => setForm((f) => ({ ...f, quantity: e.target.value }))}
                  className="input-base"
                  placeholder="e.g. 200 m"
                />
              </Field>
              <div className="sm:col-span-2">
                <Field label="Message" error={errors.message}>
                  <textarea
                    value={form.message}
                    onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                    rows={5}
                    className="input-base resize-none"
                    placeholder="Tell us the fabric type, colours, use case, quantity, and timeline."
                  />
                </Field>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button
                onClick={onSend}
                className="inline-flex items-center gap-2 rounded-full bg-kubera-red px-5 py-2.5 text-sm font-medium text-cream-warm transition hover:bg-kubera-red-deep"
              >
                {sent ? <Check size={16} /> : <Send size={16} />}
                {sent ? "Opening mail…" : "Send enquiry"}
              </button>
              <a
                href={waLink}
                onClick={onWa}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-moss px-5 py-2.5 text-sm font-medium text-cream-warm transition hover:bg-moss-deep"
              >
                <MessageCircle size={16} />
                Request on WhatsApp
              </a>
              <button
                onClick={onCopy}
                className="inline-flex items-center gap-2 rounded-full border border-moss/30 px-5 py-2.5 text-sm font-medium text-moss transition hover:bg-moss hover:text-cream-warm"
              >
                {copied ? <Check size={16} /> : <Copy size={16} />}
                {copied ? "Copied" : "Copy WhatsApp message"}
              </button>
            </div>
          </div>
        </Reveal>
      </div>

      <style>{`
        .input-base {
          width: 100%;
          background: var(--paper);
          border: 1px solid rgba(63,90,58,0.18);
          border-radius: 12px;
          padding: 0.7rem 0.9rem;
          font-size: 14px;
          color: var(--ink);
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
          font-family: var(--font-body);
        }
        .input-base:focus {
          border-color: var(--moss);
          box-shadow: 0 0 0 3px rgba(63,90,58,0.12);
        }
        .input-base::placeholder { color: rgba(26,26,26,0.4); }
      `}</style>
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

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="micro-label text-ink/60">{label}</span>
      <div className="mt-1.5">{children}</div>
      {error && (
        <span className="mt-1 block text-[11px] text-kubera-red">{error}</span>
      )}
    </label>
  );
}
