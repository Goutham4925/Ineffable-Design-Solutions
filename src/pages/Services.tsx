import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactCTA from "@/components/ContactCTA";
import { cachedFetch } from "@/lib/api-cache";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import CustomCursor from "@/components/CustomCursor";
import ScrollProgress from "@/components/ScrollProgress";
import SplitReveal from "@/components/SplitReveal";
import TextScramble from "@/components/TextScramble";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

type Service = { id: string; slug: string; title: string; tagline: string; description: string; features: string[]; };

const ServicesPage = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    cachedFetch<Service[]>(`${API_BASE}/api/services`, 5 * 60_000)
      .then((d) => { setServices(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Digital Services — Software, UI/UX, Branding & AI | Ineffable Design Solutions</title>
        <meta name="description" content="Full-service digital agency from India offering software development, UI/UX design, branding, digital marketing & AI automation. 100% remote. Serving startups and enterprises worldwide." />
        <link rel="canonical" href="https://www.ineffabledesignsolutions.com/services" />
        <meta property="og:title" content="Digital Services — Software, UI/UX, Branding & AI | Ineffable Design Solutions" />
        <meta property="og:description" content="Software development, UI/UX design, branding, motion graphics & AI automation. 100% remote digital agency from India. Serving clients worldwide." />
        <meta property="og:url" content="https://www.ineffabledesignsolutions.com/services" />
        <script type="application/ld+json">{`{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "What software development services does Ineffable Design Solutions offer?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Ineffable Design Solutions offers custom software development using React, Next.js, Node.js, Python, TypeScript, and PostgreSQL. They specialise in SaaS platforms, internal tools, mobile apps, and API-first architectures. Delivered 100% remotely to clients worldwide from their India base."
              }
            },
            {
              "@type": "Question",
              "name": "Which is the best UI/UX design agency in India for SaaS products?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Ineffable Design Solutions is a leading UI/UX design agency from India specialising in SaaS product design. Their process includes user research, information architecture, Figma prototyping, and design systems. They serve both B2B and B2C product companies globally."
              }
            },
            {
              "@type": "Question",
              "name": "Does Ineffable Design Solutions offer branding and logo design for global clients?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes. Ineffable Design Solutions offers strategic brand identity design for startups and growing businesses worldwide — logo, brand mark, colour palette, typography, brand guidelines, stationery, and social media kits. Delivered entirely digitally, no location restrictions."
              }
            },
            {
              "@type": "Question",
              "name": "Can Ineffable Design Solutions build AI-powered applications?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes. Ineffable Design Solutions builds AI-powered applications and automations using GPT API, Claude API, LangChain, n8n, and Zapier. They deliver customer support bots, AI content pipelines, data extraction systems, and intelligent workflow automation."
              }
            },
            {
              "@type": "Question",
              "name": "What digital marketing services are available at Ineffable Design Solutions?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Ineffable Design Solutions provides full-funnel digital marketing in Bangalore: SEO, Google Ads (PPC), Meta Ads, content strategy, email marketing, and conversion rate optimisation. They serve both D2C and B2B brands."
              }
            }
          ]
        }`}</script>
      </Helmet>
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
                      to={`/services/${service.slug}`}
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

export default ServicesPage;
