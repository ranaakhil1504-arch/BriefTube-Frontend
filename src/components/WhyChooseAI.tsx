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
    <section className="mx-auto mt-16 max-w-7xl px-4 sm:mt-20 sm:px-6 lg:mt-28">
      <div className="text-center">

        <span className="rounded-full bg-violet-100 px-3 py-1.5 text-xs font-semibold text-violet-700 sm:px-4 sm:py-2 sm:text-sm dark:bg-violet-900/30 dark:text-violet-300">
          Learn Smarter
        </span>

        <h2 className="mt-4 text-2xl font-black text-gray-900 sm:mt-6 sm:text-3xl md:text-4xl lg:text-5xl dark:text-white">
          Why Use an AI YouTube Video Summarizer?
        </h2>

        <p className="mx-auto mt-4 max-w-3xl text-sm leading-6 text-gray-600 sm:mt-6 sm:text-lg sm:leading-8 dark:text-gray-300">
          Watching long YouTube videos isn't always the fastest way to learn.
          BriefTube helps you understand tutorials, lectures, podcasts,
          documentaries and educational videos by generating concise AI-powered
          summaries within seconds.
        </p>

      </div>

      <div className="mt-10 grid gap-5 sm:mt-16 sm:gap-6 md:grid-cols-2 md:gap-8">

        {reasons.map((item) => (
          <div
            key={item.title}
            className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:rounded-3xl sm:p-8 dark:border-gray-700 dark:bg-gray-900"
          >
            <h3 className="text-lg font-bold text-gray-900 sm:text-2xl dark:text-white">
              {item.title}
            </h3>

            <p className="mt-2.5 text-sm leading-6 text-gray-600 sm:mt-4 sm:text-base sm:leading-8 dark:text-gray-300">
              {item.desc}
            </p>
          </div>
        ))}

      </div>

      <div className="mx-auto mt-10 max-w-4xl text-sm leading-6 text-gray-600 sm:mt-16 sm:text-lg sm:leading-9 dark:text-gray-300">

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