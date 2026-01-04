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
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <span ref={ref} className="counter-value gradient-text">
      {count}
      {suffix}
    </span>
  );
};

const AboutSection = () => {
  return (
    <section className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/50 to-background" />

      <div className="container-wide relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-primary font-medium tracking-[0.3em] uppercase text-xs mb-4">
              About Us
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight mb-8">
              We believe in the{" "}
              <span className="gradient-text">power of design</span>
            </h2>
            <div className="space-y-6 text-muted-foreground text-lg leading-relaxed">
              <p>
                Ineffable Design Solutions is a full-service digital agency that combines 
                creative excellence with technical innovation. We partner with forward-thinking 
                brands to create digital experiences that captivate, convert, and inspire.
              </p>
              <p>
                Our multidisciplinary team of designers, developers, and strategists work 
                together to deliver solutions that not only look exceptional but perform 
                flawlessly. From concept to launch, we're committed to excellence at every step.
              </p>
            </div>
          </motion.div>

          {/* Visual Element */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-square rounded-3xl bg-gradient-to-br from-primary/20 to-primary/5 border border-border overflow-hidden relative">
              {/* Decorative Elements */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-64 h-64 rounded-full border border-primary/30 animate-spin-slow" />
                <div className="absolute w-48 h-48 rounded-full border border-primary/20 animate-spin-slow" style={{ animationDirection: "reverse", animationDuration: "15s" }} />
                <div className="absolute w-32 h-32 rounded-full bg-primary/10 animate-pulse-glow" />
              </div>
              
              {/* Center Logo */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 rounded-2xl bg-primary flex items-center justify-center">
                  <span className="text-primary-foreground font-display font-bold text-3xl">I</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center"
            >
              <Counter value={stat.value} suffix={stat.suffix} />
              <p className="text-muted-foreground text-sm mt-2 tracking-wide">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
