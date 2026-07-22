
import { blogPosts } from "../src/data/blogPosts.ts";
import { blogPage } from "../src/data/blogPage.ts";

const staticRoutes = [
  { url: "/", priority: 1.0, changefreq: "daily" },
  { url: "/blog", priority: 0.95, changefreq: "daily" },
  { url: "/about", priority: 0.8, changefreq: "monthly" },
  { url: "/contact", priority: 0.7, changefreq: "monthly" },
  { url: "/faq", priority: 0.8, changefreq: "monthly" },
  { url: "/privacy", priority: 0.5, changefreq: "yearly" },
  { url: "/terms", priority: 0.5, changefreq: "yearly" },
];

// --- ADD TOOL PAGES ---
const toolRoutes = [
  { url: "/pdf-compressor", priority: 0.9, changefreq: "weekly" },
  { url: "/pdf-compressor/image-compressor", priority: 0.85, changefreq: "weekly" },
  { url: "/pdf-compressor/pdf-merger", priority: 0.85, changefreq: "weekly" },
  { url: "/pdf-compressor/image-resizer", priority: 0.85, changefreq: "weekly" },
  { url: "/pdf-compressor/qr-generator", priority: 0.85, changefreq: "weekly" },
];

function getBlogRoutes() {
  const allPosts = [...blogPosts, ...blogPage];
  const seen = new Set();
  const routes = [];

  for (const post of allPosts) {
    if (seen.has(post.slug)) continue;
    seen.add(post.slug);
    routes.push({
      url: `/blog/${post.slug}`,
      priority: 0.9,
      changefreq: "monthly",
    });
  }

  return routes;
}

export function getAllRoutes() {
  return [...staticRoutes, ...toolRoutes, ...getBlogRoutes()];
}
