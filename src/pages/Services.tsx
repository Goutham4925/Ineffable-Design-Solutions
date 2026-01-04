import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Code,
  Globe,
  Palette,
  Sparkles,
  TrendingUp,
  Play,
  Box,
  Cpu,
} from "lucide-react";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

/* ================= ICON MAP ================= */
const serviceIcons: Record<string, React.ElementType> = {
  "software-development": Code,
  "web-app-development": Globe,
  "ui-ux-design": Palette,
  "branding-identity": Sparkles,
  "digital-marketing": TrendingUp,
  "motion-graphics": Play,
  "product-design": Box,
  "ai-automation": Cpu,
};

/* ================= COLOR MAP ================= */
const serviceColors: Record<string, string> = {
  "software-development": "from-cyan-500 to-blue-500",
  "web-app-development": "from-violet-500 to-purple-500",
  "ui-ux-design": "from-pink-500 to-rose-500",
  "branding-identity": "from-amber-500 to-orange-500",
  "digital-marketing": "from-green-500 to-emerald-500",
  "motion-graphics": "from-orange-500 to-red-500",
  "product-design": "from-blue-500 to-indigo-500",
  "ai-automation": "from-purple-500 to-violet-500",
};

type Service = {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  features: string[];
};

const ServicesPage = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [hoveredService, setHoveredService] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  /* ================= FETCH SERVICES ================= */
  useEffect(() => {
    fetch(`${API_BASE}/api/services`)
      .then((res) => res.json())
      .then((data) => {
        setServices(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load services", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-32">
        {/* ================= HERO ================= */}
        <section className="container-wide mb-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-primary font-medium tracking-[0.3em] uppercase text-xs mb-4">
              Our Services
            </p>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold leading-tight mb-8">
              What We Do
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl">
              From concept to launch, we offer comprehensive digital solutions
              that transform businesses and create lasting impact.
            </p>
          </motion.div>
        </section>

        {/* ================= SERVICES GRID ================= */}
        <section className="container-wide pb-32">
          {loading ? (
            <p className="text-muted-foreground">Loading services...</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {services.map((service, index) => {
                const Icon = serviceIcons[service.slug] || Code;
                const gradientClass =
                  serviceColors[service.slug] ||
                  "from-cyan-500 to-blue-500";

                return (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    onMouseEnter={() => setHoveredService(service.id)}
                    onMouseLeave={() => setHoveredService(null)}
                    className="group"
                  >
                    <Link
                      to={`/services/${service.slug}`}
                      className="block relative p-8 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-500 overflow-hidden"
                    >
                      {/* Background Gradient */}
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${gradientClass} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                      />

                      {/* Content */}
                      <div className="relative z-10">
                        {/* Header */}
                        <div className="flex items-start justify-between mb-6">
                          <div
                            className={`w-14 h-14 rounded-xl bg-gradient-to-br ${gradientClass} flex items-center justify-center`}
                          >
                            <Icon className="w-7 h-7 text-foreground" />
                          </div>
                          <span className="text-muted-foreground text-sm font-mono">
                            0{index + 1}
                          </span>
                        </div>

                        {/* Title & Tagline */}
                        <p className="text-primary text-sm font-medium tracking-wide mb-2">
                          {service.tagline}
                        </p>
                        <h3 className="text-2xl md:text-3xl font-display font-bold mb-4 group-hover:text-primary transition-colors">
                          {service.title}
                        </h3>

                        {/* Description */}
                        <p className="text-muted-foreground leading-relaxed mb-6">
                          {service.description}
                        </p>

                        {/* Features */}
                        <ul className="space-y-2 mb-6">
                          {service.features.slice(0, 3).map((feature, i) => (
                            <li
                              key={i}
                              className="flex items-center gap-2 text-sm text-muted-foreground"
                            >
                              <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                              {feature}
                            </li>
                          ))}
                        </ul>

                        {/* CTA */}
                        <div className="flex items-center gap-2 text-primary font-medium">
                          Learn More
                          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ServicesPage;
