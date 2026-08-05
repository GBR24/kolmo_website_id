export function ScrollReveal({ children, className = "", delay = 0, as: Component = "div" }) {
  return (
    <Component className={`scroll-reveal ${className}`} style={{ "--reveal-delay": `${delay}ms` }}>
      {children}
    </Component>
  );
}
