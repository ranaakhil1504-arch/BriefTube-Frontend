export default function TrustSection() {
  const stats = [
    {
      value: "10K+",
      label: "Videos Summarized",
    },
    {
      value: "50K+",
      label: "AI Summaries Generated",
    },
    {
      value: "99%",
      label: "User Satisfaction",
    },
    {
      value: "24/7",
      label: "Available Online",
    },
  ];

  const features = [
    "Powered by Gemini AI",
    "Export to PDF, Markdown & TXT",
    "Fast & Accurate Summaries",
    "Works with Long YouTube Videos",
  ];

  return (
    <section className="mx-auto mt-28 max-w-7xl px-6">

      <div className="rounded-[40px] bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 px-10 py-20 text-white shadow-2xl">

        <div className="text-center">

          <h2 className="text-4xl font-black md:text-5xl">
            Trusted by Learners Worldwide
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg text-blue-100">
            BriefTube helps students, developers, researchers and professionals
            learn faster with AI-powered YouTube summaries.
          </p>

        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-4">

          {stats.map((item) => (
            <div
              key={item.label}
              className="rounded-3xl bg-white/10 p-8 text-center backdrop-blur"
            >
              <div className="text-5xl font-black">
                {item.value}
              </div>

              <div className="mt-3 text-blue-100">
                {item.label}
              </div>
            </div>
          ))}

        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2">

          {features.map((feature) => (
            <div
              key={feature}
              className="flex items-center gap-4 rounded-2xl bg-white/10 p-5 backdrop-blur"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500 font-bold">
                ✓
              </div>

              <span className="text-lg font-medium">
                {feature}
              </span>
            </div>
          ))}

        </div>

      </div>

    </section>
  );
}