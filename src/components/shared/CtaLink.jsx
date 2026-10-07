import { CALENDLY_URL } from "../../lib/constants";
import { ArrowIcon } from "./ArrowIcon";

export function BookDemoLink({ size = "md", kind = "primary", className = "", children = "Book a call" }) {
  return <a href={CALENDLY_URL} target="_blank" rel="noreferrer" className={`demo-link demo-link--${kind} demo-link--${size} ${className}`}>{children}<ArrowIcon diagonal /></a>;
}

export function CtaButton({ size = "md", kind = "secondary", className = "", onClick, children, type = "button" }) {
  return <button type={type} onClick={onClick} className={`demo-link demo-link--${kind} demo-link--${size} ${className}`}>{children}</button>;
}
