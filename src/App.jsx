import { useEffect, useState } from "react";

import platformPreview from "../assets/trader-desk-reference.svg";
import kolmoMark from "../assets/kolmo-mark.svg";
import { getAnalyticsConsent, initGoogleAnalytics, persistAnalyticsConsent } from "./analytics";

const NEWSLETTER_DISMISSED_KEY = "kolmo-newsletter-dismissed";
const NEWSLETTER_EMBED_URL = "https://embeds.beehiiv.com/4c0fb0be-6b2c-4eb2-a78c-0b9b7eaf734b";
const CALENDLY_URL = "https://calendly.com/kolmolabs/30min";

const audienceTags = [
  "Traders",
  "Energy Trading Desks",
  "Risk Teams",
  "Banks",
  "Hedge Funds",
  "Commodity Firms",
  "Portfolio Managers",
];

const overviewCards = [
  { title: "Unified Data Layer" },
  { title: "AI Energy Analyst" },
  { title: "Portfolio & Risk Engine" },
];

const capabilityCards = [
  {
    title: "Market Data Access",
    body: "Core benchmarks, products, curves, and spreads in one operating layer.",
  },
  {
    title: "Macro & Alternative Data",
    body: "Storage, logistics, policy, and demand signals layered onto price action.",
  },
  {
    title: "AI Reports",
    body: "Generate market briefs and desk-ready analysis for real workflows.",
  },
  {
    title: "Risk Monitoring",
    body: "Watch exposure shift as market structure changes.",
  },
  {
    title: "Scenario Analysis",
    body: "Test policy, freight, outage, and supply shocks before they hit the book.",
  },
  {
    title: "Stress Testing",
    body: "See where downside concentrates across portfolios and books.",
  },
];

const workflowSteps = [
  {
    step: "01",
    title: "Ingest the market",
    body: "Capture prices, physical signals, and macro context.",
  },
  {
    step: "02",
    title: "Connect to exposure",
    body: "Map market drivers directly to books and portfolios.",
  },
  {
    step: "03",
    title: "Generate intelligence",
    body: "Turn fragmented signals into structured analysis.",
  },
  {
    step: "04",
    title: "Simulate risk",
    body: "Run forward scenarios across policy, supply, and logistics.",
  },
];

const shockChips = ["OPEC cut", "Refinery outage", "Freight spike", "Storage build", "Demand slowdown"];

const useCases = [
  {
    title: "Traders",
    body: "Track connected drivers and act faster on dislocations.",
  },
  {
    title: "Analysts",
    body: "Build deeper market views from structured and alternative data.",
  },
  {
    title: "Risk Managers",
    body: "Monitor exposure and simulate downside across complex books.",
  },
  {
    title: "Banks & Hedge Funds",
    body: "Understand oil and gas risk with intelligence-first tooling.",
  },
];

const marketRows = [
  { name: "Brent", price: "$93.98", change: "-1.6%", tone: "text-[#c7d4dc]" },
  { name: "WTI", price: "$94.58", change: "-1.8%", tone: "text-[#c7d4dc]" },
  { name: "TTF", price: "€45.48", change: "-0.9%", tone: "text-[#c7d4dc]" },
  { name: "Jet", price: "$4.23", change: "+0.7%", tone: "text-[#d8e3ea]" },
];

const terminalAlerts = [
  "North Sea freight tightening",
  "Pipeline maintenance repricing gas spreads",
  "Refinery run cuts shifting product balances",
];

const commandLog = ["> show brent drivers", "> compare book vs freight shock", "> run refinery outage scenario"];

const networkNodes = [
  { label: "Brent", x: 170, y: 190, dx: -8, dy: -50, size: "large" },
  { label: "OPEC Policy", x: 430, y: 180, dx: -38, dy: -54 },
  { label: "Refinery Margins", x: 690, y: 235, dx: -28, dy: -52 },
  { label: "WTI Spread", x: 280, y: 255, dx: -26, dy: -50 },
  { label: "Inventories", x: 360, y: 365, dx: -26, dy: -50 },
  { label: "Crack Spreads", x: 770, y: 330, dx: -24, dy: -52 },
  { label: "Freight Rates", x: 160, y: 470, dx: -16, dy: -52 },
  { label: "Shipping Lanes", x: 305, y: 505, dx: -34, dy: -52 },
  { label: "Storage Levels", x: 565, y: 540, dx: -22, dy: -54 },
  { label: "LNG Flows", x: 770, y: 605, dx: -12, dy: -50 },
  { label: "Sanctions Risk", x: 470, y: 610, dx: -30, dy: -52 },
  { label: "Pipeline Constraints", x: 330, y: 690, dx: -64, dy: -50 },
  { label: "Weather Models", x: 660, y: 715, dx: -30, dy: -52 },
  { label: "Power Demand", x: 545, y: 790, dx: -18, dy: -52 },
];

const networkLinks = [
  [170, 190, 430, 180],
  [170, 190, 280, 255],
  [430, 180, 690, 235],
  [430, 180, 360, 365],
  [280, 255, 360, 365],
  [280, 255, 160, 470],
  [360, 365, 770, 330],
  [360, 365, 160, 470],
  [360, 365, 565, 540],
  [160, 470, 305, 505],
  [305, 505, 565, 540],
  [565, 540, 770, 605],
  [565, 540, 470, 610],
  [470, 610, 330, 690],
  [470, 610, 660, 715],
  [330, 690, 545, 790],
  [660, 715, 545, 790],
  [690, 235, 770, 330],
  [770, 330, 770, 605],
];

