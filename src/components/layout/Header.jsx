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
          {navItems.map((item) =>
            item.dropdown ? (
              <div key={item.label} className="group relative py-2">
                {item.href ? (
                  <a
                    href={resolveHref(item.href)}
                    aria-haspopup="true"
                    className="inline-flex items-center gap-1.5 uppercase tracking-[0.2em] transition hover:text-white"
                  >
                    {item.label}
                    <span aria-hidden="true" className="text-[0.58rem]">
                      ⌄
                    </span>
                  </a>
                ) : (
                  <button
                    type="button"
                    aria-haspopup="true"
                    className="inline-flex items-center gap-1.5 uppercase tracking-[0.2em] transition hover:text-white"
                  >
                    {item.label}
                    <span aria-hidden="true" className="text-[0.58rem]">
                      ⌄
                    </span>
                  </button>
                )}
                <div className="invisible absolute left-1/2 top-full z-50 w-56 -translate-x-1/2 translate-y-2 border border-white/10 bg-[rgba(4,7,10,0.97)] p-3 opacity-0 shadow-[0_20px_60px_rgba(0,0,0,0.42)] backdrop-blur-xl transition group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
                  {item.dropdownLabel ? (
                    <div className="border-b border-white/8 px-3 pb-3 text-[0.58rem] tracking-[0.2em] text-textSecondary">
                      {item.dropdownLabel}
                    </div>
                  ) : null}
                  <div className="grid gap-1 pt-2">
                    {item.dropdown.map((entry) => (
                      <span key={entry} className="px-3 py-2 text-[0.68rem] tracking-[0.14em] text-textPrimary">
                        {entry}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <a key={item.label} href={resolveHref(item.href)} className="transition hover:text-white">
                {item.label}
              </a>
            )
          )}
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
              <div key={item.label}>
                {item.href ? (
                  <a
                    href={resolveHref(item.href)}
                    onClick={() => setIsMenuOpen(false)}
                    className="block rounded px-2 py-3 text-sm uppercase tracking-[0.18em] text-textPrimary transition hover:bg-white/[0.05]"
                  >
                    {item.label}
                  </a>
                ) : (
                  <div className="px-2 py-3 text-sm uppercase tracking-[0.18em] text-textPrimary">{item.label}</div>
                )}
                {item.dropdown ? (
                  <div className="ml-2 grid gap-0.5 border-l border-white/10 py-1 pl-3">
                    {item.dropdown.map((entry) => (
                      <span key={entry} className="py-1 text-[0.72rem] uppercase tracking-[0.14em] text-textSecondary">
                        {entry}
                      </span>
                    ))}
                  </div>
                ) : null}
              </div>
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
