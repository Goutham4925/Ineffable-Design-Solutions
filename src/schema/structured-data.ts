/**
 * Schema.org JSON-LD Structured Data
 * Ineffable Design Solutions
 *
 * Implementation guide:
 *   - Inject GLOBAL_SCHEMA into every page via a <script type="application/ld+json"> in index.html
 *     (WebSite + Organization + LocalBusiness never change between pages)
 *   - Inject each PAGE_SCHEMA block in the matching React page component using a <Helmet> or
 *     a plain dangerouslySetInnerHTML <script> rendered inside <head> via a portal.
 *   - For ServiceDetail pages, call buildServiceDetailSchema(slug, title, description, tagline)
 *     at render-time so the breadcrumb and Service block are always in sync with live API data.
 */

// ---------------------------------------------------------------------------
// Shared constants
// ---------------------------------------------------------------------------

const BASE_URL = "https://www.ineffabledesignsolutions.com";
const LOGO_URL =
  "https://res.cloudinary.com/dspbp48zi/image/upload/v1767711760/Frame_409_gdhwjx.png";
const CONTACT_EMAIL = "enquiry@ineffabledesignsolutions.com";
const CONTACT_PHONE = "+91-9074029499";
const ORG_ID = `${BASE_URL}/#organization`;
const WEBSITE_ID = `${BASE_URL}/#website`;

// ---------------------------------------------------------------------------
// 1. GLOBAL SCHEMA — inject once in index.html <head>
//    Covers: WebSite, Organization, LocalBusiness (ProfessionalService)
// ---------------------------------------------------------------------------

export const GLOBAL_SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    // ── WebSite ────────────────────────────────────────────────────────────
    {
      "@type": "WebSite",
      "@id": WEBSITE_ID,
      "url": BASE_URL,
      "name": "Ineffable Design Solutions",
      "description":
        "Designing the Ineffable. Engineering the Exceptional. Full-service digital agency in Bangalore, India.",
      "publisher": { "@id": ORG_ID },
      "inLanguage": "en-IN",
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": `${BASE_URL}/blogs?q={search_term_string}`
        },
        "query-input": "required name=search_term_string"
      }
    },

    // ── Organization ───────────────────────────────────────────────────────
    {
      "@type": "Organization",
      "@id": ORG_ID,
      "name": "Ineffable Design Solutions",
      "alternateName": "Ineffable Design",
      "url": BASE_URL,
      "logo": {
        "@type": "ImageObject",
        "url": LOGO_URL,
        "width": 1200,
        "height": 630
      },
      "image": LOGO_URL,
      "description":
        "Ineffable Design Solutions is a full-service digital agency combining creative excellence with technical innovation. We partner with forward-thinking brands to create digital experiences that captivate, convert, and inspire.",
      "email": CONTACT_EMAIL,
      "telephone": CONTACT_PHONE,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Indira Nagar",
        "addressLocality": "Bangalore",
        "addressRegion": "Karnataka",
        "postalCode": "560038",
        "addressCountry": "IN"
      },
      "areaServed": [
        { "@type": "Country", "name": "India" },
        { "@type": "Country", "name": "United States" },
        { "@type": "Country", "name": "United Kingdom" }
      ],
      "foundingDate": "2022",
      "numberOfEmployees": {
        "@type": "QuantitativeValue",
        "minValue": 2,
        "maxValue": 20
      },
      "slogan": "Designing the Ineffable. Engineering the Exceptional.",
      "knowsAbout": [
        "Software Development",
        "Web App Development",
        "UI/UX Design",
        "Branding & Identity",
        "Digital Marketing",
        "Motion Graphics",
        "Product Design",
        "AI Automation"
      ],
      "sameAs": [
        "https://www.linkedin.com/company/ineffable-design-solutions",
        "https://www.instagram.com/ineffabledesign",
        "https://www.facebook.com/ineffabledesign",
        "https://twitter.com/ineffabledesign"
      ],
      "founders": [
        {
          "@type": "Person",
          "name": "Goutham Gokul",
          "jobTitle": "CEO & Co-Founder",
          "worksFor": { "@id": ORG_ID }
        },
        {
          "@type": "Person",
          "name": "Nikitha Jude Vathikulam",
          "jobTitle": "COO & Co-Founder",
          "worksFor": { "@id": ORG_ID }
        }
      ],
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "customer support",
        "email": CONTACT_EMAIL,
        "telephone": CONTACT_PHONE,
        "availableLanguage": ["English"],
        "areaServed": "IN"
      }
    },

    // ── LocalBusiness (ProfessionalService) ───────────────────────────────
    {
      "@type": ["LocalBusiness", "ProfessionalService"],
      "@id": `${BASE_URL}/#localbusiness`,
      "name": "Ineffable Design Solutions",
      "image": LOGO_URL,
      "url": BASE_URL,
      "email": CONTACT_EMAIL,
      "telephone": CONTACT_PHONE,
      "description":
        "Full-service digital design agency in Bangalore offering software development, web app development, UI/UX design, branding, digital marketing, motion graphics, product design, and AI automation.",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Indira Nagar",
        "addressLocality": "Bangalore",
        "addressRegion": "Karnataka",
        "postalCode": "560038",
        "addressCountry": "IN"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 12.9784,
        "longitude": 77.6408
      },
      "priceRange": "$$",
      "currenciesAccepted": "INR, USD",
      "paymentAccepted": "Bank Transfer, UPI",
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday"
          ],
          "opens": "09:00",
          "closes": "18:00"
        }
      ],
      "sameAs": [
        "https://www.linkedin.com/company/ineffable-design-solutions",
        "https://www.instagram.com/ineffabledesign",
        "https://www.facebook.com/ineffabledesign",
        "https://twitter.com/ineffabledesign"
      ],
      "parentOrganization": { "@id": ORG_ID }
    }
  ]
};

