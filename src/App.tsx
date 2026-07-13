import { useEffect, useRef, useState } from "react";
import EmptyState from "./components/EmptyState";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import SummaryCard from "./components/SummaryCard";
import LoadingSpinner from "./components/LoadingSpinner";
import SummarySkeleton from "./components/SummarySkeleton";
import { generateSummary } from "./services/api";
import type { VideoInfo } from "./services/api";
import Footer from "./components/Footer";
import toast from "react-hot-toast";
import { supabase } from "./lib/supabase";
import HistoryDrawer from "./components/HistoryDrawer";

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

      const result = await generateSummary(
  url,
  session?.user.id
);
//temp




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
  userId={session.user.id}
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
      <Footer />
    </>
  );
}

export default App;