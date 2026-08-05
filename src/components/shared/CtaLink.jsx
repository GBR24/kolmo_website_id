import { CALENDLY_URL } from "../../lib/constants";

const sizeClasses = {
  sm: "px-3.5 py-2 text-[0.62rem]",
  md: "px-5 py-2.5 text-[0.64rem]",
  lg: "px-6 py-3.5 text-[0.7rem]",
};

const kindClasses = {
  primary: "rounded border border-[#4da3ff]/55 bg-[#4da3ff]/90 font-semibold text-[#06111a] hover:border-[#8fc6ff] hover:bg-[#78bdff]",
  secondary:
    "rounded border border-white/12 bg-white/[0.05] text-textPrimary hover:border-white/22 hover:bg-white/[0.09]",
};

/**
 * The single, consistent "Book a Demo" entry point used across the page (nav, sections,
 * final CTA). Always resolves to the same Calendly destination so there is only ever one
 * primary conversion target.
 */
export function BookDemoLink({ size = "md", kind = "primary", className = "", children = "Book a Demo" }) {
  return (
    <a
      href={CALENDLY_URL}
      target="_blank"
      rel="noreferrer"
      className={`inline-flex items-center justify-center gap-2 uppercase tracking-[0.14em] transition ${sizeClasses[size]} ${kindClasses[kind]} ${className}`}
    >
      {children}
    </a>
  );
}

export function CtaButton({ size = "md", kind = "secondary", className = "", onClick, children, type = "button" }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`inline-flex items-center justify-center gap-2 uppercase tracking-[0.14em] transition ${sizeClasses[size]} ${kindClasses[kind]} ${className}`}
    >
      {children}
    </button>
  );
}
