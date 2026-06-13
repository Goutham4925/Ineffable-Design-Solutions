import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

const TransitionOverlay = () => {
  const location = useLocation();
  const [show, setShow] = useState(false);
  const prevPath = useRef(location.pathname);

  useEffect(() => {
    if (prevPath.current === location.pathname) return;
    prevPath.current = location.pathname;
    setShow(true);
    const t = setTimeout(() => setShow(false), 700);
    return () => clearTimeout(t);
  }, [location.pathname]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key={location.pathname + "-overlay"}
          className="fixed inset-0 z-[9970] pointer-events-none"
          style={{ background: "hsl(var(--card))" }}
          initial={{ scaleY: 1, originY: "100%" }}
          animate={{ scaleY: 0, originY: "0%" }}
          transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
        />
      )}
    </AnimatePresence>
  );
};

export default TransitionOverlay;
