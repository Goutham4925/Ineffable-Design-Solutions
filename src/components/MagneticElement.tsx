import { useRef, ReactNode } from "react";
import { motion, useSpring } from "framer-motion";

interface MagneticElementProps {
  children: ReactNode;
  strength?: number;
  className?: string;
}

const MagneticElement = ({ children, strength = 0.28, className }: MagneticElementProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useSpring(0, { stiffness: 180, damping: 18 });
  const y = useSpring(0, { stiffness: 180, damping: 18 });

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - (rect.left + rect.width / 2)) * strength);
    y.set((e.clientY - (rect.top + rect.height / 2)) * strength);
  };

  const onMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      style={{ x, y }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={`inline-block ${className ?? ""}`}
    >
      {children}
    </motion.div>
  );
};

export default MagneticElement;