// ---------------------------------------------------------------------------
// 2. PAGE SCHEMAS — one object per route
// ---------------------------------------------------------------------------

// ── / (Homepage) ────────────────────────────────────────────────────────────
export const HOME_PAGE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${BASE_URL}/#webpage`,
  "url": BASE_URL,
  "name": "Ineffable Design Solutions | Full-Service Digital Agency",
  "description":
    "Designing the Ineffable. Engineering the Exceptional. We craft exceptional digital experiences through software development, web design, branding, UI/UX, digital marketing, and AI solutions.",
  "inLanguage": "en-IN",
  "isPartOf": { "@id": WEBSITE_ID },
  "about": { "@id": ORG_ID },
  "publisher": { "@id": ORG_ID },
  "breadcrumb": {
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": BASE_URL
      }
    ]
  }
};

// ── /about ──────────────────────────────────────────────────────────────────
export const ABOUT_PAGE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "@id": `${BASE_URL}/about#webpage`,
  "url": `${BASE_URL}/about`,
  "name": "About Us | Ineffable Design Solutions",
  "description":
    "Ineffable Design Solutions is a full-service digital agency that combines creative excellence with technical innovation. Meet the team: Goutham Gokul (CEO) and Nikitha Jude Vathikulam (COO).",
  "inLanguage": "en-IN",
  "isPartOf": { "@id": WEBSITE_ID },
  "about": { "@id": ORG_ID },
  "publisher": { "@id": ORG_ID },
  "breadcrumb": {
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": BASE_URL
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "About Us",
        "item": `${BASE_URL}/about`
      }
    ]
  },
  "mentions": [
    {
      "@type": "Person",
      "name": "Goutham Gokul",
      "jobTitle": "CEO & Co-Founder",
      "worksFor": { "@id": ORG_ID }
    },
    {
      "@type": "Person",
      "name": "Nikitha Jude Vathikulam",
      "jobTitle": "COO & Co-Founder",
      "worksFor": { "@id": ORG_ID }
    }
  ]
};

// ── /contact ────────────────────────────────────────────────────────────────
export const CONTACT_PAGE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "@id": `${BASE_URL}/contact#webpage`,
  "url": `${BASE_URL}/contact`,
  "name": "Contact Us | Ineffable Design Solutions",
  "description":
    "Have a project in mind? Get in touch with Ineffable Design Solutions. Email us at enquiry@ineffabledesignsolutions.com or call +91 9074029499. Based in Indira Nagar, Bangalore.",
  "inLanguage": "en-IN",
  "isPartOf": { "@id": WEBSITE_ID },
  "publisher": { "@id": ORG_ID },
  "breadcrumb": {
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": BASE_URL
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Contact",
        "item": `${BASE_URL}/contact`
      }
    ]
  },
  "mainEntity": {
    "@type": "ContactPoint",
    "contactType": "sales",
    "email": CONTACT_EMAIL,
    "telephone": CONTACT_PHONE,
    "availableLanguage": ["English"],
    "areaServed": "IN"
  }
};

