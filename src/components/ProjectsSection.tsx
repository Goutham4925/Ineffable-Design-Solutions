import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { cachedFetch } from "@/lib/api-cache";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

type Service = { id: string; title: string; };
type Project = {
  id: string; slug: string; title: string; client: string;
  featured: boolean; services: { service: Service }[];
};

const colors = [
  "from-cyan-500/40 to-blue-500/20",
  "from-violet-500/40 to-purple-500/20",
  "from-pink-500/40 to-rose-500/20",
  "from-amber-500/40 to-orange-500/20",
  "from-green-500/40 to-emerald-500/20",
  "from-blue-500/40 to-indigo-500/20",
];

const ProjectsSection = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [activeService, setActiveService] = useState("All");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    Promise.all([
      cachedFetch<Project[]>(`${API_BASE}/api/blogs`),
      cachedFetch<Service[]>(`${API_BASE}/api/services`),
    ]).then(([p, s]) => {
      setProjects(p.filter((x: Project) => x.featured));
      setServices(s);
    });
  }, []);

  const filtered = activeService === "All"
    ? projects
    : projects.filter((p) => p.services.some((s) => s.service.title === activeService));

  return (
    <section className="section-padding overflow-hidden">
      <div className="container-wide">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-px bg-primary" />
              <span className="label-small">Featured Work</span>
            </div>
            <h2 className="text-display" style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}>
              Our Projects
            </h2>
          </motion.div>

          {/* Filter pills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="flex flex-wrap gap-2"
          >
            {["All", ...services.slice(0, 5).map((s) => s.title)].map((label) => (
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
          </motion.div>
        </div>

        {/* Desktop horizontal scroll */}
        <div className="hidden md:block">
          <div
            ref={scrollRef}
            data-cursor="Drag"
            className="h-scroll-container gap-5 cursor-grab active:cursor-grabbing"
            onMouseDown={(e) => {
              const el = scrollRef.current;
              if (!el) return;
              const startX = e.pageX - el.offsetLeft;
              const scrollLeft = el.scrollLeft;
              const onMove = (ev: MouseEvent) => {
                const x = ev.pageX - el.offsetLeft;
                el.scrollLeft = scrollLeft - (x - startX);
              };
              const onUp = () => {
                document.removeEventListener("mousemove", onMove);
                document.removeEventListener("mouseup", onUp);
              };
              document.addEventListener("mousemove", onMove);
              document.addEventListener("mouseup", onUp);
            }}
          >
            {filtered.length === 0 ? (
              <p className="text-muted-foreground text-sm py-8">No projects match this filter.</p>
            ) : filtered.map((project, index) => (
              <div
                key={project.id}
                className="h-scroll-item"
                style={{ width: "min(380px, 80vw)" }}
              >
                <Link to={`/blogs/${project.slug}`} className="block group" data-cursor="View">
                  <div className="relative aspect-[3/4] overflow-hidden bg-card border border-border/60 group-hover:border-primary/30 transition-colors duration-300">
                    <div className={`absolute inset-0 bg-gradient-to-br ${colors[index % colors.length]}`} />
                    <div className="absolute inset-0 bg-background/0 group-hover:bg-background/10 transition-colors duration-500" />
                    <div className="absolute inset-0 flex items-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center ml-auto">
                        <ArrowUpRight className="w-4 h-4 text-primary-foreground" aria-hidden="true" />
                      </div>
                    </div>
                    {project.services[0] && (
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-background/80 text-xs font-medium" style={{ fontFamily: "var(--font-body)" }}>
                          {project.services[0].service.title}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="pt-5">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="text-display group-hover:text-primary transition-colors" style={{ fontSize: "1.4rem" }}>
                        {project.title}
                      </h3>
                      <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" aria-hidden="true" />
                    </div>
                    <p className="text-muted-foreground text-sm">{project.client}</p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile grid */}
        <div className="md:hidden grid grid-cols-1 gap-8">
          {filtered.length === 0 ? (
            <p className="text-muted-foreground text-sm py-4">No projects match this filter.</p>
          ) : filtered.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Link to={`/blogs/${project.slug}`} className="block group">
                <div className="relative aspect-[4/3] overflow-hidden bg-card border border-border/60">
                  <div className={`absolute inset-0 bg-gradient-to-br ${colors[index % colors.length]}`} />
                  {project.services[0] && (
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-background/80 text-xs">{project.services[0].service.title}</span>
                    </div>
                  )}
                </div>
                <div className="pt-4">
                  <h3 className="text-display mb-1" style={{ fontSize: "1.4rem" }}>{project.title}</h3>
                  <p className="text-muted-foreground text-sm">{project.client}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-14"
        >
          <Link to="/blogs" className="btn-outline">
            View All Projects
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;
