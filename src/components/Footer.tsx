import { Sparkles, Heart, Mail } from "lucide-react";
import { Link } from "react-router-dom";
export default function Footer() {
  return (
    <footer className="mt-24 border-t border-gray-200 bg-gradient-to-b from-white via-blue-50 to-violet-50 transition-colors duration-300 dark:border-gray-800 dark:bg-gradient-to-b dark:from-gray-950 dark:via-gray-900 dark:to-slate-950">
      <div className="mx-auto max-w-7xl px-6 py-14">

        <div className="grid gap-12 md:grid-cols-3">

          {/* Brand */}

          <div>

            <div className="flex items-center gap-3">

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-r from-blue-600 to-violet-600 text-white shadow-lg">
                <Sparkles className="h-6 w-6" />
              </div>

              <div>

                <h2 className="text-2xl font-black text-gray-900 dark:text-white">
                  BriefTube
                </h2>

                <p className="text-sm text-gray-500 dark:text-gray-400">
                  AI YouTube Summarizer
                </p>

              </div>

            </div>

            <p className="mt-6 leading-7 text-gray-600 dark:text-gray-300">
              Turn long YouTube videos into clean, structured AI summaries in
              seconds. Save time, learn faster, and export your notes with one
              click.
            </p>

          </div>

          {/* Features */}

          <div>

            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              Features
            </h3>

            <ul className="mt-5 space-y-3 text-gray-600 dark:text-gray-300">

              <li>✨ AI Generated Summaries</li>

              <li>📄 PDF Export</li>

              <li>📝 Markdown Export</li>

              <li>📋 Copy Summary</li>

              <li>🔗 Share Summary</li>

              <li>⚡ Lightning Fast</li>

            </ul>

          </div>

          {/* Contact */}

          <div>

            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              Contact
            </h3>

            <div className="mt-5">

              <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-colors duration-300 dark:border-gray-700 dark:bg-gray-800">

                <Mail className="h-5 w-5 text-blue-600" />

                <span className="text-gray-700 dark:text-gray-200">
                  Coming Soon
                </span>

              </div>

              <div className="mt-6">

                <span className="inline-flex rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700 dark:bg-blue-900/40 dark:text-blue-300">
                  Version 1.0
                </span>

              </div>

            </div>

          </div>

        </div>

        <div className="mt-14 border-t border-gray-200 pt-8 dark:border-gray-800">

          <p className="flex items-center justify-center gap-2 text-center text-gray-500 dark:text-gray-400">

            Built with

            <Heart className="h-4 w-4 fill-red-500 text-red-500" />

            using React + TypeScript + Gemini AI

          </p>

          <p className="mt-3 text-center text-sm text-gray-400 dark:text-gray-500">
            © 2026 BriefTube. All rights reserved.
          </p>

        </div>

      </div>
      <div className="mt-10 border-t border-gray-200 pt-6 dark:border-gray-700">

  <div className="flex flex-wrap items-center justify-center gap-6 text-sm">

    <Link
      to="/"
      className="text-gray-600 transition hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
    >
      Home
    </Link>

    <Link
      to="/faq"
      className="text-gray-600 transition hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
    >
      FAQ
    </Link>
<Link to="/blog"
className="text-gray-600 transition hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400">Blog</Link>
    <Link
      to="/about"
      className="text-gray-600 transition hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
    >
      About
    </Link>

    <Link
      to="/contact"
      className="text-gray-600 transition hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
    >
      Contact
    </Link>

    <Link
      to="/privacy"
      className="text-gray-600 transition hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
    >
      Privacy Policy
    </Link>

    <Link
      to="/terms"
      className="text-gray-600 transition hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
    >
      Terms of Service
    </Link>

  </div>

</div>
    </footer>
  );
}