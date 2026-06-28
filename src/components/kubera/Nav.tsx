import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useRouter, useRouterState } from "@tanstack/react-router";
import { KuberaWordmark } from "./Wordmark";

type NavLink = { label: string } & ({ to: "/catalog" } | { hash: string });

const links: NavLink[] = [
  { to: "/catalog", label: "Catalog" },
  { hash: "sample-desk", label: "Preview Desk" },
  { hash: "lookbook", label: "Lookbook" },
  { hash: "contact", label: "Contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const router = useRouter();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isHome = pathname === "/";
  const isCatalog = pathname.startsWith("/catalog");

  const sheetRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const progressRef = useRef<HTMLDivElement | null>(null);
  const headerRef = useRef<HTMLElement | null>(null);

  // rAF-throttled scroll handler — writes only to a ref (no React re-render)
  useEffect(() => {
    let ticking = false;
    let lastScrolled = false;
    const update = () => {
      ticking = false;
      const y = window.scrollY;
      const isScrolled = y > 12;
      if (isScrolled !== lastScrolled) {
        lastScrolled = isScrolled;
        setScrolled(isScrolled);
      }
      const h = document.documentElement.scrollHeight - window.innerHeight;
      const p = h > 0 ? Math.min(1, y / h) : 0;
      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${p})`;
      }
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Body scroll lock + focus management for mobile sheet
  useEffect(() => {
    if (!open) {
      document.body.style.overflow = "";
      return;
    }
    document.body.style.overflow = "hidden";
    const sheet = sheetRef.current;
    const first = sheet?.querySelector<HTMLElement>("a,button");
    first?.focus();
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  // Focus trap + ESC + keyboard nav within mobile sheet
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        setOpen(false);
        triggerRef.current?.focus();
        return;
      }
      const sheet = sheetRef.current;
      if (!sheet) return;
      const focusables = Array.from(
        sheet.querySelectorAll<HTMLElement>('a[href],button:not([disabled]),[tabindex]:not([tabindex="-1"])'),
      ).filter((el) => !el.hasAttribute("aria-hidden"));
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement as HTMLElement | null;
      if (e.key === "Tab") {
        if (e.shiftKey && active === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && active === last) {
          e.preventDefault();
          first.focus();
        }
      } else if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        e.preventDefault();
        const idx = focusables.indexOf(active as HTMLElement);
        const next = e.key === "ArrowDown"
          ? focusables[(idx + 1 + focusables.length) % focusables.length]
          : focusables[(idx - 1 + focusables.length) % focusables.length];
        next.focus();
      } else if (e.key === "Home") {
        e.preventDefault(); first.focus();
      } else if (e.key === "End") {
        e.preventDefault(); last.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  // Scroll-spy: pick section whose top is nearest to a stable focus line
  // (1/3 down the viewport, just below the sticky nav). This is consistent
  // across mobile and desktop and avoids the rootMargin race where the
  // currently-visible section flips back and forth.
  useEffect(() => {
    if (!isHome) { setActiveSection(""); return; }
    const ids = links.filter((l) => "hash" in l).map((l) => (l as any).hash as string);
    let raf = 0;
    const pick = () => {
      raf = 0;
      const navH = headerRef.current?.offsetHeight ?? 64;
      const focusLine = navH + (window.innerHeight - navH) * 0.25;
      let bestId = "";
      let bestDist = Infinity;
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        // Section must have entered (top above focus line) and not yet fully exited.
        if (rect.top <= focusLine && rect.bottom >= navH) {
          const dist = Math.abs(rect.top - focusLine);
          if (dist < bestDist) { bestDist = dist; bestId = id; }
        }
      }
      // Near page bottom, force last section
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) {
        bestId = ids[ids.length - 1] ?? bestId;
      }
      setActiveSection((prev) => (prev === bestId ? prev : bestId));
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(pick); };
    pick();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [isHome]);

  const scrollToId = useCallback((id: string) => {
    setOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

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
      "kn-link group relative inline-flex items-baseline font-display text-[15px] tracking-tight transition-colors duration-150 will-change-[color]";
    const tone = active ? "text-kubera-red" : "text-ink/80 hover:text-ink";
    const inner = (
      <span className="relative">
        {l.label}
        <span
          aria-hidden
          className="pointer-events-none absolute -bottom-1 left-0 h-px w-full bg-kubera-red origin-left transition-transform duration-300 ease-out will-change-transform"
          style={{ transform: active ? "scaleX(1)" : "scaleX(0)" }}
        />
      </span>
    );
    if ("to" in l) {
      return (
        <Link
          key={l.label}
          to={l.to}
          onClick={() => setOpen(false)}
          className={`${base} ${tone} hover:[&>span>span]:!scale-x-100`}
          aria-current={active ? "page" : undefined}
        >
          {inner}
        </Link>
      );
    }
    return (
      <a
        key={l.label}
        href={`/#${l.hash}`}
        onClick={(e) => { e.preventDefault(); handleHash(l.hash); }}
        className={`${base} ${tone} hover:[&>span>span]:!scale-x-100`}
        aria-current={active ? "true" : undefined}
      >
        {inner}
      </a>
    );
  };

  return (
    <header
      ref={headerRef}
      className={`sticky top-0 z-50 w-full transition-shadow duration-200 ${
        scrolled
          ? "bg-paper/85 backdrop-blur-md shadow-[0_1px_0_rgba(63,90,58,0.08),0_8px_24px_-18px_rgba(63,90,58,0.25)]"
          : "bg-paper"
      }`}
    >
      <div className="border-b border-moss/15">
        <div className="mx-auto flex w-full max-w-7xl items-center gap-6 px-5 py-3 md:px-8 md:py-4">
          <Link to="/" onClick={() => setOpen(false)} className="shrink-0 group">
            <span className="inline-block transition-transform duration-300 ease-out group-hover:-rotate-[1.5deg] will-change-transform">
              <KuberaWordmark size="nav" />
            </span>
          </Link>

          <nav className="ml-auto hidden items-center gap-8 md:flex" aria-label="Primary">
            {links.map(renderDesktopLink)}
          </nav>

          {/* Mobile hamburger — animated bars */}
          <button
            ref={triggerRef}
            className="btn-feel ml-auto md:hidden relative h-10 w-10 rounded-full border border-moss/25 bg-paper text-moss grid place-items-center"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="kubera-mobile-nav"
          >
            <span className="relative block h-3 w-4">
              <span
                className={`absolute left-0 top-0 h-px w-4 bg-current transition-transform duration-200 ease-out ${
                  open ? "translate-y-[6px] rotate-45" : ""
                }`}
              />
              <span
                className={`absolute left-0 top-1/2 h-px w-4 bg-current transition-opacity duration-150 ${
                  open ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute left-0 bottom-0 h-px w-4 bg-current transition-transform duration-200 ease-out ${
                  open ? "-translate-y-[5px] -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>

        {/* Scroll progress thread — transform-only, no layout thrash */}
        <div className="relative h-px w-full overflow-hidden">
          <div
            ref={progressRef}
            className="absolute inset-y-0 left-0 w-full origin-left bg-gradient-to-r from-kubera-red via-blush to-olive will-change-transform"
            style={{ transform: "scaleX(0)" }}
          />
        </div>
      </div>

      {/* Mobile sheet */}
      <div
        ref={sheetRef}
        id="kubera-mobile-nav"
        role="dialog"
        aria-modal="true"
        aria-label="Main navigation"
        aria-hidden={!open}
        className={`md:hidden fixed inset-x-0 top-[57px] z-40 origin-top overflow-hidden transition-[transform,opacity] duration-300 ease-out will-change-[transform,opacity] ${
          open ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-2 pointer-events-none"
        }`}
      >
        <div className="bg-paper border-b border-moss/15 px-6 pt-6 pb-10 shadow-[0_24px_40px_-24px_rgba(63,90,58,0.35)]">
          <nav className="flex flex-col" aria-label="Mobile">
            {links.map((l, i) => {
              const active = isActive(l);
              const content = (
                <div className="flex items-baseline justify-between border-b border-moss/10 py-4">
                  <span
                    className={`font-display text-2xl tracking-tight transition-colors duration-150 ${
                      active ? "text-kubera-red italic" : "text-ink"
                    }`}
                  >
                    {l.label}
                  </span>
                  <span
                    aria-hidden
                    className={`h-px transition-all duration-300 ${
                      active ? "w-8 bg-kubera-red" : "w-3 bg-moss/30"
                    }`}
                  />
                </div>
              );
              const style = {
                transitionDelay: open ? `${60 + i * 40}ms` : "0ms",
              } as React.CSSProperties;
              const cls = `kn-item block transform transition-[opacity,transform] duration-300 ease-out will-change-[opacity,transform] ${
                open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
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
              className={`btn-feel mt-8 inline-flex items-center justify-between rounded-full bg-ink text-cream-warm px-6 py-4 transition-[opacity,transform] duration-300 ease-out ${
                open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
              }`}
              style={{ transitionDelay: open ? `${60 + links.length * 40}ms` : "0ms" }}
            >
              <span className="font-display text-base tracking-tight">Browse the catalogue</span>
              <span aria-hidden className="text-lg leading-none">→</span>
            </Link>

            <p
              className={`mt-6 text-center font-display italic text-moss/70 transition-opacity duration-300 ${
                open ? "opacity-100" : "opacity-0"
              }`}
              style={{ transitionDelay: open ? `${100 + links.length * 40}ms` : "0ms" }}
            >
              The House of Fashion
            </p>
          </nav>
        </div>
      </div>

      {/* Backdrop */}
      <div
        onClick={() => setOpen(false)}
        className={`md:hidden fixed inset-0 top-[57px] z-30 bg-ink/30 backdrop-blur-[2px] transition-opacity duration-200 ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden
      />
    </header>
  );
}
