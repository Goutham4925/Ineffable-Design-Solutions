import { motion, useScroll } from "framer-motion";

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] origin-left z-[9999] pointer-events-none"
      style={{
        scaleX: scrollYProgress,
        background: "linear-gradient(to right, hsl(174 58% 42%), hsl(180 50% 52%), hsl(42 68% 55%))",
      }}
    />
  );
};

export default ScrollProgress;
