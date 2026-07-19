import { useEffect, useState } from "react";
import { X, Inbox, AlertCircle, Trash2, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { getHistory, deleteHistory } from "../services/history";
import type { HistoryItem } from "../services/history";

type HistoryDrawerProps = {
  open: boolean;
  onClose: () => void;
  onSelectSummary: (item: HistoryItem) => void;
};

type Status = "loading" | "error" | "ready";

export default function HistoryDrawer({
  open,
  onClose,
  onSelectSummary,
}: HistoryDrawerProps) {
  const [items, setItems] = useState<HistoryItem[]>([]);
  const [status, setStatus] = useState<Status>("loading");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;

    let cancelled = false;

    async function loadHistory() {
      setStatus("loading");

      try {
        const history = await getHistory();

        if (!cancelled) {
          setItems(history);
          setStatus("ready");
        }
      } catch {
        if (!cancelled) setStatus("error");
      }
    }

    loadHistory();

    return () => {
      cancelled = true;
    };
  }, [open]);

  async function handleDelete(e: React.MouseEvent, id: string) {
    e.stopPropagation();

    try {
      setDeletingId(id);
      await deleteHistory(id);
      setItems((prev) => prev.filter((item) => item.id !== id));
      toast.success("Summary deleted");
    } catch {
      toast.error("Failed to delete summary");
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      {/* Drawer */}
      <div
        role="dialog"
        aria-label="Summary history"
        className={`fixed right-0 top-0 z-50 h-full w-full max-w-md transform bg-white shadow-2xl transition-transform duration-300 dark:bg-gray-900 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4 dark:border-gray-800">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">
            Your Summaries
          </h2>
          <button
            onClick={onClose}
            aria-label="Close history"
            className="rounded-lg p-2 text-gray-500 transition-colors hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="h-[calc(100%-64px)] overflow-y-auto px-5 py-4">
          {status === "loading" && (
            <div className="space-y-3">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 rounded-xl border border-gray-200 p-3 dark:border-gray-800"
                >
                  <div className="h-14 w-20 flex-shrink-0 animate-pulse rounded-lg bg-gray-200 dark:bg-gray-800" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 w-3/4 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
                    <div className="h-3 w-1/2 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {status === "error" && (
            <div className="flex flex-col items-center py-16 text-center">
              <AlertCircle className="h-8 w-8 text-red-500" />
              <p className="mt-3 text-sm font-semibold text-gray-900 dark:text-white">
                Couldn't load your history
              </p>
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                Please try again in a moment.
              </p>
            </div>
          )}

          {status === "ready" && items.length === 0 && (
            <div className="flex flex-col items-center py-16 text-center">
              <Inbox className="h-8 w-8 text-gray-400 dark:text-gray-600" />
              <p className="mt-3 text-sm font-semibold text-gray-900 dark:text-white">
                No summaries yet
              </p>
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                Summarize a video and it'll show up here.
              </p>
            </div>
          )}

          {status === "ready" && items.length > 0 && (
            <div className="space-y-3">
              {items.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onSelectSummary(item)}
                  className="flex w-full items-center gap-3 rounded-xl border border-gray-200 p-3 text-left transition-colors hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-800"
                >
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    loading="lazy"
                    className="h-14 w-20 flex-shrink-0 rounded-lg object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-gray-900 dark:text-white">
                      {item.title}
                    </p>
                    <p className="truncate text-xs text-gray-500 dark:text-gray-400">
                      {item.channel}
                    </p>
                    <p className="mt-0.5 text-[11px] text-gray-400 dark:text-gray-500">
                      {new Date(item.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <button
                    onClick={(e) => handleDelete(e, item.id)}
                    disabled={deletingId === item.id}
                    aria-label="Delete summary"
                    className="flex-shrink-0 rounded-lg p-2 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-600 disabled:opacity-50 dark:hover:bg-red-900/30"
                  >
                    {deletingId === item.id ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Trash2 className="h-4 w-4" />
                    )}
                  </button>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
