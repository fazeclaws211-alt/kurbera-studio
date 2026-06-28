import { KuberaWordmark } from "./Wordmark";

export function Footer() {
  return (
    <footer className="bg-moss text-cream-warm">
      <div className="thread-divider opacity-50" />
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-5 py-14 md:grid-cols-[1.2fr_1fr_1fr] md:px-8">
        <div>
          <KuberaWordmark size="footer" className="[&_span:first-child]:!text-cream-warm [&_span:nth-child(2)]:!text-cream-warm/70" />
          <p className="mt-4 max-w-sm text-sm text-cream-warm/75 leading-relaxed">
            A boutique textile studio building considered fabric stories for
            designers, ateliers, and small-edition houses.
          </p>
        </div>
        <div>
          <p className="micro-label text-cream-warm/55">Visit</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li><a href="#collections" className="hover:text-blush transition">Collections</a></li>
            <li><a href="#sample-desk" className="hover:text-blush transition">Sample Desk</a></li>
            <li><a href="#lookbook" className="hover:text-blush transition">Lookbook</a></li>
            <li><a href="#contact" className="hover:text-blush transition">Contact</a></li>
          </ul>
        </div>
        <div>
          <p className="micro-label text-cream-warm/55">Studio</p>
          <ul className="mt-3 space-y-2 text-sm text-cream-warm/85">
            <li>Kubera Studio India LLP</li>
            <li>studio@kubera.in</li>
            <li>+91 99999 99999</li>
            <li>Instagram · @kubera.studio</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-cream-warm/15">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-5 text-xs text-cream-warm/60 md:px-8">
          <span>© {new Date().getFullYear()} Kubera Studio India LLP. All rights reserved.</span>
          <span className="micro-label">The House of Fashion & Fabric</span>
        </div>
      </div>
    </footer>
  );
}
