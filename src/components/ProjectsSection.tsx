import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

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
  featured: boolean;
  services: { service: Service }[];
};

/* ================= COMPONENT ================= */
const ProjectsSection = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [activeService, setActiveService] = useState("All");

  /* ================= FETCH ================= */
  useEffect(() => {
    Promise.all([
      fetch(`${API_BASE}/api/projects`).then((r) => r.json()),
      fetch(`${API_BASE}/api/services`).then((r) => r.json()),
    ]).then(([projectsData, servicesData]) => {
      setProjects(projectsData.filter((p: Project) => p.featured));
      setServices(servicesData);
    });
  }, []);

  /* ================= FILTER ================= */
  const filteredProjects =
    activeService === "All"
      ? projects
      : projects.filter((project) =>
          project.services.some(
            (s) => s.service.title === activeService
          )
        );

  const projectColors = [
    "from-cyan-500 to-blue-500",
    "from-violet-500 to-purple-500",
    "from-pink-500 to-rose-500",
    "from-amber-500 to-orange-500",
    "from-green-500 to-emerald-500",
    "from-blue-500 to-indigo-500",
  ];

  return (
    <section className="section-padding relative overflow-hidden bg-card/50">
      <div className="container-wide">

        {/* ================= HEADER ================= */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-primary font-medium tracking-[0.3em] uppercase text-xs mb-4">
              Featured Work
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold">
              Our Projects
            </h2>
          </motion.div>

          {/* ================= SERVICE FILTER ================= */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-wrap gap-2"
          >
            <button
              onClick={() => setActiveService("All")}
              className={`px-4 py-2 rounded-full text-xs font-medium ${
                activeService === "All"
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary hover:bg-secondary/80"
              }`}
            >
              All
            </button>

            {services.slice(0, 5).map((service) => (
              <button
                key={service.id}
                onClick={() => setActiveService(service.title)}
                className={`px-4 py-2 rounded-full text-xs font-medium ${
                  activeService === service.title
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary hover:bg-secondary/80"
                }`}
              >
                {service.title}
              </button>
            ))}
          </motion.div>
        </div>

        {/* ================= GRID ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <Link to={`/projects/${project.slug}`} className="block">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-card border border-border">
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${
                      projectColors[index % projectColors.length]
                    } opacity-20 group-hover:opacity-30 transition-opacity`}
                  />

                  <div className="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center scale-0 group-hover:scale-100 transition-transform">
                      <ArrowUpRight className="w-6 h-6 text-primary-foreground" />
                    </div>
                  </div>

                  {/* Service Badge */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="px-3 py-1 rounded-full bg-background/80 text-xs font-medium">
                      {project.services[0]?.service.title}
                    </span>
                  </div>
                </div>

                <div className="mt-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-display font-semibold group-hover:text-primary">
                      {project.title}
                    </h3>
                    <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-primary" />
                  </div>
                  <p className="text-muted-foreground text-sm">
                    {project.client}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* ================= CTA ================= */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mt-16"
        >
          <Link to="/projects" className="btn-outline">
            View All Projects
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;
