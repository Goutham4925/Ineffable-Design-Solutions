export interface Service {
  id: string;
  title: string;
  slug: string;
  tagline: string;
  description: string;
  features: string[];
  accentColor: string;
  order: number;
  image: string;
}

export const services: Service[] = [
  {
    id: "1",
    title: "Software Development",
    slug: "software-development",
    tagline: "Engineering Excellence",
    description: "Custom software solutions built with cutting-edge technologies. From enterprise applications to scalable microservices, we engineer software that drives business transformation.",
    features: [
      "Custom Enterprise Solutions",
      "API Development & Integration",
      "Cloud-Native Architecture",
      "Performance Optimization"
    ],
    accentColor: "var(--service-software)",
    order: 1,
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop"
  },
  {
    id: "2",
    title: "Web & App Development",
    slug: "web-app-development",
    tagline: "Digital Experiences Redefined",
    description: "Immersive web and mobile applications that captivate users and convert visitors. We build responsive, performant, and beautiful digital products.",
    features: [
      "Progressive Web Apps",
      "Native Mobile Development",
      "E-commerce Platforms",
      "Real-time Applications"
    ],
    accentColor: "var(--service-web)",
    order: 2,
    image: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&auto=format&fit=crop"
  },
  {
    id: "3",
    title: "UI/UX Design",
    slug: "ui-ux-design",
    tagline: "Design That Converts",
    description: "User-centered design that balances aesthetics with functionality. We create intuitive interfaces that users love and remember.",
    features: [
      "User Research & Testing",
      "Wireframing & Prototyping",
      "Design Systems",
      "Interaction Design"
    ],
    accentColor: "var(--service-design)",
    order: 3,
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&auto=format&fit=crop"
  },
  {
    id: "4",
    title: "Branding & Identity",
    slug: "branding-identity",
    tagline: "Brands That Resonate",
    description: "Strategic brand development that tells your story and connects with your audience. From visual identity to brand strategy.",
    features: [
      "Brand Strategy",
      "Logo & Visual Identity",
      "Brand Guidelines",
      "Brand Messaging"
    ],
    accentColor: "var(--service-branding)",
    order: 4,
    image: "https://images.unsplash.com/photo-1493421419110-74f4e85ba126?w=800&auto=format&fit=crop"
  },
  {
    id: "5",
    title: "Digital Marketing",
    slug: "digital-marketing",
    tagline: "Growth Engineered",
    description: "Data-driven marketing strategies that deliver measurable results. We amplify your reach and accelerate your growth.",
    features: [
      "SEO & Content Strategy",
      "Paid Media Campaigns",
      "Social Media Marketing",
      "Analytics & Reporting"
    ],
    accentColor: "var(--service-marketing)",
    order: 5,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop"
  },
  {
    id: "6",
    title: "Motion Graphics",
    slug: "motion-graphics",
    tagline: "Stories in Motion",
    description: "Dynamic motion design that brings your brand to life. From animated logos to full video production, we create content that captivates.",
    features: [
      "Animated Explainers",
      "Logo Animation",
      "Video Production",
      "3D Motion Design"
    ],
    accentColor: "var(--service-motion)",
    order: 6,
    image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&auto=format&fit=crop"
  },
  {
    id: "7",
    title: "Product Design",
    slug: "product-design",
    tagline: "Products That Matter",
    description: "End-to-end product design from concept to market. We design physical and digital products that solve real problems.",
    features: [
      "Product Strategy",
      "Industrial Design",
      "Packaging Design",
      "Product Prototyping"
    ],
    accentColor: "var(--service-product)",
    order: 7,
    image: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=800&auto=format&fit=crop"
  },
  {
    id: "8",
    title: "AI & Automation",
    slug: "ai-automation",
    tagline: "Intelligence Embedded",
    description: "Harness the power of artificial intelligence and automation to streamline operations and unlock new possibilities.",
    features: [
      "Machine Learning Solutions",
      "Process Automation",
      "AI Integration",
      "Predictive Analytics"
    ],
    accentColor: "var(--service-ai)",
    order: 8,
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&auto=format&fit=crop"
  }
];
