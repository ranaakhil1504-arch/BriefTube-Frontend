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
  aria-labelledby="hero-title"
  className="relative isolate overflow-hidden bg-white dark:bg-gray-950"
>

  {/* Background */}

  <div className="absolute inset-0 -z-30 bg-gradient-to-b from-slate-50 via-white to-blue-50 dark:from-gray-950 dark:via-gray-900 dark:to-slate-900" />

  <div className="absolute left-1/2 top-24 -z-20 h-[340px] w-[340px] -translate-x-1/2 rounded-full bg-gradient-to-r from-blue-500/20 via-violet-500/20 to-cyan-400/20 blur-3xl" />

  <div className="mx-auto flex min-h-[85vh] max-w-7xl flex-col items-center justify-center px-6 py-20 text-center">

    {/* AI Badge */}

    <div className="animate-floating mb-8 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white/80 px-5 py-2 shadow-md backdrop-blur-sm dark:border-gray-700 dark:bg-gray-900/80">

      <Sparkles className="h-4 w-4 text-blue-600 dark:text-blue-400" />

      <span className="text-sm font-semibold text-blue-700 dark:text-blue-300">
        Powered by Gemini AI
      </span>

    </div>

    {/* Heading */}

    <div className="relative">


      <h1
  style={{ contentVisibility: "visible" }} className="relative max-w-5xl text-5xl font-black leading-tight tracking-tight text-gray-900 dark:text-white md:text-7xl">

        Summarize

        <span className="bg-gradient-to-r from-blue-600 via-violet-600 to-purple-600 bg-clip-text text-transparent">
          {" "}
          YouTube Videos{" "}
        </span>

        in Seconds

      </h1>

    </div>

    {/* Description */}

    <p className="mt-8 max-w-3xl text-lg leading-9 text-gray-600 dark:text-gray-300 md:text-xl">
     Transform long YouTube videos into concise, AI-powered summaries in seconds using BriefTube. Our free AI YouTube Video Summarizer helps students, professionals, researchers and creators quickly understand tutorials, lectures, podcasts, interviews and educational content. Export your summaries as PDF, Markdown or TXT in one click.
    </p>

       {/* URL Input */}

<div className="mt-12 w-full">
  <UrlInput
    onGenerate={onGenerate}
    loading={loading}
  />
</div>

{/* Small Trust Text */}

<p className="mt-6 text-sm text-gray-500 dark:text-gray-400">
  Trusted for lectures, coding tutorials, podcasts, documentaries, interviews, online courses and educational YouTube videos.
</p>

{/* Features */}

<div className="mt-20 grid w-full max-w-6xl grid-cols-1 gap-6 md:grid-cols-3">

  {/* Card 1 */}

  <div className="group rounded-3xl border border-gray-100 bg-white/80 p-8 shadow-lg backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-red-200 hover:shadow-2xl hover:shadow-red-100 dark:border-gray-700 dark:bg-gray-900/80">

    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 dark:bg-red-900/30">

      <PlayCircle className="h-9 w-9 text-red-500 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6" />

    </div>

    <h3 className="mt-6 text-xl font-bold text-gray-900 dark:text-white">
      Any YouTube Video
    </h3>

    <p className="mt-3 leading-7 text-gray-600 dark:text-gray-300">
      Supports tutorials, podcasts, interviews, documentaries,
      educational content and much more.
    </p>

  </div>

  {/* Card 2 */}

  <div className="group rounded-3xl border border-gray-100 bg-white/80 p-8 shadow-lg backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-yellow-200 hover:shadow-2xl hover:shadow-yellow-100 dark:border-gray-700 dark:bg-gray-900/80">

    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-yellow-50 dark:bg-yellow-900/30">

      <Zap className="h-9 w-9 text-yellow-500 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3" />

    </div>

    <h3 className="mt-6 text-xl font-bold text-gray-900 dark:text-white">
      Lightning Fast AI
    </h3>

    <p className="mt-3 leading-7 text-gray-600 dark:text-gray-300">
      Powered by Gemini AI to generate clean, structured summaries
      within seconds.
    </p>

  </div>

  {/* Card 3 */}

  <div className="group rounded-3xl border border-gray-100 bg-white/80 p-8 shadow-lg backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-2xl hover:shadow-blue-100 dark:border-gray-700 dark:bg-gray-900/80">

    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 dark:bg-blue-900/30">

      <FileText className="h-9 w-9 text-blue-600 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6" />

    </div>

    <h3 className="mt-6 text-xl font-bold text-gray-900 dark:text-white">
      Export Anywhere
    </h3>

    <p className="mt-3 leading-7 text-gray-600 dark:text-gray-300">
      Download summaries instantly as PDF, Markdown or TXT, or copy
      them with a single click.
    </p>

  </div>

</div>

</div>

</section>
  
  );
}