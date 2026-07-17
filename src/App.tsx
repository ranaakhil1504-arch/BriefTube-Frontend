import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Terms = lazy(() => import("./pages/Terms"));
const Contact = lazy(() => import("./pages/Contact"));
const FAQ = lazy(() => import("./pages/FAQ"));
const NotFound = lazy(() => import("./pages/NotFound"));

export default function App() {
  return (
   <Suspense
  fallback={
    <div className="flex min-h-screen items-center justify-center bg-white dark:bg-gray-950">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
    </div>
  }
>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/about" element={<About />} />

        <Route path="/privacy" element={<Privacy />} />

        <Route path="/terms" element={<Terms />} />

        <Route path="/contact" element={<Contact />} />

        <Route path="/faq" element={<FAQ />} />
        <Route
  path="/blog"
  element={<Blog />}
/>

<Route
  path="/blog/:slug"
  element={<BlogPost />}
/>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}