import { Fragment, useEffect, useRef, useState } from "react";

import kolmoMark from "../assets/kolmo-mark.svg";
import { getAnalyticsConsent, initGoogleAnalytics, persistAnalyticsConsent } from "./analytics";

const NEWSLETTER_DISMISSED_KEY = "kolmo-newsletter-dismissed";
const NEWSLETTER_EMBED_URL = "https://embeds.beehiiv.com/4c0fb0be-6b2c-4eb2-a78c-0b9b7eaf734b";
const CALENDLY_URL = "https://calendly.com/kolmolabs/30min";
const TERMINAL_URL = "https://kolmo.netlify.app/terminal";
const GITHUB_REPO_URL = "https://github.com/GBR24/kolmo_stats";
const GITHUB_REPO_API_URL = "https://api.github.com/repos/GBR24/kolmo_stats";
const STATS_API_URL = "/stats-api/index.html";
const HOME_PAGE_URL = "https://kolmolabs.com/";
const BLOG_PAGE_URL = "https://kolmolabs.com/blog";

const pageMeta = {
  home: {
    title: "Kolmo Labs | AI for Energy Risk",
    description: "Kolmo Labs builds AI for energy risk: an open-source knowledge web and live terminal for tracing market shocks.",
    url: HOME_PAGE_URL,
  },
  blog: {
    title: "Kolmo Research | Energy Market Notes",
    description:
      "Kolmo Research publishes energy market notes from research teams covering oil, gas, freight, products, market structure, and graph methods.",
    url: BLOG_PAGE_URL,
  },
};

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
  { label: "Strait disruption", nodes: ["Middle East Risk", "Shipping Lanes", "Freight Rates", "Brent"] },
  { label: "Gasoline squeeze", nodes: ["Freight Rates", "Gasoline", "Crack Spreads", "Refinery Margins"] },
  { label: "Hedge rebalance", nodes: ["Brent", "WTI Spread", "Portfolio Exposure", "Hedge Ratio"] },
  { label: "Past analogue", nodes: ["Middle East Risk", "Past Events", "Correlation Matrix", "Portfolio Exposure"] },
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
  { name: "Brent", price: "$93.98", change: "+2.4%", tone: "text-[#d8e3ea]" },
  { name: "WTI", price: "$90.58", change: "+1.8%", tone: "text-[#d8e3ea]" },
  { name: "RBOB", price: "$2.83", change: "+3.1%", tone: "text-[#d8e3ea]" },
  { name: "Freight", price: "WS 158", change: "+8.6%", tone: "text-[#d8e3ea]" },
];

const terminalAlerts = ["AIS lanes thinning through key corridor", "War-risk premium repricing tanker flows", "Gasoline cracks breaking correlation"];

const commandLog = ["> trace shipping shock", "> simulate hedge actions", "> update correlation matrix"];

const missionDispatchLog = [
  "06:13:07 - MIDDLE EAST RISK HEADLINE",
  "06:13:11 - SHIPPING LANES DISRUPTED",
  "06:13:24 - FREIGHT AND INSURANCE REPRICING",
  "06:13:29 - GASOLINE CRACKS ACTIVE",
  "06:13:32 -> ROUTING TO KOLMO GRAPH...",
  "06:13:33 OK AGENTS RUNNING SIMULATIONS",
  "06:13:34 ▇ HEDGE / REBALANCE BRIEF READY",
];

const reasoningLog = [
  "Reading conflict headlines, AIS flow notes, freight, insurance, prices, and position context",
  "Linking shipping lanes to Brent structure, gasoline cracks, refinery margins, and storage",
  "Comparing the current path with Suez, Strait, OPEC, and refinery-outage analogues",
  "Preparing hedge, rebalance, and correlation updates with traceable graph evidence",
];

const riskPath = ["Middle East flashpoint", "Shipping lanes", "Freight and insurance", "Brent / RBOB spreads", "Portfolio exposure"];

const missionMetrics = [
  { value: "00:47", label: "Time to first trace" },
  { value: "18", label: "Drivers connected" },
  { value: "6", label: "Actions tested" },
  { value: "4", label: "Past analogues" },
];

