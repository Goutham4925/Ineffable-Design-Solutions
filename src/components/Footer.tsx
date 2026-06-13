import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { SiFacebook, SiInstagram, SiX, SiLinkedin } from "react-icons/si";
import Logo from "./Logo";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

type Service = { id: string; title: string; slug: string; };

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    fetch(`${API_BASE}/api/services`)
      .then((r) => r.json())
      .then((d) => setServices(Array.isArray(d) ? d : []))
      .catch(() => setServices([]));
  }, []);

  const col1 = services.slice(0, 4);
  const col2 = services.slice(4, 8);

  return (
    <footer className="relative bg-card border-t border-border/40">
      <div className="container-wide">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.5fr_2fr_1fr] gap-16 py-20">

          {/* Brand */}
          <div>
            <Link to="/" className="inline-block mb-6" aria-label="Ineffable Design Solutions">
              <Logo className="h-9 w-auto" />
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed mb-2">
              Designing the Ineffable.
            </p>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              Engineering the Exceptional.
            </p>
            <p className="text-muted-foreground text-sm mb-6">
              enquiry@ineffabledesignsolutions.com
            </p>

            {/* Social */}
            <div className="flex items-center gap-4">
              {[
                { href: "https://www.linkedin.com/company/ineffable-design-solutions", Icon: SiLinkedin, label: "LinkedIn" },
                { href: "https://twitter.com/ineffabledesign", Icon: SiX, label: "X (Twitter)" },
                { href: "https://www.instagram.com/ineffabledesign", Icon: SiInstagram, label: "Instagram" },
                { href: "https://facebook.com/ineffabledesign", Icon: SiFacebook, label: "Facebook" },
              ].map(({ href, Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 border border-border/60 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors duration-200"
                >
                  <Icon className="w-3.5 h-3.5" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <p className="text-xs font-medium tracking-[0.18em] uppercase text-muted-foreground mb-6" style={{ fontFamily: "var(--font-body)" }}>
              Services
            </p>
            {services.length > 0 ? (
              <div className="grid grid-cols-2 gap-x-8 gap-y-3">
                {[col1, col2].map((col, ci) => (
                  <ul key={ci} className="space-y-3">
                    {col.map((s) => (
                      <li key={s.id}>
                        <Link to={`/services/${s.slug}`} className="footer-link link-animated">
                          {s.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-sm">Loading&hellip;</p>
            )}
          </div>

          {/* Company */}
          <div>
            <p className="text-xs font-medium tracking-[0.18em] uppercase text-muted-foreground mb-6" style={{ fontFamily: "var(--font-body)" }}>
              Company
            </p>
            <ul className="space-y-3">
              {[
                { label: "About Us", href: "/about" },
                { label: "Contact", href: "/contact" },
                { label: "Careers", href: "/contact" },
              ].map((l) => (
                <li key={l.label}>
                  <Link to={l.href} className="footer-link link-animated">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border/40 py-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-xs" style={{ fontFamily: "var(--font-body)" }}>
            &copy; {currentYear} Ineffable Design Solutions. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link to="/privacy" className="text-muted-foreground text-xs hover:text-foreground transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="text-muted-foreground text-xs hover:text-foreground transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
