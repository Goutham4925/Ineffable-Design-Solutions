import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

const ContactCTA = () => {
  return (
    <section className="relative py-36 md:py-48 overflow-hidden bg-card/30">
      {/* Background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] bg-[size:80px_80px] opacity-[0.05]" />
      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-primary/8 blur-[120px] rounded-full" />

      <div className="container-wide relative z-10">
        <div className="max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="flex items-center gap-3 mb-10">
              <div className="w-8 h-px bg-primary" />
              <span className="label-small">Let&rsquo;s Create Together</span>
            </div>

            <h2
              className="text-display mb-8"
              style={{ fontSize: "clamp(3rem, 8vw, 8rem)", lineHeight: 1 }}
            >
              Have a project
              <br />
              <span className="text-display-italic gradient-text">in mind?</span>
            </h2>

            <p className="text-muted-foreground text-lg max-w-xl mb-12 leading-relaxed">
              We&rsquo;d love to hear about your project and discuss how we can help
              bring your vision to life.
            </p>

            <div className="flex flex-col sm:flex-row items-start gap-6">
              <Link to="/contact" className="btn-primary text-base px-10 py-5" data-cursor="Let's Go">
                Start a Conversation
                <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
              </Link>

              <div className="flex flex-col gap-1 sm:pl-6 sm:border-l sm:border-border">
                <a
                  href="mailto:enquiry@ineffabledesignsolutions.com"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  enquiry@ineffabledesignsolutions.com
                </a>
                <a
                  href="tel:+919074029499"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  +91 9074029499
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactCTA;
