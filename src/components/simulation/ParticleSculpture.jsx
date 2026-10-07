import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "../../lib/useReducedMotion";

export function ParticleSculpture() {
  const containerRef = useRef(null);
  const [isReady, setIsReady] = useState(false);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    let cancelled = false;
    let dispose;
    setIsReady(false);

    // Keep Three.js out of the initial page load and the Research route.
    import("./particleScene")
      .then(({ createParticleScene }) => {
        if (cancelled) return;
        dispose = createParticleScene(containerRef.current, {
          reducedMotion,
          onReady: () => !cancelled && setIsReady(true),
          onFailure: () => !cancelled && setIsReady(false),
        });
      })
      .catch(() => {
        // The SVG is also the permanent fallback for unavailable WebGL or a failed import.
        if (!cancelled) setIsReady(false);
      });

    return () => {
      cancelled = true;
      dispose?.();
    };
  }, [reducedMotion]);

  return (
    <div
      ref={containerRef}
      className={`particle-sculpture${isReady ? " is-ready" : ""}`}
      aria-hidden="true"
    >
      <img
        className="particle-sculpture__fallback"
        src="/particle-sculpture.svg"
        width="1200"
        height="465"
        alt=""
        decoding="async"
        draggable="false"
      />
    </div>
  );
}
