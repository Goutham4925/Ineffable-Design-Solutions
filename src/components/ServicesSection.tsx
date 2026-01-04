import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
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
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

const API_BASE =
  import.meta.env.VITE_API_URL || "http://localhost:5000";

/* ================= TYPES ================= */
type Service = {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  features: string[];
};

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

/* ================= GRADIENT MAP ================= */
const serviceColors: Record<string, string> = {
  "software-development": "from-primary/60 to-primary/30",
  "web-app-development": "from-violet-500/60 to-purple-500/30",
  "ui-ux-design": "from-pink-500/60 to-rose-500/30",
  "branding-identity": "from-amber-500/60 to-orange-500/30",
  "digital-marketing": "from-green-500/60 to-emerald-500/30",
  "motion-graphics": "from-orange-500/60 to-red-500/30",
  "product-design": "from-blue-500/60 to-indigo-500/30",
  "ai-automation": "from-purple-500/60 to-violet-500/30",
};

const ServicesSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  const [services, setServices] = useState<Service[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  /* ================= FETCH SERVICES ================= */
  useEffect(() => {
    fetch(`${API_BASE}/api/services`)
      .then((res) => res.json())
      .then(setServices)
      .catch(console.error);
  }, []);

  /* ================= GSAP SCROLL LOGIC ================= */
  useEffect(() => {
    if (!services.length) return;

    const container = containerRef.current;
    const cards = cardsRef.current;
    if (!container || !cards) return;

    const cardElements = cards.querySelectorAll(".service-panel");
    const totalCards = cardElements.length;

    gsap.set(cardElements, { opacity: 0, yPercent: 100 });
    gsap.set(cardElements[0], { opacity: 1, yPercent: 0 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: () => `+=${totalCards * 100}%`,
        pin: true,
        scrub: 0.5,
        anticipatePin: 1,
        onUpdate: (self) => {
          const newIndex = Math.min(
            Math.floor(self.progress * totalCards),
            totalCards - 1
          );
          setActiveIndex(newIndex);
        },
      },
    });

    cardElements.forEach((card, i) => {
      if (i === 0) return;

      const startTime = (i - 1) / (totalCards - 1);
      const duration = 1 / (totalCards - 1);

      tl.to(
        cardElements[i - 1],
        {
          opacity: 0,
          scale: 0.85,
          yPercent: -10,
          duration: duration * 0.5,
          ease: "power2.inOut",
        },
        startTime
      );

      tl.fromTo(
        card,
        { opacity: 0, yPercent: 50 },
        {
          opacity: 1,
          yPercent: 0,
          duration: duration * 0.5,
          ease: "power2.out",
        },
        startTime + duration * 0.3
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [services]);

  /* ================= RENDER ================= */
  return (
    <section
      ref={containerRef}
      className="relative h-screen overflow-hidden bg-background"
    >
      {/* ================= HEADER ================= */}
      <div className="absolute top-0 left-0 right-0 z-20 pt-6 md:pt-8 pb-4 container-wide">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-primary font-medium tracking-[0.3em] uppercase text-[10px] md:text-xs mb-1 md:mb-2">
            What We Do
          </p>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-display font-bold">
            Our Services
          </h2>
        </motion.div>
      </div>

      {/* ================= SERVICE PANELS ================= */}
      <div ref={cardsRef} className="absolute inset-0 pt-20 md:pt-28">
        {services.map((service, index) => {
          const Icon = serviceIcons[service.slug] || Code;
          const gradient =
            serviceColors[service.slug] ||
            "from-primary/60 to-primary/30";

          return (
            <div
              key={service.id}
              className="service-panel absolute inset-0 flex items-center bg-background"
              style={{ zIndex: index + 1 }}
            >
              <div className="container-wide w-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-12 lg:gap-16 items-center">
                  {/* ===== LEFT CONTENT ===== */}
                  <div className="space-y-3 md:space-y-6">
                    <div className="flex items-center gap-3 md:gap-4">
                      <span className="text-muted-foreground text-xs md:text-sm font-mono">
                        0{index + 1}
                      </span>
                      <div className="w-8 md:w-12 h-px bg-border" />
                    </div>

                    <div
                      className={`w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center`}
                    >
                      <Icon className="w-6 h-6 md:w-8 md:h-8 text-foreground" />
                    </div>

                    <div>
                      <p className="text-primary text-xs md:text-sm font-medium tracking-wide mb-1 md:mb-2">
                        {service.tagline}
                      </p>
                      <h3 className="text-2xl sm:text-3xl md:text-4xl xl:text-5xl 2xl:text-6xl font-display font-bold leading-tight">
                        {service.title}
                      </h3>
                    </div>

                    <p className="text-muted-foreground text-sm md:text-lg leading-relaxed max-w-xl">
                      {service.description}
                    </p>

                    <ul className="hidden sm:grid grid-cols-2 gap-2 md:gap-3">
                      {service.features.map((feature, i) => (
                        <li
                          key={i}
                          className="flex items-center gap-2 text-xs md:text-sm"
                        >
                          <div className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-primary" />
                          <span className="text-muted-foreground">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <Link
                      to={`/services/${service.slug}`}
                      className="group inline-flex items-center gap-2 text-primary font-medium"
                    >
                      Learn More
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>

                  {/* ===== RIGHT VISUAL ===== */}
                  <div className="relative hidden lg:block">
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-20 blur-3xl scale-110`}
                    />
                    <div className="relative aspect-[4/3] rounded-3xl bg-card border border-border overflow-hidden">
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-10`}
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Icon className="w-24 xl:w-32 h-24 xl:h-32 text-foreground/20" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ================= INDICATOR ================= */}
      <div className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-2 md:gap-3">
        {services.map((_, i) => (
          <span
            key={i}
            className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full transition-all ${
              activeIndex === i
                ? "bg-primary scale-125"
                : "bg-border"
            }`}
          />
        ))}
      </div>

      {/* ================= COUNTER ================= */}
      <div className="absolute bottom-4 md:bottom-8 left-4 md:left-8 z-20">
        <div className="flex items-center gap-2 md:gap-3 text-xs md:text-sm text-muted-foreground">
          <span className="text-primary font-mono text-base md:text-lg">
            0{activeIndex + 1}
          </span>
          <div className="w-6 md:w-8 h-px bg-border" />
          <span className="font-mono">0{services.length}</span>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
