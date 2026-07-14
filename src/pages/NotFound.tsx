import { Link } from "react-router-dom";
import SEO from "../components/SEO";

export default function NotFound() {
  return (
    <>
      <SEO
        title="404 - Page Not Found | BriefTube"
        description="The page you're looking for doesn't exist."
      />

      <section className="flex min-h-screen items-center justify-center bg-gray-50 px-6 dark:bg-gray-950">
        <div className="max-w-xl text-center">

          <h1 className="text-8xl font-extrabold text-blue-600">
            404
          </h1>

          <h2 className="mt-6 text-3xl font-bold text-gray-900 dark:text-white">
            Page Not Found
          </h2>

          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
            Sorry, the page you are looking for doesn't exist or may have been moved.
          </p>

          <Link
            to="/"
            className="mt-10 inline-flex rounded-xl bg-blue-600 px-8 py-4 font-semibold text-white transition hover:bg-blue-700"
          >
            ← Back to Home
          </Link>

        </div>
      </section>
    </>
  );
}