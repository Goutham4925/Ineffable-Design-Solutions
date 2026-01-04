export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  message: string;
  avatar: string;
}

export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Alexandra Chen",
    role: "CEO",
    company: "Nexus Finance",
    message: "Ineffable transformed our vision into reality. Their attention to detail and technical excellence exceeded our expectations at every turn.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop"
  },
  {
    id: "2",
    name: "Marcus Williams",
    role: "Founder",
    company: "Velocity Retail",
    message: "Working with Ineffable was a game-changer. They didn't just build our platform—they engineered our success.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop"
  },
  {
    id: "3",
    name: "Sarah Mitchell",
    role: "CMO",
    company: "Horizon Tech",
    message: "The team's creative vision and strategic thinking helped us stand out in a crowded market. Truly exceptional work.",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&auto=format&fit=crop"
  },
  {
    id: "4",
    name: "David Park",
    role: "CTO",
    company: "Quantum Analytics",
    message: "Ineffable's expertise in AI and automation helped us achieve what we thought was impossible. They're true innovators.",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&auto=format&fit=crop"
  }
];
