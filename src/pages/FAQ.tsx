import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import FAQPageSchema from "../components/FAQPageSchema";
const faqs = [
  {
    question: "What is BriefTube?",
    answer:
      "BriefTube is a free AI YouTube Video Summarizer that converts long YouTube videos into concise summaries, key takeaways and downloadable notes using advanced AI.",
  },
  {
    question: "Is BriefTube free?",
    answer:
      "Yes. BriefTube currently offers free AI-powered YouTube video summaries. Simply paste a public YouTube link and generate a summary in seconds.",
  },
  {
    question: "How does BriefTube work?",
    answer:
      "BriefTube analyzes the transcript of a YouTube video using advanced AI and generates a structured summary with the most important points, making long videos much easier to understand.",
  },
  {
    question: "Which AI model powers BriefTube?",
    answer:
      "BriefTube uses Google's Gemini AI to generate high-quality summaries that are easy to read, accurate and well structured.",
  },
  {
    question: "Can I summarize long YouTube videos?",
    answer:
      "Yes. BriefTube supports both short videos and long-form content including podcasts, interviews, documentaries, online courses and educational lectures.",
  },
  {
    question: "What types of YouTube videos can I summarize?",
    answer:
      "You can summarize tutorials, coding videos, educational content, business podcasts, interviews, documentaries, technology reviews, finance videos and many other public YouTube videos.",
  },
  {
    question: "Do I need to create an account?",
    answer:
      "No. Anyone can generate summaries without signing in. Creating an account allows you to save your summary history and access it later.",
  },
  {
    question: "Can I export my summaries?",
    answer:
      "Yes. BriefTube allows you to export summaries as PDF, Markdown and TXT files, making it easy to study, share or save your notes.",
  },
  {
    question: "Does BriefTube save my YouTube videos?",
    answer:
      "No. BriefTube does not store your YouTube videos. When you sign in, only your generated summaries are saved so you can access them again from your history.",
  },
  {
    question: "Is BriefTube available on mobile devices?",
    answer:
      "Yes. BriefTube works on desktop, tablet and mobile browsers, allowing you to summarize YouTube videos from anywhere.",
  },
  {
    question: "Can I use BriefTube for studying?",
    answer:
      "Absolutely. Students use BriefTube to summarize lectures, online courses, revision videos and educational content, helping them learn faster while saving valuable time.",
  },
  {
    question: "Why should I use an AI YouTube Video Summarizer?",
    answer:
      "An AI YouTube Video Summarizer helps you understand lengthy videos much faster by extracting only the most important ideas, allowing you to save time while improving learning and productivity.",
  }
];

export default function FAQ() {
  return (
    <>
      <SEO
        title="Frequently Asked Questions | BriefTube AI YouTube Video Summarizer"
        description="Find answers to common questions about BriefTube, the free AI YouTube Video Summarizer. Learn about summaries, exports, privacy, accounts and supported YouTube videos."
      />
      <FAQPageSchema faqs={faqs} />

      <section className="min-h-screen bg-gray-50 px-6 py-16 dark:bg-gray-950">
        <div className="mx-auto max-w-5xl">

          <div className="mb-12 text-center">
            <span className="mb-4 inline-block rounded-full border border-blue-200 bg-blue-50 px-4 py-1 text-sm font-semibold text-blue-600 dark:border-blue-900 dark:bg-blue-950 dark:text-blue-400">
              Got questions? We've got answers
            </span>

            <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
              Frequently Asked{" "}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent">
                Questions
              </span>
            </h1>

            <p className="mx-auto max-w-2xl text-gray-600 dark:text-gray-400">
              Everything you need to know about BriefTube, our AI YouTube Video Summarizer. Learn how summaries are generated, which videos are supported, export options, privacy, accounts and more.
            </p>
          </div>

          <div className="space-y-6">

            {faqs.map((faq) => (
              <div
                key={faq.question}
                className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg dark:border-gray-700 dark:bg-gray-900"
              >
                <h2 className="mb-3 text-xl font-bold text-gray-900 dark:text-white">

                  {faq.question}
                </h2>

                <p className="text-[17px] leading-8 text-gray-600 dark:text-gray-300">
                  {faq.answer}
                </p>
              </div>
            ))}

          </div>

          <div className="mt-16 rounded-3xl border border-gray-200 bg-white p-10 text-center shadow-sm dark:border-gray-700 dark:bg-gray-900">
            <h2 className="mb-3 text-2xl font-bold text-gray-900 dark:text-white">
              Still have questions?
            </h2>
            <p className="mb-8 text-gray-600 dark:text-gray-400">
              Try BriefTube for yourself, or explore our blog for tips on getting the most out of AI-powered summaries.
            </p>

            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                to="/"
                className="w-full rounded-xl bg-blue-600 px-8 py-3 font-semibold text-white shadow-sm transition hover:bg-blue-700 sm:w-auto"
              >
                Summarize a Video Now
              </Link>

              <Link
                to="/blog"
                className="w-full rounded-xl border border-gray-300 bg-white px-8 py-3 font-semibold text-gray-900 transition hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:hover:bg-gray-800 sm:w-auto"
              >
                Explore the Blog
              </Link>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}