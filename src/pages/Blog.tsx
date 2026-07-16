import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { Link } from "react-router-dom";
import blogHero from "../assets/blog-hero.jpg";
import SEO from "../components/SEO";
import { blogPosts } from "../data/blogPosts";
import BlogListSchema from "../components/BlogListSchema";
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
<BlogListSchema />
      <section className="min-h-screen bg-gray-50 dark:bg-gray-950">

       

  {/* ================= HERO ================= */}

<div className="relative overflow-hidden">

  {/* Background */}

  <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-indigo-100 dark:from-gray-950 dark:via-gray-950 dark:to-gray-900" />

  <div className="absolute -left-32 top-10 h-72 w-72 rounded-full bg-blue-400/20 blur-3xl" />

  <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-indigo-500/20 blur-3xl" />

  <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-6 py-20 lg:grid-cols-2">

    {/* LEFT */}

    <div>

      <div className="inline-flex items-center rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">

        🚀 Official BriefTube Blog

      </div>

      <h1 className="mt-8 text-5xl font-black leading-tight text-gray-900 dark:text-white md:text-6xl">

        Learn Faster with AI

      </h1>

      <p className="mt-8 max-w-2xl text-xl leading-9 text-gray-600 dark:text-gray-400">

        Discover AI tutorials, productivity hacks, YouTube learning guides and
        expert articles from the creators of

        <span className="font-semibold text-blue-600"> BriefTube</span> —

        the AI YouTube Video Summarizer that helps people save hours every week.

      </p>

      {/* Buttons */}

      <div className="mt-10 flex flex-wrap gap-4">

        <Link
          to="/"
          className="rounded-2xl bg-blue-600 px-8 py-4 text-lg font-bold text-white transition hover:scale-105 hover:bg-blue-700"
        >
          🚀 Try BriefTube
        </Link>

        <a
          href="#articles"
          className="rounded-2xl border border-gray-300 bg-white px-8 py-4 text-lg font-semibold text-gray-700 transition hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:hover:bg-gray-800"
        >
          Browse Articles
        </a>

      </div>

      {/* Stats */}

      <div className="mt-12 flex flex-wrap gap-10">

        <div>

          <h3 className="text-3xl font-black text-gray-900 dark:text-white">

            {blogPosts.length}+

          </h3>

          <p className="text-gray-500">

            Articles

          </p>

        </div>

        <div>

          <h3 className="text-3xl font-black text-gray-900 dark:text-white">

            AI

          </h3>

          <p className="text-gray-500">

            Powered Learning

          </p>

        </div>

        <div>

          <h3 className="text-3xl font-black text-gray-900 dark:text-white">

            Free

          </h3>

          <p className="text-gray-500">

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

<div className="mx-auto -mt-10 max-w-3xl px-6 relative z-20">

  <div className="relative rounded-3xl border border-gray-200 bg-white p-4 shadow-xl dark:border-gray-700 dark:bg-gray-900">

<Search
className="absolute left-8 top-1/2 -translate-y-1/2 text-gray-400"
size={22}
/>

<input
value={search}
onChange={(e)=>setSearch(e.target.value)}
placeholder="Search articles, AI tools, productivity guides..."
className="w-full bg-transparent pl-12 pr-4 py-4 outline-none text-lg dark:text-white"
/>

</div>

</div>

{/* ================= POPULAR TOPICS ================= */}

<div className="mx-auto mt-14 max-w-7xl px-6">

<div className="flex flex-wrap items-center gap-3">

<span className="font-semibold text-gray-500 dark:text-gray-400">

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
className="rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium transition hover:border-blue-500 hover:bg-blue-50 hover:text-blue-600 dark:border-gray-700 dark:bg-gray-900 dark:hover:bg-blue-900/30"
>

{topic}

</button>

))}

</div>

