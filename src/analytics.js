const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID?.trim();

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
  if (!measurementId || typeof window === "undefined" || typeof document === "undefined") {
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
}
