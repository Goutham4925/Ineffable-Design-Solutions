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
  image?: string;
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

  /* ================= FETCH ================= */
  useEffect(() => {
    fetch(`${API_BASE}/api/services`)
      .then((res) => res.json())
      .then(setServices)
      .catch(console.error);
  }, []);

  /* ================= GSAP SCROLL ================= */
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
          const idx = Math.min(
            Math.floor(self.progress * totalCards),
            totalCards - 1
          );
          setActiveIndex(idx);
        },
      },
    });

    cardElements.forEach((card, i) => {
      if (i === 0) return;

      const start = (i - 1) / (totalCards - 1);
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
        start
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
        start + duration * 0.3
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
      {/* HEADER */}
      <div className="absolute top-0 left-0 right-0 z-20 pt-6 md:pt-8 container-wide">
        <p className="text-primary tracking-[0.3em] uppercase text-xs mb-1">
          What We Do
        </p>
        <h2 className="text-3xl md:text-4xl font-display font-bold">
          Our Services
        </h2>
      </div>

      {/* PANELS */}
      <div ref={cardsRef} className="absolute inset-0 pt-24">
        {services.map((service, index) => {
          const Icon = serviceIcons[service.slug] || Code;
          const gradient =
            serviceColors[service.slug] ||
            "from-primary/60 to-primary/30";

          return (
            <div
              key={service.id}
              className="service-panel absolute inset-0 flex items-center"
              style={{ zIndex: index + 1 }}
            >
              <div className="container-wide w-full">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                  {/* LEFT */}
                  <div className="space-y-6">
                    <span className="text-muted-foreground font-mono">
                      0{index + 1}
                    </span>

                    <div
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center`}
                    >
                      <Icon className="w-8 h-8" />
                    </div>

                    <div>
                      <p className="text-primary uppercase text-xs tracking-wide mb-2">
                        {service.tagline}
                      </p>
                      <h3 className="text-4xl font-display font-bold">
                        {service.title}
                      </h3>
                    </div>

                    <p className="text-muted-foreground max-w-xl">
                      {service.description}
                    </p>

                    <ul className="grid grid-cols-2 gap-3">
                      {service.features.map((f, i) => (
                        <li key={i} className="text-sm text-muted-foreground">
                          • {f}
                        </li>
                      ))}
                    </ul>

                    <Link
                      to={`/services/${service.slug}`}
                      className="inline-flex items-center gap-2 text-primary font-medium"
                    >
                      Learn More
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>

                  {/* RIGHT — IMAGE */}
                  <div className="relative hidden lg:block">
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-20 blur-3xl`}
                    />
                    <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-border bg-card">
                      {service.image ? (
                        <img
                          src={service.image}
                          alt={service.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Icon className="w-32 h-32 text-foreground/20" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* INDICATOR */}
      <div className="absolute right-6 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-2">
        {services.map((_, i) => (
          <span
            key={i}
            className={`w-2 h-2 rounded-full ${
              activeIndex === i
                ? "bg-primary scale-125"
                : "bg-border"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default ServicesSection;
