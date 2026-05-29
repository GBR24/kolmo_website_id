import { useEffect, useRef, useState } from "react";

import kolmoMark from "../assets/kolmo-mark.svg";
import { getAnalyticsConsent, initGoogleAnalytics, persistAnalyticsConsent } from "./analytics";

const NEWSLETTER_DISMISSED_KEY = "kolmo-newsletter-dismissed";
const NEWSLETTER_EMBED_URL = "https://embeds.beehiiv.com/4c0fb0be-6b2c-4eb2-a78c-0b9b7eaf734b";
const CALENDLY_URL = "https://calendly.com/kolmolabs/30min";
const TERMINAL_URL = "https://kolmo.netlify.app/terminal";
const GITHUB_REPO_URL = "https://github.com/GBR24/kolmo_stats";
const GITHUB_REPO_API_URL = "https://api.github.com/repos/GBR24/kolmo_stats";

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
  { title: "Market drivers" },
  { title: "Open relationships" },
  { title: "Risk paths" },
];

const contributionSteps = [
  { title: "Pick a node" },
  { title: "Map a relationship" },
  { title: "Open a pull request" },
];

const heroSignals = [
  { label: "Brent", tone: "up" },
  { label: "WTI", tone: "down" },
  { label: "TTF", tone: "up" },
  { label: "Freight", tone: "neutral" },
  { label: "Outages", tone: "up" },
  { label: "Flows", tone: "neutral" },
];

const platformShowcaseSlides = [];

const capabilityCards = [
  {
    title: "Live Market Layer",
    body: "Monitor oil, gas, freight, storage, refining, policy, and market news without scattering the desk across tools.",
  },
  {
    title: "Shock Mapping",
    body: "Trace how OPEC policy, outages, LNG flows, or storage changes can travel across prices, spreads, and exposure.",
  },
  {
    title: "AI Briefs",
    body: "Turn dense market reports, filings, and internal notes into concise energy market briefings.",
  },
  {
    title: "Scenario Engine",
    body: "Run commodity scenario analysis before the tape reprices the book.",
  },
];

const workflowSteps = [
  {
    title: "Read",
  },
  {
    title: "Trace",
  },
  {
    title: "Ask",
  },
];

const useCaseCards = [
  {
    title: "Energy Trading Desks",
    body: "Track market-moving signals across Brent, WTI, TTF, products, freight, refinery margins, and physical-flow context.",
  },
  {
    title: "Commodity Risk Teams",
    body: "Map exposures to event risk, policy shifts, storage builds, outages, and correlated cross-market moves.",
  },
  {
    title: "Banks and Hedge Funds",
    body: "Use AI market intelligence to pressure-test views, prepare morning notes, and compare scenarios against portfolio context.",
  },
];

const faqItems = [
  {
    question: "What is Kolmo Labs?",
    answer:
      "Kolmo Labs is an AI energy market intelligence platform for oil and gas traders, analysts, and risk teams that need to monitor market structure, trace event risk, and brief the desk quickly.",
  },
  {
    question: "Who is Kolmo Labs built for?",
    answer:
      "Kolmo Labs is built for energy trading desks, commodity firms, banks, hedge funds, portfolio managers, analysts, and risk teams working across oil, gas, freight, storage, refining, and cross-market exposure.",
  },
  {
    question: "How does Kolmo Labs support commodity risk intelligence?",
    answer:
      "Kolmo Labs connects price, policy, refining, freight, storage, news, and portfolio context so teams can map shock paths, run scenarios, and turn energy market signals into actionable briefings.",
  },
];

const shockScenarios = [
  { label: "OPEC cut", nodes: ["OPEC Policy", "Brent", "WTI Spread", "Inventories"] },
  { label: "Refinery outage", nodes: ["Refinery Margins", "Crack Spreads", "Freight Rates", "Brent"] },
  { label: "Freight spike", nodes: ["Freight Rates", "Shipping Lanes", "LNG Flows", "Storage Levels"] },
  { label: "Storage build", nodes: ["Inventories", "Storage Levels", "WTI Spread", "Brent"] },
];

const audienceGroups = ["Traders", "Analysts", "Risk teams", "Banks", "Hedge funds", "Commodity firms"];

const riskStats = [
  { value: "Live", label: "Watch" },
  { value: "Event", label: "Frame" },
  { value: "Brief", label: "Act" },
];

const riskPathRows = [
  { label: "Supply", value: "72%" },
  { label: "Margins", value: "61%" },
  { label: "Freight", value: "48%" },
  { label: "Storage", value: "84%" },
];

const marketRows = [
  { name: "Brent", price: "$93.98", change: "-1.6%", tone: "text-[#c7d4dc]" },
  { name: "WTI", price: "$94.58", change: "-1.8%", tone: "text-[#c7d4dc]" },
  { name: "TTF", price: "€45.48", change: "-0.9%", tone: "text-[#c7d4dc]" },
  { name: "Jet", price: "$4.23", change: "+0.7%", tone: "text-[#d8e3ea]" },
];

const terminalAlerts = ["North Sea freight tightening", "Pipeline work repricing gas spreads", "Refinery cuts moving products"];

const commandLog = ["> trace brent shock", "> brief risk in 4 lines", "> open knowledge web"];

