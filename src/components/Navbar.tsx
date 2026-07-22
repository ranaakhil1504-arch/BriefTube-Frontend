
import {
  Moon,
  Sun,
  LogIn,
  LogOut,
  Menu,
  X,
  Sparkles,
  Home,
  HelpCircle,
  BookOpen,
  Info,
  Mail,
  FileText,
  ChevronDown,
  Image,
  Layers,
  Scissors,
} from "lucide-react";

import { Link, useLocation } from "react-router-dom";
import { useState, useCallback, useEffect } from "react";
import { useTheme } from "../hooks/useTheme";
import { signInWithGoogle, signOut } from "../services/auth";
import type { Session } from "@supabase/supabase-js";
import toast from "react-hot-toast";

type NavbarProps = {
  session: Session | null;
  onHistoryClick: () => void;
};

const NAV_LINKS = [
  { to: "/", label: "Home", icon: Home },
  { to: "/faq", label: "FAQ", icon: HelpCircle },
  { to: "/blog", label: "Blog", icon: BookOpen },
  { to: "/about", label: "About", icon: Info },
  { to: "/contact", label: "Contact", icon: Mail },
];

const TOOLS = [
  { 
    to: "/pdf-compressor", 
    label: "PDF Compressor", 
    icon: FileText,
    external: true,
  },
  { 
    to: "/pdf-compressor/image-compressor", 
    label: "Image Compressor", 
    icon: Image,
    external: true,  // ✅ FIXED: Added this line
  },
  { 
    to: "#", 
    label: "PDF Merger", 
    icon: Layers,
    comingSoon: true,
  },
  { 
    to: "#", 
    label: "PDF Splitter", 
    icon: Scissors,
    comingSoon: true,
  },
];

