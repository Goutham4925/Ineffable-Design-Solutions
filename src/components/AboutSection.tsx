import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { stats } from "@/data/stats";

interface CounterProps {
  value: number;
  suffix: string;
}

const Counter = ({ value, suffix }: CounterProps) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;
    const duration = 2000;
    const steps = 60;
    const stepDuration = duration / steps;
    const increment = value / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) { setCount(value); clearInterval(timer); }
      else setCount(Math.floor(current));
    }, stepDuration);
    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <span ref={ref} className="counter-value gradient-text">
      {count}{suffix}
    </span>
  );
};

const AboutSection = () => {
  return (
    <section className="section-padding relative overflow-hidden">
      <div className="container-wide">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-32 items-center">

          {/* LEFT — Text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-px bg-primary" />
              <span className="label-small">About Us</span>
            </div>
            <h2
              className="text-display mb-8"
              style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}
            >
              We believe in the{" "}
              <span className="text-display-italic gradient-text">
                power of design
              </span>
            </h2>
            <div className="space-y-5 text-muted-foreground leading-relaxed" style={{ fontSize: "1.05rem" }}>
              <p>
                Ineffable Design Solutions is a full-service digital agency that combines
                creative excellence with technical innovation. We partner with forward-thinking
                brands to create digital experiences that captivate, convert, and inspire.
              </p>
              <p>
                Our multidisciplinary team of designers, developers, and strategists work
                together to deliver solutions that not only look exceptional but perform
                flawlessly.
              </p>
            </div>

            <div className="mt-10">
              <a
                href="/about"
                className="btn-outline inline-flex"
              >
                Learn More
              </a>
            </div>
          </motion.div>

          {/* RIGHT — Stats grid */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-2 gap-8"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.12 }}
                className="border border-border/60 p-8 relative group hover:border-primary/30 transition-colors duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <Counter value={stat.value} suffix={stat.suffix} />
                <p className="text-muted-foreground text-xs tracking-[0.12em] uppercase mt-3 font-medium">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
