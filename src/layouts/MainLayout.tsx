import { Outlet } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import type { Session } from "@supabase/supabase-js";

type Props = {
  session: Session | null;
  onHistoryClick: () => void;
};

export default function MainLayout({
  session,
  onHistoryClick,
}: Props) {
  return (
    <>
      <Navbar
        session={session}
        onHistoryClick={onHistoryClick}
      />

      <main className="min-h-screen bg-white dark:bg-gray-950">
        <Outlet />
      </main>

      <Footer />
    </>
  );
}