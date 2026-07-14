import SEO from "../components/SEO";

export default function About() {
  return (
      <>
    <SEO
      title="About BriefTube | AI YouTube Video Summarizer"
      description="Learn about BriefTube, our mission, and how we help millions summarize YouTube videos with AI."
    />
    <section className="min-h-screen bg-gray-50 px-6 py-16 text-gray-800 transition-colors dark:bg-gray-950 dark:text-gray-100">
      <div className="mx-auto max-w-5xl">

        <h1 className="mb-8 text-4xl font-extrabold">
          About BriefTube
        </h1>

        <p className="mb-10 text-lg leading-8 text-gray-600 dark:text-gray-400">
          BriefTube is an AI-powered YouTube video summarizer designed to help
          students, professionals, creators and lifelong learners consume
          knowledge faster.
        </p>

        <div className="grid gap-8 md:grid-cols-3">

          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900">
            <h2 className="mb-3 text-xl font-bold">
              🚀 Our Mission
            </h2>

            <p className="text-gray-600 dark:text-gray-400">
              Make learning from YouTube effortless by transforming long videos
              into concise, structured summaries.
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900">
            <h2 className="mb-3 text-xl font-bold">
              🤖 AI Powered
            </h2>

            <p className="text-gray-600 dark:text-gray-400">
              BriefTube uses modern AI models to generate accurate summaries,
              key takeaways and easy-to-read notes.
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900">
            <h2 className="mb-3 text-xl font-bold">
              ⚡ Fast & Free
            </h2>

            <p className="text-gray-600 dark:text-gray-400">
              Paste a YouTube link and receive a clean summary within seconds.
            </p>
          </div>

        </div>

        <div className="mt-16 rounded-3xl bg-gradient-to-r from-blue-600 to-violet-600 p-10 text-center text-white">

          <h2 className="mb-4 text-3xl font-bold">
            Learn Smarter, Not Harder
          </h2>

          <p className="mx-auto max-w-3xl text-lg opacity-90">
            Whether you're preparing for exams, researching a topic, or saving
            time, BriefTube helps you get the key insights without watching
            hours of content.
          </p>

        </div>

      </div>
    </section>
      </>
  );
}