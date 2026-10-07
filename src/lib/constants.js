export const NEWSLETTER_DISMISSED_KEY = "kolmo-newsletter-dismissed";
export const NEWSLETTER_EMBED_URL = "https://embeds.beehiiv.com/4c0fb0be-6b2c-4eb2-a78c-0b9b7eaf734b";
export const CALENDLY_URL = "https://calendly.com/kolmolabs/30min";
export const STATS_API_URL = "/stats-api/index.html";
export const HOME_PAGE_URL = "https://kolmolabs.com/";
export const BLOG_PAGE_URL = "https://kolmolabs.com/blog";

export const pageMeta = {
  home: {
    title: "Kolmo Labs — Simulating the Energy World",
    description:
      "Simulation environments built for energy desks. Helping traders and analysts test decisions, reduce risk and uncover opportunities—from split-second execution to long-term portfolio strategy.",
    url: HOME_PAGE_URL,
  },
  blog: {
    title: "Kolmo Blog | Posts from the Team",
    description:
      "Future posts, ideas and updates from the Kolmo team.",
    url: BLOG_PAGE_URL,
  },
};

export const audienceGroups = ["Physical traders", "Risk teams", "Portfolio managers", "Commodity firms", "Banks", "Hedge funds"];

export const targetMarkets = ["Crude", "Products", "LNG"];

export const navItems = [
  { label: "Product", href: "#product" },
  { label: "Agents", href: "#agents" },
  { label: "SIM", href: "#world-model" },
  { label: "Audience", href: "#audience", dropdown: audienceGroups },
  { label: "Target", dropdown: targetMarkets },
];
