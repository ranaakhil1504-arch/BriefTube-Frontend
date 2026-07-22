
import Button from "../ui/Button";

export default function CompressButton({
  disabled,
  loading,
  onClick,
  fileSize,
}) {
  // Check if file is large (> 10MB)
  const isLargeFile = fileSize && fileSize / 1024 / 1024 > 10;

  const getEstimatedTime = () => {
    if (!fileSize) return "a few seconds";
    const mb = fileSize / 1024 / 1024;
    if (mb < 2) return "~10-15 seconds";
    if (mb < 5) return "~20-40 seconds";
    if (mb < 10) return "~1 minute";
    if (mb < 20) return "~1-2 minutes";
    if (mb < 30) return "~2-3 minutes";
    return "~3-5 minutes";
  };

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
            ⏳ Processing {fileSize ? `${(fileSize / 1024 / 1024).toFixed(1)} MB` : ''} file...
          </p>
          
          <p className="text-sm text-slate-500 dark:text-gray-400">
            Estimated time: {getEstimatedTime()}
          </p>

          {/* Only show this message for large files (10MB+) */}
          {isLargeFile && (
            <p className="mt-1 text-xs text-amber-600 dark:text-amber-400">
              💡 Large file detected — may take 1-2 minutes. 
              Running on free tier — thank you for your patience! 🙏
            </p>
          )}
        </div>
      )}
    </div>
  );
}
