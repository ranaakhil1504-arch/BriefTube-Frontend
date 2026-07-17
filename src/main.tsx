import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "react-hot-toast";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter } from "react-router-dom";
import { useEffect } from "react";
import { loadAnalytics } from "./utils/loadAnalytics";
import "./index.css";

import App from "./App";
import { ThemeProvider } from "./context/AppTheme";

function AnalyticsLoader() {
  useEffect(() => {
    let idleId: number | undefined;
    let timeoutId: number | undefined;

    if (typeof window.requestIdleCallback === "function") {
      idleId = window.requestIdleCallback(() => {
        loadAnalytics();
      });
    } else {
      timeoutId = window.setTimeout(() => {
        loadAnalytics();
      }, 3000);
    }

    return () => {
      if (idleId !== undefined && typeof window.cancelIdleCallback === "function") {
        window.cancelIdleCallback(idleId);
      }
      if (timeoutId !== undefined) clearTimeout(timeoutId);
    };
  }, []);

  return null;
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <HelmetProvider>
        <ThemeProvider>

          <Toaster
            position="top-right"
            toastOptions={{
              duration: 2500,
              style: {
                borderRadius: "14px",
                background: "#111827",
                color: "#fff",
                fontWeight: "600",
                padding: "16px",
              },
            }}
          />
<AnalyticsLoader />
          <App />

        </ThemeProvider>
      </HelmetProvider>
    </BrowserRouter>
  </StrictMode>
);