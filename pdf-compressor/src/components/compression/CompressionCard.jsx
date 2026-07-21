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
        className={`transition-all ${
          active
            ? "border-blue-600 ring-2 ring-blue-200"
            : "hover:border-slate-300"
        }`}
      >
        <h3 className="text-lg font-semibold">
          {title}
        </h3>

        <p className="mt-2 text-sm text-slate-600">
          {description}
        </p>
      </Card>
    </button>
  );
}