"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, MapPin } from "lucide-react";
import CustomCursor from "@/components/CustomCursor";
import ScrollProgress from "@/components/ScrollProgress";
import SplitReveal from "@/components/SplitReveal";
import TextScramble from "@/components/TextScramble";

const ContactPageClient = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

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
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error();
      toast({ title: "Message Sent!", description: "We'll get back to you soon." });
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch {
      toast({ title: "Error", description: "Failed to send message. Please try again.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass = "w-full px-0 py-3 bg-transparent border-0 border-b border-border/60 focus:border-primary focus-visible:ring-0 outline-none text-foreground placeholder:text-muted-foreground/40 transition-colors duration-200 text-sm";
  const selectClass = `${inputClass} contact-select`;

  return (
    <div className="min-h-screen bg-background">
      <ScrollProgress />
      <CustomCursor />
      <Navbar />
      <main id="main-content" className="pt-32">

        {/* Hero */}
        <section className="container-wide mb-20">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-px bg-primary" />
              <TextScramble text="Get In Touch" className="label-small" triggerOnMount mountDelay={300} />
            </div>
            <h1 className="text-display mb-6" style={{ fontSize: "clamp(3rem, 7vw, 7rem)", lineHeight: 1 }}>
              <SplitReveal text="Let's create" as="span" delay={0.1} />
              {" "}
              <SplitReveal
                text="something great"
                as="span"
                className="text-display-italic gradient-text"
                delay={0.28}
              />
            </h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45 }}
              className="text-muted-foreground text-lg max-w-xl leading-relaxed"
            >
              Have a project in mind? We&rsquo;d love to hear about it. Drop us a line and let&rsquo;s start the conversation.
            </motion.p>
          </motion.div>
        </section>

        {/* Content */}
        <section className="container-wide pb-32">
          <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-20">

            {/* Form */}
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
              <form onSubmit={handleSubmit} className="space-y-8" noValidate>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label htmlFor="name" className="label-small block mb-3">Name *</label>
                    <input
                      type="text" id="name" name="name" value={formData.name}
                      onChange={handleChange} required
                      autoComplete="name"
                      className={inputClass}
                      placeholder="Riya Sharma…"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="label-small block mb-3">Email *</label>
                    <input
                      type="email" id="email" name="email" value={formData.email}
                      onChange={handleChange} required
                      autoComplete="email"
                      spellCheck={false}
                      className={inputClass}
                      placeholder="riya@studio.io…"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label htmlFor="phone" className="label-small block mb-3">Phone</label>
                    <input
                      type="tel" id="phone" name="phone" value={formData.phone}
                      onChange={handleChange}
                      autoComplete="tel"
                      className={inputClass}
                      placeholder="+91 98765 43210…"
                    />
                  </div>
                  <div>
                    <label htmlFor="subject" className="label-small block mb-3">Subject *</label>
                    <select
                      id="subject" name="subject" value={formData.subject}
                      onChange={handleChange} required
                      className={`${selectClass} cursor-pointer`}
                    >
                      <option value="">Select a subject&hellip;</option>
                      <option value="project">New Project</option>
                      <option value="partnership">Partnership</option>
                      <option value="careers">Careers</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="label-small block mb-3">Message *</label>
                  <textarea
                    id="message" name="message" value={formData.message}
                    onChange={handleChange} required rows={5}
                    className={`${inputClass} resize-none`}
                    placeholder="We're building a SaaS platform for architects…"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Sending…" : "Send Message"}
                </button>
              </form>
            </motion.div>

            {/* Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="space-y-10"
            >
              <div>
                <h2 className="text-display mb-8" style={{ fontSize: "2rem" }}>Contact Information</h2>
                <div className="space-y-8">
                  {[
                    { Icon: Mail, label: "Email", value: "enquiry@ineffabledesignsolutions.com", href: "mailto:enquiry@ineffabledesignsolutions.com" },
                    { Icon: Phone, label: "Phone", value: "+91 9074029499", href: "tel:+919074029499" },
                    { Icon: MapPin, label: "Location", value: "Indira Nagar, Bangalore, Karnataka, India", href: undefined },
                  ].map(({ Icon, label, value, href }) => (
                    <div key={label} className="flex items-start gap-5">
                      <div className="w-10 h-10 border border-border/60 flex items-center justify-center flex-none">
                        <Icon className="w-4 h-4 text-primary" aria-hidden="true" />
                      </div>
                      <div>
                        <p className="label-small mb-1">{label}</p>
                        {href ? (
                          <a href={href} className="text-sm text-foreground hover:text-primary transition-colors">{value}</a>
                        ) : (
                          <p className="text-sm text-muted-foreground">{value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ContactPageClient;
