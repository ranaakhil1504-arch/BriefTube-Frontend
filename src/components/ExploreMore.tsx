import { Link } from "react-router-dom";

const links = [
  {
    title: "AI YouTube Summarizer",
    href: "/",
    desc: "Generate AI-powered YouTube summaries instantly.",
  },
  {
    title: "Read Our Blog",
    href: "/blog",
    desc: "Guides, AI tips and productivity articles.",
  },
  {
    title: "Frequently Asked Questions",
    href: "/faq",
    desc: "Learn everything about BriefTube.",
  },
  {
    title: "About BriefTube",
    href: "/about",
    desc: "Our mission and technology.",
  },
  {
    title: "Contact Us",
    href: "/contact",
    desc: "Need help? Get in touch.",
  },
];

export default function ExploreMore() {
  return (
    <section className="mx-auto mt-28 max-w-7xl px-6">
      <div className="rounded-3xl border border-gray-200 bg-white p-10 dark:border-gray-700 dark:bg-gray-900">
        <h2 className="text-4xl font-black text-gray-900 dark:text-white">
          Explore BriefTube
        </h2>

        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
          Discover everything BriefTube offers, from AI-powered YouTube summaries
          to educational resources and productivity guides.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {links.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className="rounded-2xl border border-gray-200 p-6 transition hover:border-blue-500 hover:shadow-lg dark:border-gray-700"
            >
              <h3 className="text-xl font-bold">{item.title}</h3>

              <p className="mt-3 text-gray-600 dark:text-gray-300">
                {item.desc}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}