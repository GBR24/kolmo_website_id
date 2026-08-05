import kolmoMark from "../../../assets/kolmo-mark.svg";
import { ScrollReveal } from "../shared/ScrollReveal";
import { SectionHeading } from "../shared/SectionHeading";
import { HeroAtmosphere } from "../home/Hero";
import { CALENDLY_URL } from "../../lib/constants";

const blogResearchTracks = [
  {
    title: "Market Structure",
    kicker: "Oil, gas, products, freight",
    body: "Notes on how crude, products, gas, freight, storage, and policy relationships shift when the market is under stress.",
  },
  {
    title: "Graph Methods",
    kicker: "Causality, analogues, confidence",
    body: "How research teams can map causal paths, open relationships, analogues, confidence, and correlation changes across energy markets.",
  },
  {
    title: "Desk Workflows",
    kicker: "Briefs, hedges, rebalances",
    body: "Practical writing on turning event risk into monitor lists, hedge ideas, rebalances, and concise desk-ready risk reads.",
  },
  {
    title: "Research Builds",
    kicker: "Datasets, tools, product notes",
    body: "Short updates from the Kolmo team on datasets, graph primitives, terminal workflows, and what is moving from research into product.",
  },
];

const featuredResearchNote = {
  eyebrow: "Featured series",
  title: "Mapping energy shocks from first headline to portfolio exposure",
  dek: "A working series for research teams: how to connect market structure, graph relationships, and desk workflows into one traceable view of risk.",
  meta: "Series opening soon",
  owner: "Kolmo Research",
  cadence: "Briefs, maps, and methods notes",
};

const blogTopics = ["Oil", "Gas", "Freight", "Products", "Storage", "Refining", "Policy", "Graph Methods", "Desk Briefs"];

const researchArticles = [
  {
    title: "How route risk becomes a Brent and gasoline problem",
    type: "Market map",
    team: "Market Structure",
    date: "Upcoming",
    body: "A practical walkthrough of how shipping lanes, freight, insurance, and cracks can form one risk path.",
    tags: ["Freight", "Brent", "Products"],
  },
  {
    title: "Building an open graph for energy market relationships",
    type: "Methods",
    team: "Graph Methods",
    date: "Upcoming",
    body: "Notes on relationship primitives, confidence, directionality, analogues, and how contributors can inspect the graph.",
    tags: ["Graph", "Causality", "Open data"],
  },
  {
    title: "Correlation matrices during market stress",
    type: "Quant note",
    team: "Quant Research",
    date: "Upcoming",
    body: "How Kolmo thinks about live shock windows, stale correlations, and when a desk should refresh assumptions.",
    tags: ["Correlation", "Risk", "Scenarios"],
  },
  {
    title: "From trace to desk action",
    type: "Workflow",
    team: "Desk Workflows",
    date: "Upcoming",
    body: "A template for turning event detection into hedge, rebalance, monitor, and brief outputs.",
    tags: ["Briefs", "Hedges", "Operations"],
  },
];

const researchWorkflow = [
  {
    title: "Frame the market question",
    body: "Start with the desk question, the variables involved, and the event path the team wants to make legible.",
  },
  {
    title: "Attach evidence and graph context",
    body: "Connect the note to charts, relationship maps, datasets, assumptions, and open questions that can be challenged.",
  },
  {
    title: "Publish a reusable brief",
    body: "Turn the research into an article format another analyst can scan, cite, and update as the market changes.",
  },
];

const researchRoomStats = [
  { value: "4", label: "Research tracks" },
  { value: "8+", label: "Market topics" },
  { value: "Team", label: "Bylines ready" },
];

