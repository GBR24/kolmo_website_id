import { useEffect, useState } from "react";

import { getAnalyticsConsent, initGoogleAnalytics, persistAnalyticsConsent } from "./analytics";
import { NEWSLETTER_DISMISSED_KEY, pageMeta } from "./lib/constants";

import { Header } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";
import { CookieBanner } from "./components/layout/CookieBanner";
import { NewsletterModal } from "./components/layout/NewsletterModal";

import { Hero } from "./components/home/Hero";
import { WorkflowSection } from "./components/home/WorkflowSection";
import { CapabilitiesSection } from "./components/home/CapabilitiesSection";
import { AgentsSection } from "./components/home/AgentsSection";
import { WorldModelSection } from "./components/home/WorldModelSection";
import { AudienceSection } from "./components/home/AudienceSection";

import { BlogPage } from "./components/blog/BlogPage";

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

function HomePage() {
  return (
    <main id="top" className="story-page">
      <Hero />
      <WorkflowSection />
      <CapabilitiesSection />
      <AgentsSection />
      <WorldModelSection />
      <AudienceSection />
    </main>
  );
}

export default function App() {
  const [isNewsletterOpen, setIsNewsletterOpen] = useState(false);
  const [analyticsConsent, setAnalyticsConsent] = useState(() => getAnalyticsConsent());
  const [isCookieBannerVisible, setIsCookieBannerVisible] = useState(() => getAnalyticsConsent() === null);
  const [isMobileNewsletterFallback, setIsMobileNewsletterFallback] = useState(false);
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

      <a
        href="#top"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded focus:bg-[#4da3ff] focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-[#06111a]"
      >
        Skip to content
      </a>

      <Header isBlogPage={isBlogPage} />

      {isBlogPage ? <BlogPage onSubscribe={openNewsletter} /> : <HomePage />}

      <Footer onCookieSettings={openCookieSettings} />

      {isCookieBannerVisible ? <CookieBanner onAccept={acceptAnalytics} onDecline={declineAnalytics} /> : null}

      {isNewsletterOpen ? (
        <NewsletterModal isMobileFallback={isMobileNewsletterFallback} onDismiss={dismissNewsletter} />
      ) : null}
    </div>
  );
}
