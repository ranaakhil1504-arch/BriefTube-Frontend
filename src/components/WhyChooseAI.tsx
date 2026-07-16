export default function WhyChooseAI() {
  const reasons = [
    {
      title: "Save Hours Every Week",
      desc: "Skip lengthy videos and instantly understand the key ideas in just a few minutes.",
    },
    {
      title: "Study More Efficiently",
      desc: "Perfect for students preparing for exams, revising lectures and taking quick notes.",
    },
    {
      title: "Research Faster",
      desc: "Quickly extract important insights from interviews, documentaries and educational content.",
    },
    {
      title: "Boost Productivity",
      desc: "Professionals and creators can consume more knowledge without spending hours watching videos.",
    },
  ];

  return (
    <section className="mx-auto mt-28 max-w-7xl px-6">
      <div className="text-center">

        <span className="rounded-full bg-violet-100 px-4 py-2 text-sm font-semibold text-violet-700 dark:bg-violet-900/30 dark:text-violet-300">
          Learn Smarter
        </span>

        <h2 className="mt-6 text-4xl font-black text-gray-900 dark:text-white md:text-5xl">
          Why Use an AI YouTube Video Summarizer?
        </h2>

        <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-600 dark:text-gray-300">
          Watching long YouTube videos isn't always the fastest way to learn.
          BriefTube helps you understand tutorials, lectures, podcasts,
          documentaries and educational videos by generating concise AI-powered
          summaries within seconds.
        </p>

      </div>

      <div className="mt-16 grid gap-8 md:grid-cols-2">

        {reasons.map((item) => (
          <div
            key={item.title}
            className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-700 dark:bg-gray-900"
          >
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              {item.title}
            </h3>

            <p className="mt-4 leading-8 text-gray-600 dark:text-gray-300">
              {item.desc}
            </p>
          </div>
        ))}

      </div>

      <div className="mx-auto mt-16 max-w-4xl text-lg leading-9 text-gray-600 dark:text-gray-300">

        <p>
          Whether you're learning programming, preparing for competitive exams,
          following business podcasts, studying university lectures or watching
          technology tutorials, BriefTube helps you focus on the information
          that matters most. Our AI-powered YouTube Video Summarizer reduces
          information overload while making learning faster and more enjoyable.
        </p>

      </div>

    </section>
  );
}