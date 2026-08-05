import { ScrollReveal } from "../shared/ScrollReveal";
import { SectionHeading } from "../shared/SectionHeading";

function CapabilityCard({ index, title, body, children }) {
  return (
    <article className="flex h-full flex-col gap-5 rounded-lg border border-white/10 bg-[rgba(4,7,10,0.78)] p-5 shadow-panel sm:p-6">
      <div>
        <div className="text-[0.6rem] uppercase tracking-[0.22em] text-[#4da3ff]">0{index}</div>
        <h3 className="mt-3 text-lg font-medium text-textPrimary sm:text-xl">{title}</h3>
        <p className="mt-2 max-w-md text-[0.86rem] leading-6 text-textSecondary">{body}</p>
      </div>
      <div className="mt-auto">{children}</div>
    </article>
  );
}

function MarketIntelligenceVisual() {
  return (
    <div className="rounded-md border border-white/8 bg-white/[0.02] p-4">
      <svg viewBox="0 0 300 96" className="h-20 w-full" aria-hidden="true">
        <polyline
          fill="none"
          points="0,64 30,60 60,66 90,54 120,58 150,32 180,26 210,18 240,24 270,14 300,10"
          stroke="#4da3ff"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <line x1="150" y1="10" x2="150" y2="86" stroke="rgba(210,153,34,0.45)" strokeDasharray="3 5" />
        <circle cx="150" cy="32" r="3.4" fill="#d29922" />
      </svg>
      <div className="mt-2 flex items-center justify-between text-[0.62rem] uppercase tracking-[0.14em] text-textSecondary">
        <span>Middle-distillate cracks</span>
        <span className="text-[#d29922]">Refinery outage flagged</span>
      </div>
    </div>
  );
}

function PortfolioRiskVisual() {
  const rows = [
    { label: "Crude", value: 78 },
    { label: "Products", value: 61 },
    { label: "Freight", value: 44 },
    { label: "Gas", value: 33 },
  ];

  return (
    <div className="grid gap-2.5 rounded-md border border-white/8 bg-white/[0.02] p-4">
      {rows.map((row) => (
        <div key={row.label} className="grid grid-cols-[5rem_1fr_2.5rem] items-center gap-3 text-[0.66rem] uppercase tracking-[0.12em] text-textSecondary">
          <span>{row.label}</span>
          <span className="h-1.5 rounded-full bg-white/8">
            <span className="block h-full rounded-full bg-[#4da3ff]" style={{ width: `${row.value}%` }} />
          </span>
          <span className="text-right font-mono text-textPrimary">{row.value}%</span>
        </div>
      ))}
    </div>
  );
}

function ScenarioSimulationVisual() {
  const shocks = ["Market", "Operational", "Geopolitical", "Supply chain"];

  return (
    <div className="rounded-md border border-white/8 bg-white/[0.02] p-4">
      <div className="flex flex-wrap gap-2">
        {shocks.map((shock, index) => (
          <span
            key={shock}
            className={`rounded border px-2.5 py-1.5 text-[0.6rem] uppercase tracking-[0.12em] ${
              index === 1 ? "border-[#4da3ff]/50 bg-[#4da3ff]/10 text-[#4da3ff]" : "border-white/10 text-textSecondary"
            }`}
          >
            {shock}
          </span>
        ))}
      </div>
      <div className="mt-3 flex items-center justify-between border-t border-white/8 pt-3 text-[0.62rem] uppercase tracking-[0.14em] text-textSecondary">
        <span>Simulated VaR shift</span>
        <span className="font-mono text-textPrimary">+12.4%</span>
      </div>
    </div>
  );
}

function HedgingAnalysisVisual() {
  return (
    <div className="grid gap-2.5 rounded-md border border-white/8 bg-white/[0.02] p-4 sm:grid-cols-2">
      <div className="border-r-0 border-white/8 pr-0 sm:border-r sm:pr-3">
        <div className="text-[0.58rem] uppercase tracking-[0.14em] text-textSecondary">Unhedged</div>
        <div className="mt-1 font-mono text-base text-textPrimary">VaR 84%</div>
      </div>
      <div>
        <div className="text-[0.58rem] uppercase tracking-[0.14em] text-[#4da3ff]">Proposed hedge</div>
        <div className="mt-1 font-mono text-base text-textPrimary">VaR 52%</div>
      </div>
    </div>
  );
}

