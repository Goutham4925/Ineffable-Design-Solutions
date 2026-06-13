import { useState, useRef, useEffect, useCallback } from "react";

const CHARSET = "!<>-_\\/[]{}—=+*^?#@$%&ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

interface TextScrambleProps {
  text: string;
  className?: string;
  as?: "span" | "p" | "div" | "h1" | "h2" | "h3" | "h4" | "label";
  triggerOnMount?: boolean;
  mountDelay?: number;
  frames?: number;
}

const TextScramble = ({
  text,
  className,
  as: Tag = "span",
  triggerOnMount = false,
  mountDelay = 0,
  frames = 22,
}: TextScrambleProps) => {
  const [output, setOutput] = useState(text);
  const rafRef = useRef<number>(0);

  const run = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    let frame = 0;

    const tick = () => {
      const progress = frame / frames;
      setOutput(
        text
          .split("")
          .map((ch, i) => {
            if (ch === " ") return " ";
            if (i / text.length <= progress) return ch;
            return CHARSET[Math.floor(Math.random() * CHARSET.length)];
          })
          .join("")
      );
      frame++;
      if (frame <= frames) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setOutput(text);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
  }, [text, frames]);

  useEffect(() => {
    if (!triggerOnMount) return;
    const t = setTimeout(run, mountDelay);
    return () => {
      clearTimeout(t);
      cancelAnimationFrame(rafRef.current);
    };
  }, [triggerOnMount, mountDelay, run]);

  useEffect(() => () => cancelAnimationFrame(rafRef.current), []);

  return (
    <Tag
      className={className}
      onMouseEnter={run}
      style={{ fontVariantNumeric: "tabular-nums" }}
    >
      {output}
    </Tag>
  );
};

export default TextScramble;
