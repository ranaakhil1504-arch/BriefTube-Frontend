export default function Features() {
  const features = [
    {
      title: "AI Powered",
      desc: "Generate accurate summaries using advanced AI models."
    },
    {
      title: "Instant Results",
      desc: "Get concise summaries in seconds."
    },
    {
      title: "Export Notes",
      desc: "Download summaries as PDF or Markdown."
    },
    {
      title: "Summary History",
      desc: "Access previously generated summaries anytime."
    },
    {
      title: "Dark Mode",
      desc: "Comfortable reading experience day and night."
    },
    {
      title: "Free to Use",
      desc: "Start summarizing YouTube videos without paying."
    }
  ];

  return (
    <section className="mx-auto mt-24 max-w-7xl px-6">
      <div className="text-center">
        <h2 className="text-4xl font-extrabold">
          Why Choose BriefTube?
        </h2>

        <p className="mt-4 text-gray-500 dark:text-gray-400">
          Everything you need to summarize YouTube videos efficiently.
        </p>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-gray-700 dark:bg-gray-900"
          >
            <h3 className="text-xl font-bold">
              {feature.title}
            </h3>

            <p className="mt-4 text-gray-600 dark:text-gray-400">
              {feature.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}