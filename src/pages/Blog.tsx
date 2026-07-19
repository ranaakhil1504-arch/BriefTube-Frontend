import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { Link } from "react-router-dom";
import blogHero from "../assets/blog-hero.jpg";
import SEO from "../components/SEO";
import { blogPosts } from "../data/blogPosts";
import { blogPage } from "../data/blogPage";
import BlogListSchema from "../components/BlogListSchema";
export default function Blog() {
  const [search, setSearch] = useState("");

  const allPosts = useMemo(() => {
    return [...blogPosts, ...blogPage].sort(
      (a, b) =>
        new Date(b.date).getTime() -
        new Date(a.date).getTime()
    );
  }, []);

  const filteredPosts = useMemo(() => {
    return allPosts.filter(
      (post) =>
        post.title.toLowerCase().includes(search.toLowerCase()) ||
        post.description.toLowerCase().includes(search.toLowerCase()) ||
        post.tags.join(" ").toLowerCase().includes(search.toLowerCase())
    );
  }, [search, allPosts]);

  const featured = filteredPosts[0];

  const others = filteredPosts.slice(1);

  return (
    <>
      <SEO
        title="Blog | BriefTube"
        description="Read AI, productivity and YouTube learning articles from BriefTube."
      />
      <BlogListSchema />
      <section className="min-h-screen bg-gray-50 dark:bg-gray-950">

        {/* ================= HERO ================= */}

        <div className="relative overflow-hidden">

          {/* Background */}

          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-indigo-100 dark:from-gray-950 dark:via-gray-950 dark:to-gray-900" />

          <div className="absolute -left-32 top-10 h-72 w-72 rounded-full bg-blue-400/20 blur-3xl" />

          <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-indigo-500/20 blur-3xl" />

          <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 py-12 sm:gap-16 sm:px-6 sm:py-16 lg:grid-cols-2 lg:py-20">

            {/* LEFT */}

            <div>

              <div className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1.5 text-xs font-semibold text-blue-700 sm:px-4 sm:py-2 sm:text-sm dark:bg-blue-900/30 dark:text-blue-300">

                🚀 Official BriefTube Blog

              </div>

              <h1 className="mt-5 text-3xl font-black leading-tight text-gray-900 sm:mt-8 sm:text-4xl md:text-5xl lg:text-6xl dark:text-white">

                Learn Faster with AI

              </h1>

              <p className="mt-4 max-w-2xl text-base leading-7 text-gray-600 sm:mt-8 sm:text-lg sm:leading-8 md:text-xl md:leading-9 dark:text-gray-400">

                Discover AI tutorials, productivity hacks, YouTube learning guides and
                expert articles from the creators of

                <span className="font-semibold text-blue-600"> BriefTube</span> —

                the AI YouTube Video Summarizer that helps people save hours every week.

              </p>

              {/* Buttons */}

              <div className="mt-6 flex flex-wrap gap-3 sm:mt-10 sm:gap-4">

                <Link
                  to="/"
                  className="rounded-2xl bg-blue-600 px-5 py-3 text-sm font-bold text-white transition hover:scale-105 hover:bg-blue-700 sm:px-8 sm:py-4 sm:text-lg"
                >
                  🚀 Try BriefTube
                </Link>

                <a
                  href="#articles"
                  className="rounded-2xl border border-gray-300 bg-white px-5 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-100 sm:px-8 sm:py-4 sm:text-lg dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:hover:bg-gray-800"
                >
                  Browse Articles
                </a>

              </div>

              {/* Stats */}

              <div className="mt-8 flex flex-wrap gap-6 sm:mt-12 sm:gap-10">

                <div>

                  <h3 className="text-2xl font-black text-gray-900 sm:text-3xl dark:text-white">

                    {allPosts.length}+

                  </h3>

                  <p className="text-sm text-gray-500 sm:text-base">

                    Articles

                  </p>

                </div>

                <div>

                  <h3 className="text-2xl font-black text-gray-900 sm:text-3xl dark:text-white">

                    AI

                  </h3>

                  <p className="text-sm text-gray-500 sm:text-base">

                    Powered Learning

                  </p>

                </div>

                <div>

                  <h3 className="text-2xl font-black text-gray-900 sm:text-3xl dark:text-white">

                    Free

                  </h3>

                  <p className="text-sm text-gray-500 sm:text-base">

                    Forever

                  </p>

                </div>

              </div>

            </div>

            {/* RIGHT */}

            <div>

              <img
                src={blogHero}
                alt="BriefTube AI Blog"
                className="mx-auto w-full max-w-xl drop-shadow-2xl"
              />

            </div>

          </div>

        </div>

        {/* SEARCH */}

        <div className="relative z-20 mx-auto -mt-6 max-w-3xl px-4 sm:-mt-10 sm:px-6">

          <div className="relative rounded-2xl border border-gray-200 bg-white p-3 shadow-xl sm:rounded-3xl sm:p-4 dark:border-gray-700 dark:bg-gray-900">

            <Search
              className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 sm:left-8"
              size={20}
            />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search articles, AI tools, productivity guides..."
              className="w-full bg-transparent py-3 pl-10 pr-3 text-base outline-none sm:py-4 sm:pl-12 sm:pr-4 sm:text-lg dark:text-white"
            />

          </div>

        </div>

        {/* ================= POPULAR TOPICS ================= */}

        <div className="mx-auto mt-10 max-w-7xl px-4 sm:mt-14 sm:px-6">

          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">

            <span className="text-sm font-semibold text-gray-500 sm:text-base dark:text-gray-400">

              Popular Topics

            </span>

            {[
              "AI",
              "YouTube",
              "Productivity",
              "Study",
              "Learning",
              "Coding",
              "Students",
              "ChatGPT",
              "Gemini",
              "Notes"
            ].map((topic) => (

              <button
                key={topic}
                onClick={() => setSearch(topic)}
                className="rounded-full border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium transition hover:border-blue-500 hover:bg-blue-50 hover:text-blue-600 sm:px-4 sm:py-2 sm:text-sm dark:border-gray-700 dark:bg-gray-900 dark:hover:bg-blue-900/30"
              >

                {topic}

              </button>

            ))}

          </div>

        </div>

        {/* Featured Article */}

        {featured && (

          <section className="mx-auto mt-12 max-w-7xl px-4 sm:mt-20 sm:px-6">

            <div className="mb-6 flex items-center justify-between sm:mb-8">

              <div>

                <span className="rounded-full bg-yellow-100 px-3 py-1.5 text-xs font-bold text-yellow-700 sm:px-4 sm:py-2 sm:text-sm dark:bg-yellow-900/30 dark:text-yellow-300">

                  ⭐ Featured Article

                </span>

                <h2 className="mt-4 text-2xl font-black text-gray-900 sm:mt-5 sm:text-3xl md:text-4xl dark:text-white">

                  Editor's Pick

                </h2>

                <p className="mt-2 text-base text-gray-600 sm:mt-3 sm:text-lg dark:text-gray-400">

                  Our most recommended AI learning article this week.

                </p>

              </div>

            </div>

            <Link
              to={`/blog/${featured.slug}`}
              className="group grid overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl sm:rounded-[32px] dark:border-gray-700 dark:bg-gray-900 lg:grid-cols-2"
            >

              <div className="overflow-hidden">

                <img
                  src={featured.image}
                  alt={featured.title}
                  className="h-56 w-full object-cover transition duration-700 group-hover:scale-110 sm:h-72 lg:h-full"
                />

              </div>

              <div className="flex flex-col justify-center p-6 sm:p-8 md:p-12">

                <div className="mb-4 flex flex-wrap gap-2 sm:mb-6 sm:gap-3">

                  {featured.tags.map((tag) => (

                    <span
                      key={tag}
                      className="rounded-full bg-blue-100 px-3 py-1.5 text-xs font-semibold text-blue-700 sm:px-4 sm:py-2 sm:text-sm dark:bg-blue-900/30 dark:text-blue-300"
                    >

                      {tag}

                    </span>

                  ))}

                </div>

                <h2 className="text-2xl font-black leading-tight text-gray-900 transition group-hover:text-blue-600 sm:text-3xl md:text-5xl dark:text-white">

                  {featured.title}

                </h2>

                <p className="mt-4 text-base leading-7 text-gray-600 sm:mt-6 sm:text-xl sm:leading-8 dark:text-gray-400">

                  {featured.description}

                </p>

                <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-gray-500 sm:mt-10 sm:gap-6 sm:text-base dark:text-gray-400">

                  <span>

                    👤 {featured.author}

                  </span>

                  <span>

                    📅 {featured.date}

                  </span>

                  <span>

                    ⏱ {featured.readTime}

                  </span>

                </div>

                <div className="mt-6 sm:mt-10">

                  <span className="inline-flex items-center text-base font-bold text-blue-600 sm:text-lg">

                    Read Full Article →

                  </span>

                </div>

              </div>

            </Link>

          </section>

        )}

        {/* Articles */}

        <div
          id="articles"
          className="mx-auto mt-16 max-w-7xl px-4 sm:mt-28 sm:px-6"
        >

          <div className="mb-8 flex items-end justify-between sm:mb-12">

            <div>

              <span className="rounded-full bg-blue-100 px-3 py-1.5 text-xs font-bold text-blue-700 sm:px-4 sm:py-2 sm:text-sm dark:bg-blue-900/30 dark:text-blue-300">

                📚 Latest Articles

              </span>

              <h2 className="mt-4 text-2xl font-black text-gray-900 sm:mt-5 sm:text-3xl md:text-4xl dark:text-white">

                Explore All Articles

              </h2>

              <p className="mt-2 text-base text-gray-600 sm:mt-3 sm:text-lg dark:text-gray-400">

                AI tutorials, YouTube learning, productivity and study guides.

              </p>

            </div>

          </div>

          <div className="grid gap-6 sm:gap-8 md:grid-cols-2 md:gap-10 xl:grid-cols-3">
            {others.map((post) => (
              <Link
                key={post.slug}
                to={`/blog/${post.slug}`}
                className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-md transition-all duration-500 hover:-translate-y-3 hover:border-blue-200 hover:shadow-2xl sm:rounded-[30px] dark:border-gray-700 dark:bg-gray-900 dark:hover:border-blue-800"
              >
                <img
                  loading="lazy"
                  decoding="async"
                  src={post.image}
                  alt={`${post.title} - BriefTube Blog`}
                  className="h-48 w-full object-cover transition duration-700 group-hover:scale-110 sm:h-56 md:h-64"
                />

                <div className="flex h-full flex-col p-5 sm:p-6 md:p-7">

                  <div className="mb-3 flex flex-wrap gap-2 sm:mb-4">

                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
                      >
                        {tag}
                      </span>
                    ))}

                  </div>

                  <h3 className="line-clamp-2 text-xl font-black leading-tight text-gray-900 transition group-hover:text-blue-600 sm:text-2xl dark:text-white">
                    {post.title}
                  </h3>

                  <p className="mt-3 line-clamp-3 text-sm text-gray-600 sm:mt-4 sm:text-base dark:text-gray-400">
                    {post.description}
                  </p>

                  <div className="mt-auto pt-6 sm:pt-8">

                    <div className="mb-4 flex flex-wrap gap-2 sm:mb-5">

                      <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-600 dark:bg-gray-800 dark:text-gray-300">

                        👤 {post.author}

                      </span>

                      <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-600 dark:bg-gray-800 dark:text-gray-300">

                        📅 {post.date}

                      </span>

                      <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">

                        ⏱ {post.readTime}

                      </span>

                    </div>

                    <span className="text-sm font-bold text-blue-600 sm:text-base">

                      Read Article →

                    </span>

                  </div>

                </div>

              </Link>
            ))}

          </div>

          {filteredPosts.length === 0 && (
            <div className="py-16 text-center sm:py-24">

              <h3 className="text-2xl font-bold text-gray-900 sm:text-3xl dark:text-white">
                Nothing matched your search
              </h3>

              <p className="mt-3 text-sm text-gray-600 sm:mt-4 sm:text-base dark:text-gray-400">
                Try AI, YouTube, Productivity or Study.
              </p>

            </div>
          )}

        </div>

        {/* ================= NEWSLETTER ================= */}

        <div className="mx-auto mt-16 max-w-5xl px-4 sm:mt-24 sm:px-6">

          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-lg sm:rounded-[32px] sm:p-8 md:p-12 dark:border-gray-700 dark:bg-gray-900">

            <h2 className="text-center text-2xl font-black text-gray-900 sm:text-3xl md:text-4xl dark:text-white">

              Never Miss New AI Guides

            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-center text-sm text-gray-600 sm:mt-5 sm:text-base md:text-lg dark:text-gray-400">

              Get notified whenever BriefTube publishes a new AI tutorial,
              productivity guide or YouTube learning article.

            </p>

            <div className="mx-auto mt-6 flex max-w-2xl flex-col gap-3 sm:mt-10 sm:gap-4 md:flex-row">

              <input

                type="email"

                placeholder="Enter your email"

                className="flex-1 rounded-2xl border border-gray-300 px-5 py-3 text-sm outline-none focus:border-blue-600 sm:px-6 sm:py-4 sm:text-base dark:border-gray-700 dark:bg-gray-950 dark:text-white"

              />

              <button

                className="rounded-2xl bg-blue-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-blue-700 sm:px-8 sm:py-4 sm:text-base"

              >

                Subscribe

              </button>

            </div>

          </div>

        </div>

        {/* CTA */}

        <div className="mx-auto mt-16 max-w-6xl px-4 pb-16 sm:mt-24 sm:px-6 sm:pb-24">

          <div className="rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 px-6 py-10 text-center text-white shadow-2xl sm:rounded-3xl sm:px-8 sm:py-12 md:px-10 md:py-16">

            <h2 className="text-2xl font-black sm:text-3xl md:text-4xl">
              Start Learning Smarter Today
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-sm text-blue-100 sm:mt-5 sm:text-base md:text-lg">
              Save hours every week with AI-powered YouTube summaries from
              BriefTube.
            </p>

            <Link
              to="/"
              className="mt-6 inline-flex rounded-2xl bg-white px-6 py-3 text-sm font-bold text-blue-700 transition hover:scale-105 sm:mt-8 sm:px-8 sm:py-4 sm:text-lg"
            >
              ✨ Summarize a YouTube Video
            </Link>

          </div>

        </div>
        <button
          onClick={() =>
            window.scrollTo({
              top: 0,
              behavior: "smooth"
            })
          }
          aria-label="Scroll to top"
          className="fixed bottom-6 right-6 rounded-full bg-blue-600 p-3 text-white shadow-xl transition hover:scale-110 sm:bottom-8 sm:right-8 sm:p-4"
        >

          ↑

        </button>
      </section>

    </>
  );
}