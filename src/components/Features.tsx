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
    <section className="mx-auto mt-28 max-w-7xl px-6">

      <div className="text-center">

        <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
          Why Millions Choose BriefTube
        </span>

        <h2 className="mt-6 text-4xl font-black text-gray-900 dark:text-white md:text-5xl">
         Everything You Need From an AI YouTube Video Summarizer
        </h2>

        <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-600 dark:text-gray-300">
        BriefTube is a free AI YouTube Video Summarizer that converts long YouTube videos into structured summaries, key takeaways and downloadable notes. Save time while learning from tutorials, podcasts, interviews and educational videos.
        </p>

      </div>

      <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">

        {features.map((feature) => {
          const Icon = feature.icon;

          return (
            <div
              key={feature.title}
              className="group rounded-3xl border border-gray-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl dark:border-gray-700 dark:bg-gray-900"
            >

              <div
                className={`flex h-16 w-16 items-center justify-center rounded-2xl ${feature.bg}`}
              >
                <Icon
                  className={`h-8 w-8 ${feature.color} transition-transform duration-300 group-hover:scale-125`}
                />
              </div>

              <h3 className="mt-6 text-2xl font-bold text-gray-900 dark:text-white">
                {feature.title}
              </h3>

              <p className="mt-4 leading-8 text-gray-600 dark:text-gray-300">
                {feature.desc}
              </p>

            </div>
          );
        })}

      </div>

    </section>
  );
}