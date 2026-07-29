import type { Metadata } from "next";
import ProjectsPageClient from "./ProjectsPageClient";

export const metadata: Metadata = {
  title: "Our Work | Digital Design Portfolio — Ineffable Design Solutions",
  description:
    "Browse 50+ projects — software, UI/UX, branding, motion graphics & web apps built by Ineffable Design Solutions. Real client work across 10+ industries.",
  alternates: {
    canonical: "https://www.ineffabledesignsolutions.com/blogs",
  },
  openGraph: {
    title: "Our Work | Digital Design Portfolio — Ineffable Design Solutions",
    description:
      "Browse 50+ projects across software, UI/UX, branding & web apps. Real client work by Ineffable Design Solutions, Bangalore.",
    url: "https://www.ineffabledesignsolutions.com/blogs",
  },
};

export default function Page() {
  return <ProjectsPageClient />;
}
