import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "react-hot-toast";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter } from "react-router-dom";


import "./index.css";

import App from "./App";
import { ThemeProvider } from "./context/AppTheme";



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

        

          <App />
        </ThemeProvider>
      </HelmetProvider>
    </BrowserRouter>
  </StrictMode>
);