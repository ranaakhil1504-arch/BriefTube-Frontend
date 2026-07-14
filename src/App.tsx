import { Routes, Route } from "react-router-dom";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import About from "./pages/About";
import Contact from "./pages/Contact";
import FAQ from "./pages/FAQ";
export default function App() {
  return (
    <Routes>

      <Route
        path="/"
        element={<Home />}
      />
      <Route
        path="/about"
        element={<About />}
      />
<Route
        path="/privacy"
        element={<Privacy />}
      />

      <Route
        path="/terms"
        element={<Terms />}
      />

      

      <Route
        path="/contact"
        element={<Contact />}
      />
<Route
  path="/faq"
  element={<FAQ />}
/>
<Route path="*" element={<NotFound />} />
      
    </Routes>
    
  );
}