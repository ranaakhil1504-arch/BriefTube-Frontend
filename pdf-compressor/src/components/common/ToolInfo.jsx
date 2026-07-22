
export default function ToolInfo({ title, description, features, useCases }) {
  return (
    <section className="mx-auto max-w-5xl px-4 py-12">
      <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <h2 className="mb-4 text-2xl font-bold text-slate-900 dark:text-white">
          {title}
        </h2>
        
        <p className="text-slate-600 dark:text-gray-300 leading-relaxed">
          {description}
        </p>

        {features && features.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
              ✨ Key Features
            </h3>
            <ul className="mt-3 grid gap-2 sm:grid-cols-2">
              {features.map((feature, index) => (
                <li key={index} className="flex items-start gap-2 text-slate-600 dark:text-gray-300">
                  <span className="text-blue-600 dark:text-blue-400">✅</span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        )}

        {useCases && useCases.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
              📋 Common Use Cases
            </h3>
            <ul className="mt-3 grid gap-2 sm:grid-cols-2">
              {useCases.map((useCase, index) => (
                <li key={index} className="flex items-start gap-2 text-slate-600 dark:text-gray-300">
                  <span className="text-blue-600 dark:text-blue-400">📌</span>
                  {useCase}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-6 rounded-xl bg-blue-50 p-4 dark:bg-blue-950/30">
          <p className="text-sm text-slate-600 dark:text-gray-300">
            🔒 <span className="font-medium">Privacy Guaranteed:</span> All files are processed locally and automatically deleted after 2 minutes.
          </p>
        </div>
      </div>
    </section>
  );
}