</div>

        {/* Featured Article */}

     {featured && (

<section className="mx-auto mt-20 max-w-7xl px-6">

<div className="mb-8 flex items-center justify-between">

<div>

<span className="rounded-full bg-yellow-100 px-4 py-2 text-sm font-bold text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300">

⭐ Featured Article

</span>

<h2 className="mt-5 text-4xl font-black text-gray-900 dark:text-white">

Editor's Pick

</h2>

<p className="mt-3 text-lg text-gray-600 dark:text-gray-400">

Our most recommended AI learning article this week.

</p>

</div>

</div>

<Link
to={`/blog/${featured.slug}`}
className="group grid overflow-hidden rounded-[32px] border border-gray-200 bg-white shadow-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl dark:border-gray-700 dark:bg-gray-900 lg:grid-cols-2"
>

<div className="overflow-hidden">

<img
src={featured.image}
alt={featured.title}
className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
/>

</div>

<div className="flex flex-col justify-center p-12">

<div className="mb-6 flex flex-wrap gap-3">

{featured.tags.map((tag) => (

<span
key={tag}
className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
>

{tag}

</span>

))}

</div>

<h2 className="text-5xl font-black leading-tight text-gray-900 transition group-hover:text-blue-600 dark:text-white">

{featured.title}

</h2>

<p className="mt-6 text-xl leading-8 text-gray-600 dark:text-gray-400">

{featured.description}

</p>

<div className="mt-10 flex flex-wrap items-center gap-6 text-gray-500 dark:text-gray-400">

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

<div className="mt-10">

<span className="inline-flex items-center text-lg font-bold text-blue-600">

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
className="mx-auto mt-28 max-w-7xl px-6"
>

          <div className="mb-12 flex items-end justify-between">

  <div>

    <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-bold text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">

      📚 Latest Articles

    </span>

    <h2 className="mt-5 text-4xl font-black text-gray-900 dark:text-white">

      Explore All Articles

    </h2>

    <p className="mt-3 text-lg text-gray-600 dark:text-gray-400">

      AI tutorials, YouTube learning, productivity and study guides.

    </p>

  </div>

</div>

          <div className="grid gap-10 md:grid-cols-2 xl:grid-cols-3">
                        {others.map((post) => (
              <Link
                key={post.slug}
                to={`/blog/${post.slug}`}
                className="group overflow-hidden rounded-[30px] border border-gray-200 bg-white shadow-md transition-all duration-500 hover:-translate-y-3 hover:border-blue-200 hover:shadow-2xl dark:border-gray-700 dark:bg-gray-900 dark:hover:border-blue-800"
              >
                <img
  src={post.image}
  alt={`${post.title} - BriefTube Blog`}
  className="h-64 w-full object-cover transition duration-700 group-hover:scale-110"
/>

                <div className="flex h-full flex-col p-7">

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

                  <h3 className="line-clamp-2 text-2xl font-black leading-tight text-gray-900 transition group-hover:text-blue-600 dark:text-white">
                    {post.title}
                  </h3>

                  <p className="mt-4 line-clamp-3 text-gray-600 dark:text-gray-400">
                    {post.description}
                  </p>

                  <div className="mt-auto pt-8">

  <div className="mb-5 flex flex-wrap gap-2">

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

  <span className="font-bold text-blue-600">

    Read Article →

  </span>

</div>

                </div>

              </Link>
            ))}

          </div>

          {filteredPosts.length === 0 && (
            <div className="py-24 text-center">

              <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
                Nothing matched your search
              </h3>

              <p className="mt-4 text-gray-600 dark:text-gray-400">
                Try AI, YouTube, Productivity or Study.
              </p>

            </div>
          )}

        </div>

{/* ================= NEWSLETTER ================= */}

<div className="mx-auto mt-24 max-w-5xl px-6">

<div className="rounded-[32px] border border-gray-200 bg-white p-12 shadow-lg dark:border-gray-700 dark:bg-gray-900">

<h2 className="text-center text-4xl font-black text-gray-900 dark:text-white">

Never Miss New AI Guides

</h2>

<p className="mx-auto mt-5 max-w-2xl text-center text-lg text-gray-600 dark:text-gray-400">

Get notified whenever BriefTube publishes a new AI tutorial,
productivity guide or YouTube learning article.

</p>

<div className="mx-auto mt-10 flex max-w-2xl flex-col gap-4 md:flex-row">

<input

type="email"

placeholder="Enter your email"

className="flex-1 rounded-2xl border border-gray-300 px-6 py-4 outline-none focus:border-blue-600 dark:border-gray-700 dark:bg-gray-950 dark:text-white"

/>

<button

className="rounded-2xl bg-blue-600 px-8 py-4 font-bold text-white transition hover:bg-blue-700"

>

Subscribe

</button>

</div>

</div>

</div>

        {/* CTA */}

        <div className="mx-auto mt-24 max-w-6xl px-6 pb-24">

          <div className="rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 px-10 py-16 text-center text-white shadow-2xl">

            <h2 className="text-4xl font-black">
              Start Learning Smarter Today
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-lg text-blue-100">
              Save hours every week with AI-powered YouTube summaries from
              BriefTube.
            </p>

            <Link
              to="/"
              className="mt-8 inline-flex rounded-2xl bg-white px-8 py-4 text-lg font-bold text-blue-700 transition hover:scale-105"
            >
              ✨ Summarize a YouTube Video
            </Link>

          </div>

        </div>
<button
onClick={() =>
window.scrollTo({
top:0,
behavior:"smooth"
})
}
className="fixed bottom-8 right-8 rounded-full bg-blue-600 p-4 text-white shadow-xl transition hover:scale-110"
>

↑

</button>
      </section>

    </>
  );
}