export default function Navbar({
  session,
  onHistoryClick,
}: NavbarProps) {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.tools-dropdown')) {
        setToolsOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const handleLogin = useCallback(async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error(error);
      toast.error("Failed to sign in");
    }
  }, []);

  const handleLogout = useCallback(async () => {
    try {
      await signOut();
      toast.success("Logged out");
    } catch (error) {
      console.error(error);
      toast.error("Logout failed");
    }
  }, []);

  const user = session?.user;
  const [mobileMenu, setMobileMenu] = useState(false);

  const isActive = (to: string) =>
    to === "/" ? location.pathname === "/" : location.pathname.startsWith(to);

  return (
    <header
      className={`sticky top-0 z-50 border-b border-white/20 bg-white/70 backdrop-blur-xl transition-all duration-300 dark:border-gray-800 dark:bg-gray-900/80 ${
        scrolled ? "shadow-md dark:shadow-black/20" : "shadow-none"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link to="/" className="group flex items-center gap-2.5 sm:gap-3">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 shadow-lg transition duration-300 group-hover:scale-105 group-hover:shadow-blue-500/40 sm:h-11 sm:w-11">
            <Sparkles className="h-5 w-5 text-white sm:h-6 sm:w-6" />
            <span className="absolute -right-0.5 -top-0.5 flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-gray-900" />
            </span>
          </div>

          <div className="leading-tight">
            <span className="block text-lg font-black tracking-tight text-gray-900 sm:text-xl dark:text-white">
              BriefTube
            </span>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              AI YouTube Summarizer
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((link) => {
            const active = isActive(link.to);
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`group relative py-1 text-sm font-medium transition-colors ${
                  active
                    ? "text-blue-600 dark:text-blue-400"
                    : "text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
                }`}
              >
                {link.label}
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 rounded-full bg-gradient-to-r from-blue-600 to-violet-600 transition-all duration-300 ${
                    active ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            );
          })}

          {/* Tools Dropdown */}
          <div className="tools-dropdown relative">
            <button
              onClick={() => setToolsOpen(!toolsOpen)}
              className={`group relative flex items-center gap-1 py-1 text-sm font-medium transition-colors ${
                toolsOpen
                  ? "text-blue-600 dark:text-blue-400"
                  : "text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
              }`}
            >
              Tools
              <ChevronDown
                className={`h-4 w-4 transition-transform duration-200 ${
                  toolsOpen ? "rotate-180" : ""
                }`}
              />
              <span
                className={`absolute -bottom-1 left-0 h-0.5 rounded-full bg-gradient-to-r from-blue-600 to-violet-600 transition-all duration-300 ${
                  toolsOpen ? "w-full" : "w-0 group-hover:w-full"
                }`}
              />
            </button>

            {/* Dropdown Menu */}
            {toolsOpen && (
              <div className="absolute left-0 mt-2 w-56 rounded-xl border border-slate-200 bg-white py-2 shadow-xl dark:border-gray-700 dark:bg-gray-900">
                {TOOLS.map((tool) => {
                  const Icon = tool.icon;
                  const isActiveTool = tool.to !== "#" && location.pathname === tool.to;
                  
                  if (tool.comingSoon) {
                    return (
                      <div
                        key={tool.label}
                        className="flex cursor-not-allowed items-center gap-3 px-4 py-2.5 text-sm text-gray-400 opacity-60 dark:text-gray-500"
                      >
                        <Icon className="h-4 w-4" />
                        <span>{tool.label}</span>
                        <span className="ml-auto text-xs rounded-full bg-gray-100 px-2 py-0.5 text-gray-500 dark:bg-gray-800 dark:text-gray-400">
                          Soon
                        </span>
                      </div>
                    );
                  }

                  if (tool.external) {
                    return (
                      <a
                        key={tool.label}
                        href={tool.to}
                        className={`flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
                          isActiveTool
                            ? "bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
                            : "text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800"
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                        <span>{tool.label}</span>
                      </a>
                    );
                  }

                  return (
                    <Link
                      key={tool.label}
                      to={tool.to}
                      onClick={() => setToolsOpen(false)}
                      className={`flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
                        isActiveTool
                          ? "bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
                          : "text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{tool.label}</span>
                    </Link>
                  );
                })}
                
                <div className="my-2 border-t border-slate-200 dark:border-gray-700" />
                
                <div className="px-4 py-2 text-xs text-gray-400 dark:text-gray-500">
                  🔜 More tools coming soon...
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* Right section */}
        <div className="flex items-center gap-2.5 sm:gap-4">
          <span className="hidden rounded-full bg-blue-100 px-4 py-1 text-sm font-semibold text-blue-700 dark:bg-blue-900/40 dark:text-blue-300 md:block">
            Gemini AI
          </span>

          {!user ? (
            <button
              onClick={handleLogin}
              className="hidden items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 px-4 py-2 text-sm font-semibold text-white shadow-lg transition hover:scale-105 hover:shadow-blue-500/30 md:flex"
            >
              <LogIn className="h-4 w-4" />
              Sign in
            </button>
          ) : (
            <div className="hidden items-center gap-3 md:flex">
              <button
                onClick={onHistoryClick}
                className="rounded-xl border border-gray-200 px-4 py-2 text-sm font-semibold transition hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800"
              >
                📚 History
              </button>

              <img
                loading="lazy"
                decoding="async"
                width="40"
                height="40"
                src={
                  user.user_metadata.avatar_url ||
                  "https://ui-avatars.com/api/?name=User"
                }
                alt="avatar"
                className="h-10 w-10 rounded-full ring-2 ring-gray-200 dark:ring-gray-700"
              />

              <div className="text-right">
                <p className="max-w-[180px] truncate text-sm font-semibold text-gray-900 dark:text-white">
                  {user.user_metadata.full_name || "User"}
                </p>
                <p className="max-w-[180px] truncate text-xs text-gray-500 dark:text-gray-400">
                  {user.email}
                </p>
              </div>

              <button
                onClick={handleLogout}
                className="flex items-center gap-2 rounded-xl border border-red-200 px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50 dark:border-red-800 dark:hover:bg-red-900/20"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </div>
          )}

          <button
            onClick={toggleTheme}
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 bg-white shadow transition-all duration-300 hover:scale-105 hover:bg-gray-100 sm:h-11 sm:w-11 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5 text-yellow-500" />
            ) : (
              <Moon className="h-5 w-5 text-gray-700" />
            )}
          </button>

          <button
            onClick={() => setMobileMenu((prev) => !prev)}
            aria-label={mobileMenu ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenu}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 bg-white shadow transition-all duration-300 hover:bg-gray-100 sm:h-11 sm:w-11 lg:hidden dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
          >
            {mobileMenu ? (
              <X className="h-5 w-5 text-gray-700 dark:text-gray-200" />
            ) : (
              <Menu className="h-5 w-5 text-gray-700 dark:text-gray-200" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenu && (
        <div className="animate-fade-in-down border-t border-gray-200 bg-white px-4 py-5 sm:px-6 lg:hidden dark:border-gray-800 dark:bg-gray-900">
          <div className="flex flex-col gap-1.5">
            {NAV_LINKS.map((link) => {
              const active = isActive(link.to);
              const Icon = link.icon;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileMenu(false)}
                  className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                    active
                      ? "border-l-4 border-blue-600 bg-blue-50 font-semibold text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
                      : "text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800"
                  }`}
                >
                  <Icon className="h-4 w-4 flex-shrink-0" />
                  {link.label}
                </Link>
              );
            })}
            
            {/* Mobile PDF Compressor Link */}
            <a
              href="/pdf-compressor"
              onClick={() => setMobileMenu(false)}
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900/30"
            >
              <FileText className="h-4 w-4 flex-shrink-0" />
              PDF Compressor
            </a>

            {/* Mobile Tools Section */}
            <div className="mt-2 border-t border-gray-100 pt-3 dark:border-gray-800">
              <p className="mb-2 px-3 text-xs font-semibold uppercase text-gray-500 dark:text-gray-400">
                Tools
              </p>
              {TOOLS.map((tool) => {
                const Icon = tool.icon;
                if (tool.comingSoon) {
                  return (
                    <div
                      key={tool.label}
                      className="flex cursor-not-allowed items-center gap-3 px-3 py-2 text-sm text-gray-400 opacity-60 dark:text-gray-500"
                    >
                      <Icon className="h-4 w-4" />
                      <span>{tool.label}</span>
                      <span className="ml-auto text-xs rounded-full bg-gray-100 px-2 py-0.5 text-gray-500 dark:bg-gray-800 dark:text-gray-400">
                        Soon
                      </span>
                    </div>
                  );
                }
                if (tool.external) {
                  return (
                    <a
                      key={tool.label}
                      href={tool.to}
                      onClick={() => setMobileMenu(false)}
                      className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800"
                    >
                      <Icon className="h-4 w-4" />
                      {tool.label}
                    </a>
                  );
                }
                return (
                  <Link
                    key={tool.label}
                    to={tool.to}
                    onClick={() => setMobileMenu(false)}
                    className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800"
                  >
                    <Icon className="h-4 w-4" />
                    {tool.label}
                  </Link>
                );
              })}
            </div>

            <div className="mt-3 flex flex-col gap-3 border-t border-gray-100 pt-4 dark:border-gray-800">
              {!user ? (
                <button
                  onClick={() => {
                    handleLogin();
                    setMobileMenu(false);
                  }}
                  className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 py-3 font-semibold text-white shadow-lg"
                >
                  <LogIn className="h-4 w-4" />
                  Sign In
                </button>
              ) : (
                <>
                  <button
                    onClick={() => {
                      onHistoryClick();
                      setMobileMenu(false);
                    }}
                    className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 py-3 font-semibold text-gray-700 dark:border-gray-700 dark:text-gray-200"
                  >
                    📚 History
                  </button>

                  <button
                    onClick={() => {
                      handleLogout();
                      setMobileMenu(false);
                    }}
                    className="flex items-center justify-center gap-2 rounded-xl border border-red-500 py-3 font-semibold text-red-500 dark:border-red-500"
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
