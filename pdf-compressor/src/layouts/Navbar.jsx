
import { Link } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
import { Moon, Sun } from 'lucide-react';

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="border-b border-slate-200 bg-white transition-colors duration-300 dark:border-gray-700 dark:bg-gray-900">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <Link 
          to="/" 
          className="text-2xl font-bold text-blue-600 transition-colors dark:text-blue-400"
        >
          DocMint
        </Link>
        <div className="flex items-center gap-3 sm:gap-6">
          <Link 
            to="/" 
            className="text-sm font-medium text-slate-600 transition-colors hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
          >
            Home
          </Link>
          
          {/* Dark Mode Toggle */}
          <button
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:scale-105 hover:bg-slate-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
          >
            {theme === 'dark' ? (
              <Sun className="h-5 w-5 text-yellow-500" />
            ) : (
              <Moon className="h-5 w-5 text-slate-700" />
            )}
          </button>

          <a 
            href="/" 
            className="rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 sm:px-4 sm:py-2"
          >
            ← Back
          </a>
        </div>
      </div>
    </nav>
  );
}
