import type { Metadata } from "next";
import ProjectDetailClient from "./ProjectDetailClient";

type Project = {
  id: string;
  slug: string;
  title: string;
  description: string;
  thumbnail: string;
};

const SITE_URL = "https://www.ineffabledesignsolutions.com";

async function getProject(slug: string): Promise<Project | null> {
  try {
    const res = await fetch(`${SITE_URL}/api/blogs/slug/${slug}`, {
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
  const project = await getProject(slug);

  if (!project) {
    return { title: "Project | Ineffable Design Solutions Portfolio" };
  }

  return {
    title: `${project.title} | Ineffable Design Solutions Portfolio`,
    description: project.description,
    alternates: {
      canonical: `${SITE_URL}/blogs/${project.slug}`,
    },
    openGraph: {
      title: `${project.title} — Ineffable Design Solutions`,
      description: project.description,
      url: `${SITE_URL}/blogs/${project.slug}`,
      ...(project.thumbnail ? { images: [{ url: project.thumbnail }] } : {}),
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProject(slug);

  const jsonLd = project
    ? `{
  "@context": "https://schema.org",
  "@type": "CreativeWork",
  "name": "${project.title.replace(/"/g, '\\"')}",
  "description": "${project.description.replace(/"/g, '\\"')}",
  "creator": {
    "@type": "Organization",
    "name": "Ineffable Design Solutions",
    "url": "${SITE_URL}"
  },
  "url": "${SITE_URL}/blogs/${project.slug}"
}`
    : null;

  return (
    <>
      {jsonLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      )}
      <ProjectDetailClient slug={slug} />
    </>
  );
}
