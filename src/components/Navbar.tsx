import { Sparkles, Moon, Sun } from "lucide-react";
import { useTheme } from "../hooks/useTheme";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();

  return (
   <header className="sticky top-0 z-50 border-b border-white/20 bg-white/70 backdrop-blur-xl transition-all duration-300 dark:border-gray-700 dark:bg-gray-900/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-8">

        {/* Logo */}

        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-r from-blue-600 to-violet-600 shadow-lg">
            <Sparkles className="h-6 w-6 text-white" />
          </div>

          <div>
            <h1 className="text-xl font-extrabold tracking-tight text-gray-900 dark:text-white">
              BriefTube
            </h1>

            <p className="-mt-1 text-xs text-gray-500 dark:text-gray-400">
              AI YouTube Summarizer
            </p>
          </div>
        </div>

        {/* Right */}

        <div className="flex items-center gap-4">

          <span className="hidden rounded-full bg-blue-100 px-4 py-1 text-sm font-semibold text-blue-700 dark:bg-blue-900/40 dark:text-blue-300 md:block">
            Gemini AI
          </span>

          <button
            onClick={toggleTheme}
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-gray-200 bg-white shadow transition-all duration-300 hover:scale-105 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5 text-yellow-500" />
            ) : (
              <Moon className="h-5 w-5 text-gray-700" />
            )}
          </button>

        </div>

      </div>
    </header>
  );
}