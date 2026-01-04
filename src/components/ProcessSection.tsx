import { motion } from "framer-motion";

interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

const steps: ProcessStep[] = [
  {
    number: "01",
    title: "Discovery",
    description: "We dive deep into understanding your business, goals, and target audience to lay the foundation for success.",
  },
  {
    number: "02",
    title: "Strategy",
    description: "Our team develops a comprehensive strategy that aligns with your objectives and sets clear milestones.",
  },
  {
    number: "03",
    title: "Design",
    description: "We craft beautiful, intuitive designs that resonate with your audience and elevate your brand.",
  },
  {
    number: "04",
    title: "Development",
    description: "Our engineers bring designs to life with clean, scalable code and cutting-edge technology.",
  },
  {
    number: "05",
    title: "Launch",
    description: "We ensure a smooth launch and provide ongoing support to help your product thrive in the market.",
  },
];

const ProcessSection = () => {
  return (
    <section className="section-padding relative overflow-hidden bg-card/30">
      <div className="container-wide">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <p className="text-primary font-medium tracking-[0.3em] uppercase text-xs mb-4">
            How We Work
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold">
            Our Process
          </h2>
        </motion.div>

        {/* Process Steps */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-border hidden md:block" />

          <div className="space-y-12 md:space-y-24">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative flex flex-col md:flex-row gap-8 md:gap-16 items-start ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Number Circle */}
                <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 z-10">
                  <div className="w-16 h-16 rounded-full bg-background border-2 border-primary flex items-center justify-center">
                    <span className="text-primary font-display font-bold text-lg">
                      {step.number}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className={`flex-1 pl-24 md:pl-0 ${index % 2 === 0 ? "md:pr-24 md:text-right" : "md:pl-24 md:text-left"}`}>
                  <h3 className="text-2xl md:text-3xl font-display font-bold mb-4">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground text-lg leading-relaxed max-w-md">
                    {step.description}
                  </p>
                </div>

                {/* Empty space for alternating layout */}
                <div className="flex-1 hidden md:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
