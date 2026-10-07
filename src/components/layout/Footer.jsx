import kolmoMark from "../../../assets/kolmo-mark.svg";
import { CALENDLY_URL } from "../../lib/constants";

export function Footer({ onCookieSettings }) {
  return <footer className="minimal-footer page-width"><a href="/" className="footer-brand" aria-label="Kolmo Labs home"><img src={kolmoMark} alt="" /><span>Kolmo Labs <span className="copyright">© {new Date().getFullYear()}</span></span></a><nav aria-label="Footer"><a href={CALENDLY_URL} target="_blank" rel="noreferrer">Contact <span aria-hidden="true">↗</span></a><a href="/blog">Blog</a><button type="button" onClick={onCookieSettings}>Privacy & cookies</button></nav></footer>;
}
