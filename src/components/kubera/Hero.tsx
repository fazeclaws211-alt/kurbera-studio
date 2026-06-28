import { useEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import fabricHero from "@/assets/fabric-hero.jpg";

function scrollTo(id: string) {
  document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
}

export function Hero() {
  const cardRef = useRef<HTMLDivElement | null>(null);

  // Soft parallax tilt on the catalogue card
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    const onMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `perspective(1200px) rotateX(${(-y * 4).toFixed(2)}deg) rotateY(${(x * 5).toFixed(2)}deg) translateY(-2px)`;
    };
    const onLeave = () => {
      card.style.transform = "perspective(1200px) rotateX(0) rotateY(0)";
    };
    card.addEventListener("mousemove", onMove);
    card.addEventListener("mouseleave", onLeave);
    return () => {
      card.removeEventListener("mousemove", onMove);
      card.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <section id="top" className="relative overflow-hidden bg-paper paper-grain">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-12 px-5 pt-10 pb-20 md:px-8 md:pt-16 md:pb-28 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:items-center">
        {/* LEFT */}
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
          <div className="flex items-center gap-3">
            <span className="h-px w-14 bg-olive/60 lg:hidden" />
            <span className="micro-label text-moss">Est. Studio · India</span>
            <span className="h-px w-14 bg-olive/60" />
          </div>

          <h1 className="mt-6 font-script text-[5.5rem] leading-[0.9] text-kubera-red sm:text-[7rem] md:text-[9rem]"
              style={{ transform: "rotate(-2deg)" }}>
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

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
            <button
              onClick={() => scrollTo("#collections")}
              className="group inline-flex items-center gap-2 rounded-full bg-kubera-red px-6 py-3 text-sm font-medium text-cream-warm shadow-[0_8px_22px_-12px_rgba(226,56,45,0.6)] transition hover:bg-kubera-red-deep"
            >
              View Garment Lines
              <ArrowUpRight size={16} className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
            <button
              onClick={() => scrollTo("#sample-desk")}
              className="inline-flex items-center gap-2 rounded-full border border-moss/40 bg-transparent px-6 py-3 text-sm font-medium text-moss transition hover:bg-moss hover:text-cream-warm"
            >
              Request a Preview
            </button>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-ink/70 lg:justify-start">
            <Stat label="Garment lines" value="6" />
            <span className="hidden h-8 w-px bg-moss/20 sm:block" />
            <Stat label="Lookbook pieces" value="180+" />
            <span className="hidden h-8 w-px bg-moss/20 sm:block" />
            <Stat label="Studio clients" value="60+" />
          </div>
        </div>

        {/* RIGHT — catalogue card */}
        <div className="flex items-center justify-center">
          <div
            ref={cardRef}
            className="relative w-full max-w-[480px] rounded-[28px] bg-cream-warm p-5 shadow-[0_30px_60px_-40px_rgba(63,90,58,0.45)] transition-transform duration-300 will-change-transform"
            style={{ border: "1px solid rgba(63,90,58,0.18)" }}
          >
            {/* Tape */}
            <div className="absolute -top-3 left-10 h-6 w-20 rotate-[-4deg] bg-blush/70 shadow-sm" />
            <div className="absolute -top-3 right-12 h-6 w-16 rotate-[3deg] bg-olive/40 shadow-sm" />

            <div className="flex items-center justify-between">
              <span className="micro-label text-moss">Featured garment preview</span>
              <span className="micro-label text-gold">Look 01</span>
            </div>

            <div className="relative mt-4 overflow-hidden rounded-2xl bg-paper-deep">
              <img
                src={fabricHero}
                alt="Blush pink draped garment with delicate floral detail"
                width={1024}
                height={1024}
                className="h-[340px] w-full object-cover"
              />
              <div className="absolute bottom-3 left-3 rounded-full bg-cream-warm/95 px-3 py-1">
                <span className="micro-label text-ink">Festive · Look 04</span>
              </div>
            </div>

            <div className="mt-5 flex items-center justify-between">
              <div>
                <p className="font-display text-xl text-ink">Rosewater 04</p>
                <p className="text-xs text-ink/60">Festive line · Hand-finished · Studio piece</p>
              </div>
              <div className="flex items-center gap-1.5">
                {[
                  "var(--blush)",
                  "var(--kubera-red)",
                  "var(--moss)",
                  "var(--olive)",
                  "var(--cream-warm)",
                ].map((c, i) => (
                  <span
                    key={i}
                    className="h-6 w-6 rounded-full border border-ink/10"
                    style={{ background: c }}
                  />
                ))}
              </div>
            </div>

            <div className="thread-divider mt-5" />

            <div className="mt-4 flex items-center justify-between">
              <span className="micro-label text-ink/60">Kubera / FS-04</span>
              <button
                onClick={() => scrollTo("#sample-desk")}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-kubera-red hover:text-kubera-red-deep"
              >
                Request preview <ArrowUpRight size={14} />
              </button>
            </div>
          </div>
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
