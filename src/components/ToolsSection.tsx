
const TOOLS = [
  {
    icon: '📄',
    title: 'PDF Compressor',
    description: 'Reduce PDF file size without losing quality',
    link: '/pdf-compressor',
    color: 'from-blue-500 to-blue-600',
  },
  {
    icon: '🖼️',
    title: 'Image Compressor',
    description: 'Compress JPG, PNG, WebP images instantly',
    link: '/pdf-compressor/image-compressor',
    color: 'from-purple-500 to-purple-600',
  },
  {
    icon: '📎',
    title: 'PDF Merger',
    description: 'Combine multiple PDFs into one file',
    link: '/pdf-compressor/pdf-merger',
    color: 'from-green-500 to-green-600',
  },
  {
    icon: '📐',
    title: 'Image Resizer',
    description: 'Resize images to exact pixels and KB',
    link: '/pdf-compressor/image-resizer',
    color: 'from-orange-500 to-orange-600',
  },
  {
    icon: '📱',
    title: 'QR Generator',
    description: 'Create QR codes for any text or URL',
    link: '/pdf-compressor/qr-generator',
    color: 'from-pink-500 to-pink-600',
  },
];

export default function ToolsSection() {
  return (
    <section className="py-16 bg-slate-50 dark:bg-gray-900/50">
      <div className="mx-auto max-w-6xl px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white sm:text-4xl">
            🛠️ Free Tools You'll Love
          </h2>
          <p className="mt-3 text-lg text-slate-600 dark:text-gray-400">
            Essential tools for your daily tasks — all free, all in your browser
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {TOOLS.map((tool) => (
            <a
              key={tool.title}
              href={tool.link}
              className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-md transition-all duration-300 hover:scale-105 hover:shadow-xl dark:bg-gray-800"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${tool.color} opacity-0 transition-opacity duration-300 group-hover:opacity-10`} />
              
              <div className="relative">
                <div className="mb-4 text-4xl">{tool.icon}</div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  {tool.title}
                </h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-gray-400">
                  {tool.description}
                </p>
                <div className="mt-4 inline-flex items-center text-sm font-medium text-blue-600 dark:text-blue-400">
                  Try Now →
                </div>
              </div>
            </a>
          ))}
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-slate-500 dark:text-gray-500">
            🔒 All tools run in your browser. No uploads to any server.
          </p>
        </div>
      </div>
    </section>
  );
}
