import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";
import { cachedFetch } from "@/lib/api-cache";

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
    cachedFetch<Service[]>(`${API_BASE}/api/services`, 5 * 60_000)
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
      {/* Panels */}
      <div ref={cardsRef} className="absolute inset-0">
        {services.map((service, index) => {
          const gradient = serviceColors[service.slug] || "from-primary/60 to-primary/30";

          return (
            <div
              key={service.id}
              className={`service-panel absolute inset-0 flex ${
                activeIndex === index ? "pointer-events-auto" : "pointer-events-none"
              }`}
              style={{ zIndex: index + 1 }}
            >
              {/* LEFT — content */}
              <div className="relative flex flex-col justify-center w-full lg:w-[48%] px-6 md:px-12 lg:px-20 py-24">
                {/* Watermark number */}
                <span
                  aria-hidden="true"
                  className="absolute bottom-4 left-4 select-none pointer-events-none text-foreground/[0.03] font-bold leading-none"
                  style={{ fontFamily: "var(--font-display)", fontSize: "clamp(8rem, 22vw, 20rem)" }}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>

                {/* Top meta */}
                <div className="flex items-center gap-3 mb-8 relative z-10">
                  <div className="w-6 h-px bg-primary" />
                  <span className="label-small">{service.tagline}</span>
                  <span className="ml-auto text-muted-foreground/40 font-mono text-xs">
                    {String(index + 1).padStart(2, "0")} / {String(services.length).padStart(2, "0")}
                  </span>
                </div>

                {/* Service title */}
                <h2
                  className="text-display mb-6 relative z-10"
                  style={{ fontSize: "clamp(2.4rem, 5vw, 4.8rem)", lineHeight: 1.05 }}
                >
                  {service.title}
                </h2>

                {/* Description */}
                <p className="text-muted-foreground leading-relaxed mb-8 max-w-md relative z-10 text-sm md:text-base">
                  {service.description}
                </p>

                {/* Feature chips */}
                <div className="flex flex-wrap gap-2 mb-10 relative z-10">
                  {service.features.map((f, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 border border-border/50 text-muted-foreground text-xs tracking-wide hover:border-primary/40 hover:text-foreground transition-colors duration-200"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      {f}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <Link
                  to={`/services/${service.slug}`}
                  className="relative z-10 group inline-flex items-center gap-3 text-sm font-medium"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  <span className="w-10 h-px bg-primary transition-all duration-300 group-hover:w-16" />
                  <span className="text-primary group-hover:tracking-wider transition-all duration-300">Explore Service</span>
                </Link>
              </div>

              {/* RIGHT — immersive panel (desktop only) */}
              <div className="hidden lg:flex flex-col flex-1 relative overflow-hidden">
                {/* Gradient backdrop */}
                <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-15`} />
                {/* Grid overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--foreground)/0.04)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--foreground)/0.04)_1px,transparent_1px)] bg-[size:48px_48px]" />
                {/* Vertical border */}
                <div className="absolute left-0 top-0 bottom-0 w-px bg-border/30" />

                {/* Service image or icon display */}
                {service.image ? (
                  <img
                    src={service.image}
                    alt={service.title}
                    className="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-luminosity"
                  />
                ) : null}

                {/* Service name — large italic watermark */}
                <div className="absolute inset-0 flex flex-col items-center justify-center px-12">
                  <p
                    className="text-display-italic text-foreground/8 text-center leading-tight select-none"
                    style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}
                    aria-hidden="true"
                  >
                    {service.title}
                  </p>
                </div>

                {/* Corner label */}
                <div className="absolute top-8 right-8 flex items-center gap-2">
                  <span className="label-small text-foreground/20">What We Do</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom progress bar */}
      <div className="absolute bottom-0 left-0 right-0 z-30 h-px bg-border/30">
        <div
          className="h-full bg-primary transition-all duration-500 ease-out"
          style={{ width: services.length > 1 ? `${(activeIndex / (services.length - 1)) * 100}%` : "100%" }}
        />
      </div>
    </section>
  );
};

export default ServicesSection;
