import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

/* ================= TYPES ================= */
type Service = {
  id: string;
  title: string;
};

type Project = {
  id: string;
  slug: string;
  title: string;
  client: string;
  category: string;
  description: string;
  thumbnail: string;
  featured: boolean;
  services: {
    service: Service;
  }[];
};

const ProjectsPage = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [activeService, setActiveService] = useState<string>("All");

  /* ================= FETCH ================= */
  useEffect(() => {
    Promise.all([
      fetch(`${API_BASE}/api/projects`).then((r) => r.json()),
      fetch(`${API_BASE}/api/services`).then((r) => r.json()),
    ]).then(([projectsData, servicesData]) => {
      setProjects(projectsData);
      setServices(servicesData);
    });
  }, []);

  /* ================= FILTER ================= */
  const filteredProjects =
    activeService === "All"
      ? projects
      : projects.filter((project) =>
          project.services.some(
            (ps) => ps.service.title === activeService
          )
        );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-32">
        {/* Hero */}
        <section className="container-wide mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-primary font-medium tracking-[0.3em] uppercase text-xs mb-4">
              Our Work
            </p>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold mb-8">
              Projects
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl">
              A showcase of our finest work—each project represents our
              commitment to excellence and innovation.
            </p>
          </motion.div>
        </section>

        {/* ================= SERVICE FILTER ================= */}
        <section className="container-wide mb-12">
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setActiveService("All")}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                activeService === "All"
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary hover:bg-secondary/80"
              }`}
            >
              All
            </button>

            {services.map((service) => (
              <button
                key={service.id}
                onClick={() => setActiveService(service.title)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                  activeService === service.title
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary hover:bg-secondary/80"
                }`}
              >
                {service.title}
              </button>
            ))}
          </div>
        </section>

        {/* ================= PROJECT GRID ================= */}
        <section className="container-wide pb-32">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <Link to={`/projects/${project.slug}`}>
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-card border border-border">
                    <img
                      src={project.thumbnail}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    <div className="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                      <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center">
                        <ArrowUpRight className="w-6 h-6 text-primary-foreground" />
                      </div>
                    </div>

                    {project.featured && (
                      <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-primary text-xs text-primary-foreground">
                        Featured
                      </div>
                    )}
                  </div>

                  <div className="mt-6">
                    <h3 className="text-xl font-display font-semibold">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {project.client}
                    </p>
                    <p className="text-muted-foreground text-sm line-clamp-2">
                      {project.description}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ProjectsPage;