function NewsletterEmbed({ compact = false }) {
  return (
    <iframe
      src={NEWSLETTER_EMBED_URL}
      data-test-id="beehiiv-embed"
      title="Kolmo newsletter signup"
      width="100%"
      height={compact ? "250" : "250"}
      frameBorder="0"
      scrolling="no"
      style={{
        borderRadius: "12px",
        border: "1px solid rgba(255, 255, 255, 0.08)",
        margin: 0,
        backgroundColor: "transparent",
      }}
    />
  );
}

function NewsletterFallback({ compact = false }) {
  return (
    <div
      className={`rounded-[1.5rem] border border-white/8 bg-[rgba(255,255,255,0.02)] ${
        compact ? "p-4" : "p-5 sm:p-6"
      }`}
    >
      <div className="text-[0.72rem] uppercase tracking-[0.22em] text-textSecondary">Newsletter signup</div>
      <p className={`mt-3 text-textSecondary ${compact ? "text-sm leading-7" : "text-base leading-8"}`}>
        Some mobile browsers block the embedded form. Open the secure subscribe page in a new tab to join the Kolmo
        newsletter.
      </p>
      <div className="mt-5">
        <a
          href={NEWSLETTER_EMBED_URL}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/[0.06] px-5 py-3 text-sm tracking-[0.12em] text-textPrimary transition hover:border-white/18 hover:bg-white/[0.09]"
        >
          Open Subscribe Form
        </a>
      </div>
    </div>
  );
}

function SectionHeading({ eyebrow, title, body, align = "left" }) {
  const alignment = align === "center" ? "mx-auto items-center text-center" : "items-start";

  return (
    <div className={`flex max-w-3xl flex-col gap-3 ${alignment}`}>
      <span className="text-[0.72rem] uppercase tracking-[0.28em] text-textSecondary">{eyebrow}</span>
      <h2 className="max-w-4xl text-balance font-serif-display text-3xl leading-[0.98] text-textPrimary sm:text-4xl lg:text-[3.2rem]">
        {title}
      </h2>
      {body ? <p className="text-pretty text-base leading-8 text-textSecondary sm:text-[1.02rem]">{body}</p> : null}
    </div>
  );
}

function PrimaryButton({ children, href = CALENDLY_URL }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/[0.06] px-6 py-3 text-sm font-medium tracking-[0.14em] text-textPrimary transition duration-300 hover:border-white/18 hover:bg-white/[0.09]"
    >
      {children}
    </a>
  );
}

function SecondaryButton({ children, href = "#showcase" }) {
  return (
    <a
      href={href}
      className="inline-flex items-center justify-center rounded-full border border-white/10 px-6 py-3 text-sm font-medium tracking-[0.14em] text-textSecondary transition duration-300 hover:border-white/16 hover:text-textPrimary"
    >
      {children}
    </a>
  );
}