// ── /services (Services listing) ────────────────────────────────────────────
export const SERVICES_PAGE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${BASE_URL}/services#webpage`,
  "url": `${BASE_URL}/services`,
  "name": "Our Services | Ineffable Design Solutions",
  "description":
    "From concept to launch — comprehensive digital solutions including software development, web app development, UI/UX design, branding, digital marketing, motion graphics, product design, and AI automation.",
  "inLanguage": "en-IN",
  "isPartOf": { "@id": WEBSITE_ID },
  "publisher": { "@id": ORG_ID },
  "breadcrumb": {
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": BASE_URL
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Services",
        "item": `${BASE_URL}/services`
      }
    ]
  }
};

// ── /blogs (Portfolio / Projects listing) ───────────────────────────────────
export const BLOGS_PAGE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": `${BASE_URL}/blogs#webpage`,
  "url": `${BASE_URL}/blogs`,
  "name": "Projects | Ineffable Design Solutions",
  "description":
    "A showcase of our finest work — each project represents Ineffable Design Solutions' commitment to excellence, innovation, and flawless execution across software, design, and marketing.",
  "inLanguage": "en-IN",
  "isPartOf": { "@id": WEBSITE_ID },
  "publisher": { "@id": ORG_ID },
  "breadcrumb": {
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": BASE_URL
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Projects",
        "item": `${BASE_URL}/blogs`
      }
    ]
  }
};

// ── /privacy ────────────────────────────────────────────────────────────────
export const PRIVACY_PAGE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${BASE_URL}/privacy#webpage`,
  "url": `${BASE_URL}/privacy`,
  "name": "Privacy Policy | Ineffable Design Solutions",
  "description":
    "Ineffable Design Solutions is committed to protecting your privacy. Read our full privacy policy covering data collection, usage, protection, and your rights.",
  "inLanguage": "en-IN",
  "isPartOf": { "@id": WEBSITE_ID },
  "publisher": { "@id": ORG_ID },
  "breadcrumb": {
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": BASE_URL
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Privacy Policy",
        "item": `${BASE_URL}/privacy`
      }
    ]
  }
};

// ── /terms ──────────────────────────────────────────────────────────────────
export const TERMS_PAGE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${BASE_URL}/terms#webpage`,
  "url": `${BASE_URL}/terms`,
  "name": "Terms of Service | Ineffable Design Solutions",
  "description":
    "Read the Terms of Service for Ineffable Design Solutions. Understand your rights and obligations when using our digital agency services.",
  "inLanguage": "en-IN",
  "isPartOf": { "@id": WEBSITE_ID },
  "publisher": { "@id": ORG_ID },
  "breadcrumb": {
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": BASE_URL
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Terms of Service",
        "item": `${BASE_URL}/terms`
      }
    ]
  }
};

// ---------------------------------------------------------------------------
// 3. SERVICE SCHEMAS — one per service detail page
//    Each block covers both the Service entity AND the BreadcrumbList.
// ---------------------------------------------------------------------------

const serviceProviderRef = {
  "@type": "Organization",
  "@id": ORG_ID,
  "name": "Ineffable Design Solutions",
  "url": BASE_URL
};

export const SERVICE_SCHEMAS: Record<
  string,
  { "@context": string; "@graph": object[] }
