import { motion, useScroll, useTransform, useMotionValue, useSpring, useMotionTemplate } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useRef } from "react";
import MagneticElement from "./MagneticElement";
import TextScramble from "./TextScramble";

const HeroSection = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  /* Mouse-tracking spotlight */
  const mouseX = useMotionValue(50);
  const mouseY = useMotionValue(50);
  const smoothX = useSpring(mouseX, { stiffness: 35, damping: 22 });
  const smoothY = useSpring(mouseY, { stiffness: 35, damping: 22 });
  const spotlightBg = useMotionTemplate`radial-gradient(680px circle at ${smoothX}% ${smoothY}%, hsl(174 58% 42% / 0.11), transparent 70%)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(((e.clientX - rect.left) / rect.width) * 100);
    mouseY.set(((e.clientY - rect.top) / rect.height) * 100);
  };

  return (
    <section
      ref={ref}
      id="main-content"
      className="relative min-h-screen flex items-center justify-center overflow-hidden grain"
      onMouseMove={handleMouseMove}
    >
      {/* Background layers */}
      <div className="absolute inset-0 bg-background" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,hsl(174_58%_42%_/_0.12),transparent)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] bg-[size:80px_80px] opacity-[0.06]" />

      {/* Mouse-follow spotlight */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ background: spotlightBg }}
      />

      {/* Parallax content */}
      <motion.div style={{ y, opacity }} className="container-wide relative z-10 pt-24 pb-16">
        <div className="max-w-6xl mx-auto">

          {/* Label */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex items-center gap-3 mb-10"
          >
            <div className="w-8 h-px bg-primary" />
            <TextScramble
              text="Full-Service Digital Agency"
              className="label-small"
              triggerOnMount
              mountDelay={600}
            />
          </motion.div>

          {/* Main heading */}
          <div className="overflow-hidden pb-3 mb-0">
            <motion.h1
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1.1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="text-display leading-none"
              style={{ fontSize: "clamp(3.5rem, 11vw, 11rem)" }}
            >
              Designing
            </motion.h1>
          </div>
          <div className="overflow-hidden pb-4 mb-0">
            <motion.div
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1.1, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-baseline gap-6"
            >
              <span
                className="text-display-italic text-muted-foreground/40"
                style={{ fontSize: "clamp(2rem, 5vw, 5rem)" }}
              >
                the
              </span>
              <span
                className="gradient-text text-display"
                style={{ fontSize: "clamp(3.5rem, 11vw, 11rem)" }}
              >
                Ineffable.
              </span>
            </motion.div>
          </div>

          {/* Divider + subtext */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.9 }}
            className="mt-12 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-8"
          >
            <p
              className="text-muted-foreground max-w-sm leading-relaxed"
              style={{ fontSize: "clamp(0.9rem, 1.5vw, 1.1rem)" }}
            >
              We craft exceptional digital experiences through design,
              engineering, and innovation — built to last.
            </p>

            <div className="flex items-center gap-4">
              <MagneticElement strength={0.3}>
                <Link to="/contact" className="btn-primary" data-cursor="Let's Talk">
                  Start a Project
                </Link>
              </MagneticElement>
              <MagneticElement strength={0.3}>
                <Link to="/about" className="btn-outline" data-cursor="Explore">
                  Our Work <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </Link>
              </MagneticElement>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.4 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-12 bg-gradient-to-b from-primary to-transparent"
        />
        <span className="label-small" style={{ fontSize: "0.6rem" }}>Scroll</span>
      </motion.div>
    </section>
  );
};

export default HeroSection;
