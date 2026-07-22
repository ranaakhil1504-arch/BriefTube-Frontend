import Button from "../ui/Button";
import Section from "../ui/Section";

import { BRAND } from "../../constants/brand";

export default function Hero() {
  function scrollToUpload() {
    const target = document.getElementById("upload-area");
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  return (
    <Section className="bg-gradient-to-b from-white to-slate-100">
      <div className="mx-auto max-w-4xl text-center">
        {/* Badge */}
        <div className="mb-6 inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700">
          🚀 Free • Fast • Privacy Focused
        </div>

        {/* Heading */}
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
          Compress PDF Files
          <span className="block text-blue-600">Without Losing Quality</span>
        </h1>

        {/* Description */}
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600">
          {BRAND.description}
          <br />
          No sign-up. No watermarks. Your files stay private.
        </p>

        {/* CTA Buttons */}
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button size="lg" onClick={scrollToUpload}>
            Compress PDF
          </Button>

          <Button variant="outline" size="lg">
            Learn More
          </Button>
        </div>

        {/* Trust Indicators */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-slate-500">
          <span>🔒 Secure Processing</span>
          <span>⚡ Fast Compression</span>
          <span>📄 PDF & Images</span>
          <span>💯 Free to Use</span>
        </div>
      </div>
    </Section>
  );
}