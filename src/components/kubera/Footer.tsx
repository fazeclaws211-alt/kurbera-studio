import { KuberaWordmark } from "./Wordmark";

export function Footer() {
  return (
    <footer className="bg-moss text-cream-warm">
      <div className="thread-divider opacity-50" />
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-5 py-14 text-center md:grid-cols-[1.2fr_1fr_1fr] md:px-8 md:text-left">
        <div className="flex flex-col items-center md:items-start">
          <KuberaWordmark size="footer" className="[&_span:first-child]:!text-cream-warm [&_span:nth-child(2)]:!text-cream-warm/70" />
          <p className="mt-4 max-w-sm text-sm text-cream-warm/75 leading-relaxed">
            A boutique fashion house presenting considered garment lines —
            previewed by appointment, lookbook, or custom brief.
          </p>
        </div>
        <div>
          <p className="micro-label text-cream-warm/55">Visit</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li><a href="#collections" className="hover:text-blush transition">Garment Lines</a></li>
            <li><a href="#sample-desk" className="hover:text-blush transition">Preview Desk</a></li>
            <li><a href="#lookbook" className="hover:text-blush transition">Lookbook</a></li>
            <li><a href="#contact" className="hover:text-blush transition">Contact</a></li>
          </ul>
        </div>
        <div>
          <p className="micro-label text-cream-warm/55">Studio</p>
          <ul className="mt-3 space-y-2 text-sm text-cream-warm/85">
            <li>Kubera Studio India LLP</li>
            <li>Instagram · @kubera.studio</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-cream-warm/15">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-2 px-5 py-5 text-xs text-cream-warm/60 sm:flex-row md:px-8">
          <span>© {new Date().getFullYear()} Kubera Studio India LLP. All rights reserved.</span>
          <span className="micro-label">The House of Fashion</span>
        </div>
      </div>
    </footer>
  );
}
