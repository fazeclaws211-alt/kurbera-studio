import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { KuberaWordmark } from "./Wordmark";

const links = [
  { href: "#collections", label: "Collections" },
  { href: "#sample-desk", label: "Sample Desk" },
  { href: "#lookbook", label: "Lookbook" },
  { href: "#contact", label: "Contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    setOpen(false);
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-colors duration-300 ${
        scrolled ? "bg-paper/92 backdrop-blur-md" : "bg-paper"
      }`}
    >
      <div className="border-b border-moss/15">
        <div className="mx-auto flex w-full max-w-7xl items-center gap-6 px-5 py-3 md:px-8 md:py-4">
          {/* Logo */}
          <a href="#top" onClick={(e) => { e.preventDefault(); scrollTo("#top"); }} className="shrink-0">
            <KuberaWordmark size="nav" />
          </a>

          {/* Center nav */}
          <nav className="mx-auto hidden items-center gap-9 md:flex">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={(e) => { e.preventDefault(); scrollTo(l.href); }}
                className="font-display text-[15px] text-ink/85 transition hover:text-kubera-red"
              >
                {l.label}
              </a>
            ))}
          </nav>

          {/* Right capsule */}
          <div className="ml-auto hidden items-center gap-3 md:flex">
            <div className="flex items-center gap-3 rounded-full bg-moss px-4 py-1.5 text-cream-warm">
              <span className="micro-label text-cream-warm/85">Quick fabric request</span>
              <button
                onClick={() => scrollTo("#sample-desk")}
                className="rounded-full bg-kubera-red px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-cream-warm transition hover:bg-kubera-red-deep"
              >
                Open
              </button>
            </div>
          </div>

          <button
            className="ml-auto md:hidden rounded-full border border-moss/30 p-2 text-moss"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile sheet */}
      {open && (
        <div className="md:hidden bg-paper border-b border-moss/15 px-5 py-4">
          <nav className="flex flex-col gap-3">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={(e) => { e.preventDefault(); scrollTo(l.href); }}
                className="font-display text-lg text-ink hover:text-kubera-red"
              >
                {l.label}
              </a>
            ))}
            <button
              onClick={() => scrollTo("#sample-desk")}
              className="mt-2 inline-flex w-fit items-center gap-2 rounded-full bg-moss px-4 py-2 text-cream-warm"
            >
              <span className="micro-label">Quick fabric request</span>
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
