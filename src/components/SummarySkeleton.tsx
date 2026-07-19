export default function SummarySkeleton() {
  const shimmer =
    "animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800";
  const shimmerBlue =
    "animate-pulse bg-gradient-to-r from-blue-100 via-blue-200 to-blue-100 dark:from-blue-950 dark:via-blue-900 dark:to-blue-950";

  return (
    <div className="mx-auto mt-6 w-full max-w-6xl overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg sm:mt-10 sm:rounded-3xl sm:shadow-xl dark:border-gray-800 dark:bg-gray-900">
      {/* Thumbnail */}
      <div className={`h-48 w-full sm:h-64 md:h-80 ${shimmer}`} />

      <div className="p-4 sm:p-6 md:p-8">
        {/* Toolbar */}
        <div className="mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex-1">
            <div className={`h-6 w-3/5 rounded-lg sm:h-8 sm:w-2/5 ${shimmer}`} />
            <div className={`mt-2 h-3.5 w-2/5 rounded-lg sm:mt-3 sm:h-4 sm:w-1/4 ${shimmer}`} />
          </div>

          {/* Buttons: Copy, Share, Download, Clear */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <div className={`h-10 w-20 rounded-xl sm:h-12 sm:w-24 ${shimmer}`} />
            <div className={`h-10 w-20 rounded-xl sm:h-12 sm:w-24 ${shimmer}`} />
            <div className={`h-10 w-28 rounded-xl sm:h-12 sm:w-32 ${shimmer}`} />
            <div className={`h-10 w-10 rounded-xl sm:h-12 sm:w-24 ${shimmer}`} />
          </div>
        </div>

        {/* Summary box */}
        <div className="rounded-2xl border border-blue-100 bg-blue-50 p-4 sm:rounded-3xl sm:p-8 dark:border-gray-800 dark:bg-gray-800/60">
          {/* Executive Summary card */}
          <div className="mb-6 rounded-2xl border border-blue-200 bg-white p-5 sm:mb-8 sm:rounded-3xl sm:p-8 dark:border-blue-900 dark:bg-gray-900">
            <div className="mb-3 flex items-center gap-3 sm:mb-4">
              <div className={`h-9 w-9 flex-shrink-0 rounded-xl sm:h-12 sm:w-12 ${shimmerBlue}`} />
              <div className="flex-1">
                <div className={`h-5 w-1/2 rounded-lg sm:h-6 ${shimmer}`} />
                <div className={`mt-2 h-3 w-1/3 rounded-lg ${shimmer}`} />
              </div>
            </div>
            <div className="space-y-2.5">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className={`h-3.5 rounded-full sm:h-4 ${shimmer} ${
                    i === 0 ? "w-full" : i === 1 ? "w-5/6" : "w-2/3"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Key Points list */}
          <div className="mb-6 sm:mb-8">
            <div className={`mb-4 h-6 w-1/3 rounded-lg sm:mb-5 sm:h-7 ${shimmer}`} />
            <div className="space-y-3 sm:space-y-4">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 rounded-2xl border border-blue-100 bg-white p-4 sm:gap-4 sm:p-5 dark:border-gray-800 dark:bg-gray-900"
                >
                  <div className={`h-7 w-7 flex-shrink-0 rounded-full sm:h-8 sm:w-8 ${shimmerBlue}`} />
                  <div className="flex-1 space-y-2 pt-1">
                    <div className={`h-3.5 w-full rounded-full ${shimmer}`} />
                    <div className={`h-3.5 w-3/4 rounded-full ${shimmer}`} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Key Takeaways grid */}
          <div className="mb-6 sm:mb-8">
            <div className={`mb-4 h-6 w-2/5 rounded-lg sm:mb-5 sm:h-7 ${shimmer}`} />
            <div className="grid gap-3 sm:gap-4 md:grid-cols-2">
              {[...Array(2)].map((_, i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-amber-200 bg-white p-4 sm:p-5 dark:border-yellow-900 dark:bg-gray-900"
                >
                  <div className="mb-2.5 flex items-center gap-2.5 sm:mb-3 sm:gap-3">
                    <div className={`h-7 w-7 rounded-full sm:h-8 sm:w-8 ${shimmer}`} />
                    <div className={`h-3.5 w-1/3 rounded-lg ${shimmer}`} />
                  </div>
                  <div className="space-y-2">
                    <div className={`h-3.5 w-full rounded-full ${shimmer}`} />
                    <div className={`h-3.5 w-2/3 rounded-full ${shimmer}`} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Summary */}
          <div className="mb-6 rounded-2xl border border-green-200 bg-white p-4 sm:mb-8 sm:rounded-3xl sm:p-6 dark:border-green-900 dark:bg-gray-900">
            <div className="mb-3 flex items-center gap-3 sm:mb-4">
              <div className={`h-9 w-9 flex-shrink-0 rounded-xl sm:h-12 sm:w-12 ${shimmer}`} />
              <div className="flex-1">
                <div className={`h-5 w-1/3 rounded-lg sm:h-6 ${shimmer}`} />
                <div className={`mt-2 h-3 w-1/2 rounded-lg ${shimmer}`} />
              </div>
            </div>
            <div className="space-y-2.5">
              <div className={`h-3.5 w-full rounded-full sm:h-4 ${shimmer}`} />
              <div className={`h-3.5 w-4/5 rounded-full sm:h-4 ${shimmer}`} />
            </div>
          </div>

          {/* Action Items */}
          <div>
            <div className={`mb-4 h-6 w-1/3 rounded-lg sm:mb-5 sm:h-7 ${shimmer}`} />
            <div className="space-y-3 sm:space-y-4">
              {[...Array(2)].map((_, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 sm:gap-4 sm:p-5 dark:border-emerald-900 dark:bg-gray-900"
                >
                  <div className={`mt-0.5 h-6 w-6 flex-shrink-0 rounded-full sm:mt-1 sm:h-7 sm:w-7 ${shimmer}`} />
                  <div className="flex-1 space-y-2 pt-0.5">
                    <div className={`h-3.5 w-full rounded-full ${shimmer}`} />
                    <div className={`h-3.5 w-1/2 rounded-full ${shimmer}`} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}