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

/* ================= TYPES ================= */
type Service = {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  features: string[];
  image?: string;
};

const ServiceDetail = () => {
  const { slug } = useParams();
  const [service, setService] = useState<Service | null>(null);
  const [allServices, setAllServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  /* ================= FETCH ================= */
  useEffect(() => {
    if (!slug) return;

    Promise.all([
      fetch(`${API_BASE}/api/services/${slug}`).then((r) =>
        r.ok ? r.json() : null
      ),
      fetch(`${API_BASE}/api/services`).then((r) => r.json()),
    ])
      .then(([serviceData, servicesData]) => {
        setService(serviceData);
        setAllServices(servicesData || []);
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
          Loading service…
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
        <main className="pt-32 pb-20 text-center">
          <h1 className="text-4xl font-display font-bold mb-4">
            Service Not Found
          </h1>
          <Button asChild>
            <Link to="/services">View All Services</Link>
          </Button>
        </main>
        <Footer />
      </div>
    );
  }

  /* ================= PREV / NEXT ================= */
  const currentIndex = allServices.findIndex(
    (s) => s.slug === service.slug
  );
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
          <Link
            to="/services"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Services
          </Link>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* LEFT */}
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

              <p className="text-primary uppercase tracking-[0.3em] text-xs mb-4">
                {service.tagline}
              </p>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
                {service.title}
              </h1>

              <p className="text-xl text-muted-foreground mb-8">
                {service.description}
              </p>

              <Button size="lg" asChild>
                <Link to="/contact">
                  Start a Project
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </motion.div>

            {/* RIGHT — IMAGE */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              {/* Glow */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${gradientClass} opacity-20 blur-3xl rounded-3xl`}
              />

              <div className="relative aspect-square rounded-3xl overflow-hidden border border-border bg-card">
                {service.image ? (
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Icon className="w-32 h-32 text-muted-foreground/20" />
                  </div>
                )}
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
                transition={{ delay: index * 0.1 }}
                className="flex gap-4 p-6 rounded-xl bg-card border border-border"
              >
                <div
                  className={`w-10 h-10 rounded-lg bg-gradient-to-br ${gradientClass} flex items-center justify-center`}
                >
                  <Check className="w-5 h-5 text-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">{feature}</h3>
                  <p className="text-sm text-muted-foreground">
                    Professional {feature.toLowerCase()} tailored to your needs.
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ================= NAV ================= */}
        <section className="container-wide pb-20">
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to={`/services/${prevService.slug}`}
              className="flex-1 p-6 rounded-xl bg-card border border-border hover:border-primary/50"
            >
              <p className="text-xs text-muted-foreground mb-1">
                Previous
              </p>
              <p className="font-semibold">{prevService.title}</p>
            </Link>

            <Link
              to={`/services/${nextService.slug}`}
              className="flex-1 p-6 rounded-xl bg-card border border-border hover:border-primary/50 text-right"
            >
              <p className="text-xs text-muted-foreground mb-1">
                Next
              </p>
              <p className="font-semibold">{nextService.title}</p>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ServiceDetail;
