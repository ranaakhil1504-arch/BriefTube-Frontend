import { Helmet } from 'react-helmet-async';

export default function SEO({
  title = 'DocMint - Free PDF Compression & Tools',
  description = 'Free online toolkit to compress, convert, merge, split, and optimize PDFs and images.',
  image = '/og-image.png',
  url = 'https://docmint.app',
  keywords = 'pdf, compress, convert, merge, split, optimize, free',
}) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={url} />
    </Helmet>
  );
}