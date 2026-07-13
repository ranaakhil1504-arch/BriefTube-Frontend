import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import type { Session } from "@supabase/supabase-js";

type Props = {
  session: Session | null;
};

export default function MainLayout({ session }: Props) {
  return (
    <>
      <Navbar session={session} />

      <main className="min-h-screen">
        <Outlet />
      </main>

      <Footer />
    </>
  );
}