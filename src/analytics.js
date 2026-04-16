const measurementId = (import.meta.env.VITE_GA_MEASUREMENT_ID || "G-ZKN1FN7SBH").trim();
const consentStorageKey = "kolmo-analytics-consent";

let hasInitializedAnalytics = false;

function injectGoogleAnalyticsScript() {
  if (document.getElementById("ga4-script")) {
    return;
  }

  const script = document.createElement("script");
  script.id = "ga4-script";
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script);
}

export function initGoogleAnalytics() {
  if (!measurementId || typeof window === "undefined" || typeof document === "undefined" || hasInitializedAnalytics) {
    return;
  }

  injectGoogleAnalyticsScript();

  window.dataLayer = window.dataLayer || [];
  window.gtag =
    window.gtag ||
    function gtag() {
      window.dataLayer.push(arguments);
    };

  window.gtag("js", new Date());
  window.gtag("config", measurementId, {
    page_path: window.location.pathname + window.location.search,
    page_title: document.title,
  });

  hasInitializedAnalytics = true;
}

export function getAnalyticsConsent() {
  if (typeof window === "undefined") {
    return null;
  }

  const storedConsent = window.localStorage.getItem(consentStorageKey);

  if (storedConsent === "granted" || storedConsent === "denied") {
    return storedConsent;
  }

  return null;
}

export function persistAnalyticsConsent(consent) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(consentStorageKey, consent);
}
