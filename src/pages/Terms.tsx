import SEO from "../components/SEO";
export default function Terms() {
  return (
    <>
    <SEO
  title="Terms of Service | BriefTube"
  description="Read the Terms of Service for using BriefTube."
/>
    <section className="min-h-screen bg-gray-50 px-6 py-16 text-gray-800 dark:bg-gray-950 dark:text-gray-100">
      <div className="mx-auto max-w-4xl">

        <h1 className="mb-8 text-4xl font-extrabold">
          Terms of Service
        </h1>

        <div className="space-y-8 leading-8">

          <section>
            <h2 className="text-2xl font-bold">
              Acceptance
            </h2>

            <p>
              By using BriefTube you agree to these Terms of Service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold">
              Fair Usage
            </h2>

            <p>
              You agree not to abuse the service or attempt to disrupt the
              platform.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold">
              AI Generated Content
            </h2>

            <p>
              AI summaries may contain inaccuracies. Always verify important
              information with the original video.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold">
              Changes
            </h2>

            <p>
              These terms may be updated as BriefTube evolves.
            </p>
          </section>

        </div>

      </div>
    </section>
    </>
  );
}