export default function WhoUsesBriefTube() {
  const users = [
    {
      title: "🎓 Students",
      desc: "Quickly revise lectures, online courses, and educational YouTube videos before exams without watching hours of content.",
    },
    {
      title: "💻 Developers",
      desc: "Summarize programming tutorials, coding walkthroughs, AI videos and software engineering content in minutes.",
    },
    {
      title: "📈 Professionals",
      desc: "Stay updated with business podcasts, interviews, finance videos and industry discussions while saving valuable time.",
    },
    {
      title: "📚 Lifelong Learners",
      desc: "Consume more knowledge from documentaries, science channels, productivity videos and educational creators every day.",
    },
  ];

  return (
    <section className="mx-auto mt-28 max-w-7xl px-6">

      <div className="text-center">

        <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700 dark:bg-green-900/30 dark:text-green-300">
          Built For Everyone
        </span>

        <h2 className="mt-6 text-4xl font-black text-gray-900 dark:text-white md:text-5xl">
          Who Uses BriefTube?
        </h2>

        <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-600 dark:text-gray-300">
          BriefTube is designed for anyone who wants to learn faster from
          YouTube. Whether you're studying, researching, building new skills,
          or keeping up with industry trends, our AI YouTube Video Summarizer
          helps you extract the most valuable insights in seconds.
        </p>

      </div>

      <div className="mt-16 grid gap-8 md:grid-cols-2">

        {users.map((user) => (
          <div
            key={user.title}
            className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm transition hover:shadow-lg dark:border-gray-700 dark:bg-gray-900"
          >
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              {user.title}
            </h3>

            <p className="mt-4 leading-8 text-gray-600 dark:text-gray-300">
              {user.desc}
            </p>
          </div>
        ))}

      </div>

      <div className="mx-auto mt-16 max-w-4xl text-lg leading-9 text-gray-600 dark:text-gray-300">

        <p>
          From university students to software engineers, researchers,
          entrepreneurs and content creators, BriefTube makes it easier to
          understand YouTube videos without spending hours watching them.
          Generate AI-powered summaries, export your notes, and learn more in
          less time.
        </p>

      </div>

    </section>
  );
}