import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  PerspectiveCamera,
  Points,
  Scene,
  ShaderMaterial,
  WebGLRenderer,
} from "three";
import { createParticleData, DESKTOP_PARTICLES, MOBILE_PARTICLES } from "./particleShape";

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uPixelRatio;
  uniform float uPointScale;
  attribute vec3 aDetail;
  varying float vAlpha;
  varying vec3 vColor;

  void main() {
    vec3 p = position;
    float phase = atan(p.z, p.x);
    p.y += 0.13 * sin(phase * 3.0 + uTime * 0.24 + p.x * 0.7);
    p.xz *= 1.0 + 0.045 * sin(phase * 2.0 - uTime * 0.18 + p.y);
    p.z += 0.07 * sin(p.x * 1.8 + uTime * 0.16);

    vec4 viewPosition = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * viewPosition;
    gl_PointSize = clamp(aDetail.x * uPixelRatio * uPointScale * (8.0 / -viewPosition.z), 0.8, 4.0);
    float depthFade = 1.0 - smoothstep(5.0, 12.0, -viewPosition.z);
    vAlpha = (0.28 + 0.62 * aDetail.y) * (0.5 + 0.5 * depthFade);
    vColor = mix(vec3(0.52, 0.60, 0.44), vec3(0.88, 0.89, 0.77), aDetail.z);
    if (aDetail.z > 0.965) vColor = vec3(0.76, 0.91, 0.43);
  }
`;

const fragmentShader = /* glsl */ `
  varying float vAlpha;
  varying vec3 vColor;
  void main() {
    float radius = length(gl_PointCoord - 0.5);
    float softPoint = 1.0 - smoothstep(0.12, 0.5, radius);
    if (softPoint < 0.01) discard;
    gl_FragColor = vec4(vColor, vAlpha * softPoint);
  }
`;

export function createParticleScene(container, { reducedMotion, onReady, onFailure }) {
  let renderer;
  let geometry;
  let material;
  let resizeObserver;
  let intersectionObserver;
  let frame = 0;
  let disposed = false;
  let contextLost = false;
  let inView = true;
  let elapsed = 0;
  let previousTime = 0;
  let points;
  const pointer = { x: 0, y: 0 };
  const easedPointer = { x: 0, y: 0 };
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
  const scene = new Scene();
  const camera = new PerspectiveCamera(36, 1, 0.1, 40);
  camera.position.set(0, 0, 8.8);

  const stop = () => {
    window.cancelAnimationFrame(frame);
    frame = 0;
    previousTime = 0;
  };

  const render = (now) => {
    frame = 0;
    if (disposed || contextLost || document.hidden || !inView) return;
    if (previousTime && !reducedMotion) elapsed += Math.min((now - previousTime) / 1000, 0.05);
    previousTime = now;
    material.uniforms.uTime.value = elapsed;
    easedPointer.x += (pointer.x - easedPointer.x) * 0.035;
    easedPointer.y += (pointer.y - easedPointer.y) * 0.035;
    points.rotation.set(
      0.58 + easedPointer.y * 0.035,
      -0.18 + Math.sin(elapsed * 0.065) * 0.12 + easedPointer.x * 0.05,
      -0.16 + Math.sin(elapsed * 0.045) * 0.035,
    );
    renderer.render(scene, camera);
    if (!reducedMotion) frame = window.requestAnimationFrame(render);
  };

  const resume = () => {
    if (!disposed && !contextLost && !document.hidden && inView && !frame) {
      frame = window.requestAnimationFrame(render);
    }
  };

  const onVisibility = () => document.hidden ? stop() : resume();
  const onPointerMove = (event) => {
    if (reducedMotion || !finePointer.matches) return;
    const bounds = container.getBoundingClientRect();
    pointer.x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2;
    pointer.y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2;
  };
  const onPointerLeave = () => { pointer.x = 0; pointer.y = 0; };
  const onContextLost = (event) => {
    event.preventDefault();
    contextLost = true;
    stop();
    onFailure();
  };
  const onContextRestored = () => {
    contextLost = false;
    resume();
    onReady();
  };

  const dispose = () => {
    disposed = true;
    stop();
    resizeObserver?.disconnect();
    intersectionObserver?.disconnect();
    document.removeEventListener("visibilitychange", onVisibility);
    container.removeEventListener("pointermove", onPointerMove);
    container.removeEventListener("pointerleave", onPointerLeave);
    renderer?.domElement.removeEventListener("webglcontextlost", onContextLost);
    renderer?.domElement.removeEventListener("webglcontextrestored", onContextRestored);
    geometry?.dispose();
    material?.dispose();
    renderer?.dispose();
    renderer?.forceContextLoss();
    renderer?.domElement.remove();
  };

  try {
    renderer = new WebGLRenderer({ alpha: true, antialias: false, powerPreference: "low-power" });
    renderer.setClearColor(0x10110f, 0);
    renderer.domElement.className = "particle-sculpture__canvas";
    renderer.domElement.setAttribute("aria-hidden", "true");
    const { positions, details } = createParticleData(DESKTOP_PARTICLES);
    geometry = new BufferGeometry();
    geometry.setAttribute("position", new BufferAttribute(positions, 3));
    geometry.setAttribute("aDetail", new BufferAttribute(details, 3));
    material = new ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uPixelRatio: { value: 1 },
        uPointScale: { value: 1 },
      },
      transparent: true,
      depthWrite: false,
      blending: AdditiveBlending,
    });
    points = new Points(geometry, material);
    scene.add(points);
    container.appendChild(renderer.domElement);

    const resize = () => {
      const { width, height } = container.getBoundingClientRect();
      if (!width || !height) return;
      const mobile = window.innerWidth <= 720;
      const pixelRatio = Math.min(window.devicePixelRatio || 1, mobile ? 1.5 : 2);
      renderer.setPixelRatio(pixelRatio);
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      // Fit the entire silhouette in portrait as well as wide canvases.
      camera.position.z = Math.max(8.8, 8.0 / camera.aspect);
      camera.updateProjectionMatrix();
      geometry.setDrawRange(0, mobile ? MOBILE_PARTICLES : DESKTOP_PARTICLES);
      material.uniforms.uPixelRatio.value = pixelRatio;
      material.uniforms.uPointScale.value = mobile ? 1.05 : 1.0;
      resume();
    };

    resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);
    if ("IntersectionObserver" in window) {
      intersectionObserver = new IntersectionObserver(([entry]) => {
        inView = entry.isIntersecting;
        if (inView) resume();
        else stop();
      });
      intersectionObserver.observe(container);
    }
    document.addEventListener("visibilitychange", onVisibility);
    container.addEventListener("pointermove", onPointerMove, { passive: true });
    container.addEventListener("pointerleave", onPointerLeave);
    renderer.domElement.addEventListener("webglcontextlost", onContextLost);
    renderer.domElement.addEventListener("webglcontextrestored", onContextRestored);
    resize();
    // Render once before revealing the canvas, including for reduced motion.
    stop();
    render(performance.now());
    onReady();
    return dispose;
  } catch (error) {
    dispose();
    throw error;
  }
}
