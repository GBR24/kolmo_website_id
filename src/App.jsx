import { useEffect, useState } from "react";

import { getAnalyticsConsent, initGoogleAnalytics, persistAnalyticsConsent } from "./analytics";
import { pageMeta } from "./lib/constants";

import { Header } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";
import { CookieBanner } from "./components/layout/CookieBanner";

import { Hero } from "./components/home/Hero";
import { ThesisSection } from "./components/home/ThesisSection";

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
    <main id="top" className="home-page" tabIndex="-1">
      <Hero />
      <ThesisSection />
    </main>
  );
}

export default function App() {
  const [analyticsConsent, setAnalyticsConsent] = useState(() => getAnalyticsConsent());
  const [isCookieBannerVisible, setIsCookieBannerVisible] = useState(() => getAnalyticsConsent() === null);
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
    <div className="kolmo-app">

      <a
        href="#top"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded focus:bg-[#4da3ff] focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-[#06111a]"
      >
        Skip to content
      </a>

      <Header isBlogPage={isBlogPage} />

      {isBlogPage ? <BlogPage /> : <HomePage />}

      <Footer onCookieSettings={openCookieSettings} />

      {isCookieBannerVisible ? <CookieBanner onAccept={acceptAnalytics} onDecline={declineAnalytics} /> : null}
    </div>
  );
}
