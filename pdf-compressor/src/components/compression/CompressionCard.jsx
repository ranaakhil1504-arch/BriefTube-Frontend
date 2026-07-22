
import Card from "../ui/Card";

export default function CompressionCard({
  title,
  description,
  active,
  onClick,
}) {
  return (
    <button
      onClick={onClick}
      className="w-full text-left"
    >
      <Card
        className={`transition-all duration-300 ${
          active
            ? "border-blue-600 ring-2 ring-blue-200 dark:border-blue-400 dark:ring-blue-900/50"
            : "hover:border-slate-300 dark:hover:border-gray-600"
        }`}
      >
        <h3 className="text-lg font-semibold text-slate-900 transition-colors duration-300 dark:text-white">
          {title}
        </h3>

        <p className="mt-2 text-sm text-slate-600 transition-colors duration-300 dark:text-gray-400">
          {description}
        </p>
      </Card>
    </button>
  );
}
