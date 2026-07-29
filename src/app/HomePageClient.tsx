"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import AboutSection from "@/components/AboutSection";
import ProjectsSection from "@/components/ProjectsSection";
import ProcessSection from "@/components/ProcessSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ContactCTA from "@/components/ContactCTA";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import ScrollProgress from "@/components/ScrollProgress";
import MarqueeBand from "@/components/MarqueeBand";
import SplitReveal from "@/components/SplitReveal";
import TextScramble from "@/components/TextScramble";

const faqs = [
  {
    q: "What services does Ineffable Design Solutions offer?",
    a: "Software Development, Web App Development, UI/UX Design, Branding & Identity, Digital Marketing, Motion Graphics, Product Design, and AI Automation — all under one roof. From brand strategy and Figma prototypes to production-ready React + Node.js apps and LLM-powered automation workflows.",
  },
  {
    q: "Do you work with clients outside India?",
    a: "Yes — clients in the US, UK, Middle East, and globally. Ineffable Design Solutions is 100% remote-capable with no geographic restrictions. Teams in Bangalore and Kerala work across time zones with constant follow-up communication throughout every project.",
  },
  {
    q: "Is Ineffable Design Solutions a good agency for startups?",
    a: "Yes. Ineffable specialises in startups — MVP development, brand identity, and product design. Boutique size means founders work directly with senior team members, not junior staff. Fast kick-off, direct communication, no corporate overhead.",
  },
  {
    q: "Can you build AI-powered applications?",
    a: "Yes. The team builds AI-powered automation systems using GPT API, Claude API, LangChain, n8n, and Zapier — customer support bots, content pipelines, data extraction workflows, and intelligent internal tools for businesses worldwide.",
  },
  {
    q: "Why hire an Indian digital agency vs a US or UK agency?",
    a: "India-based agencies like Ineffable Design Solutions deliver equivalent or superior quality at 40–70% lower cost than US/UK/EU agencies. Combined with senior-only execution, end-to-end capability, and round-the-clock availability, it's the most cost-effective choice for international clients.",
  },
  {
    q: "How do I start a project?",
    a: "Email enquiry@ineffabledesignsolutions.com, WhatsApp +91 9074029499, or use the contact form. Response within 24 hours. Project kick-off within one week. No in-person meeting required — everything happens online.",
  },
];

const FAQSection = () => {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section className="border-t border-border/40" aria-label="Frequently Asked Questions">
      <div className="container-wide py-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-px bg-primary" />
            <TextScramble text="FAQ" className="label-small" triggerOnMount={false} />
          </div>
          <SplitReveal
            text="Common Questions"
            as="h2"
            className="text-display"
            style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
            delay={0.1}
          />
        </motion.div>

        <div className="max-w-3xl">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className="border-b border-border/40 last:border-b-0"
            >
              <button
                className="w-full flex items-start justify-between gap-6 py-6 text-left group"
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
              >
                <span className="text-base font-medium leading-snug group-hover:text-primary transition-colors duration-200">
                  {faq.q}
                </span>
                <span className="flex-none mt-0.5 text-muted-foreground group-hover:text-primary transition-colors duration-200">
                  {open === i ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </span>
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    key="answer"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="pb-6 text-muted-foreground text-sm leading-relaxed">{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const HomePageClient = () => {
  return (
    <div className="min-h-screen bg-background">
      <ScrollProgress />
      <CustomCursor />
      <Navbar />
      <main id="main-content">
        <HeroSection />
        <MarqueeBand />
        <ServicesSection />
        <AboutSection />
        {/* <ProjectsSection /> */}
        <ProcessSection />
        <TestimonialsSection />
        <FAQSection />
        <ContactCTA />
      </main>
      <Footer />
    </div>
  );
};

export default HomePageClient;
