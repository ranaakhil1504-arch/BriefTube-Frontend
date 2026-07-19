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
    <section className="mx-auto mt-16 max-w-7xl px-4 sm:mt-20 sm:px-6 lg:mt-28">
      <div className="rounded-2xl border border-gray-200 bg-white p-5 sm:rounded-3xl sm:p-8 md:p-10 dark:border-gray-700 dark:bg-gray-900">
        <h2 className="text-2xl font-black text-gray-900 sm:text-3xl md:text-4xl dark:text-white">
          Explore BriefTube
        </h2>

        <p className="mt-3 text-sm text-gray-600 sm:mt-4 sm:text-lg dark:text-gray-300">
          Discover everything BriefTube offers, from AI-powered YouTube summaries
          to educational resources and productivity guides.
        </p>

        <div className="mt-6 grid gap-4 sm:mt-10 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
          {links.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className="group rounded-2xl border border-gray-200 p-5 transition hover:border-blue-500 hover:shadow-lg sm:p-6 dark:border-gray-700 dark:hover:bg-gray-800/50"
            >
              <h3 className="text-lg font-bold text-gray-900 sm:text-xl dark:text-white">
                {item.title}
              </h3>

              <p className="mt-2.5 text-sm text-gray-600 sm:mt-3 sm:text-base dark:text-gray-300">
                {item.desc}
              </p>

              <span className="mt-3 inline-flex translate-x-0 items-center text-sm font-semibold text-blue-600 opacity-0 transition-all duration-200 group-hover:translate-x-1 group-hover:opacity-100 sm:mt-4">
                Learn more →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}