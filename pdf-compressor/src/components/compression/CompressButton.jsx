
import Button from "../ui/Button";

export default function CompressButton({
  disabled,
  loading,
  onClick,
}) {
  return (
    <div className="mt-10 text-center">
      <Button
        size="lg"
        disabled={disabled || loading}
        onClick={onClick}
        className="min-w-[200px]"
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
            Compressing...
          </span>
        ) : (
          "Compress PDF"
        )}
      </Button>
    </div>
  );
}
