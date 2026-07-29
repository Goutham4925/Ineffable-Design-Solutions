import { CampaignConfig } from "./types";

/**
 * One entry per ad campaign/slug. Add a new slug here to spin up a new
 * /lp/<slug> landing page — no new route or component needed.
 */
const campaigns: Record<string, CampaignConfig> = {
  default: {
    slug: "default",
    title: "Get a Website Starting ₹20,000 + GST | Ineffable Design Solutions",
    eyebrow: "Limited Slots This Month",
    headline: "A website that",
    headlineAccent: "actually sells",
    subheadline:
      "Custom-designed, fast, mobile-ready websites for businesses and startups — built and shipped in days, not months.",
    price: "₹20,000",
    priceNote: "+ GST · starting price",
    trustChips: ["Free Consultation", "Fixed Pricing", "Delivered in 7–14 Days", "1 Month Free Support"],
    bullets: [
      "Custom design — no generic templates",
      "Mobile-first, fast-loading, SEO-ready",
      "Contact forms, WhatsApp integration & analytics wired in",
      "Free revisions until you're happy",
      "Domain, hosting & deployment handled for you",
    ],
    formSubject: "Website Enquiry — General",
    whatsappMessage: "Hi, I'm interested in getting a website built (Ref: default)",
  },
  google: {
    slug: "google",
    title: "Websites Starting ₹20,000 + GST | Ineffable Design Solutions",
    eyebrow: "You Searched. You Found Us.",
    headline: "A website that",
    headlineAccent: "actually sells",
    subheadline:
      "Get a professional, custom-built website for your business — starting at ₹20,000 + GST, delivered in as little as 7 days.",
    price: "₹20,000",
    priceNote: "+ GST · starting price",
    trustChips: ["Free Consultation", "Fixed Pricing", "Delivered in 7–14 Days", "1 Month Free Support"],
    bullets: [
      "Custom design — no generic templates",
      "Mobile-first, fast-loading, SEO-ready",
      "Contact forms, WhatsApp integration & analytics wired in",
      "Free revisions until you're happy",
      "Domain, hosting & deployment handled for you",
    ],
    formSubject: "Website Enquiry — Google Ads",
    whatsappMessage: "Hi, I'm interested in getting a website built (Ref: google)",
  },
  facebook: {
    slug: "facebook",
    title: "Get a Website Built — Starting ₹20,000 + GST | Ineffable Design Solutions",
    eyebrow: "Special Offer for New Clients",
    headline: "Your business deserves",
    headlineAccent: "a real website",
    subheadline:
      "Stop losing customers to a bad or missing website. We design, build and launch it for you — starting at ₹20,000 + GST.",
    price: "₹20,000",
    priceNote: "+ GST · starting price",
    trustChips: ["Free Consultation", "Fixed Pricing", "Delivered in 7–14 Days", "1 Month Free Support"],
    bullets: [
      "Custom design — no generic templates",
      "Mobile-first, fast-loading, SEO-ready",
      "Contact forms, WhatsApp integration & analytics wired in",
      "Free revisions until you're happy",
      "Domain, hosting & deployment handled for you",
    ],
    formSubject: "Website Enquiry — Facebook/Instagram Ads",
    whatsappMessage: "Hi, I'm interested in getting a website built (Ref: facebook)",
  },
};

export function getCampaign(slug: string | undefined): CampaignConfig {
  if (!slug) return campaigns.default;
  return campaigns[slug] || campaigns.default;
}

export function getAllSlugs(): string[] {
  return Object.keys(campaigns);
}
