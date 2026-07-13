import { useEffect, useState } from "react";
import { X, Clock3 } from "lucide-react";
import { getHistory } from "../services/history";

type HistoryItem = {
  id: string;
  title: string;
  channel: string;
  thumbnail: string;
  summary: string;
  created_at: string;
};

type Props = {
  userId: string;
  open: boolean;
  onClose: () => void;
};

export default function HistoryDrawer({
  userId,
  open,
  onClose,
}: Props) {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open || !userId) return;

    async function loadHistory() {
      try {
        setLoading(true);

        const data = await getHistory(userId);

        setHistory(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadHistory();
  }, [open, userId]);

  return (
    <>
      {/* Background */}

      <div
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 ${
          open
            ? "opacity-100"
            : "pointer-events-none opacity-0"
        }`}
        onClick={onClose}
      />

      {/* Drawer */}

      <div
        className={`fixed right-0 top-0 z-50 h-full w-full max-w-md bg-white shadow-2xl transition-transform duration-300 dark:bg-gray-900 ${
          open
            ? "translate-x-0"
            : "translate-x-full"
        }`}
      >
        {/* Header */}

        <div className="flex items-center justify-between border-b p-6 dark:border-gray-700">
          <h2 className="text-2xl font-bold">
            📚 My History
          </h2>

          <button onClick={onClose}>
            <X />
          </button>
        </div>

        {/* Body */}

        <div className="h-[calc(100%-90px)] overflow-y-auto p-5">

          {loading && (
            <p className="text-center text-gray-500">
              Loading...
            </p>
          )}

          {!loading && history.length === 0 && (
            <p className="text-center text-gray-500">
              No summaries yet.
            </p>
          )}

          <div className="space-y-5">

            {history.map((item) => (
              <div
                key={item.id}
                className="cursor-pointer rounded-2xl border p-3 transition hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
              >
                <img
                  src={item.thumbnail}
                  className="mb-3 rounded-xl"
                />

                <h3 className="line-clamp-2 font-semibold">
                  {item.title}
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  {item.channel}
                </p>

                <div className="mt-3 flex items-center gap-2 text-xs text-gray-400">
                  <Clock3 size={14} />
                  {new Date(
                    item.created_at
                  ).toLocaleString()}
                </div>
              </div>
            ))}

          </div>
        </div>
      </div>
    </>
  );
}