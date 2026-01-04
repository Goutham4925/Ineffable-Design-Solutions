import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  ArrowLeft,
  ArrowRight,
  Code,
  Globe,
  Palette,
  Sparkles,
  TrendingUp,
  Play,
  Box,
  Cpu,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";

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

const ServiceDetail = () => {
  const { slug } = useParams();
  const [service, setService] = useState<Service | null>(null);
  const [allServices, setAllServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  /* ================= FETCH DATA ================= */
  useEffect(() => {
    if (!slug) return;

    Promise.all([
      fetch(`${API_BASE}/api/services/${slug}`).then((r) => r.ok ? r.json() : null),
      fetch(`${API_BASE}/api/services`).then((r) => r.json()),
    ])
      .then(([serviceData, servicesData]) => {
        setService(serviceData);
        setAllServices(servicesData);
        setLoading(false);
      })
      .catch(() => {
        setService(null);
        setLoading(false);
      });
  }, [slug]);

  /* ================= LOADING ================= */
  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-32 text-center text-muted-foreground">
          Loading service...
        </main>
        <Footer />
      </div>
    );
  }

  /* ================= NOT FOUND ================= */
  if (!service) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-32 pb-20">
          <div className="container-wide text-center">
            <h1 className="text-4xl font-display font-bold mb-4">
              Service Not Found
            </h1>
            <p className="text-muted-foreground mb-8">
              The service you're looking for doesn't exist.
            </p>
            <Button asChild>
              <Link to="/services">View All Services</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  /* ================= PREV / NEXT ================= */
  const currentIndex = allServices.findIndex((s) => s.slug === service.slug);
  const prevService =
    allServices[(currentIndex - 1 + allServices.length) % allServices.length];
  const nextService =
    allServices[(currentIndex + 1) % allServices.length];

  const Icon = serviceIcons[service.slug] || Code;
  const gradientClass =
    serviceColors[service.slug] || "from-cyan-500 to-blue-500";

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-32">
        {/* ================= HERO ================= */}
        <section className="container-wide mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Services
            </Link>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div
                className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${gradientClass} flex items-center justify-center mb-6`}
              >
                <Icon className="w-8 h-8 text-foreground" />
              </div>

              <p className="text-primary font-medium tracking-[0.3em] uppercase text-xs mb-4">
                {service.tagline}
              </p>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight mb-6">
                {service.title}
              </h1>

              <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                {service.description}
              </p>

              <Button size="lg" asChild>
                <Link to="/contact">
                  Start a Project
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${gradientClass} opacity-20 rounded-3xl blur-3xl`}
              />
              <div className="relative aspect-square rounded-3xl bg-card border border-border flex items-center justify-center">
                <Icon className="w-32 h-32 text-muted-foreground/20" />
              </div>
            </motion.div>
          </div>
        </section>

        {/* ================= FEATURES ================= */}
        <section className="container-wide mb-20">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-12">
            What's Included
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {service.features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-start gap-4 p-6 rounded-xl bg-card border border-border"
              >
                <div
                  className={`w-10 h-10 rounded-lg bg-gradient-to-br ${gradientClass} flex items-center justify-center`}
                >
                  <Check className="w-5 h-5 text-foreground" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">{feature}</h3>
                  <p className="text-muted-foreground text-sm">
                    Professional {feature.toLowerCase()} tailored to your business needs.
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ================= NAVIGATION ================= */}
        <section className="container-wide pb-20">
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <Link
              to={`/services/${prevService.slug}`}
              className="group flex items-center gap-4 p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-all flex-1"
            >
              <ArrowLeft className="w-5 h-5 text-muted-foreground group-hover:text-primary" />
              <div>
                <p className="text-xs text-muted-foreground uppercase mb-1">
                  Previous
                </p>
                <p className="font-semibold group-hover:text-primary">
                  {prevService.title}
                </p>
              </div>
            </Link>

            <Link
              to={`/services/${nextService.slug}`}
              className="group flex items-center justify-end gap-4 p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-all flex-1 text-right"
            >
              <div>
                <p className="text-xs text-muted-foreground uppercase mb-1">
                  Next
                </p>
                <p className="font-semibold group-hover:text-primary">
                  {nextService.title}
                </p>
              </div>
              <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary" />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ServiceDetail;
