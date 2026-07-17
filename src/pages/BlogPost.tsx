import { Link, useParams } from "react-router-dom";
import {
  Send,
  Globe,
  Link as LinkIcon,
} from "lucide-react";
import { FaXTwitter } from "react-icons/fa6";
import toast from "react-hot-toast";
import { useEffect, useState, useMemo } from "react";
import SEO from "../components/SEO";
import BlogSchema from "../components/BlogSchema";
import { blogPosts } from "../data/blogPosts";
import { blogPage } from "../data/blogPage";
import BreadcrumbSchema from "../components/BreadcrumbSchema";
import { useHeadingObserver } from "../hooks/useHeadingObserver";

export default function BlogPost() {
  const { slug } = useParams();
  const allPosts = [...blogPosts, ...blogPage];

const post = allPosts.find((p) => p.slug === slug);
  const [progress, setProgress] = useState(0);
  const [activeHeading, setActiveHeading] = useState("");

  // 1. Top bar reading progress indicator
  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
      const percentage = documentHeight > 0 ? (scrollTop / documentHeight) * 100 : 0;
      setProgress(percentage);
    };

    window.addEventListener("scroll", updateProgress);
    updateProgress();
    return () => window.removeEventListener("scroll", updateProgress);
  }, []);
  
  // 2. Table of contents headings generator with unified string trimming
  const headings = useMemo(() => {
    if (!post || !post.content) return [];
    return post.content
      .split("\n")
      .filter((line) => line.trim().startsWith("## "))
      .map((line) => {
        const text = line.replace("## ", "").trim();
        return {
          text,
          id: text
            .toLowerCase()
            .replace(/[^a-z0-9\s-]/g, "") // Clean string from odd characters
            .trim()
            .replace(/\s+/g, "-"),      // Uniform spacing with dash delimiters
        };
      });
  }, [post?.content]);

  const articleUrl = post
  ? `https://brieftube.co/blog/${post.slug}`
  : "";

  // 3. Trigger external scroll hook
  useHeadingObserver(headings, setActiveHeading);

  // Early return fallback placed below Hook cycles safely
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

  // 4. Dynamic Related posts mapping matching tag arrays (Resolves ESLint issue)
  const relatedPosts = allPosts
    .filter((p) => {
      if (p.slug === post.slug) return false;
      return p.tags?.some((tag) => post.tags?.includes(tag));
    })
    .slice(0, 3);

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
    `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
      articleUrl
    )}`,
    "_blank"
  );
};
 const shareOnSend = () => {
  window.open(
    `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      articleUrl
    )}`,
    "_blank"
  );
};

  const copyLink = async () => {
    await navigator.clipboard.writeText(articleUrl);
    toast.success("Article link copied!");
  };

  return (
    <>
      <div
        className="fixed left-0 top-0 z-[9999] h-1 bg-blue-600 transition-all duration-150"
        style={{ width: `${progress}%` }}
      />
      
      <SEO title={post.title} description={post.description} />

      <BlogSchema
        title={post.title}
        description={post.description}
        image={post.image}
        datePublished={post.date}
        author={post.author}
        slug={post.slug}
      />
      <BreadcrumbSchema title={post.title} slug={post.slug} />
      
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
                <span key={tag} className="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white">
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

        {/* Content Section Container layout */}
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 lg:grid-cols-[280px_1fr]">
          <aside className="hidden lg:block">
            <div className="toc-scroll sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto rounded-3xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900">
              <h2 className="mb-5 text-lg font-bold text-gray-900 dark:text-white">
                Table of Contents
              </h2>
             <nav className="pr-2">
                <ul className="space-y-2">
                  {headings.map((heading) => (
                    <li key={heading.id}>
                     <button
  data-toc={heading.id}
  onClick={() => {
    const element = document.getElementById(heading.id);

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }}
 className={`block w-full rounded-lg px-3 py-2 text-left text-sm transition-all duration-300 ${
  activeHeading === heading.id
    ? "translate-x-1 border-l-4 border-blue-600 bg-blue-100 font-semibold text-blue-700 dark:bg-blue-900/40 dark:text-blue-300"
    : "text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
}`}
>
  {heading.text}
</button>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </aside>       
                 
          <div>
            <article className="mx-auto max-w-3xl rounded-3xl border border-gray-200 bg-white p-10 shadow-sm dark:border-gray-700 dark:bg-gray-900 prose prose-lg dark:prose-invert max-w-none prose-headings:scroll-mt-40">
              {post.content.split("\n").map((line, index) => {
                if (line.trim().startsWith("## ")) {
                  const heading = line.replace("## ", "").trim();
                  const id = heading
                    .toLowerCase()
                    .replace(/[^a-z0-9\s-]/g, "")
                    .trim()
                    .replace(/\s+/g, "-");

                  return (
                    <h2
                      key={index}
                      id={id}
                      className="mt-16 mb-8 border-l-4 border-blue-600 pl-5 text-4xl font-extrabold tracking-tight text-gray-900 dark:border-blue-500 dark:text-white scroll-mt-40"
                    >
                      {heading}
                    </h2>
                  );
                }

                if (line.trim().startsWith("### ")) {
                  return (
                    <h3 key={index} className="mt-10 mb-5 text-2xl font-bold text-gray-900 dark:text-white">
                      {line.replace("### ", "").trim()}
                    </h3>
                  );
                }

                if (line.trim().startsWith("• ")) {
                  return (
                    <ul key={index} className="my-2 list-disc pl-8 text-lg text-gray-700 dark:text-gray-300">
                      <li>{line.replace("• ", "").trim()}</li>
                    </ul>
                  );
                }

                if (line.trim() === "") return null;

                return (
                  <p key={index} className="mb-7 text-lg leading-8 text-gray-700 dark:text-gray-300">
                    {line}
                  </p>
                );
              })}
            </article>

            {/* Main Action Project Return Button (Redirects to https://brieftube.co/) */}
            <div className="mt-16 rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-600 p-8 text-center text-white shadow-lg">
              <h3 className="text-3xl font-black">Ready to save hours of video watching?</h3>
              <p className="mt-2 text-blue-100 max-w-xl mx-auto text-lg">
                Paste any YouTube link directly into BriefTube to generate instant AI transcripts and deep summaries.
              </p>
              <a
                href="https://brieftube.co/"
                className="mt-6 inline-flex items-center justify-center rounded-xl bg-white px-8 py-4 font-bold text-blue-600 transition shadow-md hover:bg-gray-50 hover:scale-[1.02] duration-200"
              >
                🚀 Try BriefTube Tool Now
              </a>
            </div>

            {/* Share Panel Drawer Box Layout */}
            <div className="mt-8 rounded-3xl border border-gray-200 bg-white p-8 dark:border-gray-700 dark:bg-gray-900">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                Share this article
              </h3>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                Help others learn by sharing this piece.
              </p>
              <div className="mt-6 flex flex-wrap gap-4">
                <button onClick={shareOnX} className="flex items-center gap-2 rounded-xl bg-black px-4 py-2 text-white hover:opacity-90 transition"><FaXTwitter /> X</button>
                <button onClick={shareOnGlobe} className="flex items-center gap-2 rounded-xl bg-blue-700 px-4 py-2 text-white hover:opacity-90 transition"><Globe /> LinkedIn</button>
                <button onClick={shareOnSend} className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-white hover:opacity-90 transition"><Send /> Facebook</button>
                <button onClick={copyLink} className="flex items-center gap-2 rounded-xl bg-gray-200 px-4 py-2 text-gray-800 dark:bg-gray-800 dark:text-gray-200 hover:opacity-90 transition"><LinkIcon /> Copy Link</button>
              </div>
            </div>

            {/* Related Articles Cards Display Grid */}
            {relatedPosts.length > 0 && (
              <div className="mt-16">
                <h3 className="text-3xl font-black text-gray-900 dark:text-white mb-8">Related Articles</h3>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {relatedPosts.map((p) => (
                    <Link 
                      key={p.slug} 
                      to={`/blog/${p.slug}`}
                      className="group block rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition hover:shadow-md dark:border-gray-800 dark:bg-gray-900"
                    >
                      <img src={p.image} alt={p.title} className="h-40 w-full rounded-xl object-cover" />
                      <h4 className="mt-4 font-bold text-gray-900 dark:text-white group-hover:text-blue-600 line-clamp-2">{p.title}</h4>
                    </Link>
                  ))}
                </div>
              </div>
            )}
            <div className="mt-16 flex justify-center">
  <Link
    to="/blog"
    className="inline-flex items-center rounded-xl bg-gray-900 px-6 py-3 font-semibold text-white transition hover:bg-black dark:bg-white dark:text-black dark:hover:bg-gray-200"
  >
    ← Back to All Articles
  </Link>
</div>
          </div>
        </div>
      </section>
    </>
  );
}
