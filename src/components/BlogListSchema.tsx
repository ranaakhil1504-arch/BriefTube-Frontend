export default function BlogListSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "BriefTube Blog",
    description:
      "Read AI, productivity, YouTube learning and study articles from BriefTube.",
    url: "https://brieftube.co/blog",

    publisher: {
      "@type": "Organization",
      name: "BriefTube",
      logo: {
        "@type": "ImageObject",
        url: "https://brieftube.co/og-image.png",
      },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema),
      }}
    />
  );
}