"use client";

import { motion } from "framer-motion";
import { Check, MessageCircle } from "lucide-react";
import LandingForm from "@/campaigns/LandingForm";
import Logo from "@/components/Logo";
import CustomCursor from "@/components/CustomCursor";
import ScrollProgress from "@/components/ScrollProgress";
import { CampaignConfig } from "@/campaigns/types";

const PROCESS = [
  { step: "01", title: "Free Consultation", desc: "We understand your business & what the site needs to do." },
  { step: "02", title: "Design & Build", desc: "Custom design, built and reviewed with you — not a template." },
  { step: "03", title: "Launch", desc: "Domain, hosting & deployment handled. Live in 7–14 days." },
  { step: "04", title: "Support", desc: "1 month free support after launch for tweaks & fixes." },
];

interface Props {
  campaign: CampaignConfig;
}

const LandingPageClient = ({ campaign }: Props) => {
  const whatsappHref = `https://wa.me/919074029499?text=${encodeURIComponent(campaign.whatsappMessage)}`;

  return (
    <div className="min-h-screen bg-background">
      <ScrollProgress />
      <CustomCursor />

      {/* Minimal header — no nav, keeps focus on the form */}
      <header className="container-wide py-6">
        <Logo />
      </header>

      {/* Hero */}
      <section className="container-wide pb-16 md:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-14 items-start">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-px bg-primary" />
              <span className="label-small">{campaign.eyebrow}</span>
            </div>

            <h1 className="text-display mb-6" style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", lineHeight: 1.02 }}>
              {campaign.headline}
              <br />
              <span className="text-display-italic gradient-text">{campaign.headlineAccent}</span>
            </h1>

            <p className="text-muted-foreground text-lg max-w-xl leading-relaxed mb-8">
              {campaign.subheadline}
            </p>

            <div className="flex items-baseline gap-3 mb-8">
              <span className="text-display" style={{ fontSize: "2.75rem" }}>{campaign.price}</span>
              <span className="text-sm text-muted-foreground">{campaign.priceNote}</span>
            </div>

            <div className="flex flex-wrap gap-3 mb-10">
              {campaign.trustChips.map((chip) => (
                <span
                  key={chip}
                  className="inline-flex items-center gap-2 px-4 py-2 border border-border/60 rounded-full text-xs text-muted-foreground"
                >
                  <Check className="w-3.5 h-3.5 text-primary" aria-hidden="true" />
                  {chip}
                </span>
              ))}
            </div>

            <ul className="space-y-3 hidden md:block">
              {campaign.bullets.map((b) => (
                <li key={b} className="flex items-start gap-3 text-sm text-foreground/90">
                  <Check className="w-4 h-4 text-primary mt-0.5 flex-none" aria-hidden="true" />
                  {b}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Form card */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            id="lead-form"
            className="border border-border/60 rounded-xl p-6 md:p-8 bg-card/40 backdrop-blur-sm"
          >
            <p className="text-display mb-1" style={{ fontSize: "1.5rem" }}>Get a Free Quote</p>
            <p className="text-xs text-muted-foreground mb-6">Callback within 24 hours · No obligation</p>
            <LandingForm campaign={campaign} />
          </motion.div>
        </div>
      </section>

      {/* Process */}
      <section className="container-wide py-16 md:py-24 border-t border-border/60">
        <h2 className="text-display mb-12" style={{ fontSize: "2rem" }}>How it works</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {PROCESS.map((p) => (
            <div key={p.step}>
              <span className="label-small block mb-3">{p.step}</span>
              <h3 className="text-lg font-medium mb-2">{p.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Closing CTA */}
      <section className="container-wide py-16 md:py-24 border-t border-border/60">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <h2 className="text-display mb-3" style={{ fontSize: "2.25rem" }}>Ready to get started?</h2>
            <p className="text-muted-foreground">Fill the form above or message us directly on WhatsApp.</p>
          </div>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline"
          >
            <MessageCircle className="w-4 h-4" aria-hidden="true" />
            Chat on WhatsApp
          </a>
        </div>
      </section>

      <footer className="container-wide py-8 border-t border-border/60 text-xs text-muted-foreground">
        © {new Date().getFullYear()} Ineffable Design Solutions
      </footer>

      {/* Sticky mobile WhatsApp bar */}
      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-0 left-0 right-0 z-40 flex md:hidden items-center justify-center gap-2 py-4 bg-primary text-primary-foreground text-sm font-medium tracking-wide uppercase"
      >
        <MessageCircle className="w-4 h-4" aria-hidden="true" />
        Chat on WhatsApp
      </a>

      {/* Floating desktop WhatsApp button */}
      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="hidden md:flex fixed bottom-8 right-8 z-40 w-14 h-14 rounded-full bg-primary text-primary-foreground items-center justify-center shadow-lg hover:scale-105 transition-transform"
      >
        <MessageCircle className="w-6 h-6" aria-hidden="true" />
      </a>
    </div>
  );
};

export default LandingPageClient;