const systemPrinciples = [
  {
    lead: "You don't chase the shock by hand.",
    body: "Kolmo agents watch prices, reports, freight, flows, policy, and portfolio context in one command layer.",
  },
  {
    lead: "You don't lose the market path.",
    body: "Kolmo keeps causality visible through graph relationships that can be inspected, challenged, and improved.",
  },
  {
    lead: "You don't brief from scratch.",
    body: "Kolmo turns the trace into simulated actions, correlation changes, and a concise desk-ready risk read.",
  },
];

const networkNodes = [
  { label: "Middle East Risk", x: 145, y: 170, dx: -58, dy: -50, mobileDx: -46, mobileDy: 14, size: "large" },
  { label: "Shipping Lanes", x: 350, y: 185, dx: -44, dy: -54, mobileDx: -48, mobileDy: 14 },
  { label: "Freight Rates", x: 565, y: 235, dx: -30, dy: -52, mobileDx: -42, mobileDy: 14 },
  { label: "Brent", x: 245, y: 320, dx: -12, dy: -50, size: "large" },
  { label: "WTI Spread", x: 418, y: 360, dx: -28, dy: -50 },
  { label: "Gasoline", x: 690, y: 340, dx: -18, dy: -52 },
  { label: "Crack Spreads", x: 760, y: 465, dx: -24, dy: -52 },
  { label: "Refinery Margins", x: 570, y: 500, dx: -44, dy: -54 },
  { label: "Storage Levels", x: 335, y: 525, dx: -34, dy: -52 },
  { label: "Sanctions Risk", x: 135, y: 555, dx: -34, dy: -52 },
  { label: "Past Events", x: 480, y: 640, dx: -28, dy: -52 },
  { label: "Correlation Matrix", x: 680, y: 655, dx: -64, dy: -52 },
  { label: "Portfolio Exposure", x: 345, y: 730, dx: -62, dy: -52 },
  { label: "Hedge Ratio", x: 590, y: 765, dx: -28, dy: -52 },
];

const networkLinks = [
  [145, 170, 350, 185],
  [145, 170, 245, 320],
  [145, 170, 135, 555],
  [350, 185, 565, 235],
  [565, 235, 245, 320],
  [565, 235, 690, 340],
  [565, 235, 570, 500],
  [245, 320, 418, 360],
  [245, 320, 335, 525],
  [418, 360, 335, 525],
  [690, 340, 760, 465],
  [760, 465, 570, 500],
  [570, 500, 245, 320],
  [335, 525, 480, 640],
  [135, 555, 480, 640],
  [480, 640, 680, 655],
  [680, 655, 345, 730],
  [345, 730, 590, 765],
  [418, 360, 345, 730],
  [690, 340, 345, 730],
  [565, 235, 680, 655],
];

const compactHiddenNodeLabels = new Set([
  "Shipping Lanes",
  "WTI Spread",
  "Sanctions Risk",
  "Past Events",
  "Correlation Matrix",
  "Portfolio Exposure",
  "Hedge Ratio",
]);

const simulationActions = [
  {
    title: "Hedge",
    metric: "+14% cover",
    body: "Increase Brent tail protection against a route-risk premium while the freight signal stays elevated.",
  },
  {
    title: "Gasoline",
    metric: "Rebalance",
    body: "Trim RBOB beta until gasoline cracks confirm whether the move is supply-led or demand-led.",
  },
  {
    title: "Correlation",
    metric: "Matrix v2",
    body: "Refresh Brent, RBOB, freight, and WTI relationships using the live shock window.",
  },
  {
    title: "Analogue",
    metric: "4 matches",
    body: "Compare the path with Suez, Strait, OPEC, and refinery-outage regimes before sizing the move.",
  },
];

const correlationAssets = ["Brent", "RBOB", "Freight", "WTI"];

const correlationMatrix = [
  [1, 0.72, 0.64, 0.88],
  [0.72, 1, 0.58, 0.69],
  [0.64, 0.58, 1, 0.43],
  [0.88, 0.69, 0.43, 1],
];

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

