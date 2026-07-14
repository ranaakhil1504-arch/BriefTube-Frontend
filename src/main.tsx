import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "react-hot-toast";
import { HelmetProvider } from "react-helmet-async";
import "./index.css";

import App from "./App";
import { ThemeProvider } from "./context/AppTheme";

createRoot(document.getElementById("root")!).render(
 <StrictMode>
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
          success: {
            iconTheme: {
              primary: "#22c55e",
              secondary: "#fff",
            },
          },
          error: {
            iconTheme: {
              primary: "#ef4444",
              secondary: "#fff",
            },
          },
        }}
      />

      <App />

    </ThemeProvider>
  </HelmetProvider>
</StrictMode>
);