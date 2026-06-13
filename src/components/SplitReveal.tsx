import { useRef } from "react";
import { motion, useInView } from "framer-motion";

type Tag = "h1" | "h2" | "h3" | "h4" | "h5" | "p" | "div" | "span";

interface SplitRevealProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
  stagger?: number;
  as?: Tag;
}

const SplitReveal = ({
  text,
  className,
  style,
  delay = 0,
  stagger = 0.048,
  as: Tag = "div",
}: SplitRevealProps) => {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref as React.RefObject<HTMLElement>, {
    once: true,
    margin: "-4%",
  });

  const words = text.split(" ");

  return (
    <Tag ref={ref as React.RefObject<any>} className={className} style={style}>
      {words.map((word, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden"
          style={{ marginRight: "0.26em", paddingBottom: "0.06em", verticalAlign: "bottom" }}
        >
          <motion.span
            className="inline-block"
            initial={{ y: "108%", opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{
              duration: 0.85,
              delay: delay + i * stagger,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
};

export default SplitReveal;
