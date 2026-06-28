import { ArrowUpRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { KuberaFlourish } from "./Wordmark";


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

        <div className="mt-6 inline-block overflow-visible">
          <h1
            className="font-script text-[5.5rem] leading-[1] text-kubera-red sm:text-[7rem] md:text-[9rem]"
            style={{ transform: "rotate(-2deg)", paddingTop: "0.25em", paddingBottom: "0.15em" }}
          >
            Kubera
          </h1>

          {/* single flourish: animated vine flowing out of the wordmark, blooming into the flower */}
          <svg
            viewBox="0 0 420 60"
            className="-mt-3 ml-auto block h-10 w-full text-olive sm:h-12 md:-mt-4 md:h-16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              className="thread-path"
              d="M4,34 C70,12 140,46 210,24 C260,8 320,30 376,24"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              fill="none"
            />
            {/* leaf along the vine */}
            <path
              d="M150,28 C156,18 168,18 168,26 C164,34 150,36 150,28 Z"
              fill="var(--moss)"
              opacity="0.85"
            />
            {/* flower at the end of the vine */}
            <g transform="translate(380 22)">
              {[0, 72, 144, 216, 288].map((deg) => (
                <ellipse
                  key={deg}
                  cx="0"
                  cy="-9"
                  rx="6"
                  ry="9"
                  fill="var(--blush)"
                  transform={`rotate(${deg})`}
                />
              ))}
              <circle r="4.2" fill="var(--gold, #C9A24B)" />
            </g>
          </svg>
        </div>

        <h2 className="mt-6 font-display text-3xl font-medium leading-tight text-ink sm:text-4xl md:text-5xl">
          The House of <em className="text-moss not-italic font-display italic">Fashion.</em>
        </h2>

        <p className="mt-6 max-w-xl text-base leading-relaxed text-ink/75 sm:text-lg">
          A boutique fashion studio presenting considered garment lines —
          previewed by lookbook, sketch, or appointment. Built for clients who
          care how a piece sits, drapes, and finishes.
        </p>

        <div className="mt-8 flex items-center justify-center">
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
