export default function Contact() {
  return (
    <section className="min-h-screen bg-gray-50 px-6 py-16 text-gray-800 transition-colors dark:bg-gray-950 dark:text-gray-100">
      <div className="mx-auto max-w-4xl">

        <h1 className="mb-8 text-4xl font-extrabold">
          Contact Us
        </h1>

        <p className="mb-10 text-lg text-gray-600 dark:text-gray-400">
          Have questions, suggestions or found a bug? We'd love to hear from you.
        </p>

        <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-700 dark:bg-gray-900">

          <div className="space-y-6">

            <div>
              <h2 className="text-xl font-bold">
                Email
              </h2>

              <p className="mt-2 text-gray-600 dark:text-gray-400">
                support@brieftube.co
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold">
                Response Time
              </h2>

              <p className="mt-2 text-gray-600 dark:text-gray-400">
                Usually within 24–48 hours.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold">
                Feedback
              </h2>

              <p className="mt-2 text-gray-600 dark:text-gray-400">
                We welcome feature requests, bug reports and partnership inquiries.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}