function CounterpartyVisual() {
  const rows = [
    { name: "Counterparty A", tag: "On-time payment", tone: "text-[#4da3ff]" },
    { name: "Counterparty B", tag: "Elevated exposure", tone: "text-[#d29922]" },
  ];

  return (
    <div className="grid gap-2 rounded-md border border-white/8 bg-white/[0.02] p-4">
      {rows.map((row) => (
        <div key={row.name} className="flex items-center justify-between gap-3 border-t border-white/8 pt-2 text-[0.66rem] uppercase tracking-[0.12em] first:border-t-0 first:pt-0">
          <span className="text-textPrimary">{row.name}</span>
          <span className={row.tone}>{row.tag}</span>
        </div>
      ))}
    </div>
  );
}

const agentMessages = [
  { focus: "P&L", read: "Compresses 4% under a reversal scenario" },
  { focus: "Correlation", read: "Breaks down against Brent" },
  { focus: "VaR", read: "Limit at 84% of book" },
  { focus: "Hedges", read: "Two responses reduce exposure" },
];

function MultiAgentVisual() {
  return (
    <div className="grid gap-px overflow-hidden rounded-md border border-white/8 bg-white/8 sm:grid-cols-2 lg:grid-cols-4">
      {agentMessages.map((agent) => (
        <div key={agent.focus} className="bg-[rgba(4,7,10,0.92)] p-3.5">
          <div className="text-[0.58rem] uppercase tracking-[0.16em] text-[#4da3ff]">{agent.focus}</div>
          <p className="mt-2 text-[0.78rem] leading-5 text-textPrimary">{agent.read}</p>
        </div>
      ))}
    </div>
  );
}

const capabilityModules = [
  {
    title: "Market Intelligence",
    body: "Understand what moved the market and why it matters to your portfolio.",
    span: "sm:col-span-3",
    Visual: MarketIntelligenceVisual,
  },
  {
    title: "Portfolio Risk",
    body: "See exposures, concentration, P&L sensitivity, and emerging risks.",
    span: "sm:col-span-3",
    Visual: PortfolioRiskVisual,
  },
  {
    title: "Simulation",
    body: "Shock positions against market, operational, geopolitical, and supply-chain events.",
    span: "sm:col-span-2",
    Visual: ScenarioSimulationVisual,
  },
  {
    title: "Hedging Analysis",
    body: "Evaluate hedge alternatives, potential costs, and expected risk reduction.",
    span: "sm:col-span-2",
    Visual: HedgingAnalysisVisual,
  },
  {
    title: "Counterparty",
    body: "Bring trading history, payment behaviour, and commercial context into each decision.",
    span: "sm:col-span-2",
    Visual: CounterpartyVisual,
  },
  {
    title: "Multi-Agent System",
    body: "Multiple desk-defined agents work the same decision from different angles, together.",
    span: "sm:col-span-6",
    Visual: MultiAgentVisual,
  },
];

export function CapabilitiesSection() {
  return (
    <section id="product" className="story-section story-section--capabilities" aria-label="Product capabilities">
      <div className="story-section__inner grid gap-12">
        <ScrollReveal>
          <SectionHeading
            eyebrow="02 / The Workspace"
            title="One workspace for market intelligence and portfolio decisions."
            body="Six connected capabilities, not six separate tools. Each one draws on the same market and portfolio context."
          />
        </ScrollReveal>

        <div className="grid gap-4 sm:grid-cols-6">
          {capabilityModules.map((module, index) => (
            <ScrollReveal key={module.title} delay={index * 70} className={module.span}>
              <CapabilityCard index={index + 1} title={module.title} body={module.body}>
                <module.Visual />
              </CapabilityCard>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
