import { useEffect, useState } from "react";
import kolmoMark from "../../../assets/kolmo-mark.svg";
import { BookDemoLink } from "../shared/CtaLink";
import { navItems, STATS_API_URL } from "../../lib/constants";

export function Header({ isBlogPage }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (typeof document === "undefined") {
      return undefined;
    }

    document.body.style.overflow = isMenuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  useEffect(() => {
    if (!isMenuOpen || typeof window === "undefined") {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isMenuOpen]);

  const resolveHref = (href) => (isBlogPage ? `/${href}` : href);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[rgba(4,5,7,0.82)] shadow-[0_12px_36px_rgba(0,0,0,0.18)] backdrop-blur-xl">
      <div className="mx-auto flex w-full min-w-0 max-w-[100vw] items-center justify-between px-5 py-3.5 sm:px-6 lg:max-w-[1280px] lg:px-8">
        <a
          href={isBlogPage ? "/" : "#top"}
          aria-label="Kolmo Labs home"
          className="flex items-center gap-3 text-sm font-semibold tracking-[0.34em] text-textPrimary"
        >
          <img src={kolmoMark} alt="" className="h-6 w-6 opacity-90" />
          <span>KOLMO</span>
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-7 text-[0.74rem] uppercase tracking-[0.2em] text-[rgba(214,226,240,0.82)] lg:flex">
          {navItems.map((item) => (
            <a key={item.label} href={resolveHref(item.href)} className="transition hover:text-white">
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden sm:block">
            <BookDemoLink size="sm">Book a Demo</BookDemoLink>
          </div>

          <button
            type="button"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-nav-panel"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            onClick={() => setIsMenuOpen((open) => !open)}
            className="inline-flex h-9 w-9 items-center justify-center rounded border border-white/10 text-textPrimary lg:hidden"
          >
            <span aria-hidden="true" className="relative block h-3 w-4">
              <span
                className={`absolute left-0 top-0 h-px w-4 bg-current transition ${isMenuOpen ? "translate-y-1.5 rotate-45" : ""}`}
              />
              <span className={`absolute left-0 top-1.5 h-px w-4 bg-current transition ${isMenuOpen ? "opacity-0" : ""}`} />
              <span
                className={`absolute left-0 top-3 h-px w-4 bg-current transition ${isMenuOpen ? "-translate-y-1.5 -rotate-45" : ""}`}
              />
            </span>
          </button>
        </div>
      </div>

      {isMenuOpen ? (
        <div id="mobile-nav-panel" className="border-t border-white/10 bg-[rgba(4,5,7,0.98)] px-5 py-5 lg:hidden">
          <nav aria-label="Mobile" className="grid gap-1">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={resolveHref(item.href)}
                onClick={() => setIsMenuOpen(false)}
                className="rounded px-2 py-3 text-sm uppercase tracking-[0.18em] text-textPrimary transition hover:bg-white/[0.05]"
              >
                {item.label}
              </a>
            ))}
            <a
              href={STATS_API_URL}
              onClick={() => setIsMenuOpen(false)}
              className="rounded px-2 py-3 text-sm uppercase tracking-[0.18em] text-textSecondary transition hover:bg-white/[0.05]"
            >
              API
            </a>
            <a
              href="/blog"
              onClick={() => setIsMenuOpen(false)}
              className="rounded px-2 py-3 text-sm uppercase tracking-[0.18em] text-textSecondary transition hover:bg-white/[0.05]"
            >
              Blog
            </a>
          </nav>
          <div className="mt-4 sm:hidden">
            <BookDemoLink size="md" className="w-full">
              Book a Demo
            </BookDemoLink>
          </div>
        </div>
      ) : null}
    </header>
  );
}
