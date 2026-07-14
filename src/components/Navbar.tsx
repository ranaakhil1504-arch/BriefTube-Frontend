import {
  Sparkles,
  Moon,
  Sun,
  LogIn,
  LogOut,
  Menu,
  X,
} from "lucide-react";

import { Link } from "react-router-dom";
import { useState } from "react";
import { useTheme } from "../hooks/useTheme";
import { signInWithGoogle, signOut } from "../services/auth";
import type { Session } from "@supabase/supabase-js";
import toast from "react-hot-toast";

type NavbarProps = {
  session: Session | null;
  onHistoryClick: () => void;
};

export default function Navbar({
  session,
  onHistoryClick,
}: NavbarProps) {
  const { theme, toggleTheme } = useTheme();

  async function handleLogin() {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error(error);
      toast.error("Failed to sign in");
    }
  }

  async function handleLogout() {
    try {
      await signOut();
      toast.success("Logged out");
    } catch (error) {
      console.error(error);
      toast.error("Logout failed");
    }
  }

  const user = session?.user;
const [mobileMenu, setMobileMenu] = useState(false);
console.log(user);
console.log(user?.user_metadata);


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

<nav className="hidden items-center gap-8 lg:flex">

  <Link
    to="/"
    className="font-medium text-gray-700 hover:text-blue-600 dark:text-gray-300"
  >
    Home
  </Link>

  <Link
    to="/faq"
    className="font-medium text-gray-700 hover:text-blue-600 dark:text-gray-300"
  >
    FAQ
  </Link>

  <Link
    to="/about"
    className="font-medium text-gray-700 hover:text-blue-600 dark:text-gray-300"
  >
    About
  </Link>

  <Link
    to="/contact"
    className="font-medium text-gray-700 hover:text-blue-600 dark:text-gray-300"
  >
    Contact
  </Link>

</nav>
        {/* Right */}

        <div className="flex items-center gap-4">

          <span className="hidden rounded-full bg-blue-100 px-4 py-1 text-sm font-semibold text-blue-700 dark:bg-blue-900/40 dark:text-blue-300 md:block">
            Gemini AI
          </span>

          {!user ? (
            <button
              onClick={handleLogin}
              className="hidden items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 px-4 py-2 text-sm font-semibold text-white shadow-lg transition hover:scale-105 md:flex"
            >
              <LogIn className="h-4 w-4" />
              Sign in
            </button>
          ) : (
            <div className="hidden items-center gap-3 md:flex">

  <button
    onClick={onHistoryClick}
    className="rounded-xl border px-4 py-2 text-sm font-semibold transition hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800"
  >
    📚 History
  </button>

              <img
                src={
                  user.user_metadata.avatar_url ||
                  "https://ui-avatars.com/api/?name=User"
                }
                alt="avatar"
                className="h-10 w-10 rounded-full border"
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
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-gray-200 bg-white shadow transition-all duration-300 hover:scale-105 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5 text-yellow-500" />
            ) : (
              <Moon className="h-5 w-5 text-gray-700" />
            )}
          </button>
<button
  onClick={() => setMobileMenu(!mobileMenu)}
  className="lg:hidden flex h-11 w-11 items-center justify-center rounded-xl border border-gray-200 bg-white shadow transition-all duration-300 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
>
  {mobileMenu ? (
    <X className="h-5 w-5" />
  ) : (
    <Menu className="h-5 w-5" />
  )}
</button>
        </div>

      </div>
      {mobileMenu && (
  <div className="border-t bg-white px-6 py-5 dark:bg-gray-900 lg:hidden">

    <div className="flex flex-col gap-5">

      <Link to="/" onClick={() => setMobileMenu(false)}>
        Home
      </Link>

      <Link to="/faq" onClick={() => setMobileMenu(false)}>
        FAQ
      </Link>

      <Link to="/about" onClick={() => setMobileMenu(false)}>
        About
      </Link>

      <Link to="/contact" onClick={() => setMobileMenu(false)}>
        Contact
      </Link>

      {!user ? (
        <button
          onClick={handleLogin}
          className="rounded-xl bg-blue-600 py-3 text-white"
        >
          Sign In
        </button>
      ) : (
        <>
          <button
            onClick={() => {
              onHistoryClick();
              setMobileMenu(false);
            }}
            className="rounded-xl border py-3"
          >
            📚 History
          </button>

          <button
            onClick={handleLogout}
            className="rounded-xl border border-red-500 py-3 text-red-500"
          >
            Logout
          </button>
        </>
      )}

    </div>

  </div>
)}
    </header>
  );
}