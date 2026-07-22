
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

export default function MainLayout({ children }) {
  return (
    <div className="min-h-screen bg-slate-50 transition-colors duration-300 dark:bg-gray-900">
      <Navbar />

      <main>{children}</main>

      <Footer />
    </div>
  );
}