function KnowledgeGraphVisual() {
  const graphNodes = [
    { label: "Drivers", x: 126, y: 292, tone: "source", width: 86 },
    { label: "Brent", x: 318, y: 244, tone: "core", width: 78 },
    { label: "Gas", x: 488, y: 160, tone: "neutral", width: 62 },
    { label: "Policy", x: 654, y: 214, tone: "risk", width: 82 },
    { label: "Freight", x: 302, y: 376, tone: "neutral", width: 90 },
    { label: "Storage", x: 522, y: 354, tone: "neutral", width: 94 },
    { label: "Refining", x: 700, y: 366, tone: "risk", width: 96 },
    { label: "Risk path", x: 832, y: 288, tone: "source", width: 100 },
  ];

  const nodeTone = {
    core: { fill: "#4da3ff", stroke: "rgba(77,163,255,0.65)", text: "#e2f0ff" },
    neutral: { fill: "#c7d6e2", stroke: "rgba(214,226,240,0.24)", text: "#d6e2f0" },
    risk: { fill: "#d29922", stroke: "rgba(210,153,34,0.5)", text: "#f8d98c" },
    source: { fill: "#6f9fd0", stroke: "rgba(77,163,255,0.38)", text: "#e2f0ff" },
  };

  return (
    <div className="knowledge-web relative h-[15rem] overflow-hidden rounded-lg border border-white/10 bg-[rgba(5,10,15,0.68)] shadow-panel sm:h-[24rem] lg:h-[31rem]">
      <div className="pointer-events-none absolute inset-x-4 top-4 z-[2] flex items-center justify-between text-[0.62rem] uppercase tracking-[0.22em] text-textPrimary sm:inset-x-5">
        <span className="border-l border-[#4da3ff]/60 pl-3 text-[#e2f0ff]">Open market graph</span>
        <span className="hidden text-[#d29922] sm:inline">Market paths</span>
      </div>

      <svg
        aria-label="Open market knowledge graph showing drivers, energy variables, open relationships, and risk paths"
        className="absolute inset-0 z-[1] hidden h-full w-full sm:block"
        role="img"
        viewBox="0 0 960 540"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <radialGradient id="knowledgeGraphGlow" cx="50%" cy="48%" r="48%">
            <stop offset="0%" stopColor="rgba(77,163,255,0.18)" />
            <stop offset="48%" stopColor="rgba(77,163,255,0.06)" />
            <stop offset="100%" stopColor="rgba(77,163,255,0)" />
          </radialGradient>
          <filter id="knowledgeNodeGlow" x="-120%" y="-120%" width="340%" height="340%">
            <feGaussianBlur stdDeviation="10" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <marker id="knowledgeArrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
            <path d="M0 0L10 5L0 10Z" fill="#d29922" opacity="0.78" />
          </marker>
        </defs>

        <rect x="44" y="66" width="872" height="408" rx="22" fill="url(#knowledgeGraphGlow)" opacity="0.52" />

        <g fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path d="M126 292C198 268 250 254 318 244" stroke="rgba(77,163,255,0.3)" strokeWidth="1.5" />
          <path d="M126 292C174 338 226 366 302 376" stroke="rgba(77,163,255,0.18)" strokeWidth="1.2" />
          <path d="M318 244C382 202 428 174 488 160" stroke="rgba(77,163,255,0.28)" strokeWidth="1.3" />
          <path d="M488 160C558 170 610 188 654 214" stroke="rgba(77,163,255,0.22)" strokeWidth="1.2" />
          <path d="M318 244C390 284 452 322 522 354" stroke="rgba(210,153,34,0.7)" strokeWidth="1.8" markerEnd="url(#knowledgeArrow)" />
          <path d="M302 376C376 386 452 380 522 354" stroke="rgba(77,163,255,0.24)" strokeWidth="1.2" />
          <path d="M522 354C586 354 644 358 700 366" stroke="rgba(210,153,34,0.64)" strokeWidth="1.8" markerEnd="url(#knowledgeArrow)" />
          <path d="M654 214C686 256 704 308 700 366" stroke="rgba(77,163,255,0.22)" strokeWidth="1.2" />
          <path d="M700 366C742 336 790 310 832 288" stroke="rgba(210,153,34,0.62)" strokeWidth="1.8" markerEnd="url(#knowledgeArrow)" />
        </g>

        <path id="knowledgeActivePath" d="M126 292C198 268 250 254 318 244C390 284 452 322 522 354C586 354 644 358 700 366C742 336 790 310 832 288" fill="none" />
        <circle r="5" fill="#d29922" opacity="0.92">
          <animateMotion dur="9s" repeatCount="indefinite" rotate="auto">
            <mpath href="#knowledgeActivePath" />
          </animateMotion>
        </circle>

        {graphNodes.map((node) => {
          const tone = nodeTone[node.tone];
          const labelX = node.x - node.width / 2;
          const labelY = node.y - 29;

          return (
            <g key={node.label}>
              <circle cx={node.x} cy={node.y} r="16" fill={tone.fill} opacity="0.18" filter="url(#knowledgeNodeGlow)" />
              <circle cx={node.x} cy={node.y} r={node.tone === "core" ? "8" : "6"} fill={tone.fill} stroke={tone.stroke} strokeWidth="1.4" />
              <rect
                x={labelX}
                y={node.y - 42}
                width={node.width}
                height="26"
                rx="13"
                fill="rgba(5,10,15,0.88)"
                stroke={tone.stroke}
                strokeWidth="1"
              />
              <text
                x={node.x}
                y={labelY}
                fill={tone.text}
                fontSize="10"
                fontWeight="600"
                letterSpacing="3"
                dominantBaseline="middle"
                textAnchor="middle"
              >
                {node.label.toUpperCase()}
              </text>
            </g>
          );
        })}
      </svg>

      <svg
        aria-label="Simplified open market knowledge graph risk path"
        className="absolute inset-0 z-[1] h-full w-full sm:hidden"
        role="img"
        viewBox="0 0 360 240"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <radialGradient id="mobileKnowledgeGraphGlow" cx="52%" cy="48%" r="54%">
            <stop offset="0%" stopColor="rgba(77,163,255,0.18)" />
            <stop offset="54%" stopColor="rgba(77,163,255,0.06)" />
            <stop offset="100%" stopColor="rgba(77,163,255,0)" />
          </radialGradient>
          <filter id="mobileKnowledgeNodeGlow" x="-120%" y="-120%" width="340%" height="340%">
            <feGaussianBlur stdDeviation="7" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <rect x="18" y="48" width="324" height="146" rx="18" fill="url(#mobileKnowledgeGraphGlow)" opacity="0.56" />

        <g fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path d="M54 126C94 108 126 94 158 91" stroke="rgba(77,163,255,0.34)" strokeWidth="1.35" />
          <path d="M158 91C190 122 214 144 246 150" stroke="rgba(210,153,34,0.72)" strokeWidth="1.7" />
          <path d="M246 150C276 136 296 122 322 110" stroke="rgba(210,153,34,0.66)" strokeWidth="1.7" />
        </g>

        <path id="mobileKnowledgeActivePath" d="M54 126C94 108 126 94 158 91C190 122 214 144 246 150C276 136 296 122 322 110" fill="none" />
        <circle r="3.8" fill="#d29922" opacity="0.92">
          <animateMotion dur="8s" repeatCount="indefinite" rotate="auto">
            <mpath href="#mobileKnowledgeActivePath" />
          </animateMotion>
        </circle>

        {[
          { label: "Driver", x: 54, y: 126, width: 58, fill: "#6f9fd0", stroke: "rgba(77,163,255,0.42)" },
          { label: "Brent", x: 158, y: 91, width: 54, fill: "#4da3ff", stroke: "rgba(77,163,255,0.66)" },
          { label: "Link", x: 246, y: 150, width: 48, fill: "#d29922", stroke: "rgba(210,153,34,0.52)" },
          { label: "Risk", x: 322, y: 110, width: 44, fill: "#6f9fd0", stroke: "rgba(77,163,255,0.42)" },
        ].map((node) => (
          <g key={node.label}>
            <circle cx={node.x} cy={node.y} r="14" fill={node.fill} opacity="0.18" filter="url(#mobileKnowledgeNodeGlow)" />
            <circle cx={node.x} cy={node.y} r="5.8" fill={node.fill} stroke={node.stroke} strokeWidth="1.2" />
            <rect
              x={node.x - node.width / 2}
              y={node.y - 31}
              width={node.width}
              height="20"
              rx="10"
              fill="rgba(5,10,15,0.9)"
              stroke={node.stroke}
              strokeWidth="0.8"
            />
            <text
              x={node.x}
              y={node.y - 21}
              fill={node.fill === "#d29922" ? "#f8d98c" : "#e2f0ff"}
              fontSize="7.5"
              fontWeight="650"
              letterSpacing="1.7"
              dominantBaseline="middle"
              textAnchor="middle"
            >
              {node.label.toUpperCase()}
            </text>
          </g>
        ))}
      </svg>

      <div className="pointer-events-none absolute inset-x-4 bottom-4 z-[2] flex flex-wrap items-center justify-between gap-3 text-[0.6rem] uppercase tracking-[0.18em] text-textSecondary sm:inset-x-5">
        <span>drivers</span>
        <span>relationships</span>
        <span>risk paths</span>
      </div>
    </div>
  );
}

