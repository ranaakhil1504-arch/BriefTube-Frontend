
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
          <a 
            href="/" 
            className="text-slate-600 hover:text-blue-600"
          >
            Back to BriefTube
          </a>
        </div>
      </div>
    </nav>
  );
}