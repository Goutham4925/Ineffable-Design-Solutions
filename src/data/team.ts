export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  avatar: string;
  social: {
    linkedin?: string;
    twitter?: string;
    dribbble?: string;
  };
}

export const teamMembers: TeamMember[] = [
  {
    id: "1",
    name: "Alex Chen",
    role: "Founder & Creative Director",
    bio: "Visionary leader with 15+ years in digital design and strategy.",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&auto=format&fit=crop",
    social: {
      linkedin: "#",
      twitter: "#"
    }
  },
  {
    id: "2",
    name: "Sarah Williams",
    role: "Head of Design",
    bio: "Award-winning designer focused on creating memorable brand experiences.",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop",
    social: {
      linkedin: "#",
      dribbble: "#"
    }
  },
  {
    id: "3",
    name: "Marcus Johnson",
    role: "Lead Developer",
    bio: "Full-stack engineer passionate about clean code and performance.",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&auto=format&fit=crop",
    social: {
      linkedin: "#",
      twitter: "#"
    }
  },
  {
    id: "4",
    name: "Emily Park",
    role: "Strategy Director",
    bio: "Strategic thinker helping brands find their voice in the digital age.",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop",
    social: {
      linkedin: "#",
      twitter: "#"
    }
  }
];
