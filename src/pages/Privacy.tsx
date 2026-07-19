import { Link } from "react-router-dom";
import {
  ShieldCheck,
  Lock,
  Database,
  Globe,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

import SEO from "../components/SEO";

export default function Privacy() {
  return (
    <>
      <SEO
        title="Privacy Policy | BriefTube"
        description="Learn how BriefTube protects your privacy, handles your data, and keeps your AI YouTube summaries secure."
      />

      <section className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-blue-50 dark:from-gray-950 dark:via-gray-950 dark:to-gray-900">

        {/* Hero */}

        <div className="relative overflow-hidden">

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#3b82f640,transparent_45%)]" />

          <div className="relative mx-auto flex max-w-7xl flex-col items-center px-6 py-24 text-center">

            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-5 py-2 text-blue-700 dark:border-blue-900 dark:bg-blue-950/40 dark:text-blue-300">

              <ShieldCheck className="h-5 w-5" />

              <span className="font-semibold">
                Your Privacy Matters
              </span>

            </div>

            <h1 className="max-w-4xl text-5xl font-black tracking-tight text-gray-900 md:text-6xl dark:text-white">

              Privacy Policy

            </h1>

            <p className="mt-8 max-w-3xl text-xl leading-9 text-gray-600 dark:text-gray-300">

              BriefTube is built to help you learn faster—not collect unnecessary
              personal information. We believe privacy should be simple,
              transparent, and easy to understand.

            </p>

            <div className="mt-10 flex flex-wrap justify-center gap-4">

              <Link
                to="/"
                className="inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-8 py-4 text-lg font-bold text-white transition hover:bg-blue-700"
              >
                Try BriefTube
                <ArrowRight className="h-5 w-5" />
              </Link>

              <div className="inline-flex items-center gap-2 rounded-2xl border border-gray-200 bg-white px-8 py-4 font-semibold text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300">

                <Lock className="h-5 w-5 text-green-600" />

                Secure & Privacy Focused

              </div>

            </div>

          </div>

        </div>

        {/* Trust Cards */}

        <div className="mx-auto -mt-8 grid max-w-7xl gap-6 px-6 md:grid-cols-3">

          <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-lg transition hover:-translate-y-1 dark:border-gray-700 dark:bg-gray-900">

            <ShieldCheck className="mb-5 h-12 w-12 text-blue-600" />

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">

              Privacy First

            </h2>

            <p className="mt-4 leading-8 text-gray-600 dark:text-gray-400">

              We collect only the information required to provide AI-powered
              YouTube summaries. Nothing more.

            </p>

          </div>

          <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-lg transition hover:-translate-y-1 dark:border-gray-700 dark:bg-gray-900">

            <Database className="mb-5 h-12 w-12 text-indigo-600" />

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">

              Secure Storage

            </h2>

            <p className="mt-4 leading-8 text-gray-600 dark:text-gray-400">

              Your saved summaries are stored securely so you can access them
              anytime from your account.

            </p>

          </div>

          <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-lg transition hover:-translate-y-1 dark:border-gray-700 dark:bg-gray-900">

            <Globe className="mb-5 h-12 w-12 text-red-600" />

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">

              You Stay in Control

            </h2>

            <p className="mt-4 leading-8 text-gray-600 dark:text-gray-400">

              We never access your YouTube account or private videos. We only
              process the public video link that you submit.

            </p>

          </div>

        </div>

        {/* Content */}

        <div className="mx-auto mt-20 max-w-6xl px-6">
          <div className="space-y-8">

  {/* Information We Collect */}

  <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-700 dark:bg-gray-900">

    <div className="mb-6 flex items-center gap-4">

      <div className="rounded-2xl bg-blue-100 p-4 dark:bg-blue-900/40">
        <Database className="h-8 w-8 text-blue-600" />
      </div>

      <div>
        <h2 className="text-3xl font-black text-gray-900 dark:text-white">
          Information We Collect
        </h2>

        <p className="text-gray-500 dark:text-gray-400">
          Only what is necessary to provide the service.
        </p>
      </div>

    </div>

    <div className="grid gap-5 md:grid-cols-2">

      <div className="rounded-2xl bg-gray-50 p-5 dark:bg-gray-800">

        <h3 className="font-bold text-lg text-gray-900 dark:text-white">
          Google Account
        </h3>

        <p className="mt-3 leading-7 text-gray-600 dark:text-gray-300">
          When you sign in, we receive your name, email address and profile
          picture through Google Authentication.
        </p>

      </div>

      <div className="rounded-2xl bg-gray-50 p-5 dark:bg-gray-800">

        <h3 className="font-bold text-lg text-gray-900 dark:text-white">
          YouTube Links
        </h3>

        <p className="mt-3 leading-7 text-gray-600 dark:text-gray-300">
          We process only the YouTube URL that you submit in order to generate
          an AI summary.
        </p>

      </div>

      <div className="rounded-2xl bg-gray-50 p-5 dark:bg-gray-800">

        <h3 className="font-bold text-lg text-gray-900 dark:text-white">
          Summary History
        </h3>

        <p className="mt-3 leading-7 text-gray-600 dark:text-gray-300">
          If you're signed in, your generated summaries may be saved so you can
          access them later.
        </p>

      </div>

      <div className="rounded-2xl bg-gray-50 p-5 dark:bg-gray-800">

        <h3 className="font-bold text-lg text-gray-900 dark:text-white">
          Analytics
        </h3>

        <p className="mt-3 leading-7 text-gray-600 dark:text-gray-300">
          Anonymous usage analytics help us improve BriefTube's speed,
          reliability and user experience.
        </p>

      </div>

    </div>

  </div>

  {/* How We Use Your Data */}

  <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-700 dark:bg-gray-900">

    <h2 className="mb-8 text-3xl font-black text-gray-900 dark:text-white">
      How We Use Your Information
    </h2>

    <div className="space-y-5">

      {[
        "Generate AI-powered YouTube summaries.",
        "Save your summary history for future access.",
        "Improve the quality and performance of BriefTube.",
        "Prevent abuse, spam and fraudulent activity.",
        "Provide customer support when needed.",
      ].map((item, index) => (
        <div
          key={index}
          className="flex items-start gap-4 rounded-2xl border border-green-200 bg-green-50 p-5 dark:border-green-900 dark:bg-green-900/10"
        >
          <CheckCircle2 className="mt-1 h-6 w-6 text-green-600" />

          <p className="leading-7 text-gray-700 dark:text-gray-300">
            {item}
          </p>

        </div>
      ))}

    </div>

  </div>

  {/* AI Processing */}

  <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-700 dark:bg-gray-900">

    <h2 className="mb-6 text-3xl font-black text-gray-900 dark:text-white">
      AI Processing
    </h2>

    <p className="leading-8 text-gray-600 dark:text-gray-300">

      BriefTube sends only the transcript (or publicly available video text)
      to trusted AI providers to generate summaries. We do not sell your
      personal information or use your summaries for advertising purposes.

    </p>

  </div>

  {/* Security */}

  <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-700 dark:bg-gray-900">

    <h2 className="mb-6 text-3xl font-black text-gray-900 dark:text-white">
      Security
    </h2>

    <p className="leading-8 text-gray-600 dark:text-gray-300">

      We use modern security practices, encrypted connections (HTTPS), secure
      authentication and trusted cloud infrastructure to protect your account
      and stored summaries.

    </p>

  </div>

  {/* Cookies */}

  <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-700 dark:bg-gray-900">

    <h2 className="mb-6 text-3xl font-black text-gray-900 dark:text-white">
      Cookies
    </h2>

    <p className="leading-8 text-gray-600 dark:text-gray-300">

      Cookies help keep you signed in, remember your preferences, improve page
      performance and provide anonymous analytics about how BriefTube is used.

    </p>

  </div>
    {/* Your Rights */}

  <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-700 dark:bg-gray-900">

    <h2 className="mb-6 text-3xl font-black text-gray-900 dark:text-white">
      Your Rights
    </h2>

    <div className="grid gap-5 md:grid-cols-2">

      <div className="rounded-2xl bg-blue-50 p-5 dark:bg-blue-900/10">
        <h3 className="font-bold text-lg text-gray-900 dark:text-white">
          Access Your Data
        </h3>

        <p className="mt-3 leading-7 text-gray-600 dark:text-gray-300">
          You may view your saved summaries anytime from your account history.
        </p>
      </div>

      <div className="rounded-2xl bg-blue-50 p-5 dark:bg-blue-900/10">
        <h3 className="font-bold text-lg text-gray-900 dark:text-white">
          Delete Your History
        </h3>

        <p className="mt-3 leading-7 text-gray-600 dark:text-gray-300">
          You may request deletion of your stored summaries at any time.
        </p>
      </div>

      <div className="rounded-2xl bg-blue-50 p-5 dark:bg-blue-900/10">
        <h3 className="font-bold text-lg text-gray-900 dark:text-white">
          Contact Us
        </h3>

        <p className="mt-3 leading-7 text-gray-600 dark:text-gray-300">
          Questions regarding privacy can always be sent to our support email.
        </p>
      </div>

      <div className="rounded-2xl bg-blue-50 p-5 dark:bg-blue-900/10">
        <h3 className="font-bold text-lg text-gray-900 dark:text-white">
          Transparency
        </h3>

        <p className="mt-3 leading-7 text-gray-600 dark:text-gray-300">
          We believe users should clearly understand what information is collected
          and why.
        </p>
      </div>

    </div>

  </div>

  {/* Third Party Services */}

  <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-700 dark:bg-gray-900">

    <h2 className="mb-6 text-3xl font-black text-gray-900 dark:text-white">
      Third-Party Services
    </h2>

    <div className="grid gap-4 md:grid-cols-2">

      {[
        "Google Authentication",
        "Supabase",
        "Google Gemini AI",
        "Google Analytics",
      ].map((service) => (
        <div
          key={service}
          className="rounded-2xl border border-gray-200 bg-gray-50 p-5 dark:border-gray-700 dark:bg-gray-800"
        >
          <p className="font-semibold text-gray-800 dark:text-white">
            {service}
          </p>
        </div>
      ))}

    </div>

  </div>

  {/* Contact */}

  <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-700 dark:bg-gray-900">

    <h2 className="mb-5 text-3xl font-black text-gray-900 dark:text-white">
      Contact Us
    </h2>

    <p className="leading-8 text-gray-600 dark:text-gray-300">
      If you have any questions about this Privacy Policy or your data,
      feel free to contact us anytime.
    </p>

    <div className="mt-6 rounded-2xl bg-blue-50 p-6 dark:bg-blue-900/10">

      <p className="font-semibold text-gray-900 dark:text-white">
        📧 support@brieftube.co
      </p>

    </div>

  </div>

  {/* CTA */}

  <div className="overflow-hidden rounded-[32px] bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-10 text-center text-white shadow-2xl">

    <h2 className="text-4xl font-black">
      Ready to Save Hours Watching YouTube?
    </h2>

    <p className="mx-auto mt-5 max-w-2xl text-lg text-blue-100 leading-8">
      Paste any YouTube link and let BriefTube instantly generate accurate AI
      summaries, key points, takeaways and downloadable notes.
    </p>

    <Link
      to="/"
      className="mt-8 inline-flex items-center rounded-2xl bg-white px-8 py-4 text-lg font-bold text-blue-600 transition duration-300 hover:scale-105 hover:bg-gray-100"
    >
      🚀 Try BriefTube Free
    </Link>

  </div>

</div>

</div>

</section>

</>
);
}