import { ParticleSculpture } from "../simulation/ParticleSculpture";

export function Hero() {
  return (
    <section className="home-hero" aria-labelledby="hero-heading">
      <div className="hero-copy page-width">
        <h1 id="hero-heading">Simulating the<br /><span>Energy World</span></h1>
      </div>
      <ParticleSculpture />
    </section>
  );
}
