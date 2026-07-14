import { useState } from "react";
import toast from "react-hot-toast";
import { parseSummary } from "../utils/parseSummary";
import {
  Copy,
  Check,
  Download,
  FileText,
  FileCode2,
  PlayCircle,
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
const parsed = parseSummary(summary);
  async function handleCopy() {

    try {

      await navigator.clipboard.writeText(summary);

      setCopied(true);
toast.success("Summary copied!");
      setTimeout(() => {

        setCopied(false);

      }, 2000);

    } catch {

      alert("Failed to copy summary.");

    }

  }

async function handleShare() {
  try {
    if (navigator.share) {
      await navigator.share({
        title: video.title,
        text: summary,
      });

      toast.success("Summary shared!");
    } else {
      await navigator.clipboard.writeText(summary);

      toast.success("Summary copied for sharing!");
    }
  } catch {
    toast.error("Sharing cancelled.");
  }
}
  function downloadFile(

    content: string,

    filename: string,

    type: string

  ) {

    const blob = new Blob([content], {

      type,

    });

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

    downloadFile(

      summary,

      `${video.title}.txt`,

      "text/plain;charset=utf-8"

    );
toast.success("TXT downloaded!");
  }
function handleDownloadMarkdown() {
  downloadFile(
    summary,
    `${video.title}.md`,
    "text/markdown;charset=utf-8"
  );

  toast.success("Markdown downloaded!");
}
async function handleDownloadPdf() {
  try {
    toast.loading("Generating PDF...", {
      id: "pdf",
    });

    const [{ pdf }, { default: PdfDocument }] = await Promise.all([
      import("@react-pdf/renderer"),
      import("../pdf/PdfDocument"),
    ]);

    const blob = await pdf(
      <PdfDocument
        video={video}
        parsed={parsed}
      />
    ).toBlob();

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;

    link.download = `${video.title}.pdf`;

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);

    toast.success("PDF downloaded!", {
      id: "pdf",
    });

  } catch (err) {

    console.error(err);

    toast.error("Failed to generate PDF", {
      id: "pdf",
    });

  }
}

  return (
           <div className="animate-summary mx-auto mt-10 w-full max-w-6xl overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl dark:border-gray-700 dark:bg-gray-900">

<div className="overflow-hidden rounded-[32px] border border-white/60 bg-white/90 shadow-2xl backdrop-blur-xl dark:border-gray-700 dark:bg-gray-900/90">
        {/* Thumbnail */}

        <div className="relative">

          <img
  src={video.thumbnail}
  alt={video.title}
  loading="lazy"
  decoding="async"
  className="h-80 w-full object-cover"
/>

          {/* Gradient Overlay */}

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          {/* Video Badge */}

            <div className="absolute left-6 top-6 flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 shadow-lg backdrop-blur dark:bg-gray-900/80">
            <PlayCircle className="h-5 w-5 text-red-600" />

            <span className="text-sm font-semibold text-gray-800 dark:text-white">
              YouTube Video
            </span>

          </div>

          {/* Video Information */}

          <div className="absolute bottom-6 left-6 right-6">

            <h2 className="text-4xl font-extrabold leading-tight text-white drop-shadow-lg">

              {video.title}

            </h2>

            <p className="mt-3 text-lg font-medium text-gray-200">

              👤 {video.channel}

            </p>

          </div>

        </div>

        {/* Body */}

        <div className="p-8 dark:bg-gray-900">

          {/* Toolbar */}

          <div className="mb-8 flex flex-wrap items-center justify-between gap-4">

            <div>

              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">

                📄 AI Generated Summary

              </h3>

              <p className="mt-1 text-gray-500 dark:text-gray-400">

                Beautifully organized by Gemini AI

              </p>

            </div>

            <div className="flex flex-wrap gap-3">
                            <button
                onClick={handleCopy}
                className={`flex items-center gap-2 rounded-xl px-5 py-3 font-semibold transition-all duration-300 ${
                  copied
                    ? "bg-green-600 text-white shadow-lg"
                    : "bg-blue-600 text-white hover:scale-105 hover:bg-blue-700"
                }`}
              >
                {copied ? (
                  <>
                    <Check className="h-5 w-5" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="h-5 w-5" />
                    Copy
                  </>
                )}
              </button>

              <button
                onClick={handleDownloadTxt}
                className="flex items-center gap-2 rounded-xl bg-gray-700 px-5 py-3 font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-gray-800"
              >
                <FileText className="h-5 w-5" />
                TXT
              </button>

              <button
                onClick={handleDownloadMarkdown}
                className="flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-indigo-700"
              >
                <FileCode2 className="h-5 w-5" />
                Markdown
              </button>

              <button
                onClick={handleDownloadPdf}
                className="flex items-center gap-2 rounded-xl bg-red-600 px-5 py-3 font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-red-700"
              >
                <Download className="h-5 w-5" />
                PDF
              </button>
              
                <button
  onClick={handleShare}
  className="rounded-lg bg-emerald-600 px-4 py-2 font-medium text-white transition hover:bg-emerald-700"
>
  🔗 Share
</button>
<button
  onClick={onClear}
  className="rounded-lg bg-gray-600 px-4 py-2 font-medium text-white transition hover:bg-gray-700"
>
  🗑 Clear
</button>
            </div>

          </div>

         {/* Summary */}

<div className="rounded-3xl border border-blue-100 bg-gradient-to-br from-blue-50 to-slate-50 p-8 shadow-inner dark:border-gray-700 dark:from-gray-900 dark:to-gray-800">

  {/* Executive Summary Card */}

  {parsed.executiveSummary && (
  <div className="mb-8 rounded-3xl border border-blue-200 bg-gradient-to-r from-blue-50 via-white to-indigo-50 p-8 shadow-sm dark:border-blue-800 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800">

    <div className="mb-4 flex items-center gap-3">

      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-2xl text-white">
        📄
      </div>

      <div>

        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
          Executive Summary
        </h3>

        <p className="text-gray-500 dark:text-gray-400">
          AI Generated Overview
        </p>

      </div>

    </div>

    <p className="leading-8 text-gray-700 dark:text-gray-300">
      {parsed.executiveSummary}
    </p>

  </div>
)}
{parsed.keyPoints.length > 0 && (
  <div className="mb-8">
    <h3 className="mb-5 text-2xl font-bold text-gray-900 dark:text-white">
      ⭐ Key Points
    </h3>

    <div className="space-y-4">
      {parsed.keyPoints.map((point, index) => (
        <div
          key={index}
          className="flex items-start gap-4 rounded-2xl border border-blue-100 bg-white p-5 shadow-sm transition hover:shadow-md dark:border-gray-700 dark:bg-gray-900"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
            {index + 1}
          </div>

          <p className="leading-7 text-gray-700 dark:text-gray-300">
            {point}
          </p>
        </div>
      ))}
    </div>
  </div>
)}
{parsed.keyTakeaways.length > 0 && (
  <div className="mb-8">
    <h3 className="mb-5 text-2xl font-bold text-gray-900 dark:text-white">
      💡 Key Takeaways
    </h3>

    <div className="grid gap-4 md:grid-cols-2">
      {parsed.keyTakeaways.map((item, index) => (
        <div
          key={index}
          className="rounded-2xl border border-amber-200 bg-gradient-to-br from-yellow-50 to-white p-5 shadow-sm transition hover:shadow-md dark:border-yellow-800 dark:from-gray-900 dark:to-gray-800"
        >
          <div className="mb-3 flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-500 font-bold text-white">
              ✓
            </div>

            <span className="font-semibold text-gray-800 dark:text-white">
              Takeaway {index + 1}
            </span>
          </div>

            <p className="leading-7 text-gray-300">
            {item}
          </p>
        </div>
      ))}
    </div>
  </div>
)}
{parsed.quickSummary && (
  <div className="mb-8 rounded-3xl border border-green-200 bg-gradient-to-r from-green-50 to-white p-6 shadow-sm dark:border-green-800 dark:from-gray-900 dark:to-gray-800">

    <div className="mb-4 flex items-center gap-3">

      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-600 text-white text-2xl">
        ⚡
      </div>

      <div>

        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
          Quick Summary
        </h3>

        <p className="text-gray-500 dark:text-gray-400">
          Read this in under 30 seconds
        </p>

      </div>

    </div>

    <p className="leading-8 text-gray-700 dark:text-gray-300">
      {parsed.quickSummary}
    </p>

  </div>
)}
{parsed.actionItems.length > 0 && (
  <div className="mb-8">

    <h3 className="mb-5 text-2xl font-bold text-gray-900 dark:text-white">
      🎯 Action Items
    </h3>

    <div className="space-y-4">

      {parsed.actionItems.map((item, index) => (

        <div
          key={index}
          className="flex items-start gap-4 rounded-2xl border border-emerald-200 bg-emerald-50 p-5 shadow-sm transition hover:shadow-md dark:border-emerald-800 dark:bg-gray-900"
        >

          <div className="mt-1 flex h-7 w-7 items-center justify-center rounded-full bg-emerald-600 font-bold text-white">
            ✓
          </div>

          <p className="leading-7 text-gray-700 dark:text-gray-300">
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

    </div>
  );
}