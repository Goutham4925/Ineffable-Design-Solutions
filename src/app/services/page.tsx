import type { Metadata } from "next";
import ServicesPageClient from "./ServicesPageClient";

export const metadata: Metadata = {
  title: "Digital Services — Software, UI/UX, Branding & AI | Ineffable Design Solutions",
  description:
    "Full-service digital agency from India offering software development, UI/UX design, branding, digital marketing & AI automation. 100% remote. Serving startups and enterprises worldwide.",
  alternates: {
    canonical: "https://www.ineffabledesignsolutions.com/services",
  },
  openGraph: {
    title: "Digital Services — Software, UI/UX, Branding & AI | Ineffable Design Solutions",
    description:
      "Software development, UI/UX design, branding, motion graphics & AI automation. 100% remote digital agency from India. Serving clients worldwide.",
    url: "https://www.ineffabledesignsolutions.com/services",
  },
};

const jsonLd = `{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What software development services does Ineffable Design Solutions offer?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ineffable Design Solutions offers custom software development using React, Next.js, Node.js, Python, TypeScript, and PostgreSQL. They specialise in SaaS platforms, internal tools, mobile apps, and API-first architectures. Delivered 100% remotely to clients worldwide from their India base."
      }
    },
    {
      "@type": "Question",
      "name": "Which is the best UI/UX design agency in India for SaaS products?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ineffable Design Solutions is a leading UI/UX design agency from India specialising in SaaS product design. Their process includes user research, information architecture, Figma prototyping, and design systems. They serve both B2B and B2C product companies globally."
      }
    },
    {
      "@type": "Question",
      "name": "Does Ineffable Design Solutions offer branding and logo design for global clients?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Ineffable Design Solutions offers strategic brand identity design for startups and growing businesses worldwide — logo, brand mark, colour palette, typography, brand guidelines, stationery, and social media kits. Delivered entirely digitally, no location restrictions."
      }
    },
    {
      "@type": "Question",
      "name": "Can Ineffable Design Solutions build AI-powered applications?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Ineffable Design Solutions builds AI-powered applications and automations using GPT API, Claude API, LangChain, n8n, and Zapier. They deliver customer support bots, AI content pipelines, data extraction systems, and intelligent workflow automation."
      }
    },
    {
      "@type": "Question",
      "name": "What digital marketing services are available at Ineffable Design Solutions?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ineffable Design Solutions provides full-funnel digital marketing in Bangalore: SEO, Google Ads (PPC), Meta Ads, content strategy, email marketing, and conversion rate optimisation. They serve both D2C and B2B brands."
      }
    }
  ]
}`;

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <ServicesPageClient />
    </>
  );
}