function ScrollReveal({ children, className = "", delay = 0, as: Component = "div" }) {
  return (
    <Component className={`scroll-reveal ${className}`} style={{ "--reveal-delay": `${delay}ms` }}>
      {children}
    </Component>
  );
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
        <h2 className="max-w-4xl text-balance font-serif-display text-3xl leading-[1.02] text-textPrimary sm:text-4xl lg:text-[3.2rem]">
          {title}
        </h2>
      ) : null}
      {body ? <p className="text-pretty text-base leading-8 text-textSecondary sm:text-[1.02rem]">{body}</p> : null}
    </div>
  );
}

function setMetaContent(selector, content) {
  const element = document.querySelector(selector);

  if (element) {
    element.setAttribute("content", content);
  }
}

function updateDocumentMeta(meta) {
  document.title = meta.title;
  setMetaContent('meta[name="description"]', meta.description);
  setMetaContent('meta[property="og:url"]', meta.url);
  setMetaContent('meta[property="og:title"]', meta.title);
  setMetaContent('meta[property="og:description"]', meta.description);
  setMetaContent('meta[name="twitter:title"]', meta.title);
  setMetaContent('meta[name="twitter:description"]', meta.description);
  document.querySelector('link[rel="canonical"]')?.setAttribute("href", meta.url);
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

function MissionDispatchPanel({ compact = false }) {
  const visibleLog = compact ? missionDispatchLog.slice(2) : missionDispatchLog;

  return (
    <div className="relative overflow-hidden rounded-lg border border-white/10 bg-[rgba(4,7,10,0.82)] shadow-panel">
      <div className="absolute inset-0 bg-[linear-gradient(118deg,transparent_8%,rgba(77,163,255,0.09)_44%,transparent_70%)]" />
      <div className="relative border-b border-white/10 px-4 py-3">
        <div className="flex flex-wrap items-center justify-between gap-3 text-[0.64rem] uppercase tracking-[0.2em] text-textSecondary">
          <span>Energy dispatch - scenario desk</span>
          <span className="text-[#4da3ff]">06:13 UTC</span>
        </div>
      </div>
      <div className={`relative font-mono text-[0.74rem] leading-6 text-textSecondary ${compact ? "p-4" : "p-5 sm:p-6"}`}>
        {visibleLog.map((line, index) => (
          <div
            key={line}
            className={`mission-log-line border-b border-white/6 py-2 ${index === visibleLog.length - 1 ? "border-b-0 text-textPrimary" : ""}`}
          >
            {line}
          </div>
        ))}
      </div>
    </div>
  );
}

function CommandBriefPanel() {
  return (
    <div className="depth-panel relative overflow-hidden rounded-lg border border-white/10 bg-[rgba(4,7,10,0.84)] shadow-panel">
      <div className="depth-panel__glow" />
      <div className="relative grid gap-px bg-white/10 lg:grid-cols-[0.78fr_1.22fr]">
        <div className="bg-[rgba(4,7,10,0.9)] p-5 sm:p-6">
          <div className="text-[0.64rem] uppercase tracking-[0.22em] text-textSecondary">Desk command</div>
          <div className="mt-8 break-words font-mono text-base leading-8 text-textPrimary sm:text-xl">
            <span className="text-[#4da3ff]">$</span> trace the Middle East shipping shock across Brent, gasoline, freight, hedges, and our book
          </div>
        </div>

        <div className="bg-[rgba(4,7,10,0.9)] p-5 sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-3 text-[0.64rem] uppercase tracking-[0.22em] text-textSecondary">
            <span>Kolmo reasoning engine</span>
            <span className="text-[#d29922]">Trace active</span>
          </div>
          <div className="mt-6 grid gap-3">
            {reasoningLog.map((line, index) => (
              <div key={line} className="grid grid-cols-[2.5rem_1fr] gap-3 border-t border-white/8 pt-3 text-sm leading-7">
                <span className="text-[0.62rem] uppercase tracking-[0.18em] text-textSecondary">0{index + 1}</span>
                <span className="text-textPrimary">{line}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function RiskPathPanel() {
  return (
    <div className="rounded-lg border border-white/10 bg-[rgba(4,7,10,0.82)] p-5 shadow-panel sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3 text-[0.64rem] uppercase tracking-[0.22em] text-textSecondary">
        <span>Risk path confirmed</span>
        <span className="text-[#4da3ff]">Live read</span>
      </div>

      <div className="mt-7 grid gap-3">
        {riskPath.map((item, index) => (
          <div key={item} className="grid grid-cols-[2.25rem_1fr] items-center gap-3 border-t border-white/8 pt-3">
            <span className="text-[0.62rem] uppercase tracking-[0.18em] text-[#d29922]">0{index + 1}</span>
            <span className="text-sm text-textPrimary sm:text-base">{item}</span>
          </div>
        ))}
      </div>

    </div>
  );
}

function MissionMetric({ value, label }) {
  return (
    <div className="border-t border-white/10 py-5">
      <div className="font-mono text-3xl text-textPrimary sm:text-4xl">{value}</div>
      <div className="mt-2 text-[0.68rem] uppercase tracking-[0.18em] text-textSecondary">{label}</div>
    </div>
  );
}

function SystemPrinciples() {
  return (
    <div className="divide-y divide-white/10">
      {systemPrinciples.map((principle) => (
        <article key={principle.lead} className="grid gap-3 py-6 sm:grid-cols-[2.5rem_1fr]">
          <div className="text-xl text-[#4da3ff]">-&gt;</div>
          <div>
            <h3 className="text-xl font-medium text-textPrimary">{principle.lead}</h3>
            <p className="mt-3 text-sm leading-7 text-textSecondary sm:text-base sm:leading-8">{principle.body}</p>
          </div>
        </article>
      ))}
    </div>
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
            Route risk is lifting freight, changing Brent / RBOB correlation, and moving the hedge ratio.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {["Shipping", "Gasoline", "Hedge"].map((item, index) => (
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

function HeroSignalField() {
  return (
    <div className="pointer-events-none relative hidden min-h-[28rem] lg:block" aria-hidden="true">
      <div className="absolute left-[12%] top-[18%] h-px w-[68%] bg-[linear-gradient(90deg,transparent,rgba(214,226,240,0.22),transparent)]" />
      <div className="absolute right-[10%] top-[36%] h-px w-[46%] bg-[linear-gradient(90deg,transparent,rgba(77,163,255,0.18),transparent)]" />
      <div className="absolute bottom-[28%] left-[20%] h-px w-[54%] bg-[linear-gradient(90deg,transparent,rgba(210,153,34,0.16),transparent)]" />

      <div className="absolute left-[24%] top-[17%] h-2 w-2 rounded-full bg-[#d6e2f0] shadow-[0_0_24px_rgba(214,226,240,0.42)]" />
      <div className="absolute right-[22%] top-[35%] h-1.5 w-1.5 rounded-full bg-[#4da3ff] shadow-[0_0_24px_rgba(77,163,255,0.48)]" />
      <div className="absolute bottom-[27%] left-[55%] h-1.5 w-1.5 rounded-full bg-[#d29922] shadow-[0_0_24px_rgba(210,153,34,0.4)]" />

      <div className="absolute right-[7%] top-[12%] max-w-[16rem] border-l border-white/10 pl-4 text-[0.64rem] uppercase leading-6 tracking-[0.2em] text-textSecondary">
        <span className="block text-textPrimary">06:13 UTC</span>
        <span>Shipping risk begins to move before the explanation arrives.</span>
      </div>
      <div className="absolute bottom-[16%] left-[8%] max-w-[18rem] border-l border-[#4da3ff]/30 pl-4 text-[0.64rem] uppercase leading-6 tracking-[0.2em] text-textSecondary">
        <span className="block text-[#4da3ff]">Kolmo trace armed</span>
        <span>Waiting for the first causal path to light up.</span>
      </div>
    </div>
  );
}

function HeroBrandMark() {
  return (
    <div className="hero-brand-lockup">
      <div className="hero-brand-core" aria-hidden="true">
        <svg className="hero-brand-core__field" viewBox="0 0 512 512" fill="none">
          <defs>
            <linearGradient id="kolmoHeroBlue" x1="64" y1="68" x2="448" y2="444" gradientUnits="userSpaceOnUse">
              <stop stopColor="#EDF3F8" stopOpacity="0.84" />
              <stop offset="0.42" stopColor="#4DA3FF" stopOpacity="0.72" />
              <stop offset="1" stopColor="#D29922" stopOpacity="0.5" />
            </linearGradient>
            <linearGradient id="kolmoHeroQuiet" x1="102" y1="78" x2="410" y2="430" gradientUnits="userSpaceOnUse">
              <stop stopColor="#EDF3F8" stopOpacity="0.5" />
              <stop offset="1" stopColor="#4DA3FF" stopOpacity="0.12" />
            </linearGradient>
          </defs>

          <path className="hero-brand-core__trace hero-brand-core__trace--outer" d="M256 28L454 142V370L256 484L58 370V142L256 28Z" stroke="url(#kolmoHeroBlue)" />
          <path className="hero-brand-core__trace hero-brand-core__trace--middle" d="M256 74L414 165V347L256 438L98 347V165L256 74Z" stroke="url(#kolmoHeroQuiet)" />
          <path className="hero-brand-core__trace hero-brand-core__trace--inner" d="M256 132L364 194V318L256 380L148 318V194L256 132Z" stroke="#EDF3F8" />
          <path className="hero-brand-core__link hero-brand-core__link--one" d="M128 302C174 266 215 248 256 248C304 248 342 221 384 168" />
          <path className="hero-brand-core__link hero-brand-core__link--two" d="M152 172C194 204 226 232 248 256C278 289 315 312 366 326" />
          <circle className="hero-brand-core__node hero-brand-core__node--one" cx="128" cy="302" r="4" />
          <circle className="hero-brand-core__node hero-brand-core__node--two" cx="384" cy="168" r="4" />
          <circle className="hero-brand-core__node hero-brand-core__node--three" cx="366" cy="326" r="3.5" />
        </svg>

        <div className="hero-brand-core__plate">
          <img src={kolmoMark} alt="" className="hero-brand-core__mark" />
        </div>
      </div>

      <h1 className="hero-brand-lockup__name">Kolmo</h1>
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
      className={`network-shell relative w-full min-w-0 max-w-[calc(100vw-2.5rem)] overflow-hidden rounded-lg border border-white/8 bg-[linear-gradient(180deg,rgba(5,6,6,0.92),rgba(4,5,5,0.78))] shadow-panel lg:max-w-none ${
        isCompact ? "min-h-[31rem]" : "min-h-[41rem]"
      }`}
    >
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(116deg,transparent_12%,rgba(85,134,164,0.11)_46%,transparent_72%)]" />
      <div className="pointer-events-none absolute inset-0 bg-grid bg-[size:76px_76px] opacity-[0.16]" />
      <div
        className={`pointer-events-none absolute z-20 flex items-center justify-between rounded-full border border-white/8 bg-[rgba(8,15,22,0.68)] uppercase text-textSecondary/85 backdrop-blur ${
          isCompact
            ? "inset-x-4 top-4 px-3 py-2 text-[0.55rem] tracking-[0.18em]"
            : "inset-x-6 top-5 px-4 py-2 text-[0.62rem] tracking-[0.24em]"
        }`}
      >
        <span>Open Energy Graph</span>
        <span>Shock Paths</span>
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

      <div className="absolute inset-x-[18%] top-[36%] h-px bg-[linear-gradient(90deg,transparent,rgba(102,135,157,0.22),transparent)]" />
      <div
        className={`absolute flex items-center gap-3 rounded-full border border-white/8 bg-[rgba(8,15,22,0.72)] uppercase text-textSecondary backdrop-blur ${
          isCompact ? "bottom-4 left-4 px-3 py-2 text-[0.56rem] tracking-[0.12em]" : "bottom-6 left-6 px-4 py-2 text-[0.68rem] tracking-[0.18em]"
        }`}
      >
        <img src={kolmoMark} alt="" className="h-4 w-4 opacity-80" />
        <span>Graph theory for market risk</span>
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

function SimulationPanel() {
  return (
    <div className="relative overflow-hidden rounded-lg border border-white/10 bg-[rgba(4,7,10,0.84)] shadow-panel">
      <div className="absolute inset-0 bg-[linear-gradient(118deg,transparent_8%,rgba(77,163,255,0.08)_44%,transparent_76%)]" />
      <div className="relative border-b border-white/10 px-4 py-3">
        <div className="flex flex-wrap items-center justify-between gap-3 text-[0.64rem] uppercase tracking-[0.2em] text-textSecondary">
          <span>Scenario engine</span>
          <span className="text-[#d29922]">6 branches tested</span>
        </div>
      </div>

      <div className="relative grid gap-px bg-white/10 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="bg-[rgba(4,7,10,0.88)] p-5 sm:p-6">
          <div className="text-[0.64rem] uppercase tracking-[0.22em] text-textSecondary">Agent recommendations</div>
          <div className="mt-6 divide-y divide-white/8 border-y border-white/8">
            {simulationActions.map((action, index) => (
              <article key={action.title} className="grid gap-4 py-5 sm:grid-cols-[5.5rem_1fr_auto] sm:items-start">
                <div>
                  <div className="text-[0.62rem] uppercase tracking-[0.18em] text-[#d29922]">0{index + 1}</div>
                  <h3 className="mt-2 text-base font-medium text-textPrimary">{action.title}</h3>
                </div>
                <p className="text-sm leading-7 text-textSecondary">{action.body}</p>
                <div className="w-fit rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-[0.62rem] uppercase tracking-[0.16em] text-textPrimary">
                  {action.metric}
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="bg-[rgba(4,7,10,0.88)] p-5 sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-3 text-[0.64rem] uppercase tracking-[0.22em] text-textSecondary">
            <span>Correlation matrix</span>
            <span className="text-[#4da3ff]">Live shock window</span>
          </div>

          <div className="mt-6 grid grid-cols-[4.5rem_repeat(4,minmax(0,1fr))] gap-1 text-center text-[0.62rem] uppercase tracking-[0.12em] text-textSecondary">
            <span />
            {correlationAssets.map((asset) => (
              <span key={asset} className="truncate py-2">
                {asset}
              </span>
            ))}

            {correlationMatrix.map((row, rowIndex) => (
              <Fragment key={correlationAssets[rowIndex]}>
                <span className="flex items-center justify-start truncate py-2 text-left text-textPrimary">{correlationAssets[rowIndex]}</span>
                {row.map((value, columnIndex) => {
                  const intensity = Math.max(0.16, Math.min(0.58, value * 0.58));
                  const isDiagonal = rowIndex === columnIndex;

                  return (
                    <span
                      key={`${correlationAssets[rowIndex]}-${correlationAssets[columnIndex]}`}
                      className="flex min-h-10 items-center justify-center border border-white/8 text-[0.72rem] text-textPrimary"
                      style={{
                        backgroundColor: isDiagonal
                          ? "rgba(77, 163, 255, 0.22)"
                          : `rgba(210, 153, 34, ${intensity.toFixed(2)})`,
                      }}
                    >
                      {value.toFixed(2)}
                    </span>
                  );
                })}
              </Fragment>
            ))}
          </div>

        </div>
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
            <p className="mt-2 max-w-[28rem] text-sm leading-7 text-textSecondary">
              Inspect how energy variables connect, contribute relationships, and challenge the market map.
            </p>
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
    <div className="flex flex-wrap justify-center gap-2.5">
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

function BlogPage({ onNewsletter }) {
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
                onClick={onNewsletter}
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
              onClick={onNewsletter}
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
              onClick={onNewsletter}
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

export default function App() {
  const [isNewsletterOpen, setIsNewsletterOpen] = useState(false);
  const [analyticsConsent, setAnalyticsConsent] = useState(() => getAnalyticsConsent());
  const [isCookieBannerVisible, setIsCookieBannerVisible] = useState(() => getAnalyticsConsent() === null);
  const [isMobileNewsletterFallback, setIsMobileNewsletterFallback] = useState(false);
  const [isCompactViewport, setIsCompactViewport] = useState(false);
  const [activeShowcaseSlide, setActiveShowcaseSlide] = useState(0);
  const [activeShock, setActiveShock] = useState(0);
  const [githubStars, setGithubStars] = useState(null);
  const currentPath = typeof window === "undefined" ? "/" : window.location.pathname.replace(/\/+$/, "") || "/";
  const isBlogPage = currentPath === "/blog";

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
    if (typeof document === "undefined") {
      return;
    }

    updateDocumentMeta(isBlogPage ? pageMeta.blog : pageMeta.home);
  }, [isBlogPage]);

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

  useEffect(() => {
    if (typeof document === "undefined" || typeof window === "undefined") {
      return undefined;
    }

    const revealNodes = Array.from(document.querySelectorAll(".scroll-reveal"));

    if (!revealNodes.length) {
      return undefined;
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion || typeof IntersectionObserver === "undefined") {
      revealNodes.forEach((node) => node.classList.add("is-visible"));
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: "0px 0px -12% 0px",
        threshold: 0.16,
      }
    );

    revealNodes.forEach((node) => observer.observe(node));

    return () => observer.disconnect();
  }, [isBlogPage]);

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
      <div className="fixed inset-0 -z-10 bg-[linear-gradient(180deg,rgba(6,6,6,0.18),rgba(3,3,3,0.86))]" />

      <header className="sticky top-0 z-50 border-b border-white/10 bg-[rgba(4,5,7,0.82)] shadow-[0_12px_36px_rgba(0,0,0,0.18)] backdrop-blur-xl">
        <div className="mx-auto flex w-full min-w-0 max-w-[100vw] items-center justify-between px-5 py-4 sm:px-6 lg:max-w-[1280px] lg:px-8">
          <a
            href={isBlogPage ? "/" : "#top"}
            aria-label="Kolmo Labs home"
            className="flex items-center gap-3 text-sm font-semibold tracking-[0.34em] text-textPrimary"
          >
            <img src={kolmoMark} alt="" className="h-6 w-6 opacity-90" />
            <span>KOLMO</span>
          </a>

          <nav className="hidden items-center gap-6 text-[0.74rem] uppercase tracking-[0.2em] text-[rgba(214,226,240,0.82)] lg:flex">
            <a href={TERMINAL_URL} target="_blank" rel="noreferrer" className="transition hover:text-white">
              Terminal
            </a>
            <a href={STATS_API_URL} className="transition hover:text-white">
              API
            </a>
            <a href="/blog" className={`transition hover:text-white ${isBlogPage ? "text-white" : ""}`}>
              Blog
            </a>
          </nav>

          <div className="hidden items-center gap-3 sm:flex">
            <GitHubStarsLink stars={githubStars} />
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex rounded-full border border-[#4da3ff]/70 bg-[#4da3ff] px-3 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-[#06111a] shadow-[0_0_28px_rgba(77,163,255,0.22)] transition hover:border-[#8fc6ff] hover:bg-[#78bdff] sm:px-4 sm:text-[0.72rem] sm:tracking-[0.18em]"
            >
              Request Access
            </a>
          </div>
        </div>
      </header>

      {isBlogPage ? (
        <BlogPage onNewsletter={openNewsletter} />
      ) : (
      <main id="top" className="story-page">
        <section className="hero-stage story-section story-section--hero relative overflow-hidden">
          <div className="story-section__inner story-section__inner--hero">
            <HeroAtmosphere />

            <div className="relative mx-auto grid w-full max-w-[1280px] gap-12 lg:min-h-[34rem] lg:grid-cols-[minmax(0,0.76fr)_minmax(440px,1.24fr)] lg:items-center lg:gap-20 lg:pt-4">
              <ScrollReveal className="w-full min-w-0 max-w-[40rem]">
                <HeroBrandMark />
              </ScrollReveal>

              <ScrollReveal delay={140}>
                <HeroSignalField />
              </ScrollReveal>
            </div>
          </div>
        </section>

        <section id="mission" className="story-section story-section--mission">
          <div className="story-section__inner grid gap-14 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:items-center lg:gap-[4.5rem]">
            <ScrollReveal>
              <SectionHeading
                eyebrow="01 / The Shock"
                title={
                  <>
                    A ROUTE
                    <br />
                    GOES HOT
                  </>
                }
                body="It starts as a line in the feed, then the waterway goes quiet. Tankers slow, insurance widens, and the first prices move before anyone has agreed on the story."
              />

              <p className="mt-7 max-w-xl text-base leading-8 text-textSecondary">
                The desk can feel the shock before it can name it. Kolmo begins tracing the route from headline to exposure.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={150}>
              <MissionDispatchPanel />
            </ScrollReveal>
          </div>
        </section>

        <section id="command" className="story-section story-section--command">
          <div className="story-section__inner grid gap-12">
            <ScrollReveal>
              <SectionHeading
                eyebrow="02 / Agents Catch It"
                title={
                  <>
                    THE SIGNAL
                    <br />
                    IS CAUGHT
                  </>
                }
                body="The first answer is not a dashboard. It is a question whispered into the system: what just broke, where does it travel, and what in the book is now carrying that risk?"
              />
            </ScrollReveal>

            <ScrollReveal delay={150}>
              <CommandBriefPanel />
            </ScrollReveal>
          </div>
        </section>

        <section id="graph" className="story-section story-section--graph">
          <div className="story-section__inner grid gap-14 lg:grid-cols-[minmax(0,0.74fr)_minmax(0,1.26fr)] lg:items-start lg:gap-[4.5rem]">
            <div className="grid gap-10">
              <ScrollReveal>
              <SectionHeading
                eyebrow="03 / Open Market Graph"
                title={
                  <>
                    THE GRAPH
                    <br />
                    LIGHTS UP
                  </>
                }
              />
              </ScrollReveal>
              <div className="hidden gap-8 lg:grid">
                <ScrollReveal delay={120}>
                  <RiskPathPanel />
                </ScrollReveal>
                <ScrollReveal delay={220}>
                  <OpenSourceCallout stars={githubStars} />
                </ScrollReveal>
              </div>
            </div>

            <div className="grid gap-6">
              <ScrollReveal delay={150}>
                <NetworkVisual activeShock={activeShock} isCompact={isCompactViewport} onShockChange={setActiveShock} />
              </ScrollReveal>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {missionMetrics.map((metric, index) => (
                  <ScrollReveal key={metric.label} delay={220 + index * 80}>
                    <MissionMetric value={metric.value} label={metric.label} />
                  </ScrollReveal>
                ))}
              </div>
            </div>

            <div className="grid gap-8 lg:hidden">
              <ScrollReveal delay={120}>
                <RiskPathPanel />
              </ScrollReveal>
              <ScrollReveal delay={220}>
                <OpenSourceCallout stars={githubStars} />
              </ScrollReveal>
            </div>
          </div>
        </section>

        <section id="simulation" className="story-section story-section--simulation">
          <div className="story-section__inner grid gap-12">
            <ScrollReveal>
              <SectionHeading
                eyebrow="04 / Agent Simulations"
                title={
                  <>
                    ACTIONS
                    <br />
                    ARE TESTED
                  </>
                }
              />
            </ScrollReveal>

            <ScrollReveal delay={150}>
              <SimulationPanel />
            </ScrollReveal>
          </div>
        </section>

        <section id="system" className="story-section story-section--system">
          <div className="story-section__inner grid gap-14 lg:grid-cols-[minmax(0,0.76fr)_minmax(0,1.24fr)] lg:items-start lg:gap-[4.5rem]">
            <div className="grid gap-8">
              <ScrollReveal>
                <SectionHeading
                  eyebrow="05 / The System"
                  title={
                    <>
                      YOU CHOOSE
                      <br />
                      THE MOVE
                    </>
                  }
                  body="Kolmo is built for moments when an energy-market shock moves faster than the memo. Agents monitor, graph relationships, simulate responses, and produce a traceable desk brief."
                />
              </ScrollReveal>
              <ScrollReveal delay={140}>
                <SystemPrinciples />
              </ScrollReveal>
            </div>

            <ScrollReveal delay={180}>
              <MinimalTerminalVisual compact />
            </ScrollReveal>
          </div>
        </section>

        <section className="story-section story-section--audience">
          <div className="story-section__inner story-section__inner--compact">
            <ScrollReveal>
              <AudienceStrip />
            </ScrollReveal>
          </div>
        </section>

      </main>
      )}

      <footer className="site-footer">
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
            <a href={STATS_API_URL} className="transition hover:text-white">
              API
            </a>
            <a href="/blog" className="transition hover:text-white">
              Blog
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
