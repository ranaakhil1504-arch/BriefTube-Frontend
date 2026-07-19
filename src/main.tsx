import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "react-hot-toast";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";


import "./index.css";

import App from "./App";
import { ThemeProvider } from "./context/AppTheme";



createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
  <ScrollToTop />
      <HelmetProvider>
        <ThemeProvider>
          <Toaster
            position="top-right"
            containerStyle={{
              top: 12,
              right: 12,
            }}
            toastOptions={{
              duration: 2500,
              className:
                "!rounded-2xl !bg-gray-900 !text-white !font-semibold !p-4 dark:!bg-gray-800 dark:!border dark:!border-gray-700",
            }}
          />

        

          <App />
        </ThemeProvider>
      </HelmetProvider>
    </BrowserRouter>
  </StrictMode>
);