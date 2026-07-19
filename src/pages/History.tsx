import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { Inbox, AlertCircle, LogIn } from "lucide-react";

type Summary = {
  id: string;
  title: string;
  channel: string;
  thumbnail: string;
  created_at: string;
};

const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000";

type Status = "loading" | "signed-out" | "error" | "ready";

export default function History() {
  const [history, setHistory] = useState<Summary[]>([]);
  const [status, setStatus] = useState<Status>("loading");

  useEffect(() => {
    async function loadHistory() {
      setStatus("loading");
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (!session) {
          setStatus("signed-out");
          return;
        }

        const res = await fetch(
          `${API_URL}/api/history/${session.user.id}`
        );

        if (!res.ok) {
          setStatus("error");
          return;
        }

        const data = await res.json();

        setHistory(data.history || []);
        setStatus("ready");
      } catch {
        setStatus("error");
      }
    }

    loadHistory();
  }, []);

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-12">
      <h1 className="mb-6 text-2xl font-bold text-gray-900 sm:mb-8 sm:text-4xl dark:text-white">
        📚 My Summaries
      </h1>

      {/* Loading state */}
      {status === "loading" && (
        <div className="space-y-4 sm:space-y-6">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="flex flex-col gap-4 rounded-2xl border border-gray-200 p-4 shadow sm:flex-row sm:items-center sm:gap-5 dark:border-gray-800"
            >
              <div className="h-40 w-full animate-pulse rounded-xl bg-gray-200 sm:h-28 sm:w-52 dark:bg-gray-800" />
              <div className="flex-1 space-y-2">
                <div className="h-5 w-3/4 animate-pulse rounded-lg bg-gray-200 dark:bg-gray-800" />
                <div className="h-4 w-1/3 animate-pulse rounded-lg bg-gray-200 dark:bg-gray-800" />
                <div className="h-3 w-1/4 animate-pulse rounded-lg bg-gray-200 dark:bg-gray-800" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Signed out state */}
      {status === "signed-out" && (
        <div className="flex flex-col items-center rounded-2xl border border-gray-200 py-16 text-center sm:py-24 dark:border-gray-800">
          <LogIn className="h-9 w-9 text-gray-400 sm:h-10 sm:w-10 dark:text-gray-600" />
          <h3 className="mt-4 text-lg font-bold text-gray-900 sm:text-xl dark:text-white">
            Sign in to see your summaries
          </h3>
          <p className="mt-2 max-w-sm text-sm text-gray-500 sm:text-base dark:text-gray-400">
            Your saved video summaries will show up here once you're signed in.
          </p>
        </div>
      )}

      {/* Error state */}
      {status === "error" && (
        <div className="flex flex-col items-center rounded-2xl border border-red-200 bg-red-50 py-16 text-center sm:py-24 dark:border-red-900 dark:bg-red-950/30">
          <AlertCircle className="h-9 w-9 text-red-500 sm:h-10 sm:w-10" />
          <h3 className="mt-4 text-lg font-bold text-gray-900 sm:text-xl dark:text-white">
            Couldn't load your summaries
          </h3>
          <p className="mt-2 max-w-sm text-sm text-gray-500 sm:text-base dark:text-gray-400">
            Something went wrong while fetching your history. Try refreshing the page.
          </p>
        </div>
      )}

      {/* Empty state */}
      {status === "ready" && history.length === 0 && (
        <div className="flex flex-col items-center rounded-2xl border border-gray-200 py-16 text-center sm:py-24 dark:border-gray-800">
          <Inbox className="h-9 w-9 text-gray-400 sm:h-10 sm:w-10 dark:text-gray-600" />
          <h3 className="mt-4 text-lg font-bold text-gray-900 sm:text-xl dark:text-white">
            No summaries yet
          </h3>
          <p className="mt-2 max-w-sm text-sm text-gray-500 sm:text-base dark:text-gray-400">
            Summarize a YouTube video and it'll show up here.
          </p>
        </div>
      )}

      {/* Ready state */}
      {status === "ready" && history.length > 0 && (
        <div className="space-y-4 sm:space-y-6">
          {history.map((item) => (
            <div
              key={item.id}
              className="flex flex-col gap-4 rounded-2xl border border-gray-200 p-4 shadow transition-shadow hover:shadow-md sm:flex-row sm:items-center sm:gap-5 dark:border-gray-800 dark:bg-gray-900 dark:shadow-none"
            >
              <img
                src={item.thumbnail}
                alt={item.title}
                loading="lazy"
                decoding="async"
                className="h-40 w-full rounded-xl object-cover sm:h-auto sm:w-52"
              />

              <div className="flex-1">
                <h2 className="text-base font-bold text-gray-900 sm:text-lg dark:text-white">
                  {item.title}
                </h2>

                <p className="mt-1 text-sm text-gray-500 sm:mt-0 sm:text-base dark:text-gray-400">
                  {item.channel}
                </p>

                <p className="mt-2 text-xs text-gray-400 sm:text-sm dark:text-gray-500">
                  {new Date(
                    item.created_at
                  ).toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}