import type { Metadata } from "next";
import ContactPageClient from "./ContactPageClient";

export const metadata: Metadata = {
  title: "Contact Ineffable Design Solutions | Start a Project — Anywhere in the World",
  description:
    "Have a project in mind? Contact Ineffable Design Solutions — a remote digital agency from India serving clients globally. Email, call or WhatsApp +91 9074029499. We respond within 24 hours.",
  alternates: {
    canonical: "https://www.ineffabledesignsolutions.com/contact",
  },
  openGraph: {
    title: "Contact Ineffable Design Solutions — Let's Build Together",
    description:
      "Start a project, ask a question, or say hello. Based in Bangalore. Serving clients globally.",
    url: "https://www.ineffabledesignsolutions.com/contact",
  },
};

const jsonLd = `{
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "name": "Contact Ineffable Design Solutions",
  "url": "https://www.ineffabledesignsolutions.com/contact",
  "mainEntity": {
    "@type": "Organization",
    "name": "Ineffable Design Solutions",
    "telephone": "+91-9074029499",
    "email": "enquiry@ineffabledesignsolutions.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Indira Nagar",
      "addressLocality": "Bangalore",
      "addressRegion": "Karnataka",
      "postalCode": "560038",
      "addressCountry": "IN"
    }
  }
}`;

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <ContactPageClient />
    </>
  );
}
