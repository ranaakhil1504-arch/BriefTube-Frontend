import fs from "fs";
import { SitemapStream, streamToPromise } from "sitemap";
import { getAllRoutes } from "./routes.mjs";

const hostname = "https://brieftube.co";

const sitemap = new SitemapStream({ hostname });

const today = new Date().toISOString();

// getAllRoutes() now pulls from BOTH blogPosts.ts and blogPage.ts,
// so every article gets a sitemap entry — previously this script
// only read blogPosts.ts directly, silently missing every post in
// blogPage.ts.
for (const route of getAllRoutes()) {
  sitemap.write({
    url: route.url,
    priority: route.priority,
    changefreq: route.changefreq,
    lastmod: today,
  });
}

sitemap.end();

const xml = await streamToPromise(sitemap);

fs.writeFileSync("./public/sitemap.xml", xml.toString());

console.log("✅ Sitemap generated successfully");
