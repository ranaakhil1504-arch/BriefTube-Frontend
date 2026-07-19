import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { parseSummary } from "../utils/parseSummary";
import {
  Copy,
  Check,
  Download,
  FileText,
  FileCode2,
  PlayCircle,
  ChevronDown,
  Share2,
  Trash2,
  Sparkles,
  Target,
  Zap,
  ListChecks,
} from "lucide-react";

import type { VideoInfo } from "../services/api";

type SummaryCardProps = {
  video: VideoInfo;
  summary: string;
  onClear: () => void;
};

export default function SummaryCard({
  video,
  summary,
  onClear,
}: SummaryCardProps) {
  const [copied, setCopied] = useState(false);
  const [downloadOpen, setDownloadOpen] = useState(false);
  const [pdfLoading, setPdfLoading] = useState(false);
  const downloadRef = useRef<HTMLDivElement>(null);
  const parsed = parseSummary(summary);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        downloadRef.current &&
        !downloadRef.current.contains(e.target as Node)
      ) {
        setDownloadOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(summary);
      setCopied(true);
      toast.success("Summary copied!");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Failed to copy summary.");
    }
  }

  async function handleShare() {
    try {
      if (navigator.share) {
        await navigator.share({ title: video.title, text: summary });
        toast.success("Summary shared!");
      } else {
        await navigator.clipboard.writeText(summary);
        toast.success("Summary copied for sharing!");
      }
    } catch {
      toast.error("Sharing cancelled.");
    }
  }

  function downloadFile(content: string, filename: string, type: string) {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  function handleDownloadTxt() {
    downloadFile(summary, `${video.title}.txt`, "text/plain;charset=utf-8");
    toast.success("TXT downloaded!");
    setDownloadOpen(false);
  }

  function handleDownloadMarkdown() {
    downloadFile(summary, `${video.title}.md`, "text/markdown;charset=utf-8");
    toast.success("Markdown downloaded!");
    setDownloadOpen(false);
  }

  async function handleDownloadPdf() {
    try {
      setPdfLoading(true);
      toast.loading("Generating PDF...", { id: "pdf" });

      const [{ pdf }, { default: PdfDocument }] = await Promise.all([
        import("@react-pdf/renderer"),
        import("../pdf/PdfDocument"),
      ]);

      const blob = await pdf(
        <PdfDocument video={video} parsed={parsed} />
      ).toBlob();

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${video.title}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      toast.success("PDF downloaded!", { id: "pdf" });
    } catch (err) {
      console.error(err);
      toast.error("Failed to generate PDF", { id: "pdf" });
    } finally {
      setPdfLoading(false);
      setDownloadOpen(false);
    }
  }

  // Sections in display order, used to compute stagger delays
  const sections = [
    parsed.executiveSummary && "executive",
    parsed.keyPoints.length > 0 && "points",
    parsed.keyTakeaways.length > 0 && "takeaways",
    parsed.quickSummary && "quick",
    parsed.actionItems.length > 0 && "actions",
  ].filter(Boolean) as string[];
  const delayFor = (key: string) => `${sections.indexOf(key) * 90}ms`;

  return (
    <div className="mx-auto mt-6 w-full max-w-6xl overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg transition-shadow duration-300 animate-fade-in-up sm:mt-10 sm:rounded-3xl sm:shadow-xl md:hover:shadow-2xl dark:border-gray-800 dark:bg-gray-900">
      {/* Thumbnail */}
      <div className="relative">
        <img
          src={video.thumbnail}
          alt={video.title}
          loading="lazy"
          decoding="async"
          width={1280}
          height={720}
          className="h-48 w-full object-cover sm:h-64 md:h-80"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

        <div className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 shadow-lg backdrop-blur sm:left-6 sm:top-6 sm:gap-2 sm:px-4 sm:py-2 dark:bg-gray-900/85">
          <PlayCircle className="h-4 w-4 text-red-600 sm:h-5 sm:w-5" />
          <span className="text-xs font-semibold text-gray-800 sm:text-sm dark:text-white">
            YouTube Video
          </span>
        </div>

        <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6">
          <h2 className="text-xl font-extrabold leading-tight text-white drop-shadow-lg sm:text-2xl md:text-4xl">
            {video.title}
          </h2>
          <p className="mt-1.5 text-sm font-medium text-gray-200 sm:mt-3 sm:text-base md:text-lg">
            👤 {video.channel}
          </p>
        </div>
      </div>

      {/* Body */}
      <div className="p-4 sm:p-6 md:p-8 dark:bg-gray-900">
        {/* Toolbar */}
        <div className="mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="flex items-center gap-2 text-lg font-bold text-gray-900 sm:text-2xl dark:text-white">
              <Sparkles className="h-4 w-4 text-blue-600 sm:h-5 sm:w-5 dark:text-blue-400" />
              AI Generated Summary
            </h3>
            <p className="mt-0.5 text-xs text-gray-500 sm:mt-1 sm:text-base dark:text-gray-400">
              Beautifully organized by Gemini AI
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <button
              onClick={handleCopy}
              className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors duration-200 sm:px-5 sm:py-3 sm:text-base ${
                copied
                  ? "bg-green-600 text-white shadow-lg"
                  : "bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800"
              }`}
            >
              {copied ? (
                <Check className="h-4 w-4 sm:h-5 sm:w-5" />
              ) : (
                <Copy className="h-4 w-4 sm:h-5 sm:w-5" />
              )}
              <span>{copied ? "Copied" : "Copy"}</span>
            </button>

            <button
              onClick={handleShare}
              className="flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-emerald-700 active:bg-emerald-800 sm:px-5 sm:py-3 sm:text-base"
            >
              <Share2 className="h-4 w-4 sm:h-5 sm:w-5" />
              <span>Share</span>
            </button>

            {/* Download menu */}
            <div className="relative" ref={downloadRef}>
              <button
                onClick={() => setDownloadOpen((o) => !o)}
                aria-expanded={downloadOpen}
                aria-haspopup="true"
                className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-indigo-700 active:bg-indigo-800 sm:px-5 sm:py-3 sm:text-base"
              >
                <Download className="h-4 w-4 sm:h-5 sm:w-5" />
                <span>Download</span>
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-200 ${
                    downloadOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {downloadOpen && (
                <div className="absolute right-0 top-full z-20 mt-2 w-48 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl animate-fade-in-up dark:border-gray-700 dark:bg-gray-800">
                  <button
                    onClick={handleDownloadTxt}
                    className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:text-gray-200 dark:hover:bg-gray-700"
                  >
                    <FileText className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                    Text (.txt)
                  </button>
                  <button
                    onClick={handleDownloadMarkdown}
                    className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:text-gray-200 dark:hover:bg-gray-700"
                  >
                    <FileCode2 className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                    Markdown (.md)
                  </button>
                  <button
                    onClick={handleDownloadPdf}
                    disabled={pdfLoading}
                    className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 disabled:opacity-50 dark:text-gray-200 dark:hover:bg-gray-700"
                  >
                    <Download className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                    {pdfLoading ? "Generating…" : "PDF (.pdf)"}
                  </button>
                </div>
              )}
            </div>

            <button
              onClick={onClear}
              aria-label="Clear summary"
              className="flex items-center gap-2 rounded-xl bg-gray-100 px-3 py-2.5 text-sm font-semibold text-gray-600 transition-colors duration-200 hover:bg-gray-200 active:bg-gray-300 sm:px-4 sm:py-3 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              <Trash2 className="h-4 w-4 sm:h-5 sm:w-5" />
              <span className="hidden sm:inline">Clear</span>
            </button>
          </div>
        </div>

        {/* Summary */}
        <div className="rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 to-slate-50 p-4 shadow-inner sm:rounded-3xl sm:p-8 dark:border-gray-800 dark:from-gray-900 dark:to-gray-800/60">
          {/* Executive Summary */}
          {parsed.executiveSummary && (
            <div
              className="mb-6 rounded-2xl border border-blue-200 bg-gradient-to-r from-blue-50 via-white to-indigo-50 p-5 shadow-sm animate-fade-in-up sm:mb-8 sm:rounded-3xl sm:p-8 dark:border-blue-900 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800"
              style={{ animationDelay: delayFor("executive") }}
            >
              <div className="mb-3 flex items-center gap-3 sm:mb-4">
                <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white sm:h-12 sm:w-12">
                  <FileText className="h-4 w-4 sm:h-6 sm:w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 sm:text-2xl dark:text-white">
                    Executive Summary
                  </h3>
                  <p className="text-xs text-gray-500 sm:text-base dark:text-gray-400">
                    AI generated overview
                  </p>
                </div>
              </div>
              <p className="text-sm leading-7 text-gray-700 sm:text-base sm:leading-8 dark:text-gray-300">
                {parsed.executiveSummary}
              </p>
            </div>
          )}

          {/* Key Points */}
          {parsed.keyPoints.length > 0 && (
            <div
              className="mb-6 animate-fade-in-up sm:mb-8"
              style={{ animationDelay: delayFor("points") }}
            >
              <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-gray-900 sm:mb-5 sm:text-2xl dark:text-white">
                <Sparkles className="h-4 w-4 text-blue-600 sm:h-5 sm:w-5 dark:text-blue-400" />
                Key Points
              </h3>
              <div className="space-y-3 sm:space-y-4">
                {parsed.keyPoints.map((point, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 rounded-2xl border border-blue-100 bg-white p-4 shadow-sm transition-shadow hover:shadow-md sm:gap-4 sm:p-5 dark:border-gray-800 dark:bg-gray-900"
                  >
                    <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white sm:h-8 sm:w-8 sm:text-sm">
                      {index + 1}
                    </div>
                    <p className="text-sm leading-6 text-gray-700 sm:text-base sm:leading-7 dark:text-gray-300">
                      {point}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Key Takeaways */}
          {parsed.keyTakeaways.length > 0 && (
            <div
              className="mb-6 animate-fade-in-up sm:mb-8"
              style={{ animationDelay: delayFor("takeaways") }}
            >
              <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-gray-900 sm:mb-5 sm:text-2xl dark:text-white">
                <ListChecks className="h-4 w-4 text-amber-500 sm:h-5 sm:w-5" />
                Key Takeaways
              </h3>
              <div className="grid gap-3 sm:gap-4 md:grid-cols-2">
                {parsed.keyTakeaways.map((item, index) => (
                  <div
                    key={index}
                    className="rounded-2xl border border-amber-200 bg-gradient-to-br from-yellow-50 to-white p-4 shadow-sm transition-shadow hover:shadow-md sm:p-5 dark:border-yellow-900 dark:from-gray-900 dark:to-gray-800"
                  >
                    <div className="mb-2 flex items-center gap-2.5 sm:mb-3 sm:gap-3">
                      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-amber-500 text-sm font-bold text-white sm:h-8 sm:w-8">
                        ✓
                      </div>
                      <span className="text-sm font-semibold text-gray-800 sm:text-base dark:text-white">
                        Takeaway {index + 1}
                      </span>
                    </div>
                    <p className="text-sm leading-6 text-gray-700 sm:text-base sm:leading-7 dark:text-gray-300">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Quick Summary */}
          {parsed.quickSummary && (
            <div
              className="mb-6 rounded-2xl border border-green-200 bg-gradient-to-r from-green-50 to-white p-4 shadow-sm animate-fade-in-up sm:mb-8 sm:rounded-3xl sm:p-6 dark:border-green-900 dark:from-gray-900 dark:to-gray-800"
              style={{ animationDelay: delayFor("quick") }}
            >
              <div className="mb-3 flex items-center gap-3 sm:mb-4">
                <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-green-600 text-white sm:h-12 sm:w-12">
                  <Zap className="h-4 w-4 sm:h-6 sm:w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 sm:text-2xl dark:text-white">
                    Quick Summary
                  </h3>
                  <p className="text-xs text-gray-500 sm:text-base dark:text-gray-400">
                    Read this in under 30 seconds
                  </p>
                </div>
              </div>
              <p className="text-sm leading-7 text-gray-700 sm:text-base sm:leading-8 dark:text-gray-300">
                {parsed.quickSummary}
              </p>
            </div>
          )}

          {/* Action Items */}
          {parsed.actionItems.length > 0 && (
            <div
              className="animate-fade-in-up"
              style={{ animationDelay: delayFor("actions") }}
            >
              <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-gray-900 sm:mb-5 sm:text-2xl dark:text-white">
                <Target className="h-4 w-4 text-emerald-600 sm:h-5 sm:w-5 dark:text-emerald-400" />
                Action Items
              </h3>
              <div className="space-y-3 sm:space-y-4">
                {parsed.actionItems.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 shadow-sm transition-shadow hover:shadow-md sm:gap-4 sm:p-5 dark:border-emerald-900 dark:bg-gray-900"
                  >
                    <div className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-emerald-600 text-xs font-bold text-white sm:mt-1 sm:h-7 sm:w-7 sm:text-sm">
                      ✓
                    </div>
                    <p className="text-sm leading-6 text-gray-700 sm:text-base sm:leading-7 dark:text-gray-300">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}