import { ScrollReveal } from "../shared/ScrollReveal";
import { SectionHeading } from "../shared/SectionHeading";
import { usePrefersReducedMotion } from "../../lib/useReducedMotion";

const inputSignals = [
  "Refineries",
  "Pipelines",
  "Vessels",
  "Storage",
  "Production",
  "Demand",
  "Oil",
  "Carbon",
  "Geopolitics",
  "Port disruptions",
  "TTF",
  "ULSD",
  "LNG",
  "LPG",
  "HH",
];

const outputs = ["Market simulation", "Portfolio simulation", "Agent decisions", "Hedge evaluation", "Scenario testing"];

function FlowBeam({ direction, animate }) {
  return (
    <div className="relative flex h-10 items-center justify-center lg:h-auto lg:w-14" aria-hidden="true">
      <div className="h-6 w-px bg-[linear-gradient(180deg,transparent,rgba(77,163,255,0.4),transparent)] lg:h-px lg:w-full" />
      {animate ? (
        <svg className="absolute inset-0 h-full w-full overflow-visible">
          <circle r="2.4" fill="#4da3ff" opacity="0.85">
            <animateMotion
              dur="2.2s"
              repeatCount="indefinite"
              keyPoints={direction === "reverse" ? "1;0" : "0;1"}
              keyTimes="0;1"
              calcMode="linear"
              path="M20 0 L20 40 M0 5 L56 5"
            />
          </circle>
        </svg>
      ) : null}
    </div>
  );
}

export function WorldModelSection() {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <section id="world-model" className="story-section story-section--world-model" aria-label="Energy world model">
      <div className="story-section__inner grid gap-12">
        <ScrollReveal>
          <SectionHeading
            eyebrow="04 / The Long-Term Bet"
            title="Building the world model for energy markets."
            body="Kolmo is building an evolving model of the global energy system so humans and AI agents can understand relationships, simulate shocks, and reason about possible market outcomes."
          />
        </ScrollReveal>

        <ScrollReveal delay={120}>
          <div className="rounded-lg border border-white/10 bg-[rgba(4,7,10,0.72)] p-5 shadow-panel sm:p-7 lg:p-9">
            <div className="flex flex-col items-stretch gap-2 lg:flex-row lg:items-center lg:gap-0">
              <div className="flex-1">
                <div className="mb-3 text-[0.6rem] uppercase tracking-[0.2em] text-textSecondary">Signals in development</div>
                <ul className="flex flex-wrap gap-2">
                  {inputSignals.map((signal) => (
                    <li
                      key={signal}
                      className="rounded border border-white/10 bg-white/[0.03] px-3 py-2 text-[0.66rem] uppercase tracking-[0.1em] text-textSecondary"
                    >
                      {signal}
                    </li>
                  ))}
                </ul>
              </div>

              <FlowBeam direction="forward" animate={!prefersReducedMotion} />

              <div className="flex shrink-0 flex-col items-center gap-2 px-2 py-4 lg:w-56 lg:py-0">
                <div className="w-full rounded-lg border border-[#4da3ff]/45 bg-[rgba(77,163,255,0.08)] px-5 py-6 text-center shadow-[0_0_40px_rgba(77,163,255,0.12)]">
                  <div className="text-[0.6rem] uppercase tracking-[0.2em] text-[#4da3ff]">Energy World Model</div>
                  <div className="mt-2 text-[0.72rem] leading-5 text-textSecondary">An evolving model of the global energy system</div>
                </div>
              </div>

              <FlowBeam direction="forward" animate={!prefersReducedMotion} />

              <div className="flex-1">
                <div className="mb-3 text-[0.6rem] uppercase tracking-[0.2em] text-textSecondary lg:text-right">Feed</div>
                <ul className="flex flex-wrap gap-2 lg:justify-end">
                  {outputs.map((output) => (
                    <li
                      key={output}
                      className="rounded border border-[#d29922]/30 bg-[rgba(210,153,34,0.06)] px-3 py-2 text-[0.66rem] uppercase tracking-[0.1em] text-textPrimary"
                    >
                      {output}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
