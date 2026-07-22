
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
import { ChevronDown, FileText, Image, Layers, Crop } from 'lucide-react';
import { useState } from 'react';

const TOOLS = [
  { 
    to: '/', 
    label: 'PDF Compressor', 
    icon: FileText,
  },
  { 
    to: '/image-compressor', 
    label: 'Image Compressor', 
    icon: Image,
  },
  { 
    to: '/pdf-merger', 
    label: 'PDF Merger', 
    icon: Layers,
  },
  { 
    to: '/image-resizer', 
    label: 'Image Resizer', 
    icon: Crop,
  },
];

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const [toolsOpen, setToolsOpen] = useState(false);

  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname === path;
  };

  return (
    <nav className="border-b border-slate-200 bg-white transition-colors duration-300 dark:border-gray-700 dark:bg-gray-900">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-blue-600 transition-colors dark:text-blue-400">
          📄 DocMint
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-6 md:flex">
          {/* Home Link */}
          <Link 
            to="/" 
            className={`text-sm font-medium transition-colors ${
              isActive('/') 
                ? 'text-blue-600 dark:text-blue-400' 
                : 'text-slate-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400'
            }`}
          >
            Home
          </Link>

          {/* Tools Dropdown */}
          <div className="relative">
            <button
              onClick={() => setToolsOpen(!toolsOpen)}
              className={`flex items-center gap-1 text-sm font-medium transition-colors ${
                toolsOpen || TOOLS.some(t => isActive(t.to))
                  ? 'text-blue-600 dark:text-blue-400'
                  : 'text-slate-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400'
              }`}
            >
              Tools
              <ChevronDown className={`h-4 w-4 transition-transform ${toolsOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Menu */}
            {toolsOpen && (
              <div className="absolute right-0 mt-2 w-56 rounded-xl border border-slate-200 bg-white py-2 shadow-xl dark:border-gray-700 dark:bg-gray-900">
                {TOOLS.map((tool) => {
                  const Icon = tool.icon;
                  const active = isActive(tool.to);
                  return (
                    <Link
                      key={tool.to}
                      to={tool.to}
                      onClick={() => setToolsOpen(false)}
                      className={`flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
                        active
                          ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'
                          : 'text-slate-700 hover:bg-slate-50 dark:text-gray-300 dark:hover:bg-gray-800'
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{tool.label}</span>
                      {active && <span className="ml-auto text-xs text-blue-600 dark:text-blue-400">✓</span>}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-3 sm:gap-6">
          {/* Dark Mode Toggle */}
          <button
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-xl shadow-sm transition-all duration-300 hover:scale-105 hover:bg-slate-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>

          {/* Back Button */}
          <a 
            href="/" 
            className="rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 sm:px-4 sm:py-2"
          >
            ← Back
          </a>
        </div>
      </div>

      {/* Mobile Tools Menu (simplified) */}
      {toolsOpen && (
        <div className="border-t border-slate-200 bg-white px-4 py-2 dark:border-gray-700 dark:bg-gray-900 md:hidden">
          {TOOLS.map((tool) => {
            const Icon = tool.icon;
            const active = isActive(tool.to);
            return (
              <Link
                key={tool.to}
                to={tool.to}
                onClick={() => setToolsOpen(false)}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                  active
                    ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'
                    : 'text-slate-700 hover:bg-slate-50 dark:text-gray-300 dark:hover:bg-gray-800'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{tool.label}</span>
                {active && <span className="ml-auto text-blue-600 dark:text-blue-400">✓</span>}
              </Link>
            );
          })}
        </div>
      )}
    </nav>
  );
}