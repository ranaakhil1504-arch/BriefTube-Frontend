export function loadAnalytics() {
  if (typeof window === "undefined") return;

  // Prevent double-loading if loadAnalytics() is ever called more than once
  if (document.getElementById("ga-gtag-script")) return;

  window.dataLayer = window.dataLayer || [];

  function gtag(...args: any[]) {
    window.dataLayer.push(args);
  }

  // Expose gtag globally so other parts of the app can fire events,
  // e.g. window.gtag("event", "summarize_click")
  window.gtag = gtag;

  const script = document.createElement("script");
  script.id = "ga-gtag-script";
  script.async = true;
  script.src =
    "https://www.googletagmanager.com/gtag/js?id=G-W7N21X582B";

  script.onload = () => {
    gtag("js", new Date());
    gtag("config", "G-W7N21X582B");
  };

  document.head.appendChild(script);
}

declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}