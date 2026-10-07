export const DESKTOP_PARTICLES = 28000;
export const MOBILE_PARTICLES = 11000;

// Seeded sampling gives both the live scene and its static fallback the same silhouette.
export function createParticleData(count) {
  let seed = 81723;
  const random = () => {
    seed = (Math.imul(1664525, seed) + 1013904223) >>> 0;
    return seed / 4294967296;
  };
  const positions = new Float32Array(count * 3);
  const details = new Float32Array(count * 3);

  for (let i = 0; i < count; i += 1) {
    const u = random() * Math.PI * 2;
    const v = random() * Math.PI * 2;
    const shell = 0.72 + random() * 0.28;
    const radius = 2.08 + 0.22 * Math.cos(3 * u) + 0.12 * Math.sin(2 * u);
    const tube = (0.63 + 0.16 * Math.sin(3 * u + 0.6)) * shell;
    const fold = v + 1.5 * u;
    const radial = radius + tube * Math.cos(fold);
    const x = radial * Math.cos(u);
    const y = tube * Math.sin(fold) + 0.28 * Math.sin(2 * u);
    const z = radial * Math.sin(u);

    positions.set([x, y, z], i * 3);
    // Size, luminosity and palette choice are independent of frame rate and time.
    details.set([0.65 + random() * 0.9, 0.3 + random() * 0.7, random()], i * 3);
  }

  return { positions, details };
}
