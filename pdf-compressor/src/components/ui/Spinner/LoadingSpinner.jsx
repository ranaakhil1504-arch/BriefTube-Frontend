
export default function LoadingSpinner({ size = "md", className = "" }) {
  const sizes = {
    sm: "h-6 w-6",
    md: "h-12 w-12",
    lg: "h-16 w-16",
    xl: "h-24 w-24",
  };

  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div
          className={`animate-spin rounded-full border-4 border-blue-600 border-t-transparent ${sizes[size]} ${className}`}
        />
        <p className="text-sm text-slate-500">Loading...</p>
      </div>
    </div>
  );
}
