import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import { blogPosts } from "../data/blogPosts";

export default function Blog() {
  const [search, setSearch] = useState("");

  const filteredPosts = useMemo(() => {
    return blogPosts.filter(
      (post) =>
        post.title.toLowerCase().includes(search.toLowerCase()) ||
        post.description.toLowerCase().includes(search.toLowerCase()) ||
        post.tags.join(" ").toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  const featured = filteredPosts[0];

  const others = filteredPosts.slice(1);

  return (
    <>
      <SEO
        title="Blog | BriefTube"
        description="Read AI, productivity and YouTube learning articles from BriefTube."
      />

      <section className="min-h-screen bg-gray-50 dark:bg-gray-950">

        {/* Header */}

        <div className="mx-auto max-w-7xl px-6 py-16">

          <h1 className="text-center text-5xl font-black text-gray-900 dark:text-white">
            BriefTube Blog
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-center text-lg text-gray-600 dark:text-gray-400">
            AI, productivity, YouTube learning, study tips and the latest
            updates from BriefTube.
          </p>

          {/* Search */}

          <div className="mx-auto mt-10 max-w-xl">

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search articles..."
              className="w-full rounded-2xl border border-gray-300 bg-white px-5 py-4 outline-none transition focus:border-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
            />

          </div>

        </div>

        {/* Featured Article */}

        {featured && (

          <div className="mx-auto max-w-7xl px-6">

            <Link
              to={`/blog/${featured.slug}`}
              className="group overflow-hidden rounded-3xl bg-white shadow-xl transition hover:-translate-y-1 dark:bg-gray-900"
            >

              <img
                src={featured.image}
                alt={featured.title}
                className="h-[420px] w-full object-cover transition duration-500 group-hover:scale-105"
              />

              <div className="p-10">

                <div className="mb-4 flex flex-wrap gap-2">

                  {featured.tags.map((tag) => (

                    <span
                      key={tag}
                      className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
                    >
                      {tag}
                    </span>

                  ))}

                </div>

                <h2 className="text-4xl font-black text-gray-900 group-hover:text-blue-600 dark:text-white">
                  {featured.title}
                </h2>

                <p className="mt-5 text-lg text-gray-600 dark:text-gray-400">
                  {featured.description}
                </p>

                <div className="mt-8 flex flex-wrap gap-6 text-gray-500 dark:text-gray-400">

                  <span>👤 {featured.author}</span>

                  <span>📅 {featured.date}</span>

                  <span>⏱ {featured.readTime}</span>

                </div>

              </div>

            </Link>

          </div>

        )}

        {/* Articles */}

        <div className="mx-auto mt-20 max-w-7xl px-6">

          <h2 className="mb-10 text-3xl font-black text-gray-900 dark:text-white">
            Latest Articles
          </h2>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {others.map((post) => (
              <Link
                key={post.slug}
                to={`/blog/${post.slug}`}
                className="group overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl dark:border-gray-700 dark:bg-gray-900"
              >
                <img
  src={post.image}
  alt={post.title}
  className="h-56 w-full object-cover transition duration-500 group-hover:scale-110"
/>

                <div className="p-6">

                  <div className="mb-4 flex flex-wrap gap-2">

                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
                      >
                        {tag}
                      </span>
                    ))}

                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 transition group-hover:text-blue-600 dark:text-white">
                    {post.title}
                  </h3>

                  <p className="mt-4 text-gray-600 dark:text-gray-400">
                    {post.description}
                  </p>

                  <div className="mt-6 flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">

                    <span>{post.date}</span>

                    <span>{post.readTime}</span>

                  </div>

                </div>

              </Link>
            ))}

          </div>

          {filteredPosts.length === 0 && (
            <div className="py-24 text-center">

              <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
                No Articles Found
              </h3>

              <p className="mt-4 text-gray-600 dark:text-gray-400">
                Try searching with different keywords.
              </p>

            </div>
          )}

        </div>

        {/* CTA */}

        <div className="mx-auto mt-24 max-w-6xl px-6 pb-24">

          <div className="rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 px-10 py-16 text-center text-white shadow-2xl">

            <h2 className="text-4xl font-black">
              Ready to Summarize Any YouTube Video?
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-lg text-blue-100">
              Save hours every week with AI-powered YouTube summaries from
              BriefTube.
            </p>

            <Link
              to="/"
              className="mt-8 inline-flex rounded-2xl bg-white px-8 py-4 text-lg font-bold text-blue-700 transition hover:scale-105"
            >
              🚀 Try BriefTube Free
            </Link>

          </div>

        </div>

      </section>

    </>
  );
}