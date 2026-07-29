import type { Metadata } from "next";
import { getCampaign } from "@/campaigns/registry";
import LandingPageClient from "./LandingPageClient";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const campaign = getCampaign(slug);

  return {
    title: campaign.title,
    description: campaign.subheadline,
    robots: { index: false, follow: false },
  };
}

export default async function LandingPage({ params }: PageProps) {
  const { slug } = await params;
  const campaign = getCampaign(slug);

  return <LandingPageClient campaign={campaign} />;
}
