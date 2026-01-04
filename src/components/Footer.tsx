import { Link } from "react-router-dom";
import Logo from "./Logo";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    services: [
      { label: "Software Development", href: "/services/software-development" },
      { label: "Web & App Development", href: "/services/web-app-development" },
      { label: "UI/UX Design", href: "/services/ui-ux-design" },
      { label: "Branding & Identity", href: "/services/branding-identity" },
    ],
    company: [
      { label: "About Us", href: "/about" },
      { label: "Our Work", href: "/projects" },
      { label: "Careers", href: "/careers" },
      { label: "Contact", href: "/contact" },
    ],
    social: [
      { label: "LinkedIn", href: "#" },
      { label: "Twitter", href: "#" },
      { label: "Instagram", href: "#" },
      { label: "Dribbble", href: "#" },
    ],
  };

  return (
    <footer className="relative bg-card border-t border-border">
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-50 pointer-events-none" />

      <div className="container-wide relative z-10">
        {/* Main Footer */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 py-20">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link to="/" className="inline-block mb-6">
              <Logo className="h-10 w-auto" />
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              Designing the Ineffable.<br />
              Engineering the Exceptional.
            </p>
            <p className="text-muted-foreground text-sm">
              hello@ineffable.design
            </p>
          </div>

          {/* Services Column */}
          <div>
            <h4 className="font-display font-semibold text-sm uppercase tracking-wider mb-6">
              Services
            </h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-muted-foreground text-sm hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h4 className="font-display font-semibold text-sm uppercase tracking-wider mb-6">
              Company
            </h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-muted-foreground text-sm hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Column */}
          <div>
            <h4 className="font-display font-semibold text-sm uppercase tracking-wider mb-6">
              Connect
            </h4>
            <ul className="space-y-3">
              {footerLinks.social.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground text-sm hover:text-primary transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-xs">
            © {currentYear} Ineffable Design Solutions. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link to="/privacy" className="text-muted-foreground text-xs hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-muted-foreground text-xs hover:text-foreground transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
