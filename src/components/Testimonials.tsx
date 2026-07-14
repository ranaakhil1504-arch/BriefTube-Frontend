export default function Testimonials() {
  const reviews = [
    {
      name: "Rahul",
      role: "Student",
      text: "BriefTube saves me hours every week while preparing for competitive exams.",
    },
    {
      name: "Emily",
      role: "Content Creator",
      text: "The summaries are surprisingly accurate. My research workflow became much faster.",
    },
    {
      name: "James",
      role: "Developer",
      text: "The clean interface and AI summaries are exactly what I needed.",
    },
  ];

  return (
    <section className="bg-gray-50 px-6 py-20 dark:bg-gray-950">
      <div className="mx-auto max-w-7xl">

        <h2 className="text-center text-4xl font-bold text-gray-900 dark:text-white">
          Loved by Learners Worldwide
        </h2>

        <p className="mt-4 text-center text-gray-600 dark:text-gray-400">
          Thousands of users summarize YouTube videos faster with BriefTube.
        </p>

        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {reviews.map((review) => (
            <div
              key={review.name}
              className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-xl dark:border-gray-700 dark:bg-gray-900"
            >
              <div className="mb-5 text-4xl">⭐️⭐️⭐️⭐️⭐️</div>

              <p className="leading-7 text-gray-600 dark:text-gray-300">
                "{review.text}"
              </p>

              <div className="mt-6">
                <h3 className="font-bold text-gray-900 dark:text-white">
                  {review.name}
                </h3>

                <p className="text-sm text-gray-500">
                  {review.role}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}