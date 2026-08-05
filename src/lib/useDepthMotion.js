import { useEffect, useRef } from "react";

/**
 * Drives the subtle pointer-reactive tilt + glow used by `.depth-panel` elements.
 * No-ops under `prefers-reduced-motion: reduce`.
 */
export function useDepthMotion() {
  const panelRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") {
      return undefined;
    }

    const node = panelRef.current;

    if (!node || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return undefined;
    }

    let frameId = 0;
    const state = {
      currentRotateX: 0,
      currentRotateY: 0,
      targetRotateX: 0,
      targetRotateY: 0,
      currentGlowX: 50,
      currentGlowY: 50,
      targetGlowX: 50,
      targetGlowY: 50,
    };

    const render = () => {
      state.currentRotateX += (state.targetRotateX - state.currentRotateX) * 0.12;
      state.currentRotateY += (state.targetRotateY - state.currentRotateY) * 0.12;
      state.currentGlowX += (state.targetGlowX - state.currentGlowX) * 0.14;
      state.currentGlowY += (state.targetGlowY - state.currentGlowY) * 0.14;

      node.style.setProperty("--depth-rotate-x", `${state.currentRotateX.toFixed(2)}deg`);
      node.style.setProperty("--depth-rotate-y", `${state.currentRotateY.toFixed(2)}deg`);
      node.style.setProperty("--depth-glow-x", `${state.currentGlowX.toFixed(2)}%`);
      node.style.setProperty("--depth-glow-y", `${state.currentGlowY.toFixed(2)}%`);

      const stillMoving =
        Math.abs(state.targetRotateX - state.currentRotateX) > 0.01 ||
        Math.abs(state.targetRotateY - state.currentRotateY) > 0.01 ||
        Math.abs(state.targetGlowX - state.currentGlowX) > 0.02 ||
        Math.abs(state.targetGlowY - state.currentGlowY) > 0.02;

      if (stillMoving) {
        frameId = window.requestAnimationFrame(render);
      } else {
        frameId = 0;
      }
    };

    const schedule = () => {
      if (!frameId) {
        frameId = window.requestAnimationFrame(render);
      }
    };

    const handleMove = (event) => {
      const rect = node.getBoundingClientRect();
      const offsetX = (event.clientX - rect.left) / rect.width;
      const offsetY = (event.clientY - rect.top) / rect.height;

      state.targetRotateY = (offsetX - 0.5) * 8;
      state.targetRotateX = (0.5 - offsetY) * 7;
      state.targetGlowX = offsetX * 100;
      state.targetGlowY = offsetY * 100;
      schedule();
    };

    const handleLeave = () => {
      state.targetRotateX = 0;
      state.targetRotateY = 0;
      state.targetGlowX = 50;
      state.targetGlowY = 50;
      schedule();
    };

    node.addEventListener("pointermove", handleMove);
    node.addEventListener("pointerleave", handleLeave);

    return () => {
      node.removeEventListener("pointermove", handleMove);
      node.removeEventListener("pointerleave", handleLeave);
      if (frameId) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, []);

  return panelRef;
}
