import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { stats } from "@/data/stats";
import { teamMembers } from "@/data/team";
import { useRef, useEffect, useState } from "react";
import { useInView } from "framer-motion";

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
    <span ref={ref} className="text-5xl md:text-6xl font-display font-bold gradient-text">
      {count}
      {suffix}
    </span>
  );
};

const values = [
  {
    title: "Excellence",
    description: "We pursue excellence in everything we do, never settling for good enough.",
  },
  {
    title: "Innovation",
    description: "We embrace new ideas and technologies to create forward-thinking solutions.",
  },
  {
    title: "Collaboration",
    description: "We believe the best work comes from diverse perspectives working together.",
  },
  {
    title: "Integrity",
    description: "We build relationships on trust, transparency, and honest communication.",
  },
];

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-32">
        {/* Hero */}
        <section className="container-wide mb-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <p className="text-primary font-medium tracking-[0.3em] uppercase text-xs mb-4">
              About Us
            </p>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold leading-tight mb-8">
              We design the{" "}
              <span className="gradient-text">ineffable</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Ineffable Design Solutions is a full-service digital agency that combines creative 
              excellence with technical innovation. We partner with forward-thinking brands to 
              create digital experiences that captivate, convert, and inspire.
            </p>
          </motion.div>
        </section>

        {/* Stats */}
        <section className="container-wide mb-32">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <Counter value={stat.value} suffix={stat.suffix} />
                <p className="text-muted-foreground text-sm mt-2">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Story */}
        <section className="bg-card/50 py-32">
          <div className="container-wide">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-4xl md:text-5xl font-display font-bold mb-8">
                  Our Story
                </h2>
                <div className="space-y-6 text-muted-foreground text-lg leading-relaxed">
                  <p>
                    Founded in 2016, Ineffable Design Solutions began with a simple belief: 
                    that great design has the power to transform businesses and touch lives.
                  </p>
                  <p>
                    What started as a small studio has grown into a full-service digital agency, 
                    but our core values remain unchanged. We still approach every project with 
                    the same passion, attention to detail, and commitment to excellence that 
                    defined our earliest work.
                  </p>
                  <p>
                    Today, our multidisciplinary team of designers, developers, and strategists 
                    work together to deliver solutions that not only look exceptional but perform 
                    flawlessly.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative"
              >
                <div className="aspect-square rounded-3xl overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop"
                    alt="Team collaboration"
                    className="w-full h-full object-cover"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="container-wide py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <p className="text-primary font-medium tracking-[0.3em] uppercase text-xs mb-4">
              Our Values
            </p>
            <h2 className="text-4xl md:text-5xl font-display font-bold">
              What We Stand For
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="glass rounded-2xl p-8"
              >
                <h3 className="text-xl font-display font-bold mb-4 gradient-text">
                  {value.title}
                </h3>
                <p className="text-muted-foreground">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Team */}
        <section className="bg-card/50 py-32">
          <div className="container-wide">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <p className="text-primary font-medium tracking-[0.3em] uppercase text-xs mb-4">
                The Team
              </p>
              <h2 className="text-4xl md:text-5xl font-display font-bold">
                Meet the Minds
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="w-32 h-32 mx-auto rounded-full overflow-hidden mb-6">
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-display font-semibold mb-2">
                    {member.name}
                  </h3>
                  <p className="text-primary text-sm mb-2">
                    {member.role}
                  </p>
                  <p className="text-muted-foreground text-sm">
                    {member.bio}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AboutPage;
