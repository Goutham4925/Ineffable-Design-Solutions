import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const CustomCursor = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const ringX = useMotionValue(-100);
  const ringY = useMotionValue(-100);

  const springX = useSpring(ringX, { stiffness: 120, damping: 18 });
  const springY = useSpring(ringY, { stiffness: 120, damping: 18 });

  const [hovered, setHovered] = useState(false);
  const [label, setLabel] = useState("");

  const isVisible = useRef(false);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const show = () => {
      dotRef.current?.style.setProperty("opacity", "1");
      ringRef.current?.style.setProperty("opacity", "1");
    };
    const hide = () => {
      dotRef.current?.style.setProperty("opacity", "0");
      ringRef.current?.style.setProperty("opacity", "0");
    };

    const onMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      ringX.set(e.clientX);
      ringY.set(e.clientY);
      if (!isVisible.current) {
        isVisible.current = true;
        show();
      }
    };

    const onLinkEnter = (e: Event) => {
      const el = e.target as Element;
      const dataEl = el.closest("[data-cursor]");
      setLabel(dataEl?.getAttribute("data-cursor") ?? "");
      setHovered(true);
    };

    const onLinkLeave = () => {
      setLabel("");
      setHovered(false);
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", hide);
    document.addEventListener("mouseenter", show);

    const els = document.querySelectorAll("a, button, [role='button'], [data-cursor]");
    els.forEach((el) => {
      el.addEventListener("mouseenter", onLinkEnter);
      el.addEventListener("mouseleave", onLinkLeave);
    });

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", hide);
      document.removeEventListener("mouseenter", show);
      els.forEach((el) => {
        el.removeEventListener("mouseenter", onLinkEnter);
        el.removeEventListener("mouseleave", onLinkLeave);
      });
    };
  }, [cursorX, cursorY, ringX, ringY]);

  return (
    <>
      {/* Dot — mix-blend-mode:difference creates an inverting spotlight */}
      <motion.div
        ref={dotRef as React.RefObject<HTMLDivElement>}
        style={{
          x: cursorX,
          y: cursorY,
          mixBlendMode: "difference",
        }}
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-white pointer-events-none z-[9999] opacity-0 -translate-x-1/2 -translate-y-1/2 hidden md:block"
      />

      {/* Ring position wrapper */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] hidden md:block"
        style={{ x: springX, y: springY }}
      >
        {/* Animated ring */}
        <motion.div
          ref={ringRef as React.RefObject<HTMLDivElement>}
          animate={{
            width: label ? 72 : hovered ? 48 : 32,
            height: label ? 72 : hovered ? 48 : 32,
            borderColor: hovered
              ? "hsl(174 58% 42%)"
              : "hsl(174 58% 42% / 0.55)",
          }}
          transition={{ type: "spring", stiffness: 240, damping: 24 }}
          className="rounded-full border flex items-center justify-center opacity-0"
          style={{
            transform: "translate(-50%, -50%)",
            borderColor: "hsl(174 58% 42% / 0.55)",
          }}
        >
          {label && (
            <motion.span
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="text-[7px] font-medium tracking-[0.2em] uppercase text-primary leading-none whitespace-nowrap"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {label}
            </motion.span>
          )}
        </motion.div>
      </motion.div>
    </>
  );
};

export default CustomCursor;
