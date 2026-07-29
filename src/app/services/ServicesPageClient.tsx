"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactCTA from "@/components/ContactCTA";
import { cachedFetch } from "@/lib/api-cache";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import CustomCursor from "@/components/CustomCursor";
import ScrollProgress from "@/components/ScrollProgress";
import SplitReveal from "@/components/SplitReveal";
import TextScramble from "@/components/TextScramble";

type Service = { id: string; slug: string; title: string; tagline: string; description: string; features: string[]; };

const ServicesPageClient = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    cachedFetch<Service[]>(`/api/services`, 5 * 60_000)
      .then((d) => { setServices(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <ScrollProgress />
      <CustomCursor />
      <Navbar />
      <main id="main-content" className="pt-32">

        {/* Hero */}
        <section className="container-wide mb-24">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-px bg-primary" />
              <TextScramble text="Our Services" className="label-small" triggerOnMount mountDelay={300} />
            </div>
            <SplitReveal
              text="What We Do"
              as="h1"
              className="text-display mb-6"
              style={{ fontSize: "clamp(3rem, 7vw, 7rem)", lineHeight: 1 }}
              delay={0.1}
            />
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35 }}
              className="text-muted-foreground text-lg max-w-xl leading-relaxed"
            >
              From concept to launch, we offer comprehensive digital solutions
              that transform businesses and create lasting impact.
            </motion.p>
          </motion.div>
        </section>

        {/* Services */}
        <section className="container-wide pb-32">
          {loading ? (
            <p className="text-muted-foreground text-sm">Loading services&hellip;</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px border border-border/40 bg-border/40">
              {services.map((service, index) => {
                return (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.08 }}
                    className="bg-background"
                  >
                    <Link
                      href={`/services/${service.slug}`}
                      className="block p-8 md:p-10 group hover:bg-card transition-colors duration-300"
                      data-cursor="Explore"
                    >
                      <div className="flex items-start justify-end mb-8">
                        <span className="text-muted-foreground/20 font-light" style={{ fontFamily: "var(--font-display)", fontSize: "3rem", lineHeight: 1 }}>
                          {String(index + 1).padStart(2, "0")}
                        </span>
                      </div>

                      <p className="label-small mb-3">{service.tagline}</p>
                      <h3 className="text-display group-hover:text-primary transition-colors mb-4" style={{ fontSize: "clamp(1.6rem, 2.5vw, 2.2rem)" }}>
                        {service.title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed mb-6">{service.description}</p>

                      <ul className="space-y-2 mb-8">
                        {service.features.slice(0, 3).map((f, i) => (
                          <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                            <div className="w-1 h-1 rounded-full bg-primary flex-none" />
                            {f}
                          </li>
                        ))}
                      </ul>

                      <div className="flex items-center gap-2 text-primary text-sm font-medium group-hover:gap-3 transition-all duration-200" style={{ fontFamily: "var(--font-body)" }}>
                        Explore
                        <ArrowRight className="w-4 h-4" aria-hidden="true" />
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          )}
        </section>
      </main>

      <ContactCTA />
      <Footer />
    </div>
  );
};

export default ServicesPageClient;
