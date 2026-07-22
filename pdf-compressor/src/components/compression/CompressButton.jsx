
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
      
      {loading && (
        <div className="mt-4">
          <div className="mx-auto h-2 max-w-md overflow-hidden rounded-full bg-slate-200 dark:bg-gray-700">
            <div 
              className="h-full w-full animate-pulse rounded-full bg-blue-600"
              style={{ 
                width: '100%',
                animation: 'pulse 1.5s ease-in-out infinite'
              }}
            />
          </div>
          <p className="mt-2 text-sm text-slate-500 dark:text-gray-400">
            Large files may take 1-2 minutes. Please wait...
          </p>
        </div>
      )}
    </div>
  );
}
