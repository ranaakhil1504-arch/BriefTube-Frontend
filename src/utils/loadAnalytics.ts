const GA_ID = "G-W7N21X582B";

type GtagCommand =
  | ["js", Date]
  | ["config", string, Record<string, unknown>?]
  | ["event", string, Record<string, unknown>?];

declare global {
  interface Window {
    dataLayer: GtagCommand[];
    gtag: (...args: GtagCommand) => void;
    __gaLoaded?: boolean;
  }
}

export function loadAnalytics() {
  if (typeof window === "undefined") return;

  if (window.__gaLoaded) return;
  window.__gaLoaded = true;

  window.dataLayer = window.dataLayer || [];

  window.gtag = (...args: GtagCommand) => {
    window.dataLayer.push(args);
  };

  const script = document.createElement("script");
  script.id = "ga-gtag-script";
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;

  script.onload = () => {
    window.gtag("js", new Date());

    window.gtag("config", GA_ID, {
      send_page_view: true,
      page_path: window.location.pathname,
    });
  };

  document.head.appendChild(script);
}