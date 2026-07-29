import type { Metadata } from "next";
import ServiceDetailClient from "./ServiceDetailClient";

type Service = {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  features: string[];
  image?: string;
};

const SITE_URL = "https://www.ineffabledesignsolutions.com";

async function getService(slug: string): Promise<Service | null> {
  try {
    const res = await fetch(`${SITE_URL}/api/services/${slug}`, {
      next: { revalidate: 300 },
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = await getService(slug);

  if (!service) {
    return { title: "Service | Ineffable Design Solutions — Bangalore" };
  }

  return {
    title: `${service.title} | Ineffable Design Solutions — Bangalore`,
    description: service.description,
    alternates: {
      canonical: `${SITE_URL}/services/${service.slug}`,
    },
    openGraph: {
      title: `${service.title} | Ineffable Design Solutions`,
      description: service.description,
      url: `${SITE_URL}/services/${service.slug}`,
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = await getService(slug);

  const jsonLd = service
    ? `{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "${service.title.replace(/"/g, '\\"')}",
  "description": "${service.description.replace(/"/g, '\\"')}",
  "provider": {
    "@type": "Organization",
    "name": "Ineffable Design Solutions",
    "url": "${SITE_URL}"
  },
  "url": "${SITE_URL}/services/${service.slug}",
  "areaServed": "IN"
}`
    : null;

  return (
    <>
      {jsonLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      )}
      <ServiceDetailClient slug={slug} />
    </>
  );
}
