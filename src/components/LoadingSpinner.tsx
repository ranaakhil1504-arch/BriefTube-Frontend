import { useEffect, useState } from "react";

const messages = [
  "🎥 Fetching video...",
  "📝 Extracting transcript...",
  "🤖 Gemini AI is analyzing...",
  "✨ Writing your beautiful summary...",
];

export default function LoadingSpinner() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % messages.length);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mx-auto mt-12 w-full max-w-3xl rounded-3xl border border-blue-100 bg-white p-10 shadow-2xl transition-colors duration-300 dark:border-slate-700 dark:bg-slate-900">

      <div className="flex flex-col items-center">

        {/* Spinner */}

        <div className="mb-6 h-16 w-16 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600 dark:border-slate-700 dark:border-t-blue-400"></div>

        {/* Heading */}

        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
          Generating Summary...
        </h2>

        {/* Animated Message */}

        <p className="mt-3 text-lg text-blue-600 transition-all duration-500 dark:text-blue-400">
          {messages[index]}
        </p>

        {/* Progress */}

        <div className="mt-8 h-3 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-slate-700">

          <div className="h-full w-full animate-pulse rounded-full bg-gradient-to-r from-blue-500 via-violet-500 to-blue-500"></div>

        </div>

        {/* Footer Text */}

        <p className="mt-6 text-gray-500 dark:text-gray-400">
          Usually takes 5–15 seconds.
        </p>

        <p className="mt-2 text-sm text-gray-400 dark:text-gray-500">
          Please don't refresh or close this page.
        </p>

      </div>

    </div>
  );
}