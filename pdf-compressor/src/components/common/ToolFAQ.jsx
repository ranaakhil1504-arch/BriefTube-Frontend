
import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export default function ToolFAQ({ faqs, title = "Frequently Asked Questions" }) {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="mx-auto max-w-5xl px-4 py-12">
      <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <h2 className="mb-6 text-2xl font-bold text-slate-900 dark:text-white">
          ❓ {title}
        </h2>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-xl border border-slate-200 dark:border-gray-700"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="flex w-full items-center justify-between px-5 py-4 text-left transition hover:bg-slate-50 dark:hover:bg-gray-700/50"
              >
                <span className="font-medium text-slate-900 dark:text-white">
                  {faq.question}
                </span>
                {openIndex === index ? (
                  <ChevronUp className="h-5 w-5 flex-shrink-0 text-slate-500" />
                ) : (
                  <ChevronDown className="h-5 w-5 flex-shrink-0 text-slate-500" />
                )}
              </button>
              {openIndex === index && (
                <div className="border-t border-slate-200 px-5 py-4 dark:border-gray-700">
                  <p className="text-slate-600 dark:text-gray-300">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