function HeroTerminalVisual() {
  return (
    <div className="overflow-hidden rounded-[2rem] border border-white/8 bg-[linear-gradient(180deg,rgba(8,15,22,0.94),rgba(7,12,18,0.82))] shadow-panel">
      <div className="border-b border-white/8 bg-[rgba(8,15,22,0.95)]">
        <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 text-[0.64rem] uppercase tracking-[0.24em] text-textSecondary">
          <div className="flex items-center gap-4">
            <span className="text-textPrimary">Kolmo</span>
            <span>Energy Market Analysis</span>
          </div>
          <span>Apr 13, 2026 15:18</span>
        </div>
        <div className="flex flex-wrap border-t border-white/8 text-[0.64rem] uppercase tracking-[0.22em]">
          {["Market", "Agent Terminal", "Positions"].map((tab) => (
            <div
              key={tab}
              className={`border-r border-white/8 px-4 py-3 ${
                tab === "Agent Terminal" ? "bg-[rgba(255,255,255,0.03)] text-textPrimary" : "text-textSecondary"
              }`}
            >
              {tab}
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-px bg-white/8 lg:grid-cols-[0.36fr_0.64fr]">
        <div className="grid gap-px bg-white/8 lg:grid-rows-[auto_1fr]">
          <div className="bg-[rgba(8,15,22,0.92)]">
            <div className="border-b border-white/8 px-4 py-3 text-[0.64rem] uppercase tracking-[0.22em] text-textSecondary">Prices</div>
            <div className="space-y-1 px-4 py-4">
              {marketRows.map((row) => (
                <div key={row.name} className="grid grid-cols-[1fr_0.9fr_0.7fr] gap-3 border-b border-white/6 py-2 text-sm">
                  <span className="text-textPrimary">{row.name}</span>
                  <span className="text-textSecondary">{row.price}</span>
                  <span className={row.tone}>{row.change}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[rgba(8,15,22,0.92)]">
            <div className="border-b border-white/8 px-4 py-3 text-[0.64rem] uppercase tracking-[0.22em] text-textSecondary">Ask Kolmo</div>
            <div className="space-y-3 px-4 py-4">
              {commandLog.map((line) => (
                <div key={line} className="rounded-2xl border border-white/8 bg-white/[0.02] px-3 py-3 text-sm text-textPrimary">
                  {line}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid gap-px bg-white/8 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="bg-[rgba(8,15,22,0.92)]">
            <div className="border-b border-white/8 px-4 py-3">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <div className="text-[0.64rem] uppercase tracking-[0.22em] text-textSecondary">Chart</div>
                  <div className="mt-2 font-serif-display text-2xl text-textPrimary">Historical Prices</div>
                </div>
                <div className="flex gap-2 text-[0.64rem] uppercase tracking-[0.18em] text-textSecondary">
                  {["1M", "3M", "6M", "1Y"].map((range) => (
                    <span
                      key={range}
                      className={`border px-3 py-2 ${range === "1Y" ? "border-white/18 text-textPrimary" : "border-white/8"}`}
                    >
                      {range}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="px-4 py-5">
              <div className="rounded-[1.35rem] border border-white/8 bg-[linear-gradient(180deg,rgba(12,20,29,0.9),rgba(9,15,22,0.98))] p-4">
                <svg aria-hidden="true" className="h-[280px] w-full" viewBox="0 0 580 320">
                  {[40, 100, 160, 220, 280].map((y) => (
                    <line
                      key={y}
                      x1="0"
                      x2="580"
                      y1={y}
                      y2={y}
                      stroke="rgba(133,162,182,0.12)"
                      strokeDasharray="4 8"
                    />
                  ))}
                  <polyline
                    fill="none"
                    points="10,190 40,178 80,184 120,162 160,176 200,168 240,172 280,166 320,179 360,183 400,171 430,164 460,155 490,150 515,72 528,120 540,52 552,45 565,86 575,78"
                    stroke="#95b4c7"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <polyline
                    fill="none"
                    points="10,196 40,188 80,191 120,166 160,181 200,171 240,179 280,174 320,188 360,192 400,186 430,180 460,176 490,170 515,95 528,138 540,82 552,90 565,112 575,116"
                    stroke="#d3dde4"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <div className="mt-3 flex items-center gap-4 text-[0.72rem] uppercase tracking-[0.16em] text-textSecondary">
                  <span className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#95b4c7]" />
                    Brent
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#d3dde4]" />
                    WTI
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[rgba(8,15,22,0.92)]">
            <div className="border-b border-white/8 px-4 py-3 text-[0.64rem] uppercase tracking-[0.22em] text-textSecondary">Trading Floor</div>
            <div className="space-y-3 px-4 py-4">
              {terminalAlerts.map((headline, index) => (
                <div key={headline} className="rounded-[1.15rem] border border-white/8 bg-white/[0.02] px-3 py-3">
                  <div className="text-[0.62rem] uppercase tracking-[0.2em] text-textSecondary">Alert 0{index + 1}</div>
                  <div className="mt-2 text-sm leading-7 text-textPrimary">{headline}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/8 bg-[rgba(7,12,18,0.95)] px-4 py-4">
        <div className="flex flex-wrap gap-2">
          {["Agent coverage", "Portfolio context", "Scenario engine", "Structured output"].map((pillar) => (
            <span key={pillar} className="rounded-full border border-white/8 bg-white/[0.03] px-3 py-2 text-[0.64rem] uppercase tracking-[0.18em] text-textSecondary">
              {pillar}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function HeroAtmosphere() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[2.2rem]" aria-hidden="true">
      <div className="hero-atmosphere__grid" />
      <svg className="hero-atmosphere__contours" viewBox="0 0 1600 900" preserveAspectRatio="none">
        <path
          className="hero-atmosphere__path hero-atmosphere__path--a"
          d="M-40 170C108 138 232 112 372 146C510 179 642 252 794 248C940 244 1046 160 1172 140C1338 114 1484 180 1660 130"
        />
        <path
          className="hero-atmosphere__path hero-atmosphere__path--b"
          d="M-20 312C134 274 260 282 382 330C540 392 638 444 792 432C936 420 1038 346 1174 312C1312 278 1458 280 1640 360"
        />
        <path
          className="hero-atmosphere__path hero-atmosphere__path--c"
          d="M-30 502C126 470 252 520 380 590C510 660 640 708 806 680C952 654 1050 582 1184 566C1340 548 1474 592 1650 564"
        />
        <path
          className="hero-atmosphere__path hero-atmosphere__path--d"
          d="M120 40C206 114 264 226 338 320C408 406 522 490 676 506C824 522 918 472 1020 394C1128 310 1188 192 1300 120"
        />
        <circle className="hero-atmosphere__point hero-atmosphere__point--a" cx="382" cy="330" r="5" />
        <circle className="hero-atmosphere__point hero-atmosphere__point--b" cx="794" cy="248" r="6" />
        <circle className="hero-atmosphere__point hero-atmosphere__point--c" cx="1184" cy="566" r="5" />
        <circle className="hero-atmosphere__point hero-atmosphere__point--d" cx="1020" cy="394" r="5" />
      </svg>
      <div className="hero-atmosphere__datafield">
        <span className="hero-atmosphere__bar hero-atmosphere__bar--1" />
        <span className="hero-atmosphere__bar hero-atmosphere__bar--2" />
        <span className="hero-atmosphere__bar hero-atmosphere__bar--3" />
        <span className="hero-atmosphere__bar hero-atmosphere__bar--4" />
        <span className="hero-atmosphere__bar hero-atmosphere__bar--5" />
        <span className="hero-atmosphere__bar hero-atmosphere__bar--6" />
      </div>
      <div className="hero-atmosphere__beam hero-atmosphere__beam--left" />
      <div className="hero-atmosphere__beam hero-atmosphere__beam--right" />
      <div className="hero-atmosphere__orb hero-atmosphere__orb--one" />
      <div className="hero-atmosphere__orb hero-atmosphere__orb--two" />
      <div className="hero-atmosphere__orb hero-atmosphere__orb--three" />
      <div className="hero-atmosphere__ring hero-atmosphere__ring--one" />
      <div className="hero-atmosphere__ring hero-atmosphere__ring--two" />
      <div className="hero-atmosphere__scan" />
    </div>
  );
}

function NetworkVisual() {
  return (
    <div className="network-shell relative min-h-[41rem] overflow-hidden rounded-[2rem] border border-white/8 bg-[linear-gradient(180deg,rgba(9,15,22,0.92),rgba(7,12,18,0.78))] shadow-panel">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(85,134,164,0.12),transparent_26%)]" />
      <div className="pointer-events-none absolute inset-0 bg-grid bg-[size:76px_76px] opacity-[0.16]" />
      <div className="pointer-events-none absolute inset-x-6 top-5 z-20 flex items-center justify-between rounded-full border border-white/8 bg-[rgba(8,15,22,0.68)] px-4 py-2 text-[0.62rem] uppercase tracking-[0.24em] text-textSecondary/85 backdrop-blur">
        <span>Global Energy Map</span>
        <span>Command Layer</span>
      </div>

      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 900 900" aria-hidden="true">
        {networkLinks.map(([x1, y1, x2, y2], index) => (
          <line
            key={index}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="rgba(133,162,182,0.34)"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        ))}

        {networkLinks.slice(0, 6).map(([x1, y1], index) => (
          <circle
            key={`flow-${index}`}
            cx={x1}
            cy={y1}
            r="3.6"
            fill="rgba(158,195,216,0.8)"
            className="flow-dot-svg"
            style={{ animationDelay: `${index * 1.7}s` }}
          />
        ))}

        {networkNodes.map((node) => (
          <circle
            key={`node-${node.label}`}
            cx={node.x}
            cy={node.y}
            r={node.size === "large" ? 6.5 : 5}
            fill="rgba(158,195,216,0.88)"
            stroke="rgba(255,255,255,0.14)"
            strokeWidth="1.4"
          />
        ))}
      </svg>

      <div className="absolute inset-0 z-10">
        {networkNodes.map((node, index) => (
          <div
            key={node.label}
            className="absolute"
            style={{
              left: `${(node.x / 900) * 100}%`,
              top: `${(node.y / 900) * 100}%`,
              transform: "translate(-50%, -50%)",
            }}
          >
            <div
              className="absolute animate-floatLabel rounded-full border border-white/8 bg-[rgba(8,15,22,0.8)] px-3 py-1.5 text-[0.68rem] tracking-[0.14em] text-textPrimary shadow-[0_16px_40px_rgba(0,0,0,0.18)] backdrop-blur"
              style={{
                left: `${node.dx}px`,
                top: `${node.dy}px`,
                animationDelay: `${index * 0.35}s`,
              }}
            >
              {node.label}
            </div>
          </div>
        ))}
      </div>

      <div className="absolute inset-x-[22%] top-[24%] h-[48%] rounded-full border border-white/5 bg-[radial-gradient(circle,rgba(102,135,157,0.08),transparent_65%)] blur-2xl" />
      <div className="absolute bottom-6 left-6 flex items-center gap-3 rounded-full border border-white/8 bg-[rgba(8,15,22,0.72)] px-4 py-2 text-[0.68rem] uppercase tracking-[0.18em] text-textSecondary backdrop-blur">
        <img src={kolmoMark} alt="" className="h-4 w-4 opacity-80" />
        <span>Systemic market intelligence</span>
      </div>
    </div>
  );
}

function OverviewCard({ title }) {
  return (
    <div className="group rounded-[1.35rem] border border-white/8 bg-[rgba(8,15,22,0.78)] px-5 py-5 shadow-panel transition duration-300 hover:border-white/12 hover:bg-[rgba(9,16,23,0.88)]">
      <div className="mb-4 h-px w-12 bg-gradient-to-r from-[#8ab1c6]/70 to-transparent" />
      <h3 className="text-sm font-medium uppercase tracking-[0.16em] text-textPrimary sm:text-[0.92rem]">{title}</h3>
    </div>
  );
}

function CapabilityCard({ title, body }) {
  return (
    <div className="group rounded-[1.5rem] border border-white/8 bg-[rgba(8,15,22,0.78)] p-5 transition duration-300 hover:border-white/12 hover:bg-[rgba(9,16,23,0.88)]">
      <div className="mb-4 h-px w-10 bg-gradient-to-r from-[#8ab1c6]/70 to-transparent" />
      <h3 className="text-base font-medium text-textPrimary">{title}</h3>
      <p className="mt-2 text-sm leading-7 text-textSecondary">{body}</p>
    </div>
  );
}

function WorkflowCard({ step, title, body }) {
  return (
    <div className="rounded-[1.55rem] border border-white/8 bg-[rgba(8,15,22,0.76)] p-6">
      <div className="text-[0.72rem] uppercase tracking-[0.24em] text-textSecondary">{step}</div>
      <h3 className="mt-4 text-lg font-medium text-textPrimary">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-textSecondary">{body}</p>
    </div>
  );
}

function UseCaseCard({ title, body }) {
  return (
    <div className="rounded-[1.5rem] border border-white/8 bg-[rgba(8,15,22,0.74)] p-6">
      <h3 className="text-lg font-medium text-textPrimary">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-textSecondary">{body}</p>
    </div>
  );
}

export default function App() {
  const [isNewsletterOpen, setIsNewsletterOpen] = useState(false);
  const [analyticsConsent, setAnalyticsConsent] = useState(() => getAnalyticsConsent());
  const [isCookieBannerVisible, setIsCookieBannerVisible] = useState(() => getAnalyticsConsent() === null);
  const [isMobileNewsletterFallback, setIsMobileNewsletterFallback] = useState(false);

  useEffect(() => {
    const hasDismissed = window.localStorage.getItem(NEWSLETTER_DISMISSED_KEY) === "true";

    if (hasDismissed) {
      return undefined;
    }

    const timer = window.setTimeout(() => {
      setIsNewsletterOpen(true);
    }, 30000);

    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isNewsletterOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isNewsletterOpen]);

  useEffect(() => {
    if (analyticsConsent === "granted") {
      initGoogleAnalytics();
    }
  }, [analyticsConsent]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return undefined;
    }

    const mediaQuery = window.matchMedia("(max-width: 640px)");
    const updateMobileNewsletterFallback = (event) => {
      setIsMobileNewsletterFallback(event.matches);
    };

    setIsMobileNewsletterFallback(mediaQuery.matches);

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", updateMobileNewsletterFallback);

      return () => mediaQuery.removeEventListener("change", updateMobileNewsletterFallback);
    }

    mediaQuery.addListener(updateMobileNewsletterFallback);

    return () => mediaQuery.removeListener(updateMobileNewsletterFallback);
  }, []);

  const openNewsletter = () => {
    setIsNewsletterOpen(true);
  };

  const dismissNewsletter = () => {
    window.localStorage.setItem(NEWSLETTER_DISMISSED_KEY, "true");
    setIsNewsletterOpen(false);
  };

  const acceptAnalytics = () => {
    persistAnalyticsConsent("granted");
    setAnalyticsConsent("granted");
    setIsCookieBannerVisible(false);
  };

  const declineAnalytics = () => {
    persistAnalyticsConsent("denied");
    setAnalyticsConsent("denied");
    setIsCookieBannerVisible(false);
  };

  const openCookieSettings = () => {
    setIsCookieBannerVisible(true);
  };

  return (
    <div className="min-h-screen bg-ink text-textPrimary">
      <div className="fixed inset-0 -z-10 bg-vignette" />
      <div className="fixed inset-0 -z-10 bg-grid bg-[size:72px_72px] opacity-[0.08]" />
      <div className="fixed inset-0 -z-10 bg-[linear-gradient(180deg,rgba(5,11,17,0.5),rgba(5,11,17,0.92))]" />

      <header className="sticky top-0 z-50 border-b border-white/6 bg-[rgba(5,11,17,0.72)] backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-[1280px] items-center justify-between px-5 py-4 sm:px-6 lg:px-8">
          <a href="#top" className="flex items-center gap-3 text-sm font-semibold tracking-[0.34em] text-textPrimary">
            {/* Replace with production logo asset if needed */}
            <img src={kolmoMark} alt="" className="h-6 w-6 opacity-90" />
            <span>KOLMO</span>
          </a>

          <nav className="hidden items-center gap-8 text-[0.74rem] uppercase tracking-[0.2em] text-textSecondary md:flex">
            <a href="#platform" className="transition hover:text-textPrimary">
              Platform
            </a>
            <div className="group relative">
              <button
                type="button"
                className="inline-flex items-center gap-2 transition hover:text-textPrimary focus:outline-none focus:text-textPrimary"
                aria-label="Open audience menu"
              >
                <span>Audience</span>
                <span className="text-[0.65rem]">+</span>
              </button>
              <div className="pointer-events-none absolute left-1/2 top-full z-50 mt-4 w-64 -translate-x-1/2 rounded-[1.1rem] border border-white/8 bg-[rgba(8,15,22,0.96)] p-2 opacity-0 shadow-[0_24px_80px_rgba(0,0,0,0.32)] backdrop-blur-xl transition duration-200 group-hover:pointer-events-auto group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:opacity-100">
                {audienceTags.map((tag) => (
                  <a
                    key={tag}
                    href="#target-users"
                    className="block rounded-[0.9rem] px-3 py-2.5 text-[0.68rem] uppercase tracking-[0.18em] text-textSecondary transition hover:bg-white/[0.04] hover:text-textPrimary"
                  >
                    {tag}
                  </a>
                ))}
              </div>
            </div>
            <a href="#capabilities" className="transition hover:text-textPrimary">
              Capabilities
            </a>
            <a href="#showcase" className="transition hover:text-textPrimary">
              Product
            </a>
            <a href="#contact" className="transition hover:text-textPrimary">
              Contact
            </a>
          </nav>

          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex rounded-full border border-white/10 px-3 py-2 text-[0.68rem] uppercase tracking-[0.16em] text-textSecondary transition hover:border-white/16 hover:text-textPrimary sm:px-4 sm:text-[0.72rem] sm:tracking-[0.18em]"
          >
            Contact Us
          </a>
        </div>
      </header>

      <main id="top">
        <section className="hero-stage relative overflow-hidden border-b border-white/6">
          <div className="mx-auto w-full max-w-[1440px] px-5 pb-18 pt-14 sm:px-6 lg:px-8 lg:pb-24 lg:pt-20">
            <HeroAtmosphere />

            <div className="relative mx-auto grid w-full max-w-[1280px] gap-12 lg:min-h-[calc(100vh-10rem)] lg:grid-cols-[minmax(0,0.95fr)_minmax(560px,1.05fr)] lg:items-center lg:gap-16">
              <div className="max-w-[38rem]">
                <span className="text-[0.72rem] uppercase tracking-[0.28em] text-textSecondary">Oil & gas market intelligence</span>
                <h1 className="mt-6 max-w-[11ch] font-serif-display text-5xl leading-[0.94] text-textPrimary sm:text-6xl lg:text-[5.15rem]">
                  AI-Powered Energy Risk Intelligence
                </h1>

                <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                  <PrimaryButton>Contact Us</PrimaryButton>
                  <SecondaryButton href="#platform">View Platform</SecondaryButton>
                </div>

                <div className="mt-12 grid max-w-2xl grid-cols-1 gap-4 border-t border-white/8 pt-8 sm:grid-cols-3">
                  <div>
                    <div className="text-[0.72rem] uppercase tracking-[0.2em] text-textSecondary">Coverage</div>
                    <div className="mt-3 text-base text-textPrimary">Oil, gas, logistics, storage, and macro context.</div>
                  </div>
                  <div>
                    <div className="text-[0.72rem] uppercase tracking-[0.2em] text-textSecondary">Workflows</div>
                    <div className="mt-3 text-base text-textPrimary">Analysis, monitoring, and scenario work.</div>
                  </div>
                  <div>
                    <div className="text-[0.72rem] uppercase tracking-[0.2em] text-textSecondary">Positioning</div>
                    <div className="mt-3 text-base text-textPrimary">A terminal for intelligence and risk.</div>
                  </div>
                </div>
              </div>

              <HeroTerminalVisual />
            </div>
          </div>
        </section>

        <section id="platform" className="mx-auto w-full max-w-[1280px] px-5 py-24 sm:px-6 lg:px-8 lg:py-30">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:items-start lg:gap-16">
            <div className="space-y-8">
              <SectionHeading
                eyebrow="Knowledge Web"
                title="Built for Intelligence and Risk"
                body="A connected market map across price, policy, logistics, refining, storage, and exposure."
              />

              <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-1">
                {overviewCards.map((card) => (
                  <OverviewCard key={card.title} title={card.title} />
                ))}
              </div>
            </div>

            <div>
              <NetworkVisual />
            </div>
          </div>
        </section>

        <section id="capabilities" className="mx-auto w-full max-w-[1280px] px-5 py-8 sm:px-6 lg:px-8 lg:py-12">
          <SectionHeading
            eyebrow="Core capabilities"
            title="Built for serious energy workflows with less dashboard sprawl and more decision context."
          />

          <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {capabilityCards.map((card) => (
              <CapabilityCard key={card.title} title={card.title} body={card.body} />
            ))}
          </div>
        </section>

        <section className="mx-auto w-full max-w-[1280px] px-5 py-24 sm:px-6 lg:px-8 lg:py-30">
          <SectionHeading
            eyebrow="How it works"
            title="A direct workflow from market ingestion to risk simulation."
            body="Kolmo is designed to move from fragmented signals to usable intelligence with portfolio context."
          />

          <div className="mt-12 grid gap-4 lg:grid-cols-4">
            {workflowSteps.map((item) => (
              <WorkflowCard key={item.step} step={item.step} title={item.title} body={item.body} />
            ))}
          </div>
        </section>

        <section id="showcase" className="mx-auto w-full max-w-[1280px] px-5 py-8 sm:px-6 lg:px-8 lg:py-12">
          <div className="overflow-hidden rounded-[2rem] border border-white/8 bg-[linear-gradient(180deg,rgba(8,15,22,0.88),rgba(7,12,18,0.94))] shadow-panel">
            <div className="grid gap-10 px-6 py-8 sm:px-8 sm:py-10 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)] lg:gap-12 lg:px-10 lg:py-12">
              <div className="max-w-xl">
                <span className="text-[0.72rem] uppercase tracking-[0.28em] text-textSecondary">Platform showcase</span>
                <h2 className="mt-5 font-serif-display text-3xl leading-[0.98] text-textPrimary sm:text-4xl lg:text-[3rem]">
                  From market complexity to actionable clarity.
                </h2>
                <p className="mt-5 text-base leading-8 text-textSecondary">
                  One interface for market intelligence, custom analysis, and risk visibility.
                </p>
                <p className="mt-8 text-[0.78rem] uppercase tracking-[0.22em] text-textSecondary">
                  Replace this placeholder with the production Kolmo platform screenshot.
                </p>
              </div>

              <div className="relative">
                <div className="absolute inset-x-10 bottom-0 h-20 rounded-full bg-[rgba(103,138,161,0.1)] blur-3xl" />
                <div className="relative overflow-hidden rounded-[1.6rem] border border-white/10 bg-[rgba(10,16,23,0.94)] shadow-[0_30px_80px_rgba(0,0,0,0.34)]">
                  <div className="flex items-center gap-2 border-b border-white/8 px-5 py-3">
                    <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                    <span className="h-2.5 w-2.5 rounded-full bg-white/12" />
                    <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
                    <span className="ml-4 text-[0.68rem] uppercase tracking-[0.22em] text-textSecondary">Kolmo platform preview</span>
                  </div>

                  {/* Replace the image below with an actual Kolmo platform screenshot when available. */}
                  <img
                    src={platformPreview}
                    alt="Kolmo platform placeholder preview"
                    className="w-full border-t border-white/6 object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-[1280px] px-5 py-24 sm:px-6 lg:px-8 lg:py-30">
          <div className="grid gap-10 overflow-hidden rounded-[2rem] border border-white/8 bg-[linear-gradient(180deg,rgba(8,15,22,0.84),rgba(7,12,18,0.94))] p-6 shadow-panel sm:p-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-12 lg:p-10">
            <div className="max-w-xl">
              <SectionHeading
                eyebrow="Risk intelligence"
                title="See risk before the market prices it."
                body="Run simulations across supply, freight, storage, policy, and cross-market dislocation."
              />

              <div className="mt-8 flex flex-wrap gap-2.5">
                {shockChips.map((chip) => (
                  <span
                    key={chip}
                    className="rounded-full border border-white/8 bg-white/[0.03] px-3 py-2 text-[0.68rem] uppercase tracking-[0.18em] text-textSecondary"
                  >
                    {chip}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid gap-4 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
              <div className="rounded-[1.5rem] border border-white/8 bg-white/[0.03] p-5">
                <div className="text-[0.72rem] uppercase tracking-[0.22em] text-textSecondary">Scenario surface</div>
                <div className="mt-6 space-y-4">
                  <div className="rounded-2xl border border-white/8 bg-[rgba(255,255,255,0.02)] p-4">
                    <div className="flex items-center justify-between text-sm text-textPrimary">
                      <span>Base case</span>
                      <span className="text-textSecondary">Stable balances</span>
                    </div>
                    <div className="mt-4 h-1.5 rounded-full bg-white/6">
                      <div className="h-full w-[38%] rounded-full bg-[#7da7c0]" />
                    </div>
                  </div>
                  <div className="rounded-2xl border border-white/8 bg-[rgba(255,255,255,0.02)] p-4">
                    <div className="flex items-center justify-between text-sm text-textPrimary">
                      <span>Stress case</span>
                      <span className="text-textSecondary">Freight + outage shock</span>
                    </div>
                    <div className="mt-4 h-1.5 rounded-full bg-white/6">
                      <div className="h-full w-[72%] rounded-full bg-[#a4bac7]" />
                    </div>
                  </div>
                  <div className="rounded-2xl border border-white/8 bg-[rgba(255,255,255,0.02)] p-4">
                    <div className="flex items-center justify-between text-sm text-textPrimary">
                      <span>Tail case</span>
                      <span className="text-textSecondary">Policy + storage dislocation</span>
                    </div>
                    <div className="mt-4 h-1.5 rounded-full bg-white/6">
                      <div className="h-full w-[86%] rounded-full bg-[#c3ced5]" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-[1.5rem] border border-white/8 bg-white/[0.03] p-5">
                <div className="flex items-center justify-between text-[0.72rem] uppercase tracking-[0.22em] text-textSecondary">
                  <span>Shock transmission</span>
                  <span>Portfolio view</span>
                </div>
                <div className="mt-8 space-y-6">
                  {[
                    ["Supply risk", "Higher crude support under constrained availability."],
                    ["Margin pressure", "Refinery stress feeds through product balances."],
                    ["Freight sensitivity", "Logistics shifts regional clearing dynamics."],
                    ["Inventory exposure", "Storage imbalance amplifies downside asymmetry."],
                  ].map(([title, description]) => (
                    <div key={title} className="border-l border-white/10 pl-4">
                      <div className="text-sm font-medium text-textPrimary">{title}</div>
                      <div className="mt-2 text-sm leading-7 text-textSecondary">{description}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="target-users" className="mx-auto w-full max-w-[1280px] px-5 py-8 sm:px-6 lg:px-8 lg:py-12">
          <SectionHeading
            eyebrow="Target users"
            title="Designed for institutions operating in complex energy markets."
            body="One platform for intelligence, exposure awareness, and scenario depth."
          />

          <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {useCases.map((useCase) => (
              <UseCaseCard key={useCase.title} title={useCase.title} body={useCase.body} />
            ))}
          </div>
        </section>

        <section id="contact" className="mx-auto w-full max-w-[1280px] px-5 py-24 sm:px-6 lg:px-8 lg:py-30">
          <div className="rounded-[2rem] border border-white/8 bg-[linear-gradient(180deg,rgba(8,15,22,0.82),rgba(7,12,18,0.94))] px-6 py-10 text-center shadow-panel sm:px-8 lg:px-10 lg:py-14">
            <SectionHeading
              align="center"
              title="The intelligence layer for energy markets."
              body="Kolmo helps market participants map complexity, generate insight, and make better risk decisions in oil and gas."
            />

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <PrimaryButton>Contact Us</PrimaryButton>
              <SecondaryButton href="#newsletter">Subscribe</SecondaryButton>
            </div>

            {/* Optional analytics and demo-request integration can be added here. */}
          </div>
        </section>

        <section id="newsletter" className="mx-auto w-full max-w-[1280px] px-5 pb-16 sm:px-6 lg:px-8 lg:pb-20">
          <div className="overflow-hidden rounded-[2rem] border border-white/8 bg-[linear-gradient(180deg,rgba(8,15,22,0.84),rgba(7,12,18,0.96))] shadow-panel">
            <div className="px-6 py-5 sm:px-8 sm:py-6 lg:px-10">
              <span className="text-[0.72rem] uppercase tracking-[0.28em] text-textSecondary">Newsletter</span>
              <div className="mt-4">
                {isMobileNewsletterFallback ? (
                  <NewsletterFallback />
                ) : (
                  <div className="rounded-[1.5rem] border border-white/8 bg-[rgba(255,255,255,0.02)] p-2 sm:p-3">
                    <NewsletterEmbed />
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/6 bg-[rgba(5,11,17,0.82)]">
        <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-5 px-5 py-8 text-sm text-textSecondary sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <div className="flex items-center gap-3 tracking-[0.28em] text-textPrimary">
            <img src={kolmoMark} alt="" className="h-5 w-5 opacity-90" />
            <span>KOLMO</span>
          </div>

          <div className="flex flex-wrap items-center gap-5 text-[0.72rem] uppercase tracking-[0.18em]">
            <a href="#platform" className="transition hover:text-textPrimary">
              Platform
            </a>
            <a href="#capabilities" className="transition hover:text-textPrimary">
              Capabilities
            </a>
            <a href="#showcase" className="transition hover:text-textPrimary">
              Product
            </a>
            <a href="#contact" className="transition hover:text-textPrimary">
              Access
            </a>
            <button type="button" onClick={openCookieSettings} className="transition hover:text-textPrimary">
              Cookie Settings
            </button>
          </div>

          <div className="text-[0.72rem] uppercase tracking-[0.18em] text-textSecondary/80">© 2026 Kolmo. All rights reserved.</div>
        </div>
      </footer>

      {isCookieBannerVisible ? (
        <div className="fixed inset-x-4 bottom-4 z-[65] mx-auto w-full max-w-[760px] rounded-[1.25rem] border border-white/10 bg-[rgba(7,12,18,0.94)] p-3 shadow-[0_24px_80px_rgba(0,0,0,0.34)] backdrop-blur-xl sm:inset-x-6 sm:p-4">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-xl">
              <div className="text-[0.66rem] uppercase tracking-[0.2em] text-textSecondary">Privacy notice</div>
              <p className="mt-1.5 text-[0.92rem] leading-6 text-textSecondary">
                We use optional Google Analytics cookies to understand visits, countries, referral sources, and the pages
                people engage with. You can accept or decline analytics cookies, and you can change this choice later from
                the footer.
              </p>
            </div>

            <div className="flex flex-col gap-2.5 sm:flex-row">
              <button
                type="button"
                onClick={declineAnalytics}
                className="inline-flex items-center justify-center rounded-full border border-white/10 px-4 py-2.5 text-[0.82rem] tracking-[0.1em] text-textSecondary transition hover:border-white/16 hover:text-textPrimary"
              >
                Decline
              </button>
              <button
                type="button"
                onClick={acceptAnalytics}
                className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/[0.06] px-4 py-2.5 text-[0.82rem] tracking-[0.1em] text-textPrimary transition hover:border-white/18 hover:bg-white/[0.09]"
              >
                Accept Analytics
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {isNewsletterOpen ? (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-[rgba(3,7,11,0.72)] px-4 py-6 backdrop-blur-md">
          <div className="relative w-full max-w-[760px] overflow-hidden rounded-[1.75rem] border border-white/10 bg-[linear-gradient(180deg,rgba(8,15,22,0.96),rgba(7,12,18,0.98))] p-5 shadow-[0_40px_120px_rgba(0,0,0,0.42)] sm:p-6">
            <button
              type="button"
              onClick={dismissNewsletter}
              className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-lg text-textSecondary transition hover:border-white/18 hover:text-textPrimary"
              aria-label="Dismiss newsletter signup"
            >
              ×
            </button>

            <div className="pr-12">
              <span className="text-[0.72rem] uppercase tracking-[0.28em] text-textSecondary">Stay close to the market</span>
              <h3 className="mt-4 max-w-[14ch] font-serif-display text-3xl leading-[0.98] text-textPrimary sm:text-[2.5rem]">
                Subscribe to the Kolmo newsletter.
              </h3>
              <p className="mt-4 max-w-2xl text-base leading-8 text-textSecondary">
                Receive periodic notes on oil and gas market structure, risk, and what Kolmo is building.
              </p>
            </div>

            <div className="mt-6">
              {isMobileNewsletterFallback ? (
                <NewsletterFallback compact />
              ) : (
                <div className="rounded-[1.5rem] border border-white/8 bg-[rgba(255,255,255,0.02)] p-3 sm:p-4">
                  <NewsletterEmbed compact />
                </div>
              )}
            </div>

            <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <span className="text-sm leading-7 text-textSecondary">Dismiss once and it will not appear automatically again on this browser.</span>
              <button
                type="button"
                onClick={dismissNewsletter}
                className="inline-flex items-center justify-center rounded-full border border-white/10 px-5 py-2.5 text-sm tracking-[0.12em] text-textSecondary transition hover:border-white/16 hover:text-textPrimary"
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
