
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <Link to="/" className="text-2xl font-bold text-blue-600">
          DocMint
        </Link>
        <div className="flex items-center gap-8">
          <Link to="/" className="text-slate-600 hover:text-blue-600">
            Home
          </Link>
          {/* Use regular <a> tag to go back to main site */}
          <a 
            href="/" 
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            ← Back to BriefTube
          </a>
        </div>
      </div>
    </nav>
  );
}