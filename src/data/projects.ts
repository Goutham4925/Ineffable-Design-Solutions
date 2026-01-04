export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: string;
  clientName: string;
  coverImage: string;
  featured: boolean;
  images: string[];
}

export const projects: Project[] = [
  {
    id: "1",
    title: "Nexus Financial Platform",
    slug: "nexus-financial",
    description: "A comprehensive fintech platform revolutionizing personal finance management with AI-driven insights.",
    category: "Software Development",
    clientName: "Nexus Finance",
    coverImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop",
    featured: true,
    images: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&auto=format&fit=crop"
    ]
  },
  {
    id: "2",
    title: "Velocity E-Commerce",
    slug: "velocity-ecommerce",
    description: "High-performance e-commerce platform handling millions of transactions with sub-second response times.",
    category: "Web Development",
    clientName: "Velocity Retail",
    coverImage: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&auto=format&fit=crop",
    featured: true,
    images: [
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=1200&auto=format&fit=crop"
    ]
  },
  {
    id: "3",
    title: "Horizon Brand Identity",
    slug: "horizon-brand",
    description: "Complete brand transformation for a tech startup entering the global market.",
    category: "Branding",
    clientName: "Horizon Tech",
    coverImage: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&auto=format&fit=crop",
    featured: true,
    images: [
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=1200&auto=format&fit=crop"
    ]
  },
  {
    id: "4",
    title: "Pulse Health App",
    slug: "pulse-health",
    description: "Mobile health companion app with real-time vitals monitoring and personalized wellness recommendations.",
    category: "App Development",
    clientName: "Pulse Health",
    coverImage: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop",
    featured: true,
    images: [
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=1200&auto=format&fit=crop"
    ]
  },
  {
    id: "5",
    title: "Aurora Motion Campaign",
    slug: "aurora-motion",
    description: "Award-winning motion graphics campaign for a luxury automotive brand launch.",
    category: "Motion Graphics",
    clientName: "Aurora Motors",
    coverImage: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&auto=format&fit=crop",
    featured: false,
    images: [
      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=1200&auto=format&fit=crop"
    ]
  },
  {
    id: "6",
    title: "Quantum AI Dashboard",
    slug: "quantum-ai",
    description: "Enterprise AI analytics dashboard with predictive modeling and automated insights.",
    category: "AI & Automation",
    clientName: "Quantum Analytics",
    coverImage: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&auto=format&fit=crop",
    featured: true,
    images: [
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1200&auto=format&fit=crop"
    ]
  }
];

export const categories = [
  "All",
  "Software Development",
  "Web Development",
  "App Development",
  "Branding",
  "Motion Graphics",
  "AI & Automation"
];
