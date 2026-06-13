import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const steps = [
  { number: "01", title: "Discovery", description: "We dive deep into understanding your business, goals, and target audience to lay the foundation for success." },
  { number: "02", title: "Strategy", description: "Our team develops a comprehensive strategy that aligns with your objectives and sets clear milestones." },
  { number: "03", title: "Design", description: "We craft beautiful, intuitive designs that resonate with your audience and elevate your brand." },
  { number: "04", title: "Development", description: "Our engineers bring designs to life with clean, scalable code and cutting-edge technology." },
  { number: "05", title: "Launch", description: "We ensure a smooth launch and provide ongoing support to help your product thrive in the market." },
];

const ProcessSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.8", "end 0.8"] });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section className="section-padding relative overflow-hidden">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-20"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-px bg-primary" />
            <span className="label-small">How We Work</span>
          </div>
          <h2
            className="text-display"
            style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}
          >
            Our Process
          </h2>
        </motion.div>

        <div ref={ref} className="relative">
          {/* Animated vertical line */}
          <div className="absolute left-[2.4rem] top-0 bottom-0 w-px bg-border/40 hidden md:block overflow-hidden">
            <motion.div
              style={{ height: lineHeight }}
              className="w-full bg-primary origin-top"
            />
          </div>

          <div className="space-y-16 md:space-y-20">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: index * 0.08 }}
                className="flex gap-10 md:gap-20 items-start"
              >
                {/* Number circle */}
                <div className="flex-none flex items-center justify-center w-[4.8rem] h-[4.8rem] rounded-full border border-primary/40 bg-background z-10 group-hover:border-primary transition-colors">
                  <span
                    className="text-primary font-medium"
                    style={{ fontFamily: "var(--font-display)", fontSize: "1.3rem" }}
                  >
                    {step.number}
                  </span>
                </div>

                {/* Content */}
                <div className="flex-1 pt-3">
                  <h3
                    className="text-display mb-3"
                    style={{ fontSize: "clamp(1.8rem, 3vw, 2.8rem)" }}
                  >
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed max-w-2xl">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
