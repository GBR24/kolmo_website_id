import kolmoMark from "../../../assets/kolmo-mark.svg";
import { BookDemoLink } from "../shared/CtaLink";

export function Header({ isBlogPage }) {
  return (
    <header className="site-header">
      <div className="header-inner page-width">
        <a href={isBlogPage ? "/" : "#top"} aria-label="Kolmo Labs home" className="brand"><img src={kolmoMark} alt="" /><span>kolmo<span className="brand-labs">labs</span></span></a>
        <nav aria-label="Primary" className="header-navigation"><a href="/blog" aria-current={isBlogPage ? "page" : undefined}>Blog <span aria-hidden="true">↗</span></a></nav>
        <BookDemoLink size="sm" kind="secondary" />
      </div>
    </header>
  );
}
