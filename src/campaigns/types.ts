export interface CampaignConfig {
  slug: string;
  /** SEO title tag, never indexed — ad landing pages are noindex by default */
  title: string;
  eyebrow: string;
  headline: string;
  headlineAccent: string;
  subheadline: string;
  price: string;
  priceNote: string;
  trustChips: string[];
  bullets: string[];
  formSubject: string;
  whatsappMessage: string;
}
