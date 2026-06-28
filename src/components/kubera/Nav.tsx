import { useEffect, useState } from "react";
import { Link, useRouter, useRouterState } from "@tanstack/react-router";
import { KuberaWordmark } from "./Wordmark";

type NavLink = { label: string; index: string } & ({ to: "/catalog" } | { hash: string });

const links: NavLink[] = [
  { to: "/catalog", label: "Catalog", index: "01" },
  { hash: "sample-desk", label: "Preview Desk", index: "02" },
  { hash: "lookbook", label: "Lookbook", index: "03" },
  { hash: "contact", label: "Contact", index: "04" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const [progress, setProgress] = useState(0);
  const router = useRouter();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isHome = pathname === "/";
  const isCatalog = pathname.startsWith("/catalog");

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 12);
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(h > 0 ? Math.min(1, y / h) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  // Scroll-spy for home sections
  useEffect(() => {
    if (!isHome) { setActiveSection(""); return; }
    const ids = links.filter((l) => "hash" in l).map((l) => (l as any).hash as string);
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveSection(visible.target.id);
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [isHome]);

  const scrollToId = (id: string) => {
    setOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleHash = async (hash: string) => {
    if (!isHome) {
      await router.navigate({ to: "/", hash });
      setTimeout(() => scrollToId(hash), 80);
    } else {
      scrollToId(hash);
    }
  };

  const isActive = (l: NavLink) => {
    if ("to" in l) return isCatalog;
    return isHome && activeSection === l.hash;
  };

  const renderDesktopLink = (l: NavLink) => {
    const active = isActive(l);
    const base =
      "kn-link group relative inline-flex items-baseline gap-1.5 font-display text-[15px] tracking-tight transition-colors duration-200";
    const tone = active ? "text-kubera-red" : "text-ink/80 hover:text-ink";
    const inner = (
      <>
        <span className="text-[10px] font-medium tabular-nums text-moss/60 group-hover:text-moss transition-colors">
          {l.index}
        </span>
        <span className="relative">
          {l.label}
          <span
            aria-hidden
            className={`pointer-events-none absolute -bottom-1 left-0 h-px bg-kubera-red origin-left transition-transform duration-500 ease-[cubic-bezier(.2,.7,.2,1)] ${
              active ? "scale-x-100 w-full" : "scale-x-0 group-hover:scale-x-100 w-full"
            }`}
          />
        </span>
      </>
    );
    if ("to" in l) {
      return (
        <Link key={l.label} to={l.to} onClick={() => setOpen(false)} className={`${base} ${tone}`}>
          {inner}
        </Link>
      );
    }
    return (
      <a
        key={l.label}
        href={`/#${l.hash}`}
        onClick={(e) => { e.preventDefault(); handleHash(l.hash); }}
        className={`${base} ${tone}`}
      >
        {inner}
      </a>
    );
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-paper/85 backdrop-blur-md shadow-[0_1px_0_rgba(63,90,58,0.08),0_8px_24px_-18px_rgba(63,90,58,0.25)]"
          : "bg-paper"
      }`}
    >
      <div className="border-b border-moss/15">
        <div className="mx-auto flex w-full max-w-7xl items-center gap-6 px-5 py-3 md:px-8 md:py-4">
          <Link to="/" onClick={() => setOpen(false)} className="shrink-0 group">
            <span className="inline-block transition-transform duration-500 ease-out group-hover:-rotate-[1.5deg]">
              <KuberaWordmark size="nav" />
            </span>
          </Link>

          <nav className="ml-auto hidden items-center gap-8 md:flex">
            {links.map(renderDesktopLink)}
          </nav>

          {/* Mobile hamburger — animated bars */}
          <button
            className="btn-feel ml-auto md:hidden relative h-10 w-10 rounded-full border border-moss/25 bg-paper text-moss grid place-items-center"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            <span className="relative block h-3 w-4">
              <span
                className={`absolute left-0 top-0 h-px w-4 bg-current transition-transform duration-300 ${
                  open ? "translate-y-[6px] rotate-45" : ""
                }`}
              />
              <span
                className={`absolute left-0 top-1/2 h-px w-4 bg-current transition-opacity duration-200 ${
                  open ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute left-0 bottom-0 h-px w-4 bg-current transition-transform duration-300 ${
                  open ? "-translate-y-[5px] -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>

        {/* Scroll progress thread */}
        <div className="relative h-px w-full overflow-hidden">
          <div
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-kubera-red via-blush to-olive transition-[width] duration-150"
            style={{ width: `${progress * 100}%` }}
          />
        </div>
      </div>

      {/* Mobile sheet */}
      <div
        className={`md:hidden fixed inset-x-0 top-[57px] z-40 origin-top overflow-hidden transition-[max-height,opacity] duration-500 ease-[cubic-bezier(.2,.7,.2,1)] ${
          open ? "max-h-[80vh] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-paper border-b border-moss/15 px-6 pt-6 pb-10 shadow-[0_24px_40px_-24px_rgba(63,90,58,0.35)]">
          <nav className="flex flex-col">
            {links.map((l, i) => {
              const active = isActive(l);
              const content = (
                <div className="flex items-baseline justify-between border-b border-moss/10 py-4">
                  <span className="flex items-baseline gap-3">
                    <span className="text-[11px] tabular-nums text-moss/60">{l.index}</span>
                    <span
                      className={`font-display text-2xl tracking-tight ${
                        active ? "text-kubera-red italic" : "text-ink"
                      }`}
                    >
                      {l.label}
                    </span>
                  </span>
                  <span
                    aria-hidden
                    className={`h-px transition-all duration-500 ${
                      active ? "w-8 bg-kubera-red" : "w-3 bg-moss/30"
                    }`}
                  />
                </div>
              );
              const style = {
                transitionDelay: open ? `${80 + i * 60}ms` : "0ms",
              } as React.CSSProperties;
              const cls = `kn-item block transform transition-all duration-500 ease-out ${
                open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
              }`;
              if ("to" in l) {
                return (
                  <Link key={l.label} to={l.to} onClick={() => setOpen(false)} className={cls} style={style}>
                    {content}
                  </Link>
                );
              }
              return (
                <a
                  key={l.label}
                  href={`/#${l.hash}`}
                  onClick={(e) => { e.preventDefault(); handleHash(l.hash); }}
                  className={cls}
                  style={style}
                >
                  {content}
                </a>
              );
            })}

            <Link
              to="/catalog"
              onClick={() => setOpen(false)}
              className={`btn-feel mt-8 inline-flex items-center justify-between rounded-full bg-ink text-cream-warm px-6 py-4 transition-all duration-500 ${
                open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
              }`}
              style={{ transitionDelay: open ? `${80 + links.length * 60}ms` : "0ms" }}
            >
              <span className="font-display text-base tracking-tight">Browse the catalogue</span>
              <span aria-hidden className="text-lg leading-none">→</span>
            </Link>

            <p
              className={`mt-6 text-center font-display italic text-moss/70 transition-all duration-500 ${
                open ? "opacity-100" : "opacity-0"
              }`}
              style={{ transitionDelay: open ? `${120 + links.length * 60}ms` : "0ms" }}
            >
              The House of Fashion
            </p>
          </nav>
        </div>
      </div>

      {/* Backdrop */}
      <div
        onClick={() => setOpen(false)}
        className={`md:hidden fixed inset-0 top-[57px] z-30 bg-ink/30 backdrop-blur-[2px] transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden
      />
    </header>
  );
}
