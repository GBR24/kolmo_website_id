export const NEWSLETTER_DISMISSED_KEY = "kolmo-newsletter-dismissed";
export const NEWSLETTER_EMBED_URL = "https://embeds.beehiiv.com/4c0fb0be-6b2c-4eb2-a78c-0b9b7eaf734b";
export const CALENDLY_URL = "https://calendly.com/kolmolabs/30min";
export const STATS_API_URL = "/stats-api/index.html";
export const HOME_PAGE_URL = "https://kolmolabs.com/";
export const BLOG_PAGE_URL = "https://kolmolabs.com/blog";

export const pageMeta = {
  home: {
    title: "Kolmo — The AI Operating System for Energy Markets",
    description:
      "Kolmo connects market intelligence, portfolio risk, scenario simulation, hedging analysis, and specialist AI agents in one workspace for energy-market teams.",
    url: HOME_PAGE_URL,
  },
  blog: {
    title: "Kolmo Research | Energy Market Notes",
    description:
      "Kolmo Research publishes energy market notes from research teams covering oil, gas, freight, products, market structure, and graph methods.",
    url: BLOG_PAGE_URL,
  },
};

export const audienceGroups = ["Physical traders", "Risk teams", "Portfolio managers", "Commodity firms", "Banks", "Hedge funds"];

export const targetMarkets = ["Crude", "Products", "LNG"];

export const navItems = [
  { label: "Product", href: "#product" },
  { label: "Agents", href: "#agents" },
  { label: "SIM", href: "#world-model" },
  { label: "Audience", href: "#audience", dropdownLabel: "Built for", dropdown: audienceGroups },
  { label: "Target", dropdownLabel: "Markets", dropdown: targetMarkets },
];
