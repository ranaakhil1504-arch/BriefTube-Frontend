import SEO from "../components/SEO";
const faqs = [
  {
    question: "What is BriefTube?",
    answer:
      "BriefTube is an AI-powered YouTube video summarizer that converts long videos into concise, easy-to-read summaries within seconds.",
  },
  {
    question: "Is BriefTube free?",
    answer:
      "Yes. BriefTube currently offers free AI-generated YouTube summaries.",
  },
  {
    question: "Do I need to create an account?",
    answer:
      "No. You can summarize videos without signing in. Creating an account lets you save your summary history.",
  },
  {
    question: "Which AI model does BriefTube use?",
    answer:
      "BriefTube uses modern AI models to generate accurate summaries from YouTube transcripts.",
  },
  {
    question: "Can I summarize long YouTube videos?",
    answer:
      "Yes. BriefTube supports both short and long YouTube videos as long as transcripts are available.",
  },
  {
    question: "Does BriefTube store my videos?",
    answer:
      "No. BriefTube stores only your generated summaries when you're signed in.",
  },
];

export default function FAQ() {
  return (
    <>
      <SEO
        title="FAQ | BriefTube"
        description="Frequently asked questions about BriefTube AI YouTube Video Summarizer."
      />

      <section className="min-h-screen bg-gray-50 px-6 py-16 dark:bg-gray-950">
        <div className="mx-auto max-w-5xl">

          <h1 className="mb-4 text-center text-4xl font-extrabold text-gray-900 dark:text-white">
            Frequently Asked Questions
          </h1>

          <p className="mb-12 text-center text-gray-600 dark:text-gray-400">
            Everything you need to know about BriefTube.
          </p>

          <div className="space-y-6">

            {faqs.map((faq) => (
              <div
                key={faq.question}
                className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900"
              >
                <h2 className="mb-3 text-xl font-bold text-gray-900 dark:text-white">
                  {faq.question}
                </h2>

                <p className="leading-7 text-gray-600 dark:text-gray-400">
                  {faq.answer}
                </p>
              </div>
            ))}

          </div>

        </div>
      </section>
    </>
  );
}