import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { cachedFetch } from "@/lib/api-cache";
import { ArrowUpRight } from "lucide-react";
import CustomCursor from "@/components/CustomCursor";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

type Service = { id: string; title: string; };
type Project = { id: string; slug: string; title: string; client: string; category: string; description: string; thumbnail: string; featured: boolean; services: { service: Service }[]; };

const ProjectsPage = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [activeService, setActiveService] = useState("All");

  useEffect(() => {
    Promise.all([
      cachedFetch<Project[]>(`${API_BASE}/api/blogs`),
      cachedFetch<Service[]>(`${API_BASE}/api/services`),
    ]).then(([p, s]) => { setProjects(p); setServices(s); });
  }, []);

  const filtered = activeService === "All"
    ? projects
    : projects.filter((p) => p.services.some((ps) => ps.service.title === activeService));

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Our Work | Digital Design Portfolio — Ineffable Design Solutions</title>
        <meta name="description" content="Browse 50+ projects — software, UI/UX, branding, motion graphics & web apps built by Ineffable Design Solutions. Real client work across 10+ industries." />
        <link rel="canonical" href="https://www.ineffabledesignsolutions.com/blogs" />
        <meta property="og:title" content="Our Work | Digital Design Portfolio — Ineffable Design Solutions" />
        <meta property="og:description" content="Browse 50+ projects across software, UI/UX, branding & web apps. Real client work by Ineffable Design Solutions, Bangalore." />
        <meta property="og:url" content="https://www.ineffabledesignsolutions.com/blogs" />
      </Helmet>
      <CustomCursor />
      <Navbar />
      <main id="main-content" className="pt-32">

        {/* Hero */}
        <section className="container-wide mb-16">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-px bg-primary" />
              <span className="label-small">Our Work</span>
            </div>
            <h1 className="text-display mb-6" style={{ fontSize: "clamp(3rem, 7vw, 7rem)", lineHeight: 1 }}>
              Projects
            </h1>
            <p className="text-muted-foreground text-lg max-w-xl leading-relaxed">
              A showcase of our finest work &mdash; each project represents our
              commitment to excellence and innovation.
            </p>
          </motion.div>
        </section>

        {/* Filter */}
        <section className="container-wide mb-12">
          <div className="flex flex-wrap gap-2">
            {["All", ...services.map((s) => s.title)].map((label) => (
              <button
                key={label}
                onClick={() => setActiveService(label)}
                aria-pressed={activeService === label}
                className={`px-4 py-2 text-xs font-medium tracking-wide uppercase border transition-all duration-200 ${
                  activeService === label
                    ? "bg-primary text-primary-foreground border-primary"
                    : "border-border/60 text-muted-foreground hover:border-primary/40 hover:text-foreground"
                }`}
                style={{ fontFamily: "var(--font-body)" }}
              >
                {label}
              </button>
            ))}
          </div>
        </section>

        {/* Grid */}
        <section className="container-wide pb-32">
          {filtered.length === 0 ? (
            <p className="text-muted-foreground text-sm py-8">No projects match this filter.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px border border-border/40 bg-border/40">
              {filtered.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.07 }}
                  className="bg-background group"
                >
                  <Link to={`/blogs/${project.slug}`} className="block p-0">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      {project.thumbnail ? (
                        <img
                          src={project.thumbnail}
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                          loading="lazy"
                        />
                      ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5" />
                      )}
                      <div className="absolute inset-0 bg-background/0 group-hover:bg-background/20 transition-colors duration-500" />
                      {project.featured && (
                        <div className="absolute top-4 left-4 px-3 py-1 bg-primary text-xs text-primary-foreground" style={{ fontFamily: "var(--font-body)" }}>
                          Featured
                        </div>
                      )}
                      <div className="absolute top-4 right-4 w-9 h-9 bg-primary flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <ArrowUpRight className="w-4 h-4 text-primary-foreground" aria-hidden="true" />
                      </div>
                    </div>
                    <div className="p-6 hover:bg-card transition-colors duration-300">
                      <h3 className="text-display mb-1 group-hover:text-primary transition-colors" style={{ fontSize: "1.3rem" }}>
                        {project.title}
                      </h3>
                      <p className="text-muted-foreground text-sm">{project.client}</p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ProjectsPage;
