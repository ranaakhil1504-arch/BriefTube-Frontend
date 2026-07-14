const faqs = [
  {
    question: "Is BriefTube free?",
    answer:
      "Yes. BriefTube currently offers free AI-powered YouTube video summaries."
  },
  {
    question: "How does BriefTube work?",
    answer:
      "Paste a YouTube URL and our AI analyzes the transcript to generate a concise summary with key takeaways."
  },
  {
    question: "Do I need to create an account?",
    answer:
      "No. You can generate summaries without logging in. Logging in allows you to save your summary history."
  },
  {
    question: "Can I summarize long YouTube videos?",
    answer:
      "Yes. BriefTube supports both short videos and long-form content."
  },
  {
    question: "Is my data secure?",
    answer:
      "Yes. We only store information necessary to provide the service and your summary history."
  }
];

export default function FAQ() {
  return (
    <section className="bg-white px-6 py-20 dark:bg-gray-900">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-center text-4xl font-bold text-gray-900 dark:text-white">
          Frequently Asked Questions
        </h2>

        <div className="mt-12 space-y-5">
          {faqs.map((faq) => (
            <details
              key={faq.question}
              className="rounded-2xl border border-gray-200 bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-800"
            >
              <summary className="cursor-pointer text-lg font-semibold">
                {faq.question}
              </summary>

              <p className="mt-4 leading-7 text-gray-600 dark:text-gray-300">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}