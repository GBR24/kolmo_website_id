import { ScrollReveal } from "../shared/ScrollReveal";
import { SectionHeading } from "../shared/SectionHeading";
import { usePrefersReducedMotion } from "../../lib/useReducedMotion";

const workflowStages = [
  {
    label: "Market Data",
    body: "Prices, curves, spreads, volatility, and fundamentals.",
    icon: (
      <path d="M4 20V13M11 20V6M18 20V10M4 13L11 6L18 10L24 4" strokeLinecap="round" strokeLinejoin="round" />
    ),
  },
  {
    label: "Events",
    body: "News, disruptions, geopolitics, weather, and physical flows.",
    icon: (
      <>
        <circle cx="14" cy="12" r="3" />
        <path d="M14 2V5M14 19V22M4 12H7M21 12H24M7.05 5.05L9.17 7.17M18.83 16.83L20.95 18.95M7.05 18.95L9.17 16.83M18.83 7.17L20.95 5.05" strokeLinecap="round" />
      </>
    ),
  },
  {
    label: "Portfolio",
    body: "Positions, contracts, exposure, and P&L.",
    icon: (
      <>
        <rect x="4" y="14" width="20" height="6" rx="1" />
        <rect x="7" y="8" width="14" height="6" rx="1" />
        <rect x="10" y="2" width="8" height="6" rx="1" />
      </>
    ),
  },
  {
    label: "Counterparties",
    body: "Trading history, payment behaviour, and commercial risk.",
    icon: (
      <>
        <circle cx="8" cy="9" r="3.4" />
        <circle cx="20" cy="9" r="3.4" />
        <path d="M2 22C2 17.8 4.7 15 8 15C11.3 15 14 17.8 14 22M14 22C14 17.8 16.7 15 20 15C23.3 15 26 17.8 26 22" strokeLinecap="round" />
      </>
    ),
  },
  {
    label: "AI Agents",
    body: "Specialist agents analyse the decision together.",
    accent: true,
    icon: (
      <>
        <rect x="10" y="10" width="8" height="8" rx="1.6" />
        <circle cx="14" cy="3" r="2" />
        <circle cx="14" cy="25" r="2" />
        <circle cx="3" cy="14" r="2" />
        <circle cx="25" cy="14" r="2" />
        <path d="M14 5V10M14 18V23M12 12L4.6 13.4M16 12L23.4 13.4M12 16L4.6 14.6M16 16L23.4 14.6" strokeLinecap="round" />
      </>
    ),
  },
  {
    label: "Suggested Actions",
    body: "Risks, scenarios, hedges, and next steps.",
    icon: (
      <>
        <path d="M5 15L11 21L23 7" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ),
  },
];

function WorkflowIcon({ children, accent }) {
  return (
    <svg
      viewBox="0 0 28 28"
      className={`h-6 w-6 sm:h-7 sm:w-7 ${accent ? "text-[#4da3ff]" : "text-textPrimary"}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

function WorkflowConnector({ animate }) {
  return (
    <div className="relative hidden h-px w-8 shrink-0 self-center lg:block xl:w-12" aria-hidden="true">
      <div className="h-px w-full bg-[linear-gradient(90deg,rgba(77,163,255,0.06),rgba(77,163,255,0.4),rgba(77,163,255,0.06))]" />
      {animate ? (
        <svg className="absolute inset-0 -top-[3px] h-[6px] w-full overflow-visible" aria-hidden="true">
          <circle r="2.4" fill="#4da3ff" opacity="0.9">
            <animateMotion dur="1.1s" begin="0s" repeatCount="indefinite" path="M0 3 H48" keyPoints="0;1" keyTimes="0;1" calcMode="linear" />
          </circle>
        </svg>
      ) : null}
    </div>
  );
}

function WorkflowStageCard({ stage, index }) {
  return (
    <div className={`relative flex flex-col gap-3 border-t pt-5 lg:min-w-0 lg:flex-1 lg:border-t-0 lg:pt-0 ${stage.accent ? "border-[#4da3ff]/40" : "border-white/10"}`}>
      <div className="flex items-center gap-3">
        <span
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full border ${
            stage.accent ? "border-[#4da3ff]/50 bg-[#4da3ff]/10" : "border-white/10 bg-white/[0.03]"
          }`}
        >
          <WorkflowIcon accent={stage.accent}>{stage.icon}</WorkflowIcon>
        </span>
        <span className="text-[0.58rem] uppercase tracking-[0.2em] text-textSecondary">0{index + 1}</span>
      </div>
      <h3 className={`text-sm font-medium uppercase tracking-[0.08em] sm:text-[0.92rem] ${stage.accent ? "text-[#4da3ff]" : "text-textPrimary"}`}>
        {stage.label}
      </h3>
      <p className="max-w-[16rem] text-[0.82rem] leading-6 text-textSecondary">{stage.body}</p>
    </div>
  );
}

export function WorkflowSection() {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <section id="workflow" className="story-section story-section--workflow" aria-label="How Kolmo connects a trading decision">
      <div className="story-section__inner grid gap-12">
        <ScrollReveal>
          <SectionHeading
            eyebrow="01 / How It Connects"
            title="Every trading decision starts here."
            body="Kolmo connects market information, portfolio exposure, physical constraints, and AI agents to turn complex market conditions into clear actions."
          />
        </ScrollReveal>

        <ScrollReveal delay={120}>
          <div className="rounded-lg border border-white/10 bg-[rgba(4,7,10,0.72)] p-5 shadow-panel sm:p-7 lg:p-9">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-stretch lg:gap-0">
              {workflowStages.map((stage, index) => (
                <div key={stage.label} className="lg:contents">
                  <WorkflowStageCard stage={stage} index={index} />
                  {index < workflowStages.length - 1 ? <WorkflowConnector animate={!prefersReducedMotion} /> : null}
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
