import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  X,
  Clock3,
  Search,
  Trash2,
} from "lucide-react";
import {
  getHistory,
  deleteHistory,
} from "../services/history";

type HistoryItem = {
  id: string;
  video_id: string;
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
  onSelectSummary: (item: HistoryItem) => void;
};

export default function HistoryDrawer({
  userId,
  open,
  onClose,
  onSelectSummary,
}: Props) {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

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

  const filteredHistory = history.filter((item) => {
    const query = search.toLowerCase();

    return (
      item.title.toLowerCase().includes(query) ||
      item.channel.toLowerCase().includes(query)
    );
  });

  return (
    <>
      {/* Overlay */}

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
        className={`fixed right-0 top-0 z-50 h-full w-full max-w-md border-l border-gray-200 bg-white shadow-2xl transition-transform duration-300 dark:border-gray-700 dark:bg-gray-900 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}

        <div className="flex items-center justify-between border-b border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-900">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            📚 My History
          </h2>

          <button
            onClick={onClose}
            className="rounded-lg p-2 transition hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <X />
          </button>
        </div>

        {/* Search */}

        <div className="border-b border-gray-200 p-4 dark:border-gray-700">
          <div className="relative">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              placeholder="Search summaries..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-gray-300 bg-white py-3 pl-10 pr-4 text-gray-900 outline-none transition focus:border-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
            />
          </div>
        </div>

        {/* Body */}

        <div className="h-[calc(100%-160px)] overflow-y-auto p-5">

          {loading && (
            <p className="text-center text-gray-500 dark:text-gray-400">
              Loading...
            </p>
          )}

          {!loading && filteredHistory.length === 0 && (
            <div className="mt-20 text-center">
              <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                No summaries found
              </p>

              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Generate a summary or try another search.
              </p>
            </div>
          )}

          <div className="space-y-5">

            {filteredHistory.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  onSelectSummary(item);
                  onClose();
                }}
                className="cursor-pointer rounded-2xl border border-gray-200 bg-white p-3 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
              >
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="mb-3 rounded-xl"
                />

                <h3 className="line-clamp-2 font-semibold text-gray-900 dark:text-white">
                  {item.title}
                </h3>

                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  {item.channel}
                </p>

              <div className="mt-3 flex items-center justify-between">

  <div className="flex items-center gap-2 text-xs text-gray-400 dark:text-gray-500">
    <Clock3 size={14} />
    {new Date(item.created_at).toLocaleString()}
  </div>

  <button
    onClick={async (e) => {
      e.stopPropagation();

      const confirmed = window.confirm(
        "Delete this summary?"
      );

      if (!confirmed) return;

      try {
        await deleteHistory(item.id);

        setHistory((prev) =>
          prev.filter((history) => history.id !== item.id)
        );

        toast.success("Summary deleted");
      } catch (err) {
        console.error(err);

        toast.error("Delete failed");
      }
    }}
    className="rounded-lg p-2 text-red-500 transition hover:bg-red-100 dark:hover:bg-red-900/20"
    title="Delete Summary"
  >
    <Trash2 size={18} />
  </button>

</div>
              </div>
            ))}

          </div>
        </div>
      </div>
    </>
  );
}