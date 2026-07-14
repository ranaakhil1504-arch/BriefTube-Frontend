export function loadAnalytics() {
  if (typeof window === "undefined") return;

  const script = document.createElement("script");
  script.async = true;
  script.src =
    "https://www.googletagmanager.com/gtag/js?id=G-W7N21X582B";

  document.head.appendChild(script);

  script.onload = () => {
    window.dataLayer = window.dataLayer || [];

    function gtag(...args: any[]) {
      window.dataLayer.push(args);
    }

    gtag("js", new Date());
    gtag("config", "G-W7N21X582B");
  };
}

declare global {
  interface Window {
    dataLayer: any[];
  }
}