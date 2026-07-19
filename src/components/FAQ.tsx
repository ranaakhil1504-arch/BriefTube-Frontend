import { ChevronDown } from "lucide-react";

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
    <section className="bg-white px-4 py-12 sm:px-6 sm:py-16 md:py-20 dark:bg-gray-900">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-center text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl dark:text-white">
          Frequently Asked Questions
        </h2>

        <div className="mt-8 space-y-3 sm:mt-12 sm:space-y-5">
          {faqs.map((faq) => (
            <details
              key={faq.question}
              className="group rounded-2xl border border-gray-200 bg-gray-50 p-4 transition-colors duration-200 hover:border-blue-200 sm:p-6 dark:border-gray-700 dark:bg-gray-800 dark:hover:border-blue-800"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-semibold text-gray-900 marker:content-none sm:text-lg dark:text-white">
                {faq.question}
                <ChevronDown className="h-5 w-5 flex-shrink-0 text-gray-400 transition-transform duration-300 group-open:rotate-180 dark:text-gray-500" />
              </summary>

              <p className="mt-3 text-sm leading-6 text-gray-600 sm:mt-4 sm:text-base sm:leading-7 dark:text-gray-300">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}