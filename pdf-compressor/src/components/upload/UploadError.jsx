
export default function UploadError({ message }) {
  if (!message) return null;

  return (
    <p className="mt-4 text-sm font-medium text-red-600 transition-colors duration-300 dark:text-red-400">
      {message}
    </p>
  );
}
