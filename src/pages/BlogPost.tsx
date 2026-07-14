import { Link, useParams } from "react-router-dom";
import SEO from "../components/SEO";
import { blogPosts } from "../data/blogPosts";

export default function BlogPost() {
  const { slug } = useParams();

  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <section className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-950">
        <div className="text-center">

          <h1 className="text-4xl font-black text-gray-900 dark:text-white">
            Article Not Found
          </h1>

          <p className="mt-4 text-gray-600 dark:text-gray-400">
            The article you are looking for doesn't exist.
          </p>

          <Link
            to="/blog"
            className="mt-8 inline-flex rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            Back to Blog
          </Link>

        </div>
      </section>
    );
  }

  const relatedPosts = blogPosts
    .filter((p) => p.slug !== post.slug)
    .slice(0, 3);

  return (
    <>
      <SEO
        title={post.title}
        description={post.description}
      />

      <section className="bg-gray-50 dark:bg-gray-950">

        {/* Hero */}

        <div className="relative">

          <img
  src={post.image}
  alt={post.title}
  className="h-[420px] w-full object-cover transition duration-700 group-hover:scale-105"
/>

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

          <div className="absolute bottom-12 left-1/2 w-full max-w-5xl -translate-x-1/2 px-6">

            <div className="mb-5 flex flex-wrap gap-2">

              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white"
                >
                  {tag}
                </span>
              ))}

            </div>

            <h1 className="max-w-4xl text-5xl font-black leading-tight text-white md:text-6xl">
              {post.title}
            </h1>

            <div className="mt-8 flex flex-wrap items-center gap-6 text-white">

              <span>
                👤 {post.author}
              </span>

              <span>
                📅 {post.date}
              </span>

              <span>
                ⏱ {post.readTime}
              </span>

            </div>

          </div>

        </div>

        {/* Content */}

        <div className="mx-auto max-w-5xl px-6 py-16">

          <article className="space-y-8 text-lg leading-9 text-gray-700 dark:text-gray-300">

            {post.content.split("\n\n").map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}

          </article>
                    {/* CTA */}

          <div className="mt-16 rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-10 text-center text-white shadow-xl">

            <h2 className="text-3xl font-black">
              Ready to Summarize Any YouTube Video?
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-lg text-blue-100">
              Paste any YouTube URL and let BriefTube generate a structured AI summary in seconds.
            </p>

            <Link
              to="/"
              className="mt-8 inline-flex rounded-2xl bg-white px-8 py-4 text-lg font-bold text-blue-700 transition hover:scale-105"
            >
              🚀 Try BriefTube Free
            </Link>

          </div>

          {/* Related Posts */}

          <div className="mt-24">

            <h2 className="mb-8 text-3xl font-black text-gray-900 dark:text-white">
              Related Articles
            </h2>

            <div className="grid gap-8 md:grid-cols-3">

              {relatedPosts.map((article) => (
                <Link
                  key={article.slug}
                  to={`/blog/${article.slug}`}
                  className="group overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-2 hover:shadow-xl dark:border-gray-700 dark:bg-gray-900"
                >

                  <img
                    src={article.image}
                    alt={article.title}
                    className="h-52 w-full object-cover transition duration-300 group-hover:scale-105"
                  />

                  <div className="p-6">

                    <div className="mb-3 flex flex-wrap gap-2">

                      {article.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
                        >
                          {tag}
                        </span>
                      ))}

                    </div>

                    <h3 className="text-xl font-bold text-gray-900 transition group-hover:text-blue-600 dark:text-white">
                      {article.title}
                    </h3>

                    <p className="mt-3 text-gray-600 dark:text-gray-400">
                      {article.description}
                    </p>

                    <div className="mt-5 flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">

                      <span>{article.date}</span>

                      <span>{article.readTime}</span>

                    </div>

                  </div>

                </Link>
              ))}

            </div>

          </div>

          {/* Back */}

          <div className="mt-16">

            <Link
              to="/blog"
              className="inline-flex items-center rounded-xl bg-gray-900 px-6 py-3 font-semibold text-white transition hover:bg-black dark:bg-white dark:text-black"
            >
              ← Back to Blog
            </Link>

          </div>

        </div>

      </section>

    </>
  );
}