import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
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
  const router = useRouter();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToId = (id: string) => {
    setOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleHash = async (hash: string) => {
    if (!isHome) {
      await router.navigate({ to: "/", hash });
      setTimeout(() => scrollToId(hash), 60);
    } else {
      scrollToId(hash);
    }
  };

  const renderLink = (l: NavLink, cls: string) => {
    if ("to" in l) {
      return (
        <Link
          key={l.label}
          to={l.to}
          onClick={() => setOpen(false)}
          className={cls}
        >
          {l.label}
        </Link>
      );
    }
    return (
      <a
        key={l.label}
        href={`/#${l.hash}`}
        onClick={(e) => { e.preventDefault(); handleHash(l.hash); }}
        className={cls}
      >
        {l.label}
      </a>
    );
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-colors duration-300 ${
        scrolled ? "bg-paper/92 backdrop-blur-md" : "bg-paper"
      }`}
    >
      <div className="border-b border-moss/15">
        <div className="mx-auto flex w-full max-w-7xl items-center gap-6 px-5 py-3 md:px-8 md:py-4">
          <Link to="/" onClick={() => setOpen(false)} className="shrink-0">
            <KuberaWordmark size="nav" />
          </Link>

          <nav className="mx-auto hidden items-center gap-9 md:flex">
            {links.map((l) =>
              renderLink(l, "font-display text-[15px] text-ink/85 transition hover:text-kubera-red"),
            )}
          </nav>

          <div className="ml-auto hidden items-center gap-3 md:flex">
            <div className="flex items-center gap-2 rounded-full bg-moss px-2 py-1.5 pl-4 text-cream-warm">
              <span className="micro-label text-cream-warm/85">Browse the house</span>
              <Link
                to="/catalog"
                className="btn-feel rounded-full bg-kubera-red px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-cream-warm transition hover:bg-kubera-red-deep"
              >
                Open Catalog
              </Link>
            </div>
          </div>


          <button
            className="btn-feel ml-auto md:hidden rounded-full border border-moss/30 p-2 text-moss"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden bg-paper border-b border-moss/15 px-5 py-4">
          <nav className="flex flex-col gap-3">
            {links.map((l) =>
              renderLink(l, "font-display text-lg text-ink hover:text-kubera-red"),
            )}
            <Link
              to="/catalog"
              onClick={() => setOpen(false)}
              className="btn-feel mt-2 inline-flex w-fit items-center gap-2 rounded-full bg-kubera-red px-4 py-2 text-cream-warm"
            >
              <span className="micro-label">Open Catalog</span>
            </Link>

          </nav>
        </div>
      )}
    </header>
  );
}