const networkNodes = [
  { label: "Brent", x: 170, y: 190, dx: -8, dy: -50, mobileDx: -18, mobileDy: 14, size: "large" },
  { label: "OPEC Policy", x: 430, y: 180, dx: -38, dy: -54, mobileDx: -34, mobileDy: 14 },
  { label: "Refinery Margins", x: 690, y: 235, dx: -28, dy: -52, mobileDx: -46, mobileDy: 14 },
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

const compactHiddenNodeLabels = new Set(["WTI Spread", "Shipping Lanes", "Sanctions Risk", "Weather Models"]);

function useDepthMotion() {
  const panelRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") {
      return undefined;
    }

    const node = panelRef.current;

    if (!node || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return undefined;
    }

    let frameId = 0;
    const state = {
      currentRotateX: 0,
      currentRotateY: 0,
      targetRotateX: 0,
      targetRotateY: 0,
      currentGlowX: 50,
      currentGlowY: 50,
      targetGlowX: 50,
      targetGlowY: 50,
    };

    const render = () => {
      state.currentRotateX += (state.targetRotateX - state.currentRotateX) * 0.12;
      state.currentRotateY += (state.targetRotateY - state.currentRotateY) * 0.12;
      state.currentGlowX += (state.targetGlowX - state.currentGlowX) * 0.14;
      state.currentGlowY += (state.targetGlowY - state.currentGlowY) * 0.14;

      node.style.setProperty("--depth-rotate-x", `${state.currentRotateX.toFixed(2)}deg`);
      node.style.setProperty("--depth-rotate-y", `${state.currentRotateY.toFixed(2)}deg`);
      node.style.setProperty("--depth-glow-x", `${state.currentGlowX.toFixed(2)}%`);
      node.style.setProperty("--depth-glow-y", `${state.currentGlowY.toFixed(2)}%`);

      const stillMoving =
        Math.abs(state.targetRotateX - state.currentRotateX) > 0.01 ||
        Math.abs(state.targetRotateY - state.currentRotateY) > 0.01 ||
        Math.abs(state.targetGlowX - state.currentGlowX) > 0.02 ||
        Math.abs(state.targetGlowY - state.currentGlowY) > 0.02;

      if (stillMoving) {
        frameId = window.requestAnimationFrame(render);
      } else {
        frameId = 0;
      }
    };

    const schedule = () => {
      if (!frameId) {
        frameId = window.requestAnimationFrame(render);
      }
    };

    const handleMove = (event) => {
      const rect = node.getBoundingClientRect();
      const offsetX = (event.clientX - rect.left) / rect.width;
      const offsetY = (event.clientY - rect.top) / rect.height;

      state.targetRotateY = (offsetX - 0.5) * 8;
      state.targetRotateX = (0.5 - offsetY) * 7;
      state.targetGlowX = offsetX * 100;
      state.targetGlowY = offsetY * 100;
      schedule();
    };

    const handleLeave = () => {
      state.targetRotateX = 0;
      state.targetRotateY = 0;
      state.targetGlowX = 50;
      state.targetGlowY = 50;
      schedule();
    };

    node.addEventListener("pointermove", handleMove);
    node.addEventListener("pointerleave", handleLeave);

    return () => {
      node.removeEventListener("pointermove", handleMove);
      node.removeEventListener("pointerleave", handleLeave);
      if (frameId) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, []);

  return panelRef;
}

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
      {eyebrow ? <span className="text-[0.72rem] uppercase tracking-[0.28em] text-textSecondary">{eyebrow}</span> : null}
      {title ? (
        <h2 className="max-w-4xl text-balance font-serif-display text-3xl leading-[0.98] text-textPrimary sm:text-4xl lg:text-[3.2rem]">
          {title}
        </h2>
      ) : null}
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
      className="inline-flex items-center justify-center rounded-full border border-[#4da3ff]/35 bg-[#4da3ff]/10 px-6 py-3 text-sm font-medium uppercase tracking-[0.14em] text-textPrimary transition duration-300 hover:border-[#4da3ff]/60 hover:bg-[#4da3ff]/16"
    >
      {children}
    </a>
  );
}

function formatStarCount(stars) {
  if (typeof stars !== "number") {
    return null;
  }

  if (stars >= 1000) {
    const value = stars / 1000;
    return `${Number.isInteger(value) ? value.toFixed(0) : value.toFixed(1)}k`;
  }

  return stars.toLocaleString("en-US");
}

function GitHubIcon({ className = "" }) {
  return (
    <svg aria-hidden="true" className={className} viewBox="0 0 24 24" fill="currentColor">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.48 2 2 6.59 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.49 0-.24-.01-.88-.01-1.73-2.78.62-3.37-1.38-3.37-1.38-.45-1.18-1.11-1.49-1.11-1.49-.91-.64.07-.63.07-.63 1 .07 1.53 1.06 1.53 1.06.9 1.57 2.35 1.12 2.92.85.09-.67.35-1.12.63-1.38-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.31.1-2.72 0 0 .84-.28 2.75 1.05A9.34 9.34 0 0 1 12 6.95c.85 0 1.7.12 2.5.35 1.91-1.33 2.75-1.05 2.75-1.05.55 1.41.2 2.46.1 2.72.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.8-4.57 5.06.36.32.68.95.68 1.91 0 1.38-.01 2.49-.01 2.83 0 .27.18.59.69.49A10.13 10.13 0 0 0 22 12.25C22 6.59 17.52 2 12 2Z"
      />
    </svg>
  );
}

