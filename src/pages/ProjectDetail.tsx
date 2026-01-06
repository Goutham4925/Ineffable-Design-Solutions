import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, Calendar, User, Tag } from "lucide-react";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

/* ================= TYPES ================= */
type Project = {
  id: string;
  slug: string;
  title: string;
  client: string;
  category: string;
  year: string;
  description: string;
  longDescription?: string;
  thumbnail: string;
  images: string[];
  featured: boolean;
};

/* ================= COLORS ================= */
const projectColors = [
  "from-primary/60 to-primary/30",
  "from-violet-500/60 to-purple-500/30",
  "from-pink-500/60 to-rose-500/30",
  "from-amber-500/60 to-orange-500/30",
  "from-green-500/60 to-emerald-500/30",
  "from-blue-500/60 to-indigo-500/30",
];

/* ================= COMPONENT ================= */
const ProjectDetail = () => {
  const { slug } = useParams<{ slug: string }>();

  const [project, setProject] = useState<Project | null>(null);
  const [allProjects, setAllProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  /* ================= FETCH DATA ================= */
  useEffect(() => {
    Promise.all([
      fetch(`${API_BASE}/api/blogs/slug/${slug}`).then((r) => r.json()),
      fetch(`${API_BASE}/api/blogs`).then((r) => r.json()),
    ])
      .then(([projectData, all]) => {
        setProject(projectData);
        setAllProjects(all);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center text-muted-foreground">
        Loading project…
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-display font-bold mb-4">
            Project Not Found
          </h1>
          <Link to="/blogs" className="text-primary hover:underline">
            Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  const projectIndex = allProjects.findIndex((p) => p.slug === project.slug);
  const gradientClass =
    projectColors[projectIndex % projectColors.length];

  const nextProject =
    allProjects[(projectIndex + 1) % allProjects.length];
  const prevProject =
    allProjects[
      (projectIndex - 1 + allProjects.length) % allProjects.length
    ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main>
        {/* ================= HERO ================= */}
        <section className="pt-32 pb-20 relative overflow-hidden">
          <div
            className={`absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br ${gradientClass} opacity-10 blur-[100px]`}
          />

          <div className="container-wide relative z-10">
            {/* Back */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-12"
            >
              <Link
                to="/blogs"
                className="group inline-flex items-center gap-2 text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                Back to Projects
              </Link>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
              {/* Left */}
              <div>
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                  <Tag className="w-3.5 h-3.5" />
                  {project.category}
                </span>

                <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display font-bold mb-6">
                  {project.title}
                </h1>

                <p className="text-xl text-muted-foreground leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* Meta */}
              <div className="lg:pt-8">
                <div className="bg-card border border-border rounded-2xl p-8 space-y-6">
                  <MetaRow icon={<User />} label="Client" value={project.client || "Confidential"} />
                  <MetaRow icon={<Tag />} label="Category" value={project.category} />
                  <MetaRow icon={<Calendar />} label="Year" value={project.year} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= COVER ================= */}
        <section className="pb-20">
          <div className="container-wide">
            <div className="aspect-[16/9] rounded-3xl overflow-hidden bg-card border border-border">
              <img
                src={project.thumbnail}
                alt={project.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </section>

        {/* ================= OVERVIEW ================= */}
        <section className="py-20 border-t border-border">
          <div className="container-wide grid lg:grid-cols-3 gap-12 lg:gap-20">
            <div>
              <p className="text-primary tracking-[0.3em] uppercase text-xs mb-4">
                The Challenge
              </p>
              <h2 className="text-3xl md:text-4xl font-display font-bold">
                Project Overview
              </h2>
            </div>

            <div className="lg:col-span-2 space-y-6 text-lg text-muted-foreground">
              <p>{project.longDescription || project.description}</p>
            </div>
          </div>
        </section>

        {/* ================= GALLERY ================= */}
        <section className="py-20 bg-card/50">
          <div className="container-wide grid md:grid-cols-2 gap-8">
            {project.images.map((img, i) => (
              <div
                key={i}
                className={`rounded-2xl overflow-hidden border border-border ${
                  i === 0 ? "md:col-span-2 aspect-[21/9]" : "aspect-[4/3]"
                }`}
              >
                <img src={img} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </section>

        {/* ================= NAV ================= */}
        <section className="py-20 border-t border-border">
          <div className="container-wide grid md:grid-cols-2 gap-8">
            <NavCard label="Previous Project" project={prevProject} />
            <NavCard label="Next Project" project={nextProject} right />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

/* ================= HELPERS ================= */

const MetaRow = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) => (
  <>
    <div className="flex items-center gap-4">
      <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-muted-foreground">
        {icon}
      </div>
      <div>
        <p className="text-xs uppercase text-muted-foreground">{label}</p>
        <p className="font-medium">{value}</p>
      </div>
    </div>
    <div className="h-px bg-border" />
  </>
);

const NavCard = ({
  project,
  label,
  right,
}: {
  project: Project;
  label: string;
  right?: boolean;
}) => (
  <Link
    to={`/blogs/${project.slug}`}
    className={`group bg-card border border-border rounded-2xl p-8 hover:border-primary/50 transition-all ${
      right ? "text-right" : ""
    }`}
  >
    <p className="text-xs uppercase text-muted-foreground mb-2">{label}</p>
    <h3 className="text-2xl font-display font-bold group-hover:text-primary">
      {project.title}
    </h3>
  </Link>
);

export default ProjectDetail;
