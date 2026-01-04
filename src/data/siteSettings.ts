export interface SiteSettings {
  siteName: string;
  tagline: string;
  description: string;
  email: string;
  phone: string;
  address: string;
  social: {
    linkedin: string;
    twitter: string;
    instagram: string;
    dribbble: string;
  };
  heroTitle: string;
  heroSubtitle: string;
  heroDescription: string;
  heroImage: string;
  footerText: string;
}

export const siteSettings: SiteSettings = {
  siteName: "Ineffable Design Solutions",
  tagline: "Designing the Ineffable. Engineering the Exceptional.",
  description: "Ineffable Design Solutions delivers innovative digital design and branding services, empowering businesses to thrive in the digital landscape.",
  email: "hello@ineffable.design",
  phone: "+1 (234) 567-890",
  address: "123 Design Street, Creative City, CC 12345",
  social: {
    linkedin: "https://linkedin.com/company/ineffable",
    twitter: "https://twitter.com/ineffable",
    instagram: "https://instagram.com/ineffable",
    dribbble: "https://dribbble.com/ineffable"
  },
  heroTitle: "Ineffable Design Solutions",
  heroSubtitle: "Transforming Businesses with Cutting-Edge Design Solutions",
  heroDescription: "Ineffable Design Solutions delivers innovative digital design and branding services, empowering businesses to thrive in the digital landscape.",
  heroImage: "https://framerusercontent.com/images/ZMYKutVkKIecWMzISEDH8aZR9E.jpg",
  footerText: "Designing the Ineffable. Engineering the Exceptional."
};