> = {
  "software-development": {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${BASE_URL}/services/software-development#webpage`,
        "url": `${BASE_URL}/services/software-development`,
        "name": "Software Development Services | Ineffable Design Solutions",
        "description":
          "End-to-end custom software development — from architecture and backend engineering to deployment and ongoing support. Built to scale.",
        "inLanguage": "en-IN",
        "isPartOf": { "@id": WEBSITE_ID },
        "publisher": { "@id": ORG_ID },
        "breadcrumb": {
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": BASE_URL },
            { "@type": "ListItem", "position": 2, "name": "Services", "item": `${BASE_URL}/services` },
            { "@type": "ListItem", "position": 3, "name": "Software Development", "item": `${BASE_URL}/services/software-development` }
          ]
        }
      },
      {
        "@type": "Service",
        "@id": `${BASE_URL}/services/software-development#service`,
        "name": "Software Development",
        "alternateName": "Custom Software Development",
        "description":
          "End-to-end custom software development — from architecture and backend engineering to deployment and ongoing support. We build scalable, performant software tailored to your business needs.",
        "url": `${BASE_URL}/services/software-development`,
        "provider": serviceProviderRef,
        "serviceType": "Software Development",
        "areaServed": { "@type": "Country", "name": "India" },
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Software Development Services",
          "itemListElement": [
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Custom Software Architecture" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Backend API Development" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Database Design & Optimization" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Cloud Deployment & DevOps" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Software Maintenance & Support" } }
          ]
        }
      }
    ]
  },

  "web-app-development": {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${BASE_URL}/services/web-app-development#webpage`,
        "url": `${BASE_URL}/services/web-app-development`,
        "name": "Web App Development Services | Ineffable Design Solutions",
        "description":
          "Modern, responsive web application development using React, Next.js, and cutting-edge frameworks. From SPAs to full-stack platforms.",
        "inLanguage": "en-IN",
        "isPartOf": { "@id": WEBSITE_ID },
        "publisher": { "@id": ORG_ID },
        "breadcrumb": {
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": BASE_URL },
            { "@type": "ListItem", "position": 2, "name": "Services", "item": `${BASE_URL}/services` },
            { "@type": "ListItem", "position": 3, "name": "Web App Development", "item": `${BASE_URL}/services/web-app-development` }
          ]
        }
      },
      {
        "@type": "Service",
        "@id": `${BASE_URL}/services/web-app-development#service`,
        "name": "Web App Development",
        "alternateName": "Web Application Development",
        "description":
          "Modern, responsive web application development using React, Next.js, and cutting-edge frameworks. We build SPAs, full-stack platforms, and progressive web apps that perform flawlessly.",
        "url": `${BASE_URL}/services/web-app-development`,
        "provider": serviceProviderRef,
        "serviceType": "Web Development",
        "areaServed": { "@type": "Country", "name": "India" },
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Web App Development Services",
          "itemListElement": [
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Single Page Application (SPA) Development" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Full-Stack Web Platform Development" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Progressive Web App (PWA) Development" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "API Integration & Third-Party Services" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Performance Optimization & Accessibility" } }
          ]
        }
      }
    ]
  },

  "ui-ux-design": {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${BASE_URL}/services/ui-ux-design#webpage`,
        "url": `${BASE_URL}/services/ui-ux-design`,
        "name": "UI/UX Design Services | Ineffable Design Solutions",
        "description":
          "User-centred interface and experience design that captivates and converts. Research-led, pixel-perfect design systems built for real products.",
        "inLanguage": "en-IN",
        "isPartOf": { "@id": WEBSITE_ID },
        "publisher": { "@id": ORG_ID },
        "breadcrumb": {
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": BASE_URL },
            { "@type": "ListItem", "position": 2, "name": "Services", "item": `${BASE_URL}/services` },
            { "@type": "ListItem", "position": 3, "name": "UI/UX Design", "item": `${BASE_URL}/services/ui-ux-design` }
          ]
        }
      },
      {
        "@type": "Service",
        "@id": `${BASE_URL}/services/ui-ux-design#service`,
        "name": "UI/UX Design",
        "alternateName": "User Interface & User Experience Design",
        "description":
          "User-centred interface and experience design that captivates and converts. We deliver research-led wireframes, prototypes, and pixel-perfect design systems built for real digital products.",
        "url": `${BASE_URL}/services/ui-ux-design`,
        "provider": serviceProviderRef,
        "serviceType": "UI/UX Design",
        "areaServed": { "@type": "Country", "name": "India" },
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "UI/UX Design Services",
          "itemListElement": [
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "User Research & Persona Development" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Wireframing & Prototyping" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Design System Creation" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Usability Testing" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Interaction & Motion Design" } }
          ]
        }
      }
    ]
  },

  "branding-identity": {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${BASE_URL}/services/branding-identity#webpage`,
        "url": `${BASE_URL}/services/branding-identity`,
        "name": "Branding & Identity Services | Ineffable Design Solutions",
        "description":
          "Strategic brand identity design — logos, visual systems, brand guidelines, and messaging that make your business unforgettable.",
        "inLanguage": "en-IN",
        "isPartOf": { "@id": WEBSITE_ID },
        "publisher": { "@id": ORG_ID },
        "breadcrumb": {
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": BASE_URL },
            { "@type": "ListItem", "position": 2, "name": "Services", "item": `${BASE_URL}/services` },
            { "@type": "ListItem", "position": 3, "name": "Branding & Identity", "item": `${BASE_URL}/services/branding-identity` }
          ]
        }
      },
      {
        "@type": "Service",
        "@id": `${BASE_URL}/services/branding-identity#service`,
        "name": "Branding & Identity",
        "alternateName": "Brand Identity Design",
        "description":
          "Strategic brand identity design that makes your business unforgettable. We craft logos, visual systems, brand guidelines, colour palettes, typography, and complete messaging frameworks.",
        "url": `${BASE_URL}/services/branding-identity`,
        "provider": serviceProviderRef,
        "serviceType": "Branding & Identity Design",
        "areaServed": { "@type": "Country", "name": "India" },
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Branding & Identity Services",
          "itemListElement": [
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Logo Design & Brand Mark" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Brand Strategy & Positioning" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Visual Identity System" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Brand Guidelines & Style Guide" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Stationery & Collateral Design" } }
          ]
        }
      }
    ]
  },

  "digital-marketing": {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${BASE_URL}/services/digital-marketing#webpage`,
        "url": `${BASE_URL}/services/digital-marketing`,
        "name": "Digital Marketing Services | Ineffable Design Solutions",
        "description":
          "Data-driven digital marketing strategies — SEO, social media, content marketing, and paid campaigns — that grow your brand and drive measurable results.",
        "inLanguage": "en-IN",
        "isPartOf": { "@id": WEBSITE_ID },
        "publisher": { "@id": ORG_ID },
        "breadcrumb": {
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": BASE_URL },
            { "@type": "ListItem", "position": 2, "name": "Services", "item": `${BASE_URL}/services` },
            { "@type": "ListItem", "position": 3, "name": "Digital Marketing", "item": `${BASE_URL}/services/digital-marketing` }
          ]
        }
      },
      {
        "@type": "Service",
        "@id": `${BASE_URL}/services/digital-marketing#service`,
        "name": "Digital Marketing",
        "alternateName": "Digital Marketing & Growth",
        "description":
          "Data-driven digital marketing strategies that grow your brand and drive measurable results. Services span SEO, social media management, content marketing, and paid advertising campaigns.",
        "url": `${BASE_URL}/services/digital-marketing`,
        "provider": serviceProviderRef,
        "serviceType": "Digital Marketing",
        "areaServed": { "@type": "Country", "name": "India" },
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Digital Marketing Services",
          "itemListElement": [
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Search Engine Optimisation (SEO)" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Social Media Management" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Content Marketing & Strategy" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Paid Advertising (PPC / Meta Ads)" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Email Marketing & Automation" } }
          ]
        }
      }
    ]
  },

  "motion-graphics": {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${BASE_URL}/services/motion-graphics#webpage`,
        "url": `${BASE_URL}/services/motion-graphics`,
        "name": "Motion Graphics Services | Ineffable Design Solutions",
        "description":
          "Compelling motion graphics and animation — from brand explainer videos to UI micro-animations — that bring your brand story to life.",
        "inLanguage": "en-IN",
        "isPartOf": { "@id": WEBSITE_ID },
        "publisher": { "@id": ORG_ID },
        "breadcrumb": {
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": BASE_URL },
            { "@type": "ListItem", "position": 2, "name": "Services", "item": `${BASE_URL}/services` },
            { "@type": "ListItem", "position": 3, "name": "Motion Graphics", "item": `${BASE_URL}/services/motion-graphics` }
          ]
        }
      },
      {
        "@type": "Service",
        "@id": `${BASE_URL}/services/motion-graphics#service`,
        "name": "Motion Graphics",
        "alternateName": "Motion Design & Animation",
        "description":
          "Compelling motion graphics and animation that bring your brand story to life. We produce brand explainer videos, UI micro-animations, social media reels, and broadcast-ready motion assets.",
        "url": `${BASE_URL}/services/motion-graphics`,
        "provider": serviceProviderRef,
        "serviceType": "Motion Graphics & Animation",
        "areaServed": { "@type": "Country", "name": "India" },
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Motion Graphics Services",
          "itemListElement": [
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Brand Explainer Videos" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "UI Micro-Animation" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Social Media Motion Content" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Logo Animation & Sting" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Infographic & Data Animation" } }
          ]
        }
      }
    ]
  },

  "product-design": {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${BASE_URL}/services/product-design#webpage`,
        "url": `${BASE_URL}/services/product-design`,
        "name": "Product Design Services | Ineffable Design Solutions",
        "description":
          "End-to-end digital product design — from discovery and strategy through wireframes, prototypes, and launch-ready design specifications.",
        "inLanguage": "en-IN",
        "isPartOf": { "@id": WEBSITE_ID },
        "publisher": { "@id": ORG_ID },
        "breadcrumb": {
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": BASE_URL },
            { "@type": "ListItem", "position": 2, "name": "Services", "item": `${BASE_URL}/services` },
            { "@type": "ListItem", "position": 3, "name": "Product Design", "item": `${BASE_URL}/services/product-design` }
          ]
        }
      },
      {
        "@type": "Service",
        "@id": `${BASE_URL}/services/product-design#service`,
        "name": "Product Design",
        "alternateName": "Digital Product Design",
        "description":
          "End-to-end digital product design from discovery and strategy through wireframes, high-fidelity prototypes, and launch-ready design specifications that development teams love to work from.",
        "url": `${BASE_URL}/services/product-design`,
        "provider": serviceProviderRef,
        "serviceType": "Product Design",
        "areaServed": { "@type": "Country", "name": "India" },
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Product Design Services",
          "itemListElement": [
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Product Strategy & Roadmapping" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Information Architecture" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "High-Fidelity UI Prototyping" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Design-to-Developer Handoff" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Post-Launch Iteration & Testing" } }
          ]
        }
      }
    ]
  },

  "ai-automation": {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${BASE_URL}/services/ai-automation#webpage`,
        "url": `${BASE_URL}/services/ai-automation`,
        "name": "AI Automation Services | Ineffable Design Solutions",
        "description":
          "Custom AI solutions and intelligent automation that streamline workflows, reduce operational overhead, and give your business a competitive edge.",
        "inLanguage": "en-IN",
        "isPartOf": { "@id": WEBSITE_ID },
        "publisher": { "@id": ORG_ID },
        "breadcrumb": {
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": BASE_URL },
            { "@type": "ListItem", "position": 2, "name": "Services", "item": `${BASE_URL}/services` },
            { "@type": "ListItem", "position": 3, "name": "AI Automation", "item": `${BASE_URL}/services/ai-automation` }
          ]
        }
      },
      {
        "@type": "Service",
        "@id": `${BASE_URL}/services/ai-automation#service`,
        "name": "AI Automation",
        "alternateName": "Artificial Intelligence & Automation Solutions",
        "description":
          "Custom AI solutions and intelligent automation that streamline workflows, reduce operational overhead, and give your business a competitive edge. From LLM integrations to computer-vision pipelines.",
        "url": `${BASE_URL}/services/ai-automation`,
        "provider": serviceProviderRef,
        "serviceType": "AI & Automation",
        "areaServed": { "@type": "Country", "name": "India" },
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "AI Automation Services",
          "itemListElement": [
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "LLM Integration & Prompt Engineering" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Workflow Automation & RPA" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "AI Chatbot & Conversational Agent Development" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Data Pipeline & ML Model Integration" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Computer Vision Solutions" } }
          ]
        }
      }
    ]
  }
};

