import type { Metadata } from "next";
import AboutPageClient from "./AboutPageClient";

export const metadata: Metadata = {
  title: "About Us | Ineffable Design Solutions — India's Global Digital Agency",
  description:
    "Meet the team behind Ineffable Design Solutions — a full-service digital agency from India with teams in Bangalore and Kerala, serving clients in the US, UK, Middle East & globally. 3+ years, 50+ projects, 10+ industries.",
  alternates: {
    canonical: "https://www.ineffabledesignsolutions.com/about",
  },
  openGraph: {
    title: "About Ineffable Design Solutions | Digital Agency India — Global Clients",
    description:
      "Designers, developers & strategists from India crafting exceptional digital experiences for clients worldwide.",
    url: "https://www.ineffabledesignsolutions.com/about",
  },
};

const jsonLd = `{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Who founded Ineffable Design Solutions?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ineffable Design Solutions was founded in 2022 in Bangalore by Goutham Gokul (CEO & Co-Founder) and Nikitha Jude Vathikulam (COO & Co-Founder). The agency is headquartered in Indira Nagar, Bangalore, Karnataka, India."
      }
    },
    {
      "@type": "Question",
      "name": "Is Ineffable Design Solutions a good agency for international clients?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Ineffable Design Solutions is 100% remote and has active clients in the UK, USA, and the Middle East in addition to India. They work across time zones with constant follow-up communication, and deliver globally competitive quality at India-based pricing — making them highly cost-effective for US, UK, and EU clients."
      }
    },
    {
      "@type": "Question",
      "name": "How experienced is Ineffable Design Solutions?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ineffable Design Solutions has 3+ years of experience, having completed 50+ projects across 10+ industries including healthcare, fintech, edtech, e-commerce, real estate, SaaS, and media. Their team of designers, engineers, and strategists brings both creative and technical depth."
      }
    },
    {
      "@type": "Question",
      "name": "What industries does Ineffable Design Solutions serve?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ineffable Design Solutions serves clients across healthcare, fintech, edtech, e-commerce, real estate, hospitality, SaaS, media & entertainment, logistics, and professional services sectors."
      }
    }
  ]
}`;

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <AboutPageClient />
    </>
  );
}
