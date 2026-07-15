import { Link, useParams } from "react-router-dom";
import {
  Send,
  Globe,
  Link as LinkIcon,
} from "lucide-react";
import { FaXTwitter } from "react-icons/fa6";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import SEO from "../components/SEO";
import { blogPosts } from "../data/blogPosts";

export default function BlogPost() {
  const { slug } = useParams();

  const post = blogPosts.find((p) => p.slug === slug);
const [progress, setProgress] = useState(0);

useEffect(() => {
  const updateProgress = () => {
    const scrollTop = window.scrollY;

    const documentHeight =
      document.documentElement.scrollHeight - window.innerHeight;

    const percentage =
      documentHeight > 0 ? (scrollTop / documentHeight) * 100 : 0;

    setProgress(percentage);
  };

  window.addEventListener("scroll", updateProgress);

  updateProgress();

  return () => window.removeEventListener("scroll", updateProgress);
}, []);
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
const articleUrl = window.location.href;

const shareOnX = () => {
  window.open(
    `https://twitter.com/intent/tweet?url=${encodeURIComponent(
      articleUrl
    )}&text=${encodeURIComponent(post.title)}`,
    "_blank"
  );
};

const shareOnGlobe = () => {
  window.open(
    `https://www.Globe.com/sharing/share-offsite/?url=${encodeURIComponent(
      articleUrl
    )}`,
    "_blank"
  );
};

const shareOnSend = () => {
  window.open(
    `https://www.Send.com/sharer/sharer.php?u=${encodeURIComponent(
      articleUrl
    )}`,
    "_blank"
  );
};

const copyLink = async () => {
  await navigator.clipboard.writeText(articleUrl);
  toast.success("Article link copied!");
};

  const relatedPosts = blogPosts
  .filter((p) => {
    if (p.slug === post.slug) return false;

    return p.tags.some((tag) => post.tags.includes(tag));
  })
  .slice(0, 3);

  return (
    <>
    
  <div
    className="fixed left-0 top-0 z-[9999] h-1 bg-blue-600 transition-all duration-150"
    style={{ width: `${progress}%` }}
  />
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
  className="h-[500px] w-full object-cover transition duration-700 group-hover:scale-105"
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

  <span>👤 {post.author}</span>

  <span>📅 Published: {post.date}</span>

  <span>🔄 Updated: {post.date}</span>

  <span>⏱ {post.readTime}</span>

</div>

          </div>

        </div>

        {/* Content */}

        <div className="mx-auto max-w-4xl px-6 py-16">
                  
                 
<div>
          <article className="mx-auto max-w-3xl rounded-3xl border border-gray-200 bg-white p-10 shadow-sm dark:border-gray-700 dark:bg-gray-900 prose prose-lg dark:prose-invert max-w-none prose-headings:scroll-mt-24 prose-headings:font-extrabold prose-headings:text-gray-900 dark:prose-headings:text-white prose-h2:mt-14 prose-h2:mb-6 prose-h2:text-3xl prose-h3:mt-10 prose-h3:mb-4 prose-h3:text-2xl prose-p:leading-8 prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-li:leading-8 prose-li:text-gray-700 dark:prose-li:text-gray-300 prose-ul:my-6 prose-strong:text-blue-600 dark:prose-strong:text-blue-400">

  {post.content.split("\n").map((line, index) => {
   if (line.startsWith("## ")) {
  const heading = line.replace("## ", "");
  const id = heading
    .toLowerCase()
    .replace(/[^\w\s]/g, "")
    .replace(/\s+/g, "-");

  return (
  <h2
  key={index}
  id={id}
  className="mt-16 mb-8 border-l-4 border-blue-600 pl-5 text-4xl font-extrabold tracking-tight text-gray-900 dark:border-blue-500 dark:text-white"
>
      {heading}
    </h2>
  );
}

    if (line.startsWith("### ")) {
      return <h3
  key={index}
  className="mt-10 mb-5 text-2xl font-bold text-gray-900 dark:text-white"
>
  {line.replace("### ", "")}</h3>;
    }

    if (line.startsWith("• ")) {
      return (
        <ul
  key={index}
  className="my-6 list-disc space-y-3 pl-8 text-lg leading-8"
>
  <li>{line.replace("• ", "")}</li>
</ul>
      );
    }

    if (line.trim() === "") return null;

    return (
 <p
  key={index}
  className="mb-7 text-lg leading-8 text-gray-700 dark:text-gray-300"
>
    {line}
  </p>
);
  })}


</article>
{/* Share */}

<div className="mt-16 rounded-3xl border border-gray-200 bg-white p-8 dark:border-gray-700 dark:bg-gray-900">

  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
    Share this article
  </h3>

  <p className="mt-2 text-gray-600 dark:text-gray-400">
    Help others discover BriefTube.
  </p>

  <div className="mt-6 flex flex-wrap gap-4">

    <button
      onClick={shareOnX}
      className="flex items-center gap-2 rounded-xl bg-black px-5 py-3 font-semibold text-white transition hover:scale-105"
    >
      <FaXTwitter />
      X
    </button>

    <button
      onClick={shareOnGlobe}
      className="flex items-center gap-2 rounded-xl bg-blue-700 px-5 py-3 font-semibold text-white transition hover:scale-105"
    >
      <Globe size={18} />
      Globe
    </button>

    <button
      onClick={shareOnSend}
      className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:scale-105"
    >
      <Send size={18} />
      Send
    </button>

    <button
      onClick={copyLink}
      className="flex items-center gap-2 rounded-xl border px-5 py-3 font-semibold transition hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800"
    >
      <LinkIcon size={18} />
      Copy Link
    </button>

  </div>

</div>
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
 </div>
      
</section>
    </>
  );
}