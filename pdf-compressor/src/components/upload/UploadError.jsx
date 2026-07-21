export default function UploadError({ message }) {
  if (!message) return null;

  return (
    <p className="mt-4 text-sm font-medium text-red-600">
      {message}
    </p>
  );
}