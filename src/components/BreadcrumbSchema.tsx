type BreadcrumbSchemaProps = {
  title: string;
  slug: string;
};

export default function BreadcrumbSchema({
  title,
  slug,
}: BreadcrumbSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://brieftube.co/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: "https://brieftube.co/blog",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: title,
        item: `https://brieftube.co/blog/${slug}`,
      },
    ],
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