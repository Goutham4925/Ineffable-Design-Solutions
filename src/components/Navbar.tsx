import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import Logo from "./Logo";
import { useEffect } from "react";
import TextScramble from "./TextScramble";
import MagneticElement from "./MagneticElement";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    setScrolled(y > 40);
  });

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMenuOpen]);

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-background/90 backdrop-blur-2xl border-b border-border/30"
            : "bg-transparent"
        }`}
      >
        <div className="container-wide flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group z-10" aria-label="Ineffable Design Solutions home">
            <Logo className="h-8 w-auto" />
          </Link>

          {/* Nav Links — Desktop */}
          <ul className="hidden md:flex items-center gap-10 absolute left-1/2 -translate-x-1/2">
            {navItems.map((item) => (
              <li key={item.label}>
                <Link
                  to={item.href}
                  className={`link-animated text-xs font-medium tracking-[0.15em] uppercase transition-colors duration-200 ${
                    location.pathname === item.href
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  <TextScramble text={item.label} />
                </Link>
              </li>
            ))}
          </ul>

          {/* Right — CTA + hamburger */}
          <div className="flex items-center gap-4">
            <MagneticElement strength={0.25} className="hidden sm:inline-block">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-6 py-2.5 text-xs font-medium tracking-widest uppercase border border-primary/40 text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                style={{ fontFamily: "var(--font-body)" }}
              >
                Start Project
              </Link>
            </MagneticElement>

            <button
              className="md:hidden flex items-center justify-center w-10 h-10 hover:text-primary transition-colors focus-visible:ring-2 focus-visible:ring-primary rounded"
              onClick={() => setIsMenuOpen((v) => !v)}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? <X className="w-5 h-5" aria-hidden="true" /> : <Menu className="w-5 h-5" aria-hidden="true" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setIsMenuOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="fixed top-0 right-0 bottom-0 w-[300px] bg-card border-l border-border z-50 md:hidden flex flex-col"
              style={{ overscrollBehavior: "contain" }}
            >
              <div className="flex items-center justify-between h-20 px-6 border-b border-border">
                <span className="text-xs font-medium tracking-[0.2em] uppercase text-muted-foreground" style={{ fontFamily: "var(--font-body)" }}>Menu</span>
                <button
                  className="flex items-center justify-center w-10 h-10 hover:text-primary transition-colors focus-visible:ring-2 focus-visible:ring-primary rounded"
                  onClick={() => setIsMenuOpen(false)}
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" aria-hidden="true" />
                </button>
              </div>

              <nav className="flex-1 px-6 py-10 flex flex-col justify-center">
                <ul className="space-y-1">
                  {navItems.map((item, i) => (
                    <motion.li
                      key={item.label}
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: i * 0.06 }}
                    >
                      <Link
                        to={item.href}
                        onClick={() => setIsMenuOpen(false)}
                        className={`block py-3 text-4xl font-light transition-colors ${
                          location.pathname === item.href ? "text-primary" : "text-foreground hover:text-primary"
                        }`}
                        style={{ fontFamily: "var(--font-display)" }}
                      >
                        {item.label}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </nav>

              <div className="px-6 py-8 border-t border-border">
                <Link
                  to="/contact"
                  onClick={() => setIsMenuOpen(false)}
                  className="btn-primary w-full justify-center"
                >
                  Start a Project
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