function GitHubStarsLink({ stars }) {
  const formattedStars = formatStarCount(stars);

  return (
    <a
      href={GITHUB_REPO_URL}
      target="_blank"
      rel="noreferrer"
      aria-label="View Kolmo Stats on GitHub"
      className="hidden items-center overflow-hidden rounded-full border border-white/12 bg-white/[0.04] text-[0.68rem] font-medium uppercase tracking-[0.14em] text-[rgba(214,226,240,0.9)] transition hover:border-[#4da3ff]/40 hover:bg-white/[0.08] hover:text-white md:inline-flex"
    >
      <span className="inline-flex items-center gap-1.5 px-3 py-2">
        <GitHubIcon className="h-4 w-4" />
        <span>GitHub</span>
      </span>
      <span className="inline-flex items-center gap-1.5 border-l border-white/10 px-2.5 py-2">
        <span aria-hidden="true">{"\u2605"}</span>
        <span>{formattedStars ?? "Stars"}</span>
      </span>
    </a>
  );
}

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

function HeroTerminalVisual() {
  const panelRef = useDepthMotion();

  return (
    <div
      ref={panelRef}
      className="depth-panel relative w-full min-w-0 max-w-[calc(100vw-2.5rem)] overflow-hidden rounded-[2rem] border border-white/8 bg-[linear-gradient(180deg,rgba(8,15,22,0.94),rgba(7,12,18,0.82))] shadow-panel lg:max-w-none"
    >
      <div className="depth-panel__glow" />
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
              <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
                <div>
                  <div className="text-[0.64rem] uppercase tracking-[0.22em] text-textSecondary">Chart</div>
                  <div className="mt-2 font-serif-display text-2xl text-textPrimary">Historical Prices</div>
                </div>
                <div className="flex flex-wrap gap-2 text-[0.64rem] uppercase tracking-[0.18em] text-textSecondary">
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

function HeroMobileSignalVisual() {
  return (
    <div className="relative w-full max-w-[22rem] overflow-hidden rounded-[1.5rem] border border-white/10 bg-[linear-gradient(180deg,rgba(8,15,22,0.94),rgba(7,12,18,0.86))] shadow-panel">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(151,190,211,0.12),transparent_38%)]" />
      <div className="relative border-b border-white/8 px-4 py-3">
        <div className="flex items-center justify-between gap-4 text-[0.62rem] uppercase tracking-[0.22em] text-textSecondary">
          <span className="text-textPrimary">Kolmo</span>
          <span>Live layer</span>
        </div>
      </div>

      <div className="relative grid gap-px bg-white/8">
        <div className="bg-[rgba(8,15,22,0.9)] p-4">
          <div className="mb-4 text-[0.62rem] uppercase tracking-[0.22em] text-textSecondary">Market pulse</div>
          <div className="space-y-2">
            {marketRows.slice(0, 3).map((row) => (
              <div key={row.name} className="grid grid-cols-[1fr_auto_auto] items-center gap-3 border-b border-white/6 py-2 text-sm">
                <span className="text-textPrimary">{row.name}</span>
                <span className="text-textSecondary">{row.price}</span>
                <span className={row.tone}>{row.change}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[rgba(8,15,22,0.9)] p-4">
          <div className="text-[0.62rem] uppercase tracking-[0.22em] text-textSecondary">Active read</div>
          <p className="mt-3 text-sm leading-7 text-textPrimary">{terminalAlerts[0]}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {commandLog.slice(0, 2).map((line) => (
              <span key={line} className="rounded-full border border-white/8 bg-white/[0.03] px-3 py-2 text-[0.6rem] uppercase tracking-[0.16em] text-textSecondary">
                {line.replace("> ", "")}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function MinimalTerminalVisual({ compact = false }) {
  const panelRef = useDepthMotion();

  return (
    <div
      ref={panelRef}
      className={`depth-panel relative w-full min-w-0 overflow-hidden rounded-lg border border-white/10 bg-[linear-gradient(180deg,rgba(8,15,22,0.94),rgba(5,9,14,0.82))] shadow-panel ${
        compact ? "max-w-[44rem]" : "max-w-[calc(100vw-2.5rem)] lg:max-w-none"
      }`}
    >
      <div className="depth-panel__glow" />
      <div className="border-b border-white/10 bg-[rgba(5,10,15,0.9)]">
        <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 text-[0.64rem] uppercase tracking-[0.24em] text-textSecondary">
          <div className="flex items-center gap-4">
            <span className="text-textPrimary">Kolmo</span>
            <span>Energy Risk Terminal</span>
          </div>
          <span className="text-[#4da3ff]">Live</span>
        </div>
      </div>

      <div className="grid gap-px bg-white/10 lg:grid-cols-[0.42fr_0.58fr]">
        <div className="bg-[rgba(5,10,15,0.82)] p-4">
          <div className="mb-4 text-[0.64rem] uppercase tracking-[0.22em] text-textSecondary">Ask</div>
          <div className="space-y-3 font-mono text-sm leading-6">
            {commandLog.map((line, index) => (
              <div key={line} className={index === 0 ? "text-[#4da3ff]" : "text-textSecondary"}>
                {line}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[rgba(5,10,15,0.82)] p-4">
          <div className="flex items-center justify-between text-[0.64rem] uppercase tracking-[0.22em] text-textSecondary">
            <span>Risk read</span>
            <span className="text-[#d29922]">Shock path</span>
          </div>
          <p className="mt-5 max-w-[34rem] text-2xl leading-tight text-textPrimary sm:text-3xl">
            Freight tightness is reinforcing Brent strength through refining margins.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {["Policy", "Brent", "Freight"].map((item, index) => (
              <div key={item} className="border-t border-white/10 pt-3">
                <div className="text-[0.62rem] uppercase tracking-[0.2em] text-textSecondary">0{index + 1}</div>
                <div className="mt-2 text-sm text-textPrimary">{item}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-px bg-white/10 lg:grid-cols-[0.42fr_0.58fr]">
        <div className="bg-[rgba(5,10,15,0.82)] p-4">
          <div className="mb-3 text-[0.64rem] uppercase tracking-[0.22em] text-textSecondary">Prices</div>
          <div className="space-y-1">
            {marketRows.slice(0, 3).map((row) => (
              <div key={row.name} className="grid grid-cols-[1fr_auto_auto] gap-3 border-b border-white/6 py-2 text-sm">
                <span className="text-textPrimary">{row.name}</span>
                <span className="text-textSecondary">{row.price}</span>
                <span className={row.change.startsWith("+") ? "text-[#4da3ff]" : "text-[#d29922]"}>{row.change}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[rgba(5,10,15,0.82)] p-4">
          <svg aria-hidden="true" className="h-32 w-full" viewBox="0 0 520 150">
            {[24, 72, 120].map((y) => (
              <line key={y} x1="0" x2="520" y1={y} y2={y} stroke="rgba(214,226,240,0.08)" strokeDasharray="4 10" />
            ))}
            <polyline
              fill="none"
              points="6,112 58,100 112,106 168,82 226,92 282,72 338,80 388,58 426,64 460,30 500,42"
              stroke="#4da3ff"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <polyline
              fill="none"
              points="6,118 58,112 112,114 168,98 226,104 282,88 338,92 388,76 426,82 460,58 500,66"
              stroke="#d29922"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.78"
            />
          </svg>
          <div className="mt-3 flex flex-wrap gap-2">
            {terminalAlerts.map((headline) => (
              <span key={headline} className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-2 text-[0.62rem] uppercase tracking-[0.14em] text-textSecondary">
                {headline}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 bg-[rgba(5,10,15,0.92)] px-4 py-4">
        <a href={TERMINAL_URL} target="_blank" rel="noreferrer" className="inline-flex text-[0.72rem] uppercase tracking-[0.18em] text-[#4da3ff] transition hover:text-white">
          Open the live terminal
        </a>
      </div>
    </div>
  );
}

function HeroAtmosphere() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="minimal-atmosphere__wash" />
      <div className="minimal-atmosphere__line minimal-atmosphere__line--one" />
      <div className="minimal-atmosphere__line minimal-atmosphere__line--two" />
      <div className="minimal-atmosphere__point minimal-atmosphere__point--one" />
      <div className="minimal-atmosphere__point minimal-atmosphere__point--two" />
    </div>
  );
}

function ShowcaseCarousel({ onSlideChange = () => {} }) {
  const panelRef = useDepthMotion();
  const scrollerRef = useRef(null);
  const [activeSlide, setActiveSlide] = useState(0);

  const handleShowcaseScroll = () => {
    const scroller = scrollerRef.current;

    if (!scroller) {
      return;
    }

    const nextIndex = Math.max(0, Math.min(platformShowcaseSlides.length - 1, Math.round(scroller.scrollLeft / scroller.clientWidth)));
    setActiveSlide(nextIndex);
    onSlideChange(nextIndex);
  };

  const scrollToSlide = (index) => {
    const scroller = scrollerRef.current;

    if (!scroller) {
      return;
    }

    scroller.scrollTo({
      left: scroller.clientWidth * index,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    onSlideChange(activeSlide);
  }, [activeSlide, onSlideChange]);

  return (
    <div
      ref={panelRef}
      className="depth-panel relative w-full min-w-0 max-w-[calc(100vw-2.5rem)] overflow-hidden rounded-[1.75rem] border border-white/10 bg-[rgba(10,16,23,0.94)] shadow-[0_30px_80px_rgba(0,0,0,0.34)] lg:max-w-none"
    >
      <div className="depth-panel__glow" />
      <div className="pointer-events-none absolute -left-8 top-10 h-40 w-40 rounded-full bg-[radial-gradient(circle,rgba(152,195,220,0.18),transparent_68%)] blur-2xl" />
      <div className="pointer-events-none absolute bottom-10 right-8 h-28 w-28 rounded-full border border-white/10 bg-[linear-gradient(180deg,rgba(159,195,215,0.18),rgba(104,145,170,0.02))] shadow-[0_0_40px_rgba(121,163,190,0.12)]" />
      <div className="pointer-events-none absolute right-16 top-16 h-16 w-16 rounded-[1.4rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.12),rgba(255,255,255,0.02))] shadow-[0_18px_40px_rgba(0,0,0,0.16)] backdrop-blur-sm" />

      <div className="relative flex items-center justify-between border-b border-white/8 px-5 py-3">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/12" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
          <span className="ml-4 text-[0.68rem] uppercase tracking-[0.22em] text-textSecondary">Kolmo platform preview</span>
        </div>

        <div className="hidden items-center gap-2 sm:flex">
          <button
            type="button"
            onClick={() => scrollToSlide(Math.max(activeSlide - 1, 0))}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-sm text-textSecondary transition hover:border-white/18 hover:text-textPrimary"
            aria-label="Previous platform image"
          >
            ←
          </button>
          <button
            type="button"
            onClick={() => scrollToSlide(Math.min(activeSlide + 1, platformShowcaseSlides.length - 1))}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-sm text-textSecondary transition hover:border-white/18 hover:text-textPrimary"
            aria-label="Next platform image"
          >
            →
          </button>
        </div>
      </div>

      <div
        ref={scrollerRef}
        onScroll={handleShowcaseScroll}
        className="showcase-scroller relative flex snap-x snap-mandatory overflow-x-auto scroll-smooth"
      >
        {platformShowcaseSlides.map((slide) => (
          <div key={slide.title} className="min-w-full snap-center p-4 sm:p-5">
            <div className="overflow-hidden rounded-[1.4rem] border border-white/6 bg-[rgba(7,12,18,0.88)]">
              <div className="relative">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(151,190,211,0.08),transparent_42%)]" />
                <img
                  src={slide.image}
                  alt={slide.alt}
                  loading="lazy"
                  className="relative h-[18rem] w-full bg-[#060c12] object-contain p-2 sm:h-[22rem] sm:p-3 lg:h-[30rem]"
                />
                <div className="pointer-events-none absolute inset-x-4 bottom-4 flex justify-start">
                  <div className="rounded-full border border-white/10 bg-[rgba(8,15,22,0.74)] px-3 py-2 text-[0.62rem] uppercase tracking-[0.2em] text-textPrimary backdrop-blur">
                    {slide.title}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="relative flex items-center justify-center gap-2 px-5 pb-5 pt-1">
        {platformShowcaseSlides.map((slide, index) => (
          <button
            key={slide.title}
            type="button"
            onClick={() => scrollToSlide(index)}
            className={`h-2.5 rounded-full transition ${
              index === activeSlide ? "w-8 bg-[#b5cfdd]" : "w-2.5 bg-white/18 hover:bg-white/28"
            }`}
            aria-label={`Go to platform image ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

function NetworkVisual({ activeShock = 0, isCompact = false, onShockChange = () => {} }) {
  const shock = shockScenarios[activeShock] ?? shockScenarios[0];
  const activeNodeLabels = new Set(shock.nodes);
  const labelByCoordinate = new Map(networkNodes.map((node) => [`${node.x}-${node.y}`, node.label]));
  const isLinkActive = ([x1, y1, x2, y2]) => {
    const from = labelByCoordinate.get(`${x1}-${y1}`);
    const to = labelByCoordinate.get(`${x2}-${y2}`);

    return activeNodeLabels.has(from) && activeNodeLabels.has(to);
  };

  return (
    <div
      className={`network-shell relative w-full min-w-0 max-w-[calc(100vw-2.5rem)] overflow-hidden rounded-[2rem] border border-white/8 bg-[linear-gradient(180deg,rgba(9,15,22,0.92),rgba(7,12,18,0.78))] shadow-panel lg:max-w-none ${
        isCompact ? "min-h-[31rem]" : "min-h-[41rem]"
      }`}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(85,134,164,0.12),transparent_26%)]" />
      <div className="pointer-events-none absolute inset-0 bg-grid bg-[size:76px_76px] opacity-[0.16]" />
      <div
        className={`pointer-events-none absolute z-20 flex items-center justify-between rounded-full border border-white/8 bg-[rgba(8,15,22,0.68)] uppercase text-textSecondary/85 backdrop-blur ${
          isCompact
            ? "inset-x-4 top-4 px-3 py-2 text-[0.55rem] tracking-[0.18em]"
            : "inset-x-6 top-5 px-4 py-2 text-[0.62rem] tracking-[0.24em]"
        }`}
      >
        <span>Global Energy Map</span>
        <span>Command Layer</span>
      </div>

      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 900 900" aria-hidden="true">
        {networkLinks.map(([x1, y1, x2, y2], index) => {
          const active = isLinkActive([x1, y1, x2, y2]);

          return (
          <line
            key={index}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            className={active ? "network-link network-link--active" : "network-link"}
            stroke={active ? "rgba(191,222,236,0.78)" : "rgba(133,162,182,0.28)"}
            strokeWidth={active ? "2.4" : "1.3"}
            strokeLinecap="round"
          />
          );
        })}

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

        {networkNodes.map((node) => {
          const active = activeNodeLabels.has(node.label);

          return (
          <circle
            key={`node-${node.label}`}
            cx={node.x}
            cy={node.y}
            r={active ? (node.size === "large" ? 9 : 7.4) : node.size === "large" ? 6.5 : 5}
            className={active ? "network-node network-node--active" : "network-node"}
            fill={active ? "rgba(211,234,244,0.96)" : "rgba(158,195,216,0.8)"}
            stroke={active ? "rgba(255,255,255,0.34)" : "rgba(255,255,255,0.12)"}
            strokeWidth={active ? "2" : "1.2"}
          />
          );
        })}
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
            {!(isCompact && compactHiddenNodeLabels.has(node.label)) ? (
              <div
                className={`absolute animate-floatLabel rounded-full border bg-[rgba(8,15,22,0.8)] shadow-[0_16px_40px_rgba(0,0,0,0.18)] backdrop-blur ${
                  activeNodeLabels.has(node.label) ? "border-white/18 text-white" : "border-white/8 text-textPrimary"
                } ${
                  isCompact ? "px-2.5 py-1 text-[0.56rem] tracking-[0.1em]" : "px-3 py-1.5 text-[0.68rem] tracking-[0.14em]"
                }`}
                style={{
                  left: `${isCompact ? node.mobileDx ?? node.dx : node.dx}px`,
                  top: `${isCompact ? node.mobileDy ?? node.dy : node.dy}px`,
                  animationDelay: `${index * 0.35}s`,
                }}
              >
                {node.label}
              </div>
            ) : null}
          </div>
        ))}
      </div>

      <div className="absolute inset-x-[22%] top-[24%] h-[48%] rounded-full border border-white/5 bg-[radial-gradient(circle,rgba(102,135,157,0.08),transparent_65%)] blur-2xl" />
      <div
        className={`absolute flex items-center gap-3 rounded-full border border-white/8 bg-[rgba(8,15,22,0.72)] uppercase text-textSecondary backdrop-blur ${
          isCompact ? "bottom-4 left-4 px-3 py-2 text-[0.56rem] tracking-[0.12em]" : "bottom-6 left-6 px-4 py-2 text-[0.68rem] tracking-[0.18em]"
        }`}
      >
        <img src={kolmoMark} alt="" className="h-4 w-4 opacity-80" />
        <span>Systemic market intelligence</span>
      </div>

      <div
        className={`absolute z-20 flex flex-wrap gap-2 ${
          isCompact ? "inset-x-4 bottom-14" : "bottom-6 right-6 max-w-[26rem] justify-end"
        }`}
      >
        {shockScenarios.map((item, index) => (
          <button
            key={item.label}
            type="button"
            onClick={() => onShockChange(index)}
            className={`rounded-full border px-3 py-2 text-[0.62rem] uppercase tracking-[0.16em] transition ${
              index === activeShock
                ? "border-white/22 bg-white/[0.11] text-white"
                : "border-white/8 bg-white/[0.03] text-textSecondary hover:border-white/14 hover:text-white"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function OverviewCard({ title }) {
  return (
    <div className="border-t border-white/10 py-4">
      <h3 className="text-sm font-medium uppercase tracking-[0.18em] text-textPrimary sm:text-[0.92rem]">{title}</h3>
    </div>
  );
}

function OpenSourceCallout({ stars }) {
  const formattedStars = formatStarCount(stars);

  return (
    <a
      href={GITHUB_REPO_URL}
      target="_blank"
      rel="noreferrer"
      className="group block border-y border-white/10 py-5 transition hover:border-[#4da3ff]/35"
    >
      <div className="flex flex-col gap-4">
        <div className="flex items-start gap-3">
          <GitHubIcon className="mt-0.5 h-5 w-5 text-[#4da3ff]" />
          <div>
            <div className="text-sm font-medium uppercase tracking-[0.14em] text-textPrimary">Open-source relationships</div>
            <p className="mt-2 max-w-[28rem] text-sm leading-7 text-textSecondary">Inspect how markets connect.</p>
          </div>
        </div>
        <div className="whitespace-nowrap text-[0.72rem] uppercase tracking-[0.16em] text-[#4da3ff] transition group-hover:text-white">
          GitHub{formattedStars ? ` / ${formattedStars} stars` : ""}
        </div>
      </div>
    </a>
  );
}

function ContributionStep({ title, index }) {
  return (
    <div className="border-t border-white/10 py-6">
      <div className="text-[0.62rem] uppercase tracking-[0.22em] text-[#d29922]">0{index + 1}</div>
      <h3 className="mt-3 text-xl font-medium text-textPrimary">{title}</h3>
    </div>
  );
}

function CapabilityCard({ title, body }) {
  return (
    <div className="group rounded-[1.5rem] border border-white/8 bg-[linear-gradient(180deg,rgba(8,15,22,0.82),rgba(7,12,18,0.9))] p-5 transition duration-300 hover:-translate-y-1 hover:border-white/12 hover:bg-[rgba(9,16,23,0.94)]">
      <div className="flex items-center justify-between">
        <div className="h-px w-10 bg-gradient-to-r from-[#8ab1c6]/70 to-transparent" />
        <span className="text-[0.62rem] uppercase tracking-[0.22em] text-textSecondary">Kolmo</span>
      </div>
      <h3 className="mt-5 text-lg font-medium text-textPrimary">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-textSecondary">{body}</p>
    </div>
  );
}

function WorkflowCard({ title }) {
  return (
    <div className="py-7 text-center">
      <h3 className="text-2xl font-medium text-textPrimary">{title}</h3>
    </div>
  );
}

function AudienceStrip() {
  return (
    <div className="flex flex-wrap gap-2.5">
      {audienceGroups.map((group) => (
        <span
          key={group}
          className="rounded-full border border-white/8 bg-white/[0.03] px-4 py-3 text-[0.72rem] uppercase tracking-[0.18em] text-textSecondary"
        >
          {group}
        </span>
      ))}
    </div>
  );
}

function UseCaseCard({ title, body }) {
  return (
    <div className="rounded-[1.25rem] border border-white/8 bg-[rgba(8,15,22,0.74)] p-6 shadow-panel">
      <h3 className="text-lg font-medium text-textPrimary">{title}</h3>
      <p className="mt-4 text-sm leading-7 text-textSecondary">{body}</p>
    </div>
  );
}

function FaqItem({ question, answer }) {
  return (
    <article className="border-t border-white/8 py-6">
      <h3 className="text-lg font-medium text-textPrimary">{question}</h3>
      <p className="mt-3 text-sm leading-7 text-textSecondary sm:text-base sm:leading-8">{answer}</p>
    </article>
  );
}

export default function App() {
  const [isNewsletterOpen, setIsNewsletterOpen] = useState(false);
  const [analyticsConsent, setAnalyticsConsent] = useState(() => getAnalyticsConsent());
  const [isCookieBannerVisible, setIsCookieBannerVisible] = useState(() => getAnalyticsConsent() === null);
  const [isMobileNewsletterFallback, setIsMobileNewsletterFallback] = useState(false);
  const [isCompactViewport, setIsCompactViewport] = useState(false);
  const [activeShowcaseSlide, setActiveShowcaseSlide] = useState(0);
  const [activeShock, setActiveShock] = useState(0);
  const [githubStars, setGithubStars] = useState(null);

  useEffect(() => {
    if (typeof window === "undefined" || !window.location.hash) {
      return undefined;
    }

    const targetId = window.location.hash.slice(1);
    const scrollTimer = window.setTimeout(() => {
      document.getElementById(targetId)?.scrollIntoView({ block: "start" });
    }, 0);

    return () => window.clearTimeout(scrollTimer);
  }, []);

  useEffect(() => {
    let isMounted = true;

    fetch(GITHUB_REPO_API_URL, {
      headers: {
        Accept: "application/vnd.github+json",
      },
    })
      .then((response) => (response.ok ? response.json() : null))
      .then((data) => {
        if (isMounted && typeof data?.stargazers_count === "number") {
          setGithubStars(data.stargazers_count);
        }
      })
      .catch(() => {});

    return () => {
      isMounted = false;
    };
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

  useEffect(() => {
    if (typeof window === "undefined") {
      return undefined;
    }

    const mediaQuery = window.matchMedia("(max-width: 900px)");
    const updateCompactViewport = (event) => {
      setIsCompactViewport(event.matches);
    };

    setIsCompactViewport(mediaQuery.matches);

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", updateCompactViewport);

      return () => mediaQuery.removeEventListener("change", updateCompactViewport);
    }

    mediaQuery.addListener(updateCompactViewport);

    return () => mediaQuery.removeListener(updateCompactViewport);
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
    <div className="min-h-screen overflow-x-hidden bg-ink text-textPrimary">
      <div className="fixed inset-0 -z-10 bg-vignette" />
      <div className="fixed inset-0 -z-10 bg-grid bg-[size:88px_88px] opacity-[0.08]" />
      <div className="fixed inset-0 -z-10 bg-[linear-gradient(180deg,rgba(7,12,19,0.18),rgba(5,8,17,0.82))]" />

      <header className="sticky top-0 z-50 border-b border-white/10 bg-[rgba(5,8,17,0.78)] shadow-[0_12px_36px_rgba(0,0,0,0.18)] backdrop-blur-xl">
        <div className="mx-auto flex w-full min-w-0 max-w-[100vw] items-center justify-between px-5 py-4 sm:px-6 lg:max-w-[1280px] lg:px-8">
          <a
            href="#top"
            aria-label="Kolmo Labs home"
            className="flex items-center gap-3 text-sm font-semibold tracking-[0.34em] text-textPrimary"
          >
            {/* Replace with production logo asset if needed */}
            <img src={kolmoMark} alt="" className="h-6 w-6 opacity-90" />
            <span>KOLMO</span>
          </a>

          <nav className="hidden items-center gap-6 text-[0.74rem] uppercase tracking-[0.2em] text-[rgba(214,226,240,0.82)] lg:flex">
            <a href={TERMINAL_URL} target="_blank" rel="noreferrer" className="transition hover:text-white">
              TERMINAL
            </a>
            <div className="group relative">
              <button
                type="button"
                className="inline-flex items-center gap-2 transition hover:text-white focus:outline-none focus:text-white"
                aria-label="Open audience menu"
              >
                <span>AUDIENCE</span>
              </button>
              <div className="invisible pointer-events-none absolute left-1/2 top-full z-50 mt-4 w-64 -translate-x-1/2 rounded-[1.1rem] border border-white/10 bg-[rgba(5,10,15,0.98)] p-2 opacity-0 shadow-[0_24px_80px_rgba(0,0,0,0.32)] backdrop-blur-xl transition duration-200 group-hover:visible group-hover:pointer-events-auto group-hover:opacity-100 group-focus-within:visible group-focus-within:pointer-events-auto group-focus-within:opacity-100">
                {audienceTags.map((tag) => (
                  <a
                    key={tag}
                    href="#use-cases"
                    className="block rounded-[0.9rem] px-3 py-2.5 text-[0.68rem] uppercase tracking-[0.18em] text-[rgba(214,226,240,0.76)] transition hover:bg-white/[0.06] hover:text-white"
                  >
                    {tag}
                  </a>
                ))}
              </div>
            </div>
            <a href="/stats-api/" className="transition hover:text-white">
              API
            </a>
          </nav>

          <div className="hidden items-center gap-3 sm:flex">
            <GitHubStarsLink stars={githubStars} />
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex rounded-full border border-white/12 bg-white/[0.04] px-3 py-2 text-[0.68rem] uppercase tracking-[0.16em] text-[rgba(214,226,240,0.9)] transition hover:border-[#4da3ff]/40 hover:bg-white/[0.08] hover:text-white sm:px-4 sm:text-[0.72rem] sm:tracking-[0.18em]"
            >
              Contact Us
            </a>
          </div>
        </div>
      </header>

      <main id="top">
        <section className="hero-stage relative overflow-hidden border-b border-white/8">
          <div className="mx-auto w-full max-w-[1440px] px-5 pb-16 pt-10 sm:px-6 lg:px-8 lg:pb-20 lg:pt-10">
            <HeroAtmosphere />

            <div className="relative mx-auto grid w-full max-w-[1280px] gap-10 lg:min-h-[42rem] lg:grid-cols-[minmax(0,0.82fr)_minmax(520px,1.18fr)] lg:items-center lg:gap-16 lg:pt-8">
              <div className="w-full min-w-0 max-w-[38rem]">
                <h1 className="max-w-[10ch] font-serif-display text-[3.75rem] leading-[0.9] text-textPrimary sm:text-7xl lg:text-[6.1rem]">
                  AI for Energy Risk.
                </h1>
                <p className="mt-6 max-w-[31rem] text-base leading-8 text-textSecondary sm:text-lg">
                  Open-source market graph and terminal for tracing shocks across energy markets.
                </p>

                <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                  <PrimaryButton href={TERMINAL_URL}>Open Terminal</PrimaryButton>
                  <a
                    href={CALENDLY_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex text-sm uppercase tracking-[0.16em] text-textSecondary transition hover:text-white"
                  >
                    Contact
                  </a>
                </div>
              </div>

              <MinimalTerminalVisual />
            </div>
          </div>
        </section>

        <section id="knowledge-web" className="mx-auto w-full max-w-[1280px] px-5 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.65fr)_minmax(0,1.35fr)] lg:items-center lg:gap-16">
            <div className="space-y-8">
              <SectionHeading
                title="Open Market Graph"
                body="Kolmo maps how energy variables move together."
              />

              <div className="grid gap-4">
                {overviewCards.map((card) => (
                  <OverviewCard key={card.title} title={card.title} />
                ))}
              </div>

              <OpenSourceCallout stars={githubStars} />
            </div>

            <KnowledgeGraphVisual />
          </div>
        </section>

        <section id="contribute" className="mx-auto w-full max-w-[1280px] px-5 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.74fr)_minmax(0,1.26fr)] lg:items-start lg:gap-16">
            <div className="max-w-xl">
              <SectionHeading
                title="Contribute"
              />

              <div className="mt-8">
                <PrimaryButton href={GITHUB_REPO_URL}>Contribute on GitHub</PrimaryButton>
              </div>
            </div>

            <div className="grid gap-0 border-b border-white/10">
              {contributionSteps.map((item, index) => (
                <ContributionStep key={item.title} title={item.title} index={index} />
              ))}
            </div>
          </div>
        </section>

        <section id="use-cases" className="mx-auto w-full max-w-[1280px] px-5 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="border-y border-white/10 py-8">
            <div className="flex justify-center">
              <AudienceStrip />
            </div>
          </div>
        </section>

        <section id="how-it-works" className="mx-auto w-full max-w-[900px] px-5 py-20 text-center sm:px-6 lg:px-8 lg:py-28">
          <SectionHeading title="How it works" align="center" />

          <div className="mx-auto mt-12 max-w-[44rem] divide-y divide-white/10 border-y border-white/10">
            {workflowSteps.map((item) => (
              <WorkflowCard key={item.title} title={item.title} />
            ))}
          </div>

          <div className="mt-10 flex justify-center">
            <PrimaryButton href={TERMINAL_URL}>Open Terminal</PrimaryButton>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 bg-[rgba(5,9,14,0.86)]">
        <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-5 px-5 py-8 text-sm text-[rgba(214,226,240,0.72)] sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <div className="flex items-center gap-3 tracking-[0.28em] text-textPrimary">
            <img src={kolmoMark} alt="" className="h-5 w-5 opacity-90" />
            <span>KOLMO</span>
          </div>

          <div className="flex flex-wrap items-center gap-5 text-[0.72rem] uppercase tracking-[0.18em]">
            <a href={TERMINAL_URL} target="_blank" rel="noreferrer" className="transition hover:text-white">
              TERMINAL
            </a>
            <a href={GITHUB_REPO_URL} target="_blank" rel="noreferrer" className="transition hover:text-white">
              GitHub
            </a>
            <a href="/stats-api/" className="transition hover:text-white">
              API
            </a>
            <a href={CALENDLY_URL} target="_blank" rel="noreferrer" className="transition hover:text-white">
              Contact
            </a>
            <button type="button" onClick={openCookieSettings} className="transition hover:text-white">
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

            <div className="mx-auto max-w-2xl px-4 text-center">
              <h3 className="font-serif-display text-3xl leading-[0.98] text-textPrimary sm:text-[2.5rem]">
                Subscribe to the Kolmo newsletter.
              </h3>
              <p className="mt-4 text-base leading-8 text-textSecondary">
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

            <div className="mt-4 flex flex-col items-center gap-3 text-center">
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
