"use client";

import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { CampaignConfig } from "./types";

const BUDGET_OPTIONS = [
  "Not sure yet",
  "Basic site (1–5 pages)",
  "Business site with CMS",
  "E-commerce / booking",
  "Custom web app",
];

interface Props {
  campaign: CampaignConfig;
}

const LandingForm = ({ campaign }: Props) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({ name: "", phone: "", email: "", budget: BUDGET_OPTIONS[0], message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch(`/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email || "not-provided@lead.form",
          phone: formData.phone,
          subject: `${campaign.formSubject} — ${formData.budget}`,
          message: formData.message || "(no message — landing page lead)",
        }),
      });
      if (!res.ok) throw new Error();

      // Google Ads / GA4 conversion — fires only if gtag is loaded (see index.html)
      if (typeof window !== "undefined" && (window as any).gtag) {
        (window as any).gtag("event", "generate_lead", { campaign: campaign.slug });
      }
      // Meta Pixel — fires only if fbq is loaded
      if (typeof window !== "undefined" && (window as any).fbq) {
        (window as any).fbq("track", "Lead", { content_name: campaign.slug });
      }

      setSubmitted(true);
      toast({ title: "Got it!", description: "We'll call/WhatsApp you within 24 hours." });
    } catch {
      toast({ title: "Something went wrong", description: "Please try again or WhatsApp us directly.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass =
    "w-full px-4 py-3 bg-background/60 border border-border/60 rounded-md focus:border-primary focus-visible:ring-0 outline-none text-foreground placeholder:text-muted-foreground/40 transition-colors duration-200 text-sm";

  if (submitted) {
    return (
      <div className="p-8 text-center border border-primary/30 bg-primary/5 rounded-lg">
        <p className="text-display mb-2" style={{ fontSize: "1.5rem" }}>Thanks, {formData.name.split(" ")[0]}!</p>
        <p className="text-sm text-muted-foreground">We've received your enquiry and will reach out within 24 hours.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <div>
        <label htmlFor="name" className="label-small block mb-2">Name *</label>
        <input
          type="text" id="name" name="name" value={formData.name}
          onChange={handleChange} required autoComplete="name"
          className={inputClass} placeholder="Your name"
        />
      </div>
      <div>
        <label htmlFor="phone" className="label-small block mb-2">Phone / WhatsApp *</label>
        <input
          type="tel" id="phone" name="phone" value={formData.phone}
          onChange={handleChange} required autoComplete="tel"
          className={inputClass} placeholder="+91 98765 43210"
        />
      </div>
      <div>
        <label htmlFor="email" className="label-small block mb-2">Email</label>
        <input
          type="email" id="email" name="email" value={formData.email}
          onChange={handleChange} autoComplete="email" spellCheck={false}
          className={inputClass} placeholder="you@business.com"
        />
      </div>
      <div>
        <label htmlFor="budget" className="label-small block mb-2">What do you need?</label>
        <select
          id="budget" name="budget" value={formData.budget}
          onChange={handleChange}
          className={`${inputClass} cursor-pointer`}
        >
          {BUDGET_OPTIONS.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
        </select>
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? "Sending…" : "Get My Free Quote"}
      </button>
      <p className="text-xs text-muted-foreground text-center">No spam. We reply within 24 hours.</p>
    </form>
  );
};

export default LandingForm;
