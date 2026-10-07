import { barrelRibs, barrelSeams, barrelShell } from "./barrelGeometry";

/** A quiet, unmistakable oil-barrel wireframe for the homepage hero. */
export function EnergyBarrelSimulation() {
  return (
    <figure className="energy-barrel" aria-label="Minimal oil barrel wireframe">
      <svg className="energy-barrel__svg" viewBox="0 0 1000 620" role="img" aria-labelledby="barrel-title barrel-description">
        <title id="barrel-title">Oil barrel wireframe</title>
        <desc id="barrel-description">A minimal geometric oil barrel drawn with curved outer edges, a rim, a base, and three horizontal ribs.</desc>
        <g className="barrel-shell" aria-hidden="true">{barrelShell.map((path) => <path key={path} d={path} />)}</g>
        <g className="barrel-ribs" aria-hidden="true">{barrelRibs.map((path) => <path key={path} d={path} />)}</g>
        <g className="barrel-seams" aria-hidden="true">{barrelSeams.map((path) => <path key={path} d={path} />)}</g>
      </svg>
    </figure>
  );
}
