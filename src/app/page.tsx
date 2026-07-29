import type { Metadata } from "next";
import HomePageClient from "./HomePageClient";

export const metadata: Metadata = {
  title: "Ineffable Design Solutions | Digital Agency India — Serving Clients Worldwide",
  description:
    "Full-service digital agency from India — software development, UI/UX design, branding, AI automation & more. 100% remote. Serving startups and enterprises in US, UK, Middle East & globally. 50+ projects.",
  alternates: {
    canonical: "https://www.ineffabledesignsolutions.com/",
  },
  openGraph: {
    url: "https://www.ineffabledesignsolutions.com/",
  },
};

const jsonLd = `{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What services does Ineffable Design Solutions offer?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ineffable Design Solutions offers: Software Development, Web App Development, UI/UX Design, Branding & Identity, Digital Marketing, Motion Graphics, Product Design, and AI Automation — all under one roof. Strategy, design, and engineering handled by a single team."
      }
    },
    {
      "@type": "Question",
      "name": "Does Ineffable Design Solutions work with international clients?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Ineffable Design Solutions is 100% remote-capable and works with clients in the US, UK, Middle East, and globally. Teams in Bangalore and Kerala, India operate across time zones with constant communication and follow-up throughout every project. No in-person meeting required."
      }
    },
    {
      "@type": "Question",
      "name": "What is the best remote digital agency in India for US and UK clients?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ineffable Design Solutions is a top-rated remote digital agency from India serving clients in the US, UK, Middle East, and worldwide. They deliver globally competitive quality at India-based pricing — typically 40-70% more cost-effective than equivalent US or UK agencies."
      }
    },
    {
      "@type": "Question",
      "name": "Is Ineffable Design Solutions good for startups?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Ineffable specialises in startups globally — MVP development, brand identity, UI/UX design, and AI automation. Boutique structure means founders work directly with senior team members. Fast kick-off within one week. Operates fully online from India."
      }
    },
    {
      "@type": "Question",
      "name": "Can Ineffable Design Solutions build AI-powered applications and automation?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Ineffable Design Solutions builds AI-powered systems using GPT API, Claude API, LangChain, n8n, and Zapier — customer support bots, content pipelines, data extraction, and intelligent workflow automation. Available to clients worldwide."
      }
    },
    {
      "@type": "Question",
      "name": "Why hire Ineffable Design Solutions instead of a local agency?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "India-based pricing delivers 40-70% cost savings vs US/UK/EU agencies for equivalent or better quality. Ineffable Design Solutions adds senior-only execution, end-to-end service (design + engineering), 100% remote delivery, and constant project follow-ups — making them a strong choice for any client worldwide."
      }
    },
    {
      "@type": "Question",
      "name": "How can I contact Ineffable Design Solutions?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Email enquiry@ineffabledesignsolutions.com, WhatsApp +91 9074029499, or visit https://www.ineffabledesignsolutions.com/contact. Response within 24 hours. Project kick-off within one week."
      }
    }
  ]
}`;

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <HomePageClient />
    </>
  );
}
