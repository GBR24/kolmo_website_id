import { ScrollReveal } from "../shared/ScrollReveal";
import { SectionHeading } from "../shared/SectionHeading";
import { usePrefersReducedMotion } from "../../lib/useReducedMotion";

const tradePrompt =
  "Watch our middle-distillate book. Alert me if a refinery outage or freight shock could move our exposure by more than $1m, and suggest a hedge.";

const watchList = ["Refinery outages", "Freight rates", "Jet & diesel cracks", "Portfolio exposure"];

function WindowChrome({ label, tag, tagTone = "neutral", children }) {
  const toneClass = tagTone === "accent" ? "text-[#4da3ff]" : "text-textSecondary";

  return (
    <div className="overflow-hidden rounded-lg border border-white/10 bg-[rgba(4,7,10,0.86)] shadow-panel">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-2.5 text-[0.6rem] uppercase tracking-[0.18em] text-textSecondary">
        <span className="flex items-center gap-2">
          <span className="flex gap-1" aria-hidden="true">
            <span className="h-1.5 w-1.5 rounded-full bg-white/15" />
            <span className="h-1.5 w-1.5 rounded-full bg-white/15" />
            <span className="h-1.5 w-1.5 rounded-full bg-white/15" />
          </span>
          <span className="text-textPrimary">{label}</span>
        </span>
        {tag ? <span className={toneClass}>{tag}</span> : null}
      </div>
      {children}
    </div>
  );
}

function ToggleSwitch({ on = true }) {
  return (
    <span
      className={`relative inline-flex h-4 w-7 shrink-0 items-center rounded-full border transition ${
        on ? "border-[#4da3ff]/55 bg-[#4da3ff]/15" : "border-white/15 bg-white/5"
      }`}
      aria-hidden="true"
    >
      <span
        className={`inline-block h-2.5 w-2.5 rounded-full transition ${on ? "translate-x-3.5 bg-[#4da3ff]" : "translate-x-0.5 bg-white/35"}`}
      />
    </span>
  );
}

function PromptPanel() {
  return (
    <WindowChrome label="New agent" tag="Trader input">
      <div className="p-5 sm:p-6">
        <div className="text-[0.6rem] uppercase tracking-[0.2em] text-textSecondary">Describe what you need</div>
        <p className="mt-4 font-mono text-[0.9rem] leading-7 text-textPrimary sm:text-base">
          <span className="mr-1.5 text-[#4da3ff]">$</span>
          {tradePrompt}
          <span className="prompt-cursor ml-0.5 text-[#4da3ff]">▍</span>
        </p>
      </div>
    </WindowChrome>
  );
}

function ConfiguringConnector({ animate }) {
  return (
    <div className="flex items-center justify-center gap-3 py-1 lg:flex-col lg:py-0" aria-hidden="true">
      <span className="h-6 w-px bg-[linear-gradient(180deg,transparent,rgba(77,163,255,0.4),transparent)] lg:h-auto lg:w-14 lg:rotate-90" />
      <span className="whitespace-nowrap text-[0.62rem] uppercase tracking-[0.18em] text-[#4da3ff]">
        Configuring agent
        <span className="ml-1 inline-flex gap-0.5 align-middle">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className={`inline-block h-1 w-1 rounded-full bg-[#4da3ff] ${animate ? "animate-pulseSoft" : ""}`}
              style={animate ? { animationDelay: `${i * 0.2}s` } : undefined}
            />
          ))}
        </span>
      </span>
      <span className="h-6 w-px bg-[linear-gradient(180deg,transparent,rgba(77,163,255,0.4),transparent)] lg:h-auto lg:w-14 lg:rotate-90" />
    </div>
  );
}

function AgentResultPanel() {
  return (
    <WindowChrome label="Distillate Desk Agent" tag="Custom · Active" tagTone="accent">
      <div className="grid gap-5 p-5 sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-[0.6rem] uppercase tracking-[0.2em] text-textSecondary">Goal</div>
            <p className="mt-1.5 text-[0.94rem] leading-6 text-textPrimary">
              Protect middle-distillate exposure from refinery and freight shocks.
            </p>
          </div>
          <ToggleSwitch on />
        </div>

        <div>
          <div className="text-[0.6rem] uppercase tracking-[0.2em] text-textSecondary">Watching</div>
          <ul className="mt-2.5 flex flex-wrap gap-2">
            {watchList.map((item) => (
              <li
                key={item}
                className="rounded border border-white/10 bg-white/[0.03] px-2.5 py-1.5 text-[0.66rem] uppercase tracking-[0.1em] text-textSecondary"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center justify-between border-t border-white/8 pt-4 text-[0.72rem] uppercase tracking-[0.12em] text-textSecondary">
          <span>Alert threshold</span>
          <span className="font-mono text-textPrimary">Exposure impact &gt; $1m</span>
        </div>

        <div className="border-t border-[#4da3ff]/30 bg-[rgba(77,163,255,0.06)] px-4 py-3.5">
          <div className="flex items-start gap-2.5">
            <span className="mt-0.5 font-mono text-sm text-[#d29922]" aria-hidden="true">
              !
            </span>
            <p className="text-[0.84rem] leading-6 text-textPrimary">
              Refinery outage detected. Modelled exposure impact of <span className="font-mono">$1.4m</span>. Two hedge
              alternatives ready.
            </p>
          </div>
        </div>
      </div>
    </WindowChrome>
  );
}

export function AgentsSection() {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <section id="agents" className="story-section story-section--agents" aria-label="Custom AI agents">
      <div className="story-section__inner grid gap-12">
        <ScrollReveal>
          <SectionHeading
            eyebrow="03 / Built By Your Desk"
            title="Describe what your desk needs. Kolmo builds the agent."
            body="No fixed toolkit to learn. A trader describes a goal in plain language, and Kolmo configures a dedicated agent around it."
          />
        </ScrollReveal>

        <ScrollReveal delay={120}>
          <div className="grid items-center gap-2 lg:grid-cols-[1fr_auto_1fr] lg:gap-4">
            <PromptPanel />
            <ConfiguringConnector animate={!prefersReducedMotion} />
            <AgentResultPanel />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
