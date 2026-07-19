import {
  Brain,
  Zap,
  FileDown,
  History,
  Moon,
  ShieldCheck,
} from "lucide-react";

export default function Features() {
  const features = [
    {
      icon: Brain,
      title: "AI Powered Summaries",
      desc: "Generate clean, structured summaries using the latest Gemini AI models.",
      color: "text-blue-600",
      bg: "bg-blue-100 dark:bg-blue-900/30",
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      desc: "Paste a YouTube link and receive an AI summary in just a few seconds.",
      color: "text-yellow-500",
      bg: "bg-yellow-100 dark:bg-yellow-900/30",
    },
    {
      icon: FileDown,
      title: "Export Anywhere",
      desc: "Download your summaries as PDF, TXT or Markdown with one click.",
      color: "text-red-500",
      bg: "bg-red-100 dark:bg-red-900/30",
    },
    {
      icon: History,
      title: "Summary History",
      desc: "Access previously generated summaries whenever you need them.",
      color: "text-green-600",
      bg: "bg-green-100 dark:bg-green-900/30",
    },
    {
      icon: Moon,
      title: "Beautiful Dark Mode",
      desc: "Comfortable reading experience in both light and dark themes.",
      color: "text-indigo-600",
      bg: "bg-indigo-100 dark:bg-indigo-900/30",
    },
    {
      icon: ShieldCheck,
      title: "Privacy First",
      desc: "We don't store your YouTube videos. Only your summaries are saved when you're signed in.",
      color: "text-emerald-600",
      bg: "bg-emerald-100 dark:bg-emerald-900/30",
    },
  ];

  return (
    <section className="mx-auto mt-16 max-w-7xl px-4 sm:mt-20 sm:px-6 lg:mt-28">

      <div className="text-center">

        <span className="rounded-full bg-blue-100 px-3 py-1.5 text-xs font-semibold text-blue-700 sm:px-4 sm:py-2 sm:text-sm dark:bg-blue-900/30 dark:text-blue-300">
          Why Millions Choose BriefTube
        </span>

        <h2 className="mt-4 text-2xl font-black text-gray-900 sm:mt-6 sm:text-3xl md:text-4xl lg:text-5xl dark:text-white">
         Everything You Need From an AI YouTube Video Summarizer
        </h2>

        <p className="mx-auto mt-4 max-w-3xl text-sm leading-6 text-gray-600 sm:mt-6 sm:text-lg sm:leading-8 dark:text-gray-300">
        BriefTube is a free AI YouTube Video Summarizer that converts long YouTube videos into structured summaries, key takeaways and downloadable notes. Save time while learning from tutorials, podcasts, interviews and educational videos.
        </p>

      </div>

      <div className="mt-10 grid gap-5 sm:mt-16 sm:gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3">

        {features.map((feature) => {
          const Icon = feature.icon;

          return (
            <div
              key={feature.title}
              className="group rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl sm:rounded-3xl sm:p-6 md:p-8 dark:border-gray-700 dark:bg-gray-900"
            >

              <div
                className={`flex h-12 w-12 items-center justify-center rounded-xl sm:h-14 sm:w-14 sm:rounded-2xl md:h-16 md:w-16 ${feature.bg}`}
              >
                <Icon
                  className={`h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 ${feature.color} transition-transform duration-300 group-hover:scale-125`}
                />
              </div>

              <h3 className="mt-4 text-lg font-bold text-gray-900 sm:mt-5 sm:text-xl md:mt-6 md:text-2xl dark:text-white">
                {feature.title}
              </h3>

              <p className="mt-2.5 text-sm leading-6 text-gray-600 sm:mt-4 sm:text-base sm:leading-8 dark:text-gray-300">
                {feature.desc}
              </p>

            </div>
          );
        })}

      </div>

    </section>
  );
}