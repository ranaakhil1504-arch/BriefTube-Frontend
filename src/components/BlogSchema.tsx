type BlogSchemaProps = {
  title: string;
  description: string;
  image: string;
  slug: string;
  author: string;
  datePublished: string;
};

export default function BlogSchema({
  title,
  description,
 image,
  slug,
  author,
  datePublished,
}: BlogSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",

    headline: title,
    description,
    image,

    author: {
      "@type": "Person",
      name: author,
    },

    publisher: {
      "@type": "Organization",
      name: "BriefTube",
      logo: {
        "@type": "ImageObject",
        url: "https://brieftube.co/og-image.png",
      },
    },

    datePublished,
    dateModified: datePublished,

    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://brieftube.co/blog/${slug}`,
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