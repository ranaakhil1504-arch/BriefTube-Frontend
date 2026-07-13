import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

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

export default function History() {
  const [history, setHistory] = useState<Summary[]>([]);

  useEffect(() => {
    async function loadHistory() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) return;

      const res = await fetch(
        `${API_URL}/api/history/${session.user.id}`
      );

      const data = await res.json();

      setHistory(data.history);
    }

    loadHistory();
  }, []);

  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <h1 className="mb-8 text-4xl font-bold">
        📚 My Summaries
      </h1>

      <div className="space-y-6">
        {history.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-5 rounded-2xl border p-4 shadow"
          >
            <img
              src={item.thumbnail}
              className="w-52 rounded-xl"
            />

            <div className="flex-1">
              <h2 className="font-bold text-lg">
                {item.title}
              </h2>

              <p className="text-gray-500">
                {item.channel}
              </p>

              <p className="text-sm text-gray-400 mt-2">
                {new Date(
                  item.created_at
                ).toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}