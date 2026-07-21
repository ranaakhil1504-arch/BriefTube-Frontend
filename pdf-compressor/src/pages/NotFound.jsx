
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center">
      <h1 className="text-6xl font-bold text-slate-900">404</h1>
      <h2 className="mt-4 text-2xl font-semibold text-slate-700">Page Not Found</h2>
      <p className="mt-2 text-slate-500">The page you're looking for doesn't exist.</p>
      <Link
        to="/"
        className="mt-6 rounded-xl bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
      >
        Go Home
      </Link>
    </div>
  );
}
