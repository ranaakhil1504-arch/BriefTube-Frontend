import { Helmet } from "react-helmet-async";

export default function FAQSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Is BriefTube free?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. BriefTube currently offers free AI-powered YouTube video summaries."
        }
      },
      {
        "@type": "Question",
        name: "How does BriefTube work?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Paste a YouTube URL and our AI analyzes the transcript to generate a concise summary with key takeaways."
        }
      },
      {
        "@type": "Question",
        name: "Do I need to create an account?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. You can generate summaries without logging in. Logging in allows you to save your summary history."
        }
      },
      {
        "@type": "Question",
        name: "Can I summarize long YouTube videos?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. BriefTube supports both short videos and long-form content."
        }
      },
      {
        "@type": "Question",
        name: "Is my data secure?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. We only store information necessary to provide the service and your summary history."
        }
      }
    ]
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
}