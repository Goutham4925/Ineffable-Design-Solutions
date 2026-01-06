import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Logo from "./Logo";

const API_BASE =
  import.meta.env.VITE_API_URL || "http://localhost:5000";

type Service = {
  id: string;
  title: string;
  slug: string;
};

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  /* ================= FETCH SERVICES ================= */
  useEffect(() => {
    fetch(`${API_BASE}/api/services`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setServices(data);
        } else {
          setServices([]);
        }
      })
      .catch(() => setServices([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <footer className="relative bg-card border-t border-border">
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-50 pointer-events-none" />

      <div className="container-wide relative z-10">
        {/* ================= MAIN FOOTER ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 py-20">
          {/* ================= BRAND ================= */}
          <div>
            <Link to="/" className="inline-block mb-6">
              <Logo className="h-10 w-auto" />
            </Link>

            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              Designing the Ineffable.
              <br />
              Engineering the Exceptional.
            </p>

            <p className="text-muted-foreground text-sm">
              hello@ineffable.design
            </p>
          </div>

          {/* ================= SERVICES (DYNAMIC) ================= */}
          <div>
            <h4 className="font-display font-semibold text-sm uppercase tracking-wider mb-6">
              Services
            </h4>

            {loading ? (
              <p className="text-muted-foreground text-sm">Loading…</p>
            ) : (
              <ul className="space-y-3">
                {services.map((service) => (
                  <li key={service.id}>
                    <Link
                      to={`/services/${service.slug}`}
                      className="text-muted-foreground text-sm hover:text-primary transition-colors"
                    >
                      {service.title}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* ================= COMPANY ================= */}
          <div>
            <h4 className="font-display font-semibold text-sm uppercase tracking-wider mb-6">
              Company
            </h4>

            <ul className="space-y-3">
              <li>
                <Link to="/about" className="footer-link">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/projects" className="footer-link">
                  Our Work
                </Link>
              </li>
              <li>
                <Link to="/careers" className="footer-link">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/contact" className="footer-link">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* ================= SOCIAL ================= */}
          <div>
            <h4 className="font-display font-semibold text-sm uppercase tracking-wider mb-6">
              Connect
            </h4>

            <ul className="space-y-3">
              <li>
                <a href="#" className="footer-link" target="_blank">
                  LinkedIn
                </a>
              </li>
              <li>
                <a href="#" className="footer-link" target="_blank">
                  Twitter
                </a>
              </li>
              <li>
                <a href="#" className="footer-link" target="_blank">
                  Instagram
                </a>
              </li>
              <li>
                <a href="#" className="footer-link" target="_blank">
                  Dribbble
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* ================= BOTTOM BAR ================= */}
        <div className="border-t border-border py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-xs">
            © {currentYear} Ineffable Design Solutions. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            <Link
              to="/privacy"
              className="text-muted-foreground text-xs hover:text-foreground transition-colors"
            >
              Privacy Policy
            </Link>

            <Link
              to="/terms"
              className="text-muted-foreground text-xs hover:text-foreground transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
