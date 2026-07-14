
export default function Privacy() {
  return (
    <section className="min-h-screen bg-gray-50 px-6 py-16 text-gray-800 transition-colors dark:bg-gray-950 dark:text-gray-100">
      <div className="mx-auto max-w-4xl">

        <h1 className="mb-8 text-4xl font-extrabold">
          Privacy Policy
        </h1>

        <p className="mb-6 text-gray-600 dark:text-gray-400">
          Last updated: July 2026
        </p>

        <div className="space-y-8 leading-8">

          <section>
            <h2 className="mb-3 text-2xl font-bold">
              1. Information We Collect
            </h2>

            <p>
              BriefTube collects only the information necessary to provide
              AI-powered YouTube video summaries. When you sign in with Google,
              we may store your name, email address and profile picture to
              personalize your experience.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-bold">
              2. How We Use Your Data
            </h2>

            <ul className="list-disc space-y-2 pl-6">
              <li>Generate AI summaries.</li>
              <li>Store your summary history.</li>
              <li>Improve BriefTube.</li>
              <li>Provide customer support.</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-bold">
              3. Third-Party Services
            </h2>

            <p>
              BriefTube uses Google Authentication, Supabase, Google Analytics
              and AI providers to deliver the service.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-bold">
              4. Cookies
            </h2>

            <p>
              Cookies may be used to maintain login sessions, remember
              preferences and analyze website traffic.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-bold">
              5. Your Rights
            </h2>

            <p>
              You may request deletion of your stored history or contact us for
              privacy-related questions.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-bold">
              6. Contact
            </h2>

            <p>
              Email:
              <span className="font-semibold">
                {" "}
                support@brieftube.co
              </span>
            </p>
          </section>

        </div>
      </div>
    </section>
  );
}