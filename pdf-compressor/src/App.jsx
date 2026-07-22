
import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { Toaster } from "react-hot-toast";
import { ErrorBoundary } from "./components/common/ErrorBoundary";
import MainLayout from "./layouts/MainLayout";
import LoadingSpinner from "./components/ui/Spinner/LoadingSpinner";
import { ThemeProvider } from "./contexts/ThemeContext";
import { AnalyticsProvider } from "./contexts/AnalyticsContext";
import { HelmetProvider } from "react-helmet-async";
import SimpleChatbot from "./components/SimpleChatbot";
import "./index.css";

const HomePage = lazy(() => import("./pages/HomePage"));
const ImageCompressor = lazy(() => import("./pages/ImageCompressor"));
const PDFMerger = lazy(() => import("./pages/PDFMerger"));
const ImageResizer = lazy(() => import("./pages/ImageResizer"));
const QRCodeGenerator = lazy(() => import("./pages/QRCodeGenerator"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false, retry: 1, staleTime: 5 * 60 * 1000 } },
});

export default function App() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <AnalyticsProvider>
            <ErrorBoundary>
              <BrowserRouter basename="/pdf-compressor">
                <MainLayout>
                  <Suspense fallback={<LoadingSpinner />}>
                    <Routes>
                      <Route path="/" element={<HomePage />} />
                      <Route path="/image-compressor" element={<ImageCompressor />} />
                      <Route path="/pdf-merger" element={<PDFMerger />} />
                      <Route path="/image-resizer" element={<ImageResizer />} />
                      <Route path="/qr-generator" element={<QRCodeGenerator />} />
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </Suspense>
                </MainLayout>
                <SimpleChatbot />
              </BrowserRouter>
              <Toaster position="bottom-right" />
            </ErrorBoundary>
          </AnalyticsProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}
