import fs from "fs";
import { SitemapStream, streamToPromise } from "sitemap";
import { blogPosts } from "../src/data/blogPosts.ts";

const hostname = "https://brieftube.co";

const staticPages = [
  {
    url: "/",
    priority: 1.0,
    changefreq: "daily",
  },
  {
    url: "/blog",
    priority: 0.95,
    changefreq: "daily",
  },
  {
    url: "/about",
    priority: 0.8,
    changefreq: "monthly",
  },
  {
    url: "/contact",
    priority: 0.7,
    changefreq: "monthly",
  },
  {
    url: "/faq",
    priority: 0.8,
    changefreq: "monthly",
  },
  {
    url: "/history",
    priority: 0.7,
    changefreq: "monthly",
  },
  {
    url: "/privacy",
    priority: 0.5,
    changefreq: "yearly",
  },
  {
    url: "/terms",
    priority: 0.5,
    changefreq: "yearly",
  },
];

const sitemap = new SitemapStream({
  hostname,
});

const today = new Date().toISOString();

for (const page of staticPages) {
  sitemap.write({
    url: page.url,
    priority: page.priority,
    changefreq: page.changefreq,
    lastmod: today,
  });
}

for (const post of blogPosts) {
  sitemap.write({
    url: `/blog/${post.slug}`,
    priority: 0.9,
    changefreq: "monthly",
    lastmod: today,
  });
}

sitemap.end();

const xml = await streamToPromise(sitemap);

fs.writeFileSync("./public/sitemap.xml", xml.toString());

console.log("✅ Sitemap generated successfully");