import SEO from "../components/SEO";
import { Link } from "react-router-dom";
import {
  Sparkles,
  PlayCircle,
  Brain,
  GraduationCap,
  Rocket,
  FileText,
  Clock3,
  CheckCircle2,
} from "lucide-react";

export default function About() {
  return (
    <>
      <SEO
        title="About BriefTube | AI YouTube Video Summarizer"
        description="Learn about BriefTube, our mission, and how we help students, professionals and creators summarize YouTube videos with AI."
      />

      <section className="min-h-screen bg-gray-50 dark:bg-gray-950">
        {/* ================= HERO ================= */}

        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-indigo-100 dark:from-gray-950 dark:via-gray-950 dark:to-gray-900" />

          <div className="absolute left-0 top-20 h-80 w-80 rounded-full bg-blue-400/20 blur-3xl" />

          <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-violet-500/20 blur-3xl" />

          <div className="relative mx-auto max-w-7xl px-6 py-24 text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-5 py-2 text-sm font-semibold text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
              <Sparkles className="h-4 w-4" />

              About BriefTube
            </div>

            <h1 className="mt-8 text-5xl font-black leading-tight text-gray-900 dark:text-white md:text-6xl">
              Helping Millions

              <span className="bg-gradient-to-r from-blue-600 via-violet-600 to-purple-600 bg-clip-text text-transparent">
                Learn Faster
              </span>

              with AI
            </h1>

            <p className="mx-auto mt-8 max-w-3xl text-xl leading-9 text-gray-600 dark:text-gray-400">
              BriefTube is an AI-powered YouTube Video Summarizer designed for
              students, professionals, researchers and creators. Instead of
              watching hours of YouTube videos, BriefTube transforms long
              content into concise, easy-to-read summaries within seconds.
            </p>

            <div className="mt-12 flex flex-wrap justify-center gap-5">
              <Link
                to="/"
                className="rounded-2xl bg-blue-600 px-8 py-4 text-lg font-bold text-white transition hover:scale-105 hover:bg-blue-700"
              >
                🚀 Try BriefTube Free
              </Link>

              <Link
                to="/blog"
                className="rounded-2xl border border-gray-300 bg-white px-8 py-4 text-lg font-semibold transition hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-900 dark:hover:bg-gray-800"
              >
                📚 Read Our Blog
              </Link>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-6 py-20">
          {/* ================= WHY BRIEFTUBE ================= */}

          <div className="grid items-center gap-20 lg:grid-cols-2">
            <div>
              <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-bold text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                💡 Why We Built BriefTube
              </span>

              <h2 className="mt-6 text-4xl font-black leading-tight text-gray-900 dark:text-white md:text-5xl">
                Learning on YouTube Shouldn't Take Hours.
              </h2>

              <p className="mt-8 text-lg leading-9 text-gray-600 dark:text-gray-400">
                YouTube has become one of the world's largest learning
                platforms, but finding useful information inside long videos is
                often frustrating. Students spend hours watching lectures,
                developers search through coding tutorials, professionals review
                webinars, and creators watch endless educational videos just to
                find a few important points.
              </p>

              <p className="mt-6 text-lg leading-9 text-gray-600 dark:text-gray-400">
                We created <strong>BriefTube</strong> to solve that problem.
                Our AI instantly converts YouTube videos into structured
                summaries, helping people understand key ideas without wasting
                valuable time.
              </p>

              <p className="mt-6 text-lg leading-9 text-gray-600 dark:text-gray-400">
                Whether you're studying for exams, learning programming,
                researching a topic or simply trying to become more productive,
                BriefTube helps you focus on knowledge instead of spending hours
                watching videos.
              </p>
            </div>

            <div className="grid gap-6">
              <div className="rounded-3xl border bg-white p-7 shadow-lg dark:border-gray-700 dark:bg-gray-900">
                <div className="flex items-center gap-4">
                  <div className="rounded-2xl bg-blue-100 p-4 dark:bg-blue-900/30">
                    <Clock3 className="h-8 w-8 text-blue-600" />
                  </div>

                  <div>
                    <h3 className="text-xl font-bold">Save Hours</h3>

                    <p className="text-gray-500">
                      Summaries in seconds instead of hours.
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-3xl border bg-white p-7 shadow-lg dark:border-gray-700 dark:bg-gray-900">
                <div className="flex items-center gap-4">
                  <div className="rounded-2xl bg-violet-100 p-4 dark:bg-violet-900/30">
                    <Brain className="h-8 w-8 text-violet-600" />
                  </div>

                  <div>
                    <h3 className="text-xl font-bold">Powered by AI</h3>

                    <p className="text-gray-500">
                      Gemini AI creates structured summaries instantly.
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-3xl border bg-white p-7 shadow-lg dark:border-gray-700 dark:bg-gray-900">
                <div className="flex items-center gap-4">
                  <div className="rounded-2xl bg-green-100 p-4 dark:bg-green-900/30">
                    <GraduationCap className="h-8 w-8 text-green-600" />
                  </div>

                  <div>
                    <h3 className="text-xl font-bold">Built for Learners</h3>

                    <p className="text-gray-500">
                      Students, developers, professionals and creators.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ================= OUR MISSION ================= */}

          <div className="mt-32 rounded-[36px] bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 p-14 text-center text-white shadow-2xl">
            <Rocket className="mx-auto h-14 w-14" />

            <h2 className="mt-6 text-5xl font-black">Our Mission</h2>

            <p className="mx-auto mt-8 max-w-4xl text-xl leading-9 text-blue-100">
              Our mission is simple — make learning faster, smarter and
              accessible to everyone. We believe AI should help people spend
              less time searching for information and more time understanding,
              creating and growing.
            </p>

            <div className="mt-12 grid gap-8 md:grid-cols-3">
              <div>
                <h3 className="text-4xl font-black">⚡ Fast</h3>

                <p className="mt-3 text-blue-100">
                  Instant summaries for every learner.
                </p>
              </div>

              <div>
                <h3 className="text-4xl font-black">🎯 Accurate</h3>

                <p className="mt-3 text-blue-100">
                  High-quality AI generated insights.
                </p>
              </div>

              <div>
                <h3 className="text-4xl font-black">🌍 Accessible</h3>

                <p className="mt-3 text-blue-100">
                  Free AI learning for everyone.
                </p>
              </div>
            </div>
          </div>

          {/* ================= WHY CHOOSE BRIEFTUBE ================= */}

          <div className="mt-32">
            <div className="text-center">
              <span className="rounded-full bg-violet-100 px-4 py-2 text-sm font-bold text-violet-700 dark:bg-violet-900/30 dark:text-violet-300">
                ⭐ Why Choose BriefTube
              </span>

              <h2 className="mt-6 text-4xl font-black text-gray-900 dark:text-white md:text-5xl">
                Everything You Need to Learn Faster
              </h2>

              <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-600 dark:text-gray-400">
                BriefTube is more than just a summarizer. It's a complete AI
                learning assistant designed to help you understand YouTube
                content quickly and efficiently.
              </p>
            </div>

            <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <div className="group rounded-3xl border border-gray-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl dark:border-gray-700 dark:bg-gray-900">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100 dark:bg-blue-900/30">
                  <PlayCircle className="h-8 w-8 text-blue-600" />
                </div>

                <h3 className="mt-6 text-2xl font-bold text-gray-900 dark:text-white">
                  Any YouTube Video
                </h3>

                <p className="mt-4 leading-7 text-gray-600 dark:text-gray-400">
                  Summarize tutorials, podcasts, interviews, documentaries and
                  educational content from public YouTube videos.
                </p>
              </div>

              <div className="group rounded-3xl border border-gray-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl dark:border-gray-700 dark:bg-gray-900">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-100 dark:bg-violet-900/30">
                  <Brain className="h-8 w-8 text-violet-600" />
                </div>

                <h3 className="mt-6 text-2xl font-bold text-gray-900 dark:text-white">
                  Gemini AI Powered
                </h3>

                <p className="mt-4 leading-7 text-gray-600 dark:text-gray-400">
                  Generate accurate, structured and easy-to-read summaries using
                  advanced AI technology.
                </p>
              </div>

              <div className="group rounded-3xl border border-gray-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl dark:border-gray-700 dark:bg-gray-900">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-green-100 dark:bg-green-900/30">
                  <FileText className="h-8 w-8 text-green-600" />
                </div>

                <h3 className="mt-6 text-2xl font-bold text-gray-900 dark:text-white">
                  Export Anywhere
                </h3>

                <p className="mt-4 leading-7 text-gray-600 dark:text-gray-400">
                  Download summaries as PDF, Markdown or TXT, or copy them with
                  one click.
                </p>
              </div>

              <div className="group rounded-3xl border border-gray-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl dark:border-gray-700 dark:bg-gray-900">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-100 dark:bg-orange-900/30">
                  <Clock3 className="h-8 w-8 text-orange-600" />
                </div>

                <h3 className="mt-6 text-2xl font-bold text-gray-900 dark:text-white">
                  Lightning Fast
                </h3>

                <p className="mt-4 leading-7 text-gray-600 dark:text-gray-400">
                  Get the key insights from long videos in seconds instead of
                  spending hours watching.
                </p>
              </div>

              <div className="group rounded-3xl border border-gray-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl dark:border-gray-700 dark:bg-gray-900">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-pink-100 dark:bg-pink-900/30">
                  <GraduationCap className="h-8 w-8 text-pink-600" />
                </div>

                <h3 className="mt-6 text-2xl font-bold text-gray-900 dark:text-white">
                  Built for Learners
                </h3>

                <p className="mt-4 leading-7 text-gray-600 dark:text-gray-400">
                  Perfect for students, researchers, professionals and lifelong
                  learners.
                </p>
              </div>

              <div className="group rounded-3xl border border-gray-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl dark:border-gray-700 dark:bg-gray-900">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-100 dark:bg-cyan-900/30">
                  <CheckCircle2 className="h-8 w-8 text-cyan-600" />
                </div>

                <h3 className="mt-6 text-2xl font-bold text-gray-900 dark:text-white">
                  Free to Use
                </h3>

                <p className="mt-4 leading-7 text-gray-600 dark:text-gray-400">
                  Start summarizing YouTube videos instantly without paying for
                  expensive software.
                </p>
              </div>
            </div>
          </div>

          {/* ================= CTA ================= */}

          <div className="mt-32 rounded-[36px] bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 px-10 py-20 text-center text-white shadow-2xl">
            <h2 className="text-4xl font-black md:text-5xl">
              Ready to Summarize Your First YouTube Video?
            </h2>

            <p className="mx-auto mt-8 max-w-3xl text-xl leading-9 text-blue-100">
              Paste any YouTube link and let BriefTube create an AI-powered
              summary with key takeaways, notes and insights in seconds.
            </p>

            <div className="mt-12 flex flex-wrap justify-center gap-5">
              <Link
                to="/"
                className="rounded-2xl bg-white px-8 py-4 text-lg font-bold text-blue-700 transition hover:scale-105"
              >
                🚀 Try BriefTube Free
              </Link>

              <Link
                to="/blog"
                className="rounded-2xl border border-white/30 px-8 py-4 text-lg font-semibold transition hover:bg-white/10"
              >
                📚 Read Our Blog
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}