function ResearchArticleCard({ article }) {
  return (
    <article className="group flex h-full flex-col justify-between bg-[rgba(4,7,10,0.88)] p-5 transition duration-300 hover:bg-[rgba(7,13,19,0.94)] sm:p-6">
      <div>
        <div className="flex flex-wrap items-center justify-between gap-3 text-[0.62rem] uppercase tracking-[0.2em] text-textSecondary">
          <span>{article.type}</span>
          <span className="text-[#d29922]">{article.date}</span>
        </div>
        <h2 className="mt-5 text-2xl font-medium leading-tight text-textPrimary">{article.title}</h2>
        <p className="mt-4 text-sm leading-7 text-textSecondary sm:text-base sm:leading-8">{article.body}</p>
      </div>

      <div className="mt-7 grid gap-5">
        <div className="flex flex-wrap gap-2">
          {article.tags.map((tag) => (
            <span key={tag} className="border border-white/10 bg-white/[0.025] px-2.5 py-1.5 text-[0.58rem] uppercase tracking-[0.14em] text-textSecondary">
              {tag}
            </span>
          ))}
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/8 pt-4">
          <span className="text-[0.64rem] uppercase tracking-[0.18em] text-textSecondary">{article.team}</span>
          <span className="text-[0.64rem] uppercase tracking-[0.18em] text-[#4da3ff]">In queue</span>
        </div>
      </div>
    </article>
  );
}

function ResearchWorkflowStep({ step, index }) {
  return (
    <article className="border-t border-white/10 py-6">
      <div className="text-[0.62rem] uppercase tracking-[0.22em] text-[#d29922]">0{index + 1}</div>
      <h3 className="mt-3 text-xl font-medium text-textPrimary">{step.title}</h3>
      <p className="mt-3 text-sm leading-7 text-textSecondary sm:text-base sm:leading-8">{step.body}</p>
    </article>
  );
}

function ResearchRoomMetric({ value, label }) {
  return (
    <div className="border-t border-white/10 pt-4">
      <div className="font-mono text-3xl text-textPrimary">{value}</div>
      <div className="mt-2 text-[0.62rem] uppercase tracking-[0.18em] text-textSecondary">{label}</div>
    </div>
  );
}

export function BlogPage({ onSubscribe }) {
  return (
    <main id="top" className="story-page">
      <section className="hero-stage relative overflow-hidden">
        <HeroAtmosphere />
        <div className="relative mx-auto grid w-full max-w-[1280px] gap-12 px-5 py-20 sm:px-6 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)] lg:items-center lg:gap-16 lg:px-8 lg:py-28">
          <ScrollReveal className="relative">
            <div className="inline-flex items-center gap-3 text-[0.7rem] uppercase tracking-[0.28em] text-textSecondary">
              <img src={kolmoMark} alt="" className="h-5 w-5 opacity-80" />
              <span>Kolmo Research</span>
            </div>
            <h1 className="mt-7 max-w-[12ch] font-serif-display text-5xl uppercase leading-[0.92] text-textPrimary sm:text-7xl lg:text-[5.7rem]">
              Research for energy markets.
            </h1>
            <div className="mt-9 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:flex-wrap">
              <button
                type="button"
                onClick={onSubscribe}
                className="inline-flex items-center justify-center rounded-full border border-[#4da3ff]/35 bg-[#4da3ff]/10 px-6 py-3 text-sm font-medium uppercase tracking-[0.14em] text-textPrimary transition duration-300 hover:border-[#4da3ff]/60 hover:bg-[#4da3ff]/16"
              >
                Subscribe
              </button>
              <a href="#research-index" className="inline-flex text-sm uppercase tracking-[0.16em] text-textSecondary transition hover:text-white">
                View research index
              </a>
              <a href="/" className="inline-flex text-sm uppercase tracking-[0.16em] text-textSecondary transition hover:text-white">
                Kolmo home
              </a>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={140} className="relative grid gap-5">
            <KnowledgeGraphVisual />
            <div className="grid gap-4 sm:grid-cols-3">
              {researchRoomStats.map((metric) => (
                <ResearchRoomMetric key={metric.label} value={metric.value} label={metric.label} />
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-[1280px] gap-8 px-5 py-16 sm:px-6 lg:px-8 lg:py-24">
        <ScrollReveal as="article" className="relative overflow-hidden rounded-lg border border-white/10 bg-[rgba(4,7,10,0.84)] p-5 shadow-panel sm:p-7 lg:p-8">
          <div className="absolute inset-0 bg-[linear-gradient(118deg,transparent_8%,rgba(77,163,255,0.08)_44%,transparent_76%)]" />
          <div className="relative grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div>
              <div className="text-[0.68rem] uppercase tracking-[0.24em] text-[#4da3ff]">{featuredResearchNote.eyebrow}</div>
              <h2 className="mt-5 max-w-[13ch] font-serif-display text-4xl uppercase leading-[0.94] text-textPrimary sm:text-5xl lg:text-[4.6rem]">
                {featuredResearchNote.title}
              </h2>
            </div>
            <div className="grid gap-7">
              <p className="max-w-2xl text-base leading-8 text-textSecondary sm:text-lg">{featuredResearchNote.dek}</p>
              <div className="grid gap-px overflow-hidden rounded-lg border border-white/10 bg-white/10 sm:grid-cols-3">
                {[
                  ["Owner", featuredResearchNote.owner],
                  ["Status", featuredResearchNote.meta],
                  ["Format", featuredResearchNote.cadence],
                ].map(([label, value]) => (
                  <div key={label} className="bg-[rgba(4,7,10,0.86)] p-4">
                    <div className="text-[0.58rem] uppercase tracking-[0.2em] text-textSecondary">{label}</div>
                    <div className="mt-2 text-sm leading-6 text-textPrimary">{value}</div>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-2">
                {blogTopics.map((topic) => (
                  <span
                    key={topic}
                    className="border border-white/10 bg-white/[0.03] px-3 py-2 text-[0.62rem] uppercase tracking-[0.16em] text-textSecondary"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      <section className="mx-auto grid w-full max-w-[1280px] gap-12 px-5 py-20 sm:px-6 lg:grid-cols-[0.72fr_1.28fr] lg:px-8 lg:py-28 lg:gap-16">
        <ScrollReveal>
          <SectionHeading
            eyebrow="Research Tracks"
            title={
              <>
                <span className="block">WHAT THE{" "}</span>
                <span className="block">TEAMS PUBLISH</span>
              </>
            }
            body="The blog is built for research notes, diagrams, market structure observations, and transparent thinking from the people building and using Kolmo."
          />
        </ScrollReveal>

        <div className="divide-y divide-white/10">
          {blogResearchTracks.map((track, index) => (
            <ScrollReveal key={track.title} as="article" delay={index * 80} className="grid gap-4 py-7 sm:grid-cols-[5rem_1fr]">
              <div className="text-[0.62rem] uppercase tracking-[0.22em] text-[#d29922]">0{index + 1}</div>
              <div>
                <div className="text-[0.62rem] uppercase tracking-[0.18em] text-textSecondary">{track.kicker}</div>
                <h2 className="mt-2 text-2xl font-medium text-textPrimary">{track.title}</h2>
                <p className="mt-3 text-sm leading-7 text-textSecondary sm:text-base sm:leading-8">{track.body}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <section id="research-index" className="bg-[rgba(255,255,255,0.015)]">
        <div className="mx-auto grid w-full max-w-[1280px] gap-10 px-5 py-20 sm:px-6 lg:px-8 lg:py-28">
          <ScrollReveal>
            <SectionHeading
              eyebrow="Publication Queue"
              title={
                <>
                  <span className="block">RESEARCH{" "}</span>
                  <span className="block">INDEX</span>
                </>
              }
              body="The first team articles will live here as soon as they publish. Each entry is organized by market question, authoring team, method, and desk use."
            />
          </ScrollReveal>

          <div className="grid gap-px overflow-hidden rounded-lg border border-white/10 bg-white/10 shadow-panel lg:grid-cols-2">
            {researchArticles.map((article, index) => (
              <ScrollReveal key={article.title} delay={index * 70}>
                <ResearchArticleCard article={article} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-[1280px] gap-12 px-5 py-20 sm:px-6 lg:grid-cols-[0.78fr_1.22fr] lg:px-8 lg:py-28 lg:gap-16">
        <ScrollReveal>
          <SectionHeading
            eyebrow="For Research Teams"
            title={
              <>
                <span className="block">A PLACE FOR{" "}</span>
                <span className="block">TEAM NOTES</span>
              </>
            }
            body="Kolmo Research is structured for analyst bylines, team-authored market maps, quant notes, and product-facing methods essays that can be expanded over time."
          />
          <div className="mt-9 grid gap-4 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
            {researchRoomStats.map((metric) => (
              <ResearchRoomMetric key={metric.label} value={metric.value} label={metric.label} />
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal delay={140} className="rounded-lg border border-white/10 bg-[rgba(4,7,10,0.84)] p-5 shadow-panel sm:p-6 lg:p-8">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-5 text-[0.64rem] uppercase tracking-[0.22em] text-textSecondary">
            <span>Publication workflow</span>
            <span className="text-[#4da3ff]">Ready for articles</span>
          </div>
          <div className="divide-y divide-white/10">
            {researchWorkflow.map((step, index) => (
              <ResearchWorkflowStep key={step.title} step={step} index={index} />
            ))}
          </div>
          <div className="mt-3 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/[0.06] px-6 py-3 text-sm uppercase tracking-[0.14em] text-textPrimary transition hover:border-white/18 hover:bg-white/[0.09]"
            >
              Talk to Kolmo
            </a>
            <button
              type="button"
              onClick={onSubscribe}
              className="inline-flex text-sm uppercase tracking-[0.16em] text-textSecondary transition hover:text-white"
            >
              Subscribe for releases
            </button>
          </div>
        </ScrollReveal>
      </section>

      <section className="mx-auto w-full max-w-[1280px] px-5 py-20 sm:px-6 lg:px-8 lg:py-28">
        <ScrollReveal className="grid gap-10 py-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div>
            <div className="text-[0.68rem] uppercase tracking-[0.24em] text-textSecondary">Research updates</div>
            <h2 className="mt-4 max-w-[14ch] font-serif-display text-4xl uppercase leading-[0.95] text-textPrimary sm:text-5xl">
              Get the notes when they ship.
            </h2>
          </div>
          <div className="flex flex-col items-start gap-5">
            <p className="max-w-2xl text-base leading-8 text-textSecondary">
              We will use the newsletter for research releases, graph updates, and short market-structure observations.
            </p>
            <button
              type="button"
              onClick={onSubscribe}
              className="inline-flex items-center justify-center rounded-full border border-[#4da3ff]/35 bg-[#4da3ff]/10 px-6 py-3 text-sm font-medium uppercase tracking-[0.14em] text-textPrimary transition duration-300 hover:border-[#4da3ff]/60 hover:bg-[#4da3ff]/16"
            >
              Subscribe
            </button>
          </div>
        </ScrollReveal>
      </section>
    </main>
  );
}
