import { useState, useCallback } from "react";
import { PlayCircle, Sparkles, Clipboard, X, CheckCircle2 } from "lucide-react";
import toast from "react-hot-toast";
import { extractVideoId } from "../utils/youtube";
const SAMPLE_VIDEO =
  "https://www.youtube.com/watch?v=jNQXAC9IVRw";
type UrlInputProps = {
  onGenerate: (url: string) => void;
  loading: boolean;
};
export default function UrlInput({
  onGenerate,
  loading,
}: UrlInputProps) {
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");
const handleChange = useCallback(
  (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
    setError("");
  },
  []
);

  const isValidUrl = url.trim() !== "" && Boolean(extractVideoId(url));

  const handleSubmit = () => {
  if (!url.trim()) {
    setError("Please enter a YouTube URL.");
    return;
  }

  const videoId = extractVideoId(url);

  if (!videoId) {
    setError("Please enter a valid YouTube URL.");
    return;
  }

  setError("");
  onGenerate(url);
}

const handleSampleVideo = () => {
  setError("");
 setUrl(SAMPLE_VIDEO);

requestAnimationFrame(() => {
  onGenerate(SAMPLE_VIDEO);
});
}

const handlePaste = async () => {
  try {
    const text = await navigator.clipboard.readText();
    if (text) {
      setUrl(text);
      setError("");
      toast.success("Pasted from clipboard!");
    }
  } catch {
    toast.error("Couldn't access clipboard. Paste manually instead.");
  }
}

const handleClear = () => {
  setUrl("");
  setError("");
}

  return (
    <div className="mx-auto mt-8 w-full max-w-5xl sm:mt-12">

  <div className="rounded-2xl border border-white/60 bg-white/80 p-3 shadow-2xl backdrop-blur-xl sm:rounded-[30px] sm:p-4 dark:border-gray-700 dark:bg-gray-900/80">

    <div className="flex flex-col gap-3 sm:gap-4 md:flex-row">

      {/* Input */}

      <div className="flex flex-1 items-center gap-3 rounded-2xl border border-gray-200 bg-white px-4 py-3.5 transition-all focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-100 sm:gap-4 sm:px-5 sm:py-4 dark:border-gray-700 dark:bg-gray-800">

        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-red-100 sm:h-12 sm:w-12 dark:bg-red-900/40">

          <PlayCircle className="h-6 w-6 text-red-600 sm:h-7 sm:w-7 dark:text-red-400" />

        </div>

        <input
  autoComplete="off"
          type="url"
inputMode="url"
          value={url}
          disabled={loading}
          onChange={handleChange}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !loading) {
              handleSubmit();
            }
          }}
          placeholder="Paste any YouTube video URL..."
          className="w-full min-w-0 bg-transparent text-base text-gray-800 outline-none placeholder:text-gray-400 disabled:cursor-not-allowed disabled:opacity-60 sm:text-lg dark:text-white dark:placeholder:text-gray-500"
        />

        <div className="flex flex-shrink-0 items-center gap-1.5">
          {isValidUrl && !loading && (
            <CheckCircle2 className="h-5 w-5 text-green-500" />
          )}

          {url && !loading && (
            <button
              onClick={handleClear}
              aria-label="Clear URL"
              className="rounded-full p-1.5 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-700 dark:hover:text-gray-300"
            >
              <X className="h-4 w-4" />
            </button>
          )}

          {!url && !loading && (
            <button
              onClick={handlePaste}
              aria-label="Paste from clipboard"
              className="flex items-center gap-1.5 rounded-lg border border-gray-200 px-2 py-1.5 text-xs font-semibold text-gray-600 transition hover:bg-gray-50 sm:px-2.5 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              <Clipboard className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Paste</span>
            </button>
          )}
        </div>

          </div>

          {/* Button */}

<button
  onClick={handleSubmit}
  disabled={loading}
  className={`group flex items-center justify-center gap-3 rounded-2xl px-6 py-4 text-base font-semibold text-white shadow-lg transition-all duration-300 sm:px-8 sm:py-5 sm:text-lg ${
    loading
      ? "cursor-not-allowed bg-gray-500"
      : "bg-gradient-to-r from-blue-600 to-violet-600 hover:scale-[1.02] hover:shadow-2xl active:scale-95"
  }`}
>
  {loading ? (
    <>
      <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white"></div>

      <span>Generating...</span>
    </>
  ) : (
    <>
      <Sparkles className="h-5 w-5 transition-transform duration-300 group-hover:rotate-12" />

      <span>Generate Summary</span>
    </>
  )}
</button>

</div>

{/* Sample Video */}

<div className="mt-4 flex justify-center sm:mt-5">
  <button
    onClick={handleSampleVideo}
    disabled={loading}
    className="rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-xs font-semibold text-blue-700 transition hover:bg-blue-100 disabled:cursor-not-allowed disabled:opacity-60 sm:px-5 sm:text-sm dark:border-blue-700 dark:bg-blue-900/30 dark:text-blue-300 dark:hover:bg-blue-900/50"
  >
    🎬 Try Sample Video
  </button>
</div>

{/* Error */}

{error ? (
  <div className="mt-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 dark:border-red-700 dark:bg-red-950/40">
    <p className="text-sm font-medium text-red-600 dark:text-red-300">
      ⚠️ {error}
    </p>
  </div>
) : (
  <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs sm:mt-5 sm:gap-3 sm:text-sm">

    <span className="rounded-full bg-blue-50 px-3 py-1.5 font-medium text-blue-700 sm:px-4 sm:py-2 dark:bg-blue-900/30 dark:text-blue-300">
      ✨ AI Powered
    </span>

    <span className="rounded-full bg-green-50 px-3 py-1.5 font-medium text-green-700 sm:px-4 sm:py-2 dark:bg-green-900/30 dark:text-green-300">
      ⚡ Instant Summary
    </span>

    <span className="rounded-full bg-violet-50 px-3 py-1.5 font-medium text-violet-700 sm:px-4 sm:py-2 dark:bg-violet-900/30 dark:text-violet-300">
      📄 PDF Export
    </span>

    <span className="rounded-full bg-orange-50 px-3 py-1.5 font-medium text-orange-700 sm:px-4 sm:py-2 dark:bg-orange-900/30 dark:text-orange-300">
      📝 Markdown
    </span>

  </div>
)}

</div>

</div>
  );
}