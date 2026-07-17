import { Link } from "react-router-dom";
import SEO from "../components/SEO";

export default function Contact() {
  return (
    <>
      <SEO
        title="Contact BriefTube | AI YouTube Video Summarizer"
        description="Contact the BriefTube team for support, partnerships, feature requests, bug reports, or general questions about our AI YouTube Video Summarizer."
      />

      <section className="min-h-screen bg-gray-50 dark:bg-gray-950">

        {/* ================= HERO ================= */}

        <div className="relative overflow-hidden">

          {/* Background */}

          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-indigo-100 dark:from-gray-950 dark:via-gray-950 dark:to-gray-900" />

          <div className="absolute -left-40 top-10 h-80 w-80 rounded-full bg-blue-500/20 blur-3xl" />

          <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-purple-500/20 blur-3xl" />

          <div className="relative mx-auto max-w-7xl px-6 py-24 text-center">

            <div className="inline-flex items-center rounded-full bg-blue-100 px-5 py-2 text-sm font-semibold text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
              💬 Contact BriefTube
            </div>

            <h1 className="mt-8 text-5xl font-black text-gray-900 dark:text-white md:text-6xl">
              We'd Love To Hear From You
            </h1>

            <p className="mx-auto mt-8 max-w-3xl text-xl leading-9 text-gray-600 dark:text-gray-400">
              Whether you need help using BriefTube, want to report a bug,
              request a feature, discuss partnerships or simply ask a question,
              our team is always happy to help.
            </p>

          </div>

        </div>

        <div className="mx-auto max-w-7xl px-6 pb-24">
          {/* ================= CONTACT SECTION ================= */}

<div className="grid gap-10 lg:grid-cols-2">

  {/* LEFT */}

  <div className="rounded-[32px] border border-gray-200 bg-white p-10 shadow-xl dark:border-gray-700 dark:bg-gray-900">

    <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-bold text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
      📧 Support
    </span>

    <h2 className="mt-6 text-4xl font-black text-gray-900 dark:text-white">
      Contact Information
    </h2>

    <p className="mt-5 text-lg leading-8 text-gray-600 dark:text-gray-400">
      Need help with BriefTube? Whether you're experiencing an issue,
      have questions about our AI YouTube Video Summarizer, or want to
      collaborate with us, we're only one email away.
    </p>

    <div className="mt-10 space-y-8">

      <div className="rounded-2xl bg-gray-50 p-6 dark:bg-gray-800">

        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
          📧 Email
        </h3>

        <p className="mt-3 text-lg font-semibold text-blue-600">
          support@brieftube.co
        </p>

        <p className="mt-3 text-gray-600 dark:text-gray-400">
          Contact us for general support, technical issues,
          feedback or account-related questions.
        </p>

      </div>

      <div className="rounded-2xl bg-gray-50 p-6 dark:bg-gray-800">

        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
          ⚡ Response Time
        </h3>

        <p className="mt-3 text-gray-600 dark:text-gray-400">
          We usually respond within
          <strong> 24 hours</strong> during business days.
        </p>

      </div>

      <div className="rounded-2xl bg-gray-50 p-6 dark:bg-gray-800">

        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
          🌍 Available Worldwide
        </h3>

        <p className="mt-3 text-gray-600 dark:text-gray-400">
          BriefTube serves users globally including students,
          professionals, researchers and content creators.
        </p>

      </div>

    </div>

  </div>

  {/* RIGHT */}

  <div className="rounded-[32px] border border-gray-200 bg-white p-10 shadow-xl dark:border-gray-700 dark:bg-gray-900">

    <span className="rounded-full bg-purple-100 px-4 py-2 text-sm font-bold text-purple-700 dark:bg-purple-900/30 dark:text-purple-300">
      🤝 Let's Connect
    </span>

    <h2 className="mt-6 text-4xl font-black text-gray-900 dark:text-white">
      How Can We Help?
    </h2>

    <div className="mt-10 space-y-6">

      <div className="rounded-2xl border border-gray-200 p-6 transition hover:border-blue-500 hover:shadow-lg dark:border-gray-700">

        <h3 className="text-xl font-bold">
          🐞 Report a Bug
        </h3>

        <p className="mt-3 text-gray-600 dark:text-gray-400">
          Found an issue while summarizing YouTube videos?
          Let us know and we'll investigate it as quickly as possible.
        </p>

      </div>

      <div className="rounded-2xl border border-gray-200 p-6 transition hover:border-blue-500 hover:shadow-lg dark:border-gray-700">

        <h3 className="text-xl font-bold">
          💡 Feature Request
        </h3>

        <p className="mt-3 text-gray-600 dark:text-gray-400">
          Have an idea to improve BriefTube?
          We love hearing suggestions from our community.
        </p>

      </div>

      <div className="rounded-2xl border border-gray-200 p-6 transition hover:border-blue-500 hover:shadow-lg dark:border-gray-700">

        <h3 className="text-xl font-bold">
          🤝 Partnerships
        </h3>

        <p className="mt-3 text-gray-600 dark:text-gray-400">
          Interested in working together?
          Contact us for collaborations, educational partnerships
          or business opportunities.
        </p>

      </div>

      <div className="rounded-2xl border border-gray-200 p-6 transition hover:border-blue-500 hover:shadow-lg dark:border-gray-700">

        <h3 className="text-xl font-bold">
          ❤️ Feedback
        </h3>

        <p className="mt-3 text-gray-600 dark:text-gray-400">
          Tell us what you enjoy about BriefTube or what you'd
          like to see improved in future updates.
        </p>

      </div>

    </div>

  </div>

</div>
{/* ================= WHY CONTACT BRIEFTUBE ================= */}

<div className="mt-24 rounded-[36px] bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 px-10 py-20 text-white shadow-2xl">

  <div className="mx-auto max-w-5xl text-center">

    <span className="rounded-full bg-white/20 px-5 py-2 text-sm font-bold backdrop-blur">

      ⭐ Why People Contact BriefTube

    </span>

    <h2 className="mt-8 text-5xl font-black">

      We're More Than An AI Tool

    </h2>

    <p className="mx-auto mt-8 max-w-3xl text-xl leading-9 text-blue-100">

      BriefTube is built to help students, professionals, researchers,
      educators and lifelong learners save valuable time while consuming
      YouTube content. Every feature we build is inspired by feedback from
      our community.

    </p>

  </div>

  <div className="mx-auto mt-16 grid max-w-6xl gap-8 md:grid-cols-3">

    <div className="rounded-3xl bg-white/10 p-8 backdrop-blur">

      <div className="text-5xl">

        🚀

      </div>

      <h3 className="mt-6 text-2xl font-bold">

        Product Support

      </h3>

      <p className="mt-4 leading-8 text-blue-100">

        Questions about summaries, exports, AI responses or account issues?
        Our support team is here to help.

      </p>

    </div>

    <div className="rounded-3xl bg-white/10 p-8 backdrop-blur">

      <div className="text-5xl">

        💡

      </div>

      <h3 className="mt-6 text-2xl font-bold">

        Feature Ideas

      </h3>

      <p className="mt-4 leading-8 text-blue-100">

        Your ideas shape BriefTube.
        Many of our improvements come directly from community feedback.

      </p>

    </div>

    <div className="rounded-3xl bg-white/10 p-8 backdrop-blur">

      <div className="text-5xl">

        🤝

      </div>

      <h3 className="mt-6 text-2xl font-bold">

        Business Partnerships

      </h3>

      <p className="mt-4 leading-8 text-blue-100">

        Interested in educational partnerships,
        affiliate opportunities or business collaboration?
        We'd love to connect.

      </p>

    </div>

  </div>

</div>

{/* ================= QUICK LINKS ================= */}

<div className="mt-24">

  <h2 className="text-center text-4xl font-black text-gray-900 dark:text-white">

    Explore BriefTube

  </h2>

  <p className="mx-auto mt-5 max-w-2xl text-center text-lg text-gray-600 dark:text-gray-400">

    Learn more about BriefTube, explore helpful AI articles,
    or start summarizing YouTube videos instantly.

  </p>

  <div className="mt-12 flex flex-wrap justify-center gap-5">

    <Link
      to="/"
      className="rounded-2xl bg-blue-600 px-8 py-4 text-lg font-bold text-white transition hover:scale-105 hover:bg-blue-700"
    >
      🚀 Try BriefTube
    </Link>

    <Link
      to="/blog"
      className="rounded-2xl border border-gray-300 bg-white px-8 py-4 text-lg font-semibold text-gray-700 transition hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:hover:bg-gray-800"
    >
      📚 Visit Blog
    </Link>

    <Link
      to="/faq"
      className="rounded-2xl border border-gray-300 bg-white px-8 py-4 text-lg font-semibold text-gray-700 transition hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:hover:bg-gray-800"
    >
      ❓ FAQ
    </Link>

  </div>

</div>
{/* ================= FOOTER NOTE ================= */}

<div className="mt-24 border-t border-gray-200 pt-12 text-center dark:border-gray-800">

  <p className="mx-auto max-w-3xl text-lg leading-8 text-gray-600 dark:text-gray-400">

    Thank you for using <span className="font-semibold text-blue-600">BriefTube</span>.
    We're committed to making learning from YouTube faster, smarter and more
    accessible with the power of AI. Every suggestion, bug report and feature
    request helps us build a better experience for everyone.

  </p>

  <p className="mt-8 text-sm text-gray-500 dark:text-gray-500">

    © {new Date().getFullYear()} BriefTube. All rights reserved.

  </p>

</div>

</div>

</section>

</>
);
}