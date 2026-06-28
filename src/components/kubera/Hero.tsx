import { ArrowUpRight } from "lucide-react";
import { Link } from "@tanstack/react-router";

function scrollTo(id: string) {
  document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
}

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-paper paper-grain">
      <div className="mx-auto flex w-full max-w-3xl flex-col items-center px-5 pt-12 pb-20 text-center md:px-8 md:pt-20 md:pb-24">
        <div className="flex items-center gap-3">
          <span className="h-px w-14 bg-olive/60" />
          <span className="micro-label text-moss">Est. Studio · India</span>
          <span className="h-px w-14 bg-olive/60" />
        </div>

        <h1
          className="mt-6 font-script text-[5.5rem] leading-[1] text-kubera-red sm:text-[7rem] md:text-[9rem]"
          style={{ transform: "rotate(-2deg)", paddingTop: "0.25em", paddingBottom: "0.15em" }}
        >
          Kubera
        </h1>

        <svg
          viewBox="0 0 380 40"
          className="-mt-2 h-8 w-72 text-olive"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        >
          <path
            className="thread-path"
            d="M2,22 C60,2 120,38 180,18 C240,2 300,32 378,14"
          />
          <circle cx="378" cy="14" r="3" fill="currentColor" opacity="0.7" />
        </svg>

        <h2 className="mt-6 font-display text-3xl font-medium leading-tight text-ink sm:text-4xl md:text-5xl">
          The House of <em className="text-moss not-italic font-display italic">Fashion.</em>
        </h2>

        <p className="mt-6 max-w-xl text-base leading-relaxed text-ink/75 sm:text-lg">
          A boutique fashion studio presenting considered garment lines —
          previewed by lookbook, sketch, or appointment. Built for clients who
          care how a piece sits, drapes, and finishes.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/catalog"
            className="btn-feel group inline-flex items-center gap-2 rounded-full bg-kubera-red px-6 py-3 text-sm font-medium text-cream-warm shadow-[0_8px_22px_-12px_rgba(226,56,45,0.6)] transition hover:bg-kubera-red-deep"
          >
            Open Catalog
            <ArrowUpRight size={16} className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
          <button
            onClick={() => scrollTo("#sample-desk")}
            className="btn-feel inline-flex items-center gap-2 rounded-full border border-moss/40 bg-transparent px-6 py-3 text-sm font-medium text-moss transition hover:bg-moss hover:text-cream-warm"
          >
            Request a Preview
          </button>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-ink/70">
          <Stat label="Garment lines" value="6" />
          <span className="hidden h-8 w-px bg-moss/20 sm:block" />
          <Stat label="Lookbook pieces" value="180+" />
          <span className="hidden h-8 w-px bg-moss/20 sm:block" />
          <Stat label="Studio clients" value="60+" />
        </div>
      </div>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="font-display text-2xl font-semibold text-moss">{value}</p>
      <p className="micro-label text-ink/55">{label}</p>
    </div>
  );
}
