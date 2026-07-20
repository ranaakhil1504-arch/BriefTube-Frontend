import { blogPosts } from "../src/data/blogPosts.ts";
import { blogPage } from "../src/data/blogPage.ts";

// Static pages that actually exist as routes in src/App.tsx.
// IMPORTANT: keep this list in sync with App.tsx — if you add a new
// top-level <Route> there, add it here too, or it won't get a
// sitemap entry or a prerendered HTML snapshot.
//
// Note: "/history" was intentionally left out. It exists as a page
// component (src/pages/History.tsx) but isn't wired into a <Route>
// in App.tsx, so it currently 404s. It also shows per-user data, so
// it isn't something you'd want a search engine to index anyway.
const staticRoutes = [
  { url: "/", priority: 1.0, changefreq: "daily" },
  { url: "/blog", priority: 0.95, changefreq: "daily" },
  { url: "/about", priority: 0.8, changefreq: "monthly" },
  { url: "/contact", priority: 0.7, changefreq: "monthly" },
  { url: "/faq", priority: 0.8, changefreq: "monthly" },
  { url: "/privacy", priority: 0.5, changefreq: "yearly" },
  { url: "/terms", priority: 0.5, changefreq: "yearly" },
];

// blogPosts.ts and blogPage.ts are maintained as two separate files.
// This is the ONE place that merges them — previously the sitemap
// script only read blogPosts.ts, so every article in blogPage.ts
// (e.g. "best-educational-youtube-channels") was silently missing
// from the sitemap and never got discovered by Google.
function getBlogRoutes() {
  const allPosts = [...blogPosts, ...blogPage];

  const seen = new Set();
  const routes = [];

  for (const post of allPosts) {
    // Guards against a duplicate slug accidentally existing in both files.
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
  return [...staticRoutes, ...getBlogRoutes()];
}
