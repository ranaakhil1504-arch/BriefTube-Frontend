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
    const id = window.setTimeout(() => {
      loadAnalytics();
    }, 3000);

    return () => clearTimeout(id);
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