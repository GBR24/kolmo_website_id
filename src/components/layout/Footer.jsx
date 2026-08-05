import kolmoMark from "../../../assets/kolmo-mark.svg";
import { CALENDLY_URL, STATS_API_URL } from "../../lib/constants";

export function Footer({ onCookieSettings }) {
  return (
    <footer className="site-footer">
      <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-5 px-5 py-8 text-sm text-[rgba(214,226,240,0.72)] sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
        <div className="flex items-center gap-3 tracking-[0.28em] text-textPrimary">
          <img src={kolmoMark} alt="" className="h-5 w-5 opacity-90" />
          <span>KOLMO</span>
        </div>

        <nav aria-label="Footer" className="flex flex-wrap items-center gap-5 text-[0.72rem] uppercase tracking-[0.18em]">
          <a href={STATS_API_URL} className="transition hover:text-white">
            API
          </a>
          <a href="/blog" className="transition hover:text-white">
            Blog
          </a>
          <a href={CALENDLY_URL} target="_blank" rel="noreferrer" className="transition hover:text-white">
            Contact
          </a>
          <button type="button" onClick={onCookieSettings} className="transition hover:text-white">
            Cookie Settings
          </button>
        </nav>

        <div className="text-[0.72rem] uppercase tracking-[0.18em] text-textSecondary/80">© 2026 Kolmo. All rights reserved.</div>
      </div>
    </footer>
  );
}
