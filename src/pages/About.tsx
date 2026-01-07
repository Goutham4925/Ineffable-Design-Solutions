import { motion, useInView } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { stats } from "@/data/stats";
import { useRef, useEffect, useState } from "react";

const API_BASE =
  import.meta.env.VITE_API_URL || "http://localhost:5000";

/* ================= COUNTER ================= */
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
    <span
      ref={ref}
      className="text-5xl md:text-6xl font-display font-bold gradient-text"
    >
      {count}
      {suffix}
    </span>
  );
};

/* ================= VALUES ================= */
const values = [
  {
    title: "Excellence",
    description:
      "We pursue excellence in everything we do, never settling for good enough.",
  },
  {
    title: "Innovation",
    description:
      "We embrace new ideas and technologies to create forward-thinking solutions.",
  },
  {
    title: "Collaboration",
    description:
      "We believe the best work comes from diverse perspectives working together.",
  },
  {
    title: "Integrity",
    description:
      "We build relationships on trust, transparency, and honest communication.",
  },
];

/* ================= TYPES ================= */
type TeamMember = {
  id: string;
  name: string;
  role: string;
  bio: string;
  avatar: string;
};

const AboutPage = () => {
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [loadingTeam, setLoadingTeam] = useState(true);

  /* ================= FETCH TEAM ================= */
  useEffect(() => {
    fetch(`${API_BASE}/api/team`)
      .then((res) => res.json())
      .then((data) => {
        setTeam(Array.isArray(data) ? data : []);
      })
      .catch(console.error)
      .finally(() => setLoadingTeam(false));
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-32">
        {/* ================= HERO ================= */}
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
              We design the <span className="gradient-text">ineffable</span>
            </h1>
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
          </motion.div>
        </section>

        {/* ================= STATS ================= */}
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

        {/* ================= VALUES ================= */}
        <section className="container-wide py-32">
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

        {/* ================= TEAM ================= */}
        <section className="bg-card/50 py-32">
          <div className="container-wide">
            {/* ================= HEADER ================= */}
            <div className="text-center mb-20">
              <p className="text-primary font-medium tracking-[0.3em] uppercase text-xs mb-4">
                The Team
              </p>
              <h2 className="text-4xl md:text-5xl font-display font-bold">
                Meet the Minds
              </h2>
            </div>

            {loadingTeam && (
              <p className="text-center text-muted-foreground">
                Loading team…
              </p>
            )}

            {!loadingTeam && team.length === 0 && (
              <p className="text-center text-muted-foreground">
                Team information coming soon.
              </p>
            )}

            {!loadingTeam && team.length > 0 && (
              <div
                className="
                  grid gap-12
                  [grid-template-columns:repeat(auto-fit,minmax(280px,1fr))]
                  justify-center
                "
              >
                {team.map((member, index) => (
                  <motion.div
                    key={member.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="group flex justify-center"
                  >
                    {/* ================= CARD ================= */}
                    <div className="glass rounded-3xl pt-20 pb-10 px-8 max-w-md w-full text-center transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-2xl">
                      
                      {/* Avatar */}
                      <div className="relative -mt-28 mb-6">
                        <div className="w-32 h-32 mx-auto rounded-full overflow-hidden ring-4 ring-background shadow-lg">
                          <img
                            src={member.avatar}
                            alt={member.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>

                      {/* Name */}
                      <h3 className="text-xl font-display font-semibold mb-1">
                        {member.name}
                      </h3>

                      {/* Role */}
                      <p className="text-primary text-sm font-medium mb-6">
                        {member.role}
                      </p>

                      {/* Divider */}
                      <div className="w-12 h-px bg-border mx-auto mb-6" />

                      {/* Bio (FULL CONTENT) */}
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {member.bio}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AboutPage;
