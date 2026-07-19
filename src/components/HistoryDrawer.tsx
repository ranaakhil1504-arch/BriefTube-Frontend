import {
  Sparkles,
  PlayCircle,
  FileText,
  Zap,
} from "lucide-react";

import UrlInput from "./UrlInput";

type HeroProps = {
  onGenerate: (url: string) => void;
  loading: boolean;
};

export default function Hero({
  onGenerate,
  loading,
}: HeroProps) {
  return (
  <section
  id="hero"
  aria-labelledby="hero-title"
  className="relative isolate overflow-hidden bg-white dark:bg-gray-950"
>

  {/* Background */}

  <div className="absolute inset-0 -z-30 bg-gradient-to-b from-slate-50 via-white to-blue-50 dark:from-gray-950 dark:via-gray-900 dark:to-slate-900" />

  <div className="absolute left-1/2 top-24 -z-20 h-[220px] w-[220px] -translate-x-1/2 rounded-full bg-gradient-to-r from-blue-500/20 via-violet-500/20 to-cyan-400/20 blur-3xl sm:h-[280px] sm:w-[280px] md:h-[340px] md:w-[340px]" />

  <div className="mx-auto flex min-h-0 max-w-7xl flex-col items-center justify-center px-4 py-14 text-center sm:px-6 sm:py-16 md:min-h-[85vh] md:py-20">

    {/* AI Badge */}

    <div className="animate-floating mb-6 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white/80 px-4 py-1.5 shadow-md backdrop-blur-sm sm:mb-8 sm:px-5 sm:py-2 dark:border-gray-700 dark:bg-gray-900/80">

      <Sparkles className="h-3.5 w-3.5 text-blue-600 sm:h-4 sm:w-4 dark:text-blue-400" />

      <span className="text-xs font-semibold text-blue-700 sm:text-sm dark:text-blue-300">
        Powered by Gemini AI
      </span>

    </div>

    {/* Heading */}

    <div className="relative">


      <h1
  id="hero-title"
  className="relative max-w-5xl text-3xl font-black leading-tight tracking-tight text-gray-900 sm:text-4xl md:text-6xl lg:text-7xl dark:text-white"
>

        Free AI

<span className="bg-gradient-to-r from-blue-600 via-violet-600 to-purple-600 bg-clip-text text-transparent">
  YouTube Video Summarizer
</span>

for Instant Summaries
      </h1>

    </div>

    {/* Description */}

    <p className="mt-5 max-w-3xl text-base leading-7 text-gray-600 sm:mt-8 sm:text-lg sm:leading-9 md:text-xl dark:text-gray-300">
     Turn any YouTube video into accurate AI-generated summaries in seconds using BriefTube. Save time by extracting key points, timestamps and notes from tutorials, lectures, podcasts, interviews and educational videos. Export summaries as PDF, Markdown or TXT completely free.
    </p>

       {/* URL Input */}

<div className="mt-8 w-full sm:mt-12">
  <UrlInput
    onGenerate={onGenerate}
    loading={loading}
  />
</div>

{/* Small Trust Text */}

<p className="mt-5 text-xs text-gray-500 sm:mt-6 sm:text-sm dark:text-gray-400">
  Trusted for lectures, coding tutorials, podcasts, documentaries, interviews, online courses and educational YouTube videos.
</p>
<div className="mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs font-medium text-gray-500 sm:mt-8 sm:gap-6 sm:text-sm dark:text-gray-400">

  <span>⚡ Instant AI Summary</span>

  <span>🆓 Free Forever</span>

  <span>📄 PDF Export</span>

  <span>🎥 Works with Public YouTube Videos</span>

</div>
{/* Features */}

<div className="mt-12 grid w-full max-w-6xl grid-cols-1 gap-4 sm:mt-16 sm:gap-6 md:mt-20 md:grid-cols-3">

  {/* Card 1 */}

  <div className="group rounded-2xl border border-gray-100 bg-white/80 p-5 shadow-lg backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-red-200 hover:shadow-2xl hover:shadow-red-100 sm:rounded-3xl sm:p-8 dark:border-gray-700 dark:bg-gray-900/80">

    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 sm:h-16 sm:w-16 sm:rounded-2xl dark:bg-red-900/30">

      <PlayCircle className="h-6 w-6 text-red-500 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6 sm:h-9 sm:w-9" />

    </div>

    <h3 className="mt-4 text-lg font-bold text-gray-900 sm:mt-6 sm:text-xl dark:text-white">
      Any YouTube Video
    </h3>

    <p className="mt-2.5 text-sm leading-6 text-gray-600 sm:mt-3 sm:text-base sm:leading-7 dark:text-gray-300">
      Supports tutorials, podcasts, interviews, documentaries,
      educational content and much more.
    </p>

  </div>

  {/* Card 2 */}

  <div className="group rounded-2xl border border-gray-100 bg-white/80 p-5 shadow-lg backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-yellow-200 hover:shadow-2xl hover:shadow-yellow-100 sm:rounded-3xl sm:p-8 dark:border-gray-700 dark:bg-gray-900/80">

    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-50 sm:h-16 sm:w-16 sm:rounded-2xl dark:bg-yellow-900/30">

      <Zap className="h-6 w-6 text-yellow-500 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 sm:h-9 sm:w-9" />

    </div>

    <h3 className="mt-4 text-lg font-bold text-gray-900 sm:mt-6 sm:text-xl dark:text-white">
      Lightning Fast AI
    </h3>

    <p className="mt-2.5 text-sm leading-6 text-gray-600 sm:mt-3 sm:text-base sm:leading-7 dark:text-gray-300">
      Powered by Gemini AI to generate clean, structured summaries
      within seconds.
    </p>

  </div>

  {/* Card 3 */}

  <div className="group rounded-2xl border border-gray-100 bg-white/80 p-5 shadow-lg backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-2xl hover:shadow-blue-100 sm:rounded-3xl sm:p-8 dark:border-gray-700 dark:bg-gray-900/80">

    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 sm:h-16 sm:w-16 sm:rounded-2xl dark:bg-blue-900/30">

      <FileText className="h-6 w-6 text-blue-600 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6 sm:h-9 sm:w-9" />

    </div>

    <h3 className="mt-4 text-lg font-bold text-gray-900 sm:mt-6 sm:text-xl dark:text-white">
      Export Anywhere
    </h3>

    <p className="mt-2.5 text-sm leading-6 text-gray-600 sm:mt-3 sm:text-base sm:leading-7 dark:text-gray-300">
      Download summaries instantly as PDF, Markdown or TXT, or copy
      them with a single click.
    </p>

  </div>

</div>

</div>

</section>
  
  );
}