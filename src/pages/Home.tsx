import { useEffect, useRef, useState } from "react";
import { lazy, Suspense } from "react";
import LazySection from "../components/LazySection";
const AboutBriefTube = lazy(() => import("../components/AboutBriefTube"));
const Features = lazy(() => import("../components/Features"));
const FAQ = lazy(() => import("../components/FAQ"));
const Footer = lazy(() => import("../components/Footer"));
import EmptyState from "../components/EmptyState";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import SummaryCard from "../components/SummaryCard";
import LoadingSpinner from "../components/LoadingSpinner";
import SummarySkeleton from "../components/SummarySkeleton";
const TrustSection = lazy(() => import("../components/TrustSection"));
import HistoryDrawer from "../components/HistoryDrawer";
import SEO from "../components/SEO";
const Testimonials = lazy(() => import("../components/Testimonials"));
import { generateSummary } from "../services/api";
import type { VideoInfo } from "../services/api";
const WhyChooseAI = lazy(() => import("../components/WhyChooseAI"));
import { supabase } from "../lib/supabase";
import FAQSchema from "../components/FAQSchema";
import toast from "react-hot-toast";
const WhoUsesBriefTube = lazy(() => import("../components/WhoUsesBriefTube"));
const ExploreMore = lazy(() => import("../components/ExploreMore"));
import type { Session } from "@supabase/supabase-js";

function App() {
  const [summary, setSummary] = useState("");
 
  const [loading, setLoading] = useState(false);
  const [video, setVideo] = useState<VideoInfo | null>(null);
  const [error, setError] = useState("");

  // 👇 Add this here
  const [session, setSession] = useState<Session | null>(null);
const [historyOpen, setHistoryOpen] = useState(false);
  const summaryRef = useRef<HTMLDivElement | null>(null);
  const loadingRef = useRef<HTMLDivElement | null>(null);

  function handleClear() {
    setSummary("");
    setVideo(null);
    setError("");
  }

  // ==========================
  // Supabase Connection Test
  // ==========================

 useEffect(() => {
  async function loadSession() {
    const { data } = await supabase.auth.getSession();

    setSession(data.session);
  }

  loadSession();

  const {
    data: { subscription },
  } = supabase.auth.onAuthStateChange((_event, session) => {
    setSession(session);
  });

  return () => {
    subscription.unsubscribe();
  };
}, []);

  async function handleGenerate(url: string) {
    try {
      setLoading(true);
      setError("");
      setSummary("");
      setVideo(null);

      setTimeout(() => {
        loadingRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }, 100);

      const result = await generateSummary(url);
      setSummary(result.summary);
      setVideo(result.video);

      toast.success("Summary generated successfully!");
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  }

  // Auto Scroll
  useEffect(() => {
    if (summary && video && summaryRef.current) {
      setTimeout(() => {
        summaryRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 300);
    }
  }, [summary, video]);

  return (
    <>
    <SEO
  title="AI YouTube Video Summarizer – Free & Instant | BriefTube"
  description="Summarize any YouTube video instantly with AI. Generate accurate summaries, key takeaways, timestamps and notes for free using BriefTube."
/>
  <FAQSchema />
     <Navbar
  session={session}
  onHistoryClick={() => setHistoryOpen(true)}
/>

      <Hero
        onGenerate={handleGenerate}
        loading={loading}
      />

      {loading && (
        <div ref={loadingRef}>
          <LoadingSpinner />
          <SummarySkeleton />
        </div>
      )}

      {!loading && !summary && !error && (
        <EmptyState />
      )}

      {error && (
        <div className="mx-auto mt-8 w-full max-w-3xl rounded-3xl border border-red-200 bg-red-50 p-6 shadow-lg">
          <h2 className="text-xl font-bold text-red-700">
            ❌ Unable to Generate Summary
          </h2>

          <p className="mt-3 text-gray-700">
            {error}
          </p>

          <p className="mt-4 text-sm text-gray-500">
            Please try another YouTube video or check your internet connection.
          </p>
        </div>
      )}

      {summary && video && (
        <div ref={summaryRef}>
          <SummaryCard
            summary={summary}
            video={video}
            onClear={handleClear}
          />
        </div>
      )}
{session && (
  <HistoryDrawer
  open={historyOpen}
  onClose={() => setHistoryOpen(false)}
  onSelectSummary={(item) => {
    setSummary(item.summary);

    setVideo({
      title: item.title,
      channel: item.channel,
      thumbnail: item.thumbnail,
    });

  

    setError("");

    setTimeout(() => {
      summaryRef.current?.scrollIntoView({
        behavior: "smooth",
      });
    }, 200);
  }}
/>
)}
<LazySection>
  <Suspense
  fallback={
    <div className="h-32 animate-pulse bg-gray-100 dark:bg-gray-900 rounded-2xl" />
  }
>
    <AboutBriefTube />
  </Suspense>
</LazySection>

<LazySection>
  <Suspense
  fallback={
    <div className="h-32 animate-pulse bg-gray-100 dark:bg-gray-900 rounded-2xl" />
  }
>
    <Features />
  </Suspense>
</LazySection>

<LazySection>
  <Suspense
  fallback={
    <div className="h-32 animate-pulse bg-gray-100 dark:bg-gray-900 rounded-2xl" />
  }
>
    <WhyChooseAI />
  </Suspense>
</LazySection>

<LazySection>
  <Suspense
  fallback={
    <div className="h-32 animate-pulse bg-gray-100 dark:bg-gray-900 rounded-2xl" />
  }
>
    <WhoUsesBriefTube />
  </Suspense>
</LazySection>

<LazySection>
  <Suspense
  fallback={
    <div className="h-32 animate-pulse bg-gray-100 dark:bg-gray-900 rounded-2xl" />
  }
>
    <TrustSection />
  </Suspense>
</LazySection>

<LazySection>
  <Suspense
  fallback={
    <div className="h-32 animate-pulse bg-gray-100 dark:bg-gray-900 rounded-2xl" />
  }
>
    <FAQ />
  </Suspense>
</LazySection>

<LazySection>
  <Suspense
  fallback={
    <div className="h-32 animate-pulse bg-gray-100 dark:bg-gray-900 rounded-2xl" />
  }
>
    <Testimonials />
  </Suspense>
</LazySection>

<LazySection>
  <Suspense
  fallback={
    <div className="h-32 animate-pulse bg-gray-100 dark:bg-gray-900 rounded-2xl" />
  }
>
    <ExploreMore />
  </Suspense>
</LazySection>


<LazySection>
  <Suspense
  fallback={
    <div className="h-32 animate-pulse bg-gray-100 dark:bg-gray-900 rounded-2xl" />
  }
>
    <Footer />
  </Suspense>
</LazySection>
    </>
  );
}

export default App;