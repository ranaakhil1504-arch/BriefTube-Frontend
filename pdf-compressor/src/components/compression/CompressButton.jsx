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
      >
        {loading ? "Compressing..." : "Compress PDF"}
      </Button>
    </div>
  );
}