// ---------------------------------------------------------------------------
// 4. DYNAMIC BUILDER — for project/blog detail pages (/blogs/:slug)
//    Call this inside ProjectDetail.tsx once the project data has loaded.
// ---------------------------------------------------------------------------

export interface ProjectSchemaInput {
  slug: string;
  title: string;
  client: string;
  category: string;
  description: string;
  thumbnail: string;
  featured: boolean;
}

export function buildProjectDetailSchema(project: ProjectSchemaInput) {
  const pageUrl = `${BASE_URL}/blogs/${project.slug}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        "url": pageUrl,
        "name": `${project.title} | Ineffable Design Solutions`,
        "description": project.description,
        "inLanguage": "en-IN",
        "isPartOf": { "@id": WEBSITE_ID },
        "publisher": { "@id": ORG_ID },
        "breadcrumb": {
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": BASE_URL },
            { "@type": "ListItem", "position": 2, "name": "Projects", "item": `${BASE_URL}/blogs` },
            { "@type": "ListItem", "position": 3, "name": project.title, "item": pageUrl }
          ]
        }
      },
      {
        "@type": "CreativeWork",
        "@id": `${pageUrl}#project`,
        "name": project.title,
        "description": project.description,
        "url": pageUrl,
        "image": project.thumbnail || LOGO_URL,
        "creator": { "@id": ORG_ID },
        "producer": { "@id": ORG_ID },
        "genre": project.category,
        "about": {
          "@type": "Organization",
          "name": project.client
        }
      }
    ]
  };
}

// ---------------------------------------------------------------------------
// 5. SERIALISER — converts any schema object to a ready-to-inject script tag
// ---------------------------------------------------------------------------

export function toScriptTag(schema: object): string {
  return `<script type="application/ld+json">\n${JSON.stringify(schema, null, 2)}\n</script>`;
}
