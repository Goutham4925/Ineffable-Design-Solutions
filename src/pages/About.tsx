import { motion, useInView } from "framer-motion";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactCTA from "@/components/ContactCTA";
import { stats } from "@/data/stats";
import { useRef, useEffect, useState } from "react";
import CustomCursor from "@/components/CustomCursor";
import ScrollProgress from "@/components/ScrollProgress";
import SplitReveal from "@/components/SplitReveal";
import TextScramble from "@/components/TextScramble";
import { cachedFetch } from "@/lib/api-cache";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

interface CounterProps { value: number; suffix: string; }

const Counter = ({ value, suffix }: CounterProps) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;
    const duration = 2000, steps = 60;
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

  return <span ref={ref} className="counter-value gradient-text">{count}{suffix}</span>;
};

const values = [
  { title: "Excellence", description: "We pursue excellence in everything we do, never settling for good enough." },
  { title: "Innovation", description: "We embrace new ideas and technologies to create forward-thinking solutions." },
  { title: "Collaboration", description: "We believe the best work comes from diverse perspectives working together." },
  { title: "Integrity", description: "We build relationships on trust, transparency, and honest communication." },
];

type TeamMember = { id: string; name: string; role: string; bio: string; avatar: string; };

const AboutPage = () => {
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [loadingTeam, setLoadingTeam] = useState(true);

  useEffect(() => {
    cachedFetch<TeamMember[]>(`${API_BASE}/api/team`)
      .then((d) => setTeam(Array.isArray(d) ? d : []))
      .catch(console.error)
      .finally(() => setLoadingTeam(false));
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>About Us | Ineffable Design Solutions — India's Global Digital Agency</title>
        <meta name="description" content="Meet the team behind Ineffable Design Solutions — a full-service digital agency from India with teams in Bangalore and Kerala, serving clients in the US, UK, Middle East & globally. 3+ years, 50+ projects, 10+ industries." />
        <link rel="canonical" href="https://www.ineffabledesignsolutions.com/about" />
        <meta property="og:title" content="About Ineffable Design Solutions | Digital Agency India — Global Clients" />
        <meta property="og:description" content="Designers, developers & strategists from India crafting exceptional digital experiences for clients worldwide." />
        <meta property="og:url" content="https://www.ineffabledesignsolutions.com/about" />
        <script type="application/ld+json">{`{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "Who founded Ineffable Design Solutions?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Ineffable Design Solutions was founded in 2022 in Bangalore by Goutham Gokul (CEO & Co-Founder) and Nikitha Jude Vathikulam (COO & Co-Founder). The agency is headquartered in Indira Nagar, Bangalore, Karnataka, India."
              }
            },
            {
              "@type": "Question",
              "name": "Is Ineffable Design Solutions a good agency for international clients?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes. Ineffable Design Solutions is 100% remote and has active clients in the UK, USA, and the Middle East in addition to India. They work across time zones with constant follow-up communication, and deliver globally competitive quality at India-based pricing — making them highly cost-effective for US, UK, and EU clients."
              }
            },
            {
              "@type": "Question",
              "name": "How experienced is Ineffable Design Solutions?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Ineffable Design Solutions has 3+ years of experience, having completed 50+ projects across 10+ industries including healthcare, fintech, edtech, e-commerce, real estate, SaaS, and media. Their team of designers, engineers, and strategists brings both creative and technical depth."
              }
            },
            {
              "@type": "Question",
              "name": "What industries does Ineffable Design Solutions serve?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Ineffable Design Solutions serves clients across healthcare, fintech, edtech, e-commerce, real estate, hospitality, SaaS, media & entertainment, logistics, and professional services sectors."
              }
            }
          ]
        }`}</script>
      </Helmet>
      <ScrollProgress />
      <CustomCursor />
      <Navbar />

      <main id="main-content" className="pt-32">

        {/* ── Hero ── */}
        <section className="container-wide mb-28">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="max-w-5xl"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-px bg-primary" />
              <TextScramble text="About Us" className="label-small" triggerOnMount mountDelay={300} />
            </div>
            <h1 className="text-display mb-8" style={{ fontSize: "clamp(3rem, 7vw, 7rem)", lineHeight: 1 }}>
              <SplitReveal text="We design the" as="span" delay={0.1} />
              {" "}
              <SplitReveal
                text="ineffable"
                as="span"
                className="text-display-italic gradient-text"
                delay={0.3}
              />
            </h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="text-muted-foreground text-lg leading-relaxed max-w-2xl"
            >
              Ineffable Design Solutions is a full-service digital agency that combines
              creative excellence with technical innovation. We partner with forward-thinking
              brands to create digital experiences that captivate, convert, and inspire.
            </motion.p>
          </motion.div>
        </section>

        {/* ── Stats ── */}
        <section className="border-t border-border/40">
          <div className="container-wide">
            <div className="grid grid-cols-2 md:grid-cols-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="py-12 px-8 border-r border-b border-border/40 last:border-r-0"
                >
                  <Counter value={stat.value} suffix={stat.suffix} />
                  <p className="text-muted-foreground text-xs tracking-[0.12em] uppercase mt-3">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Story ── */}
        <section className="container-wide py-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="w-8 h-px bg-primary" />
                <span className="label-small">Our Story</span>
              </div>
              <h2 className="text-display mb-8" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}>
                Built on craft,<br />
                <span className="text-display-italic gradient-text">driven by vision</span>
              </h2>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="space-y-5 text-muted-foreground leading-relaxed pt-2"
            >
              <p>
                Our multidisciplinary team of designers, developers, and strategists work
                together to deliver solutions that not only look exceptional but perform
                flawlessly. From concept to launch, we&rsquo;re committed to excellence at every step.
              </p>
              <p>
                We approach every project as a unique challenge &mdash; researching deeply,
                designing intentionally, and building with precision. The result: work that
                stands out in a crowded digital landscape.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ── Values ── */}
        <section className="border-t border-border/40">
          <div className="container-wide py-28">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="mb-16"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-px bg-primary" />
                <span className="label-small">What We Stand For</span>
              </div>
              <h2 className="text-display" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}>Our Values</h2>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px border border-border/40 bg-border/40">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-background p-8 group hover:bg-card transition-colors duration-300"
                >
                  <h3 className="text-display gradient-text mb-4" style={{ fontSize: "1.8rem" }}>{value.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Team ── */}
        {(loadingTeam || team.length > 0) && (
          <section className="border-t border-border/40">
            <div className="container-wide py-28">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="mb-16"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-px bg-primary" />
                  <span className="label-small">The People</span>
                </div>
                <h2 className="text-display" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}>Meet the Minds</h2>
              </motion.div>

              {loadingTeam && <p className="text-muted-foreground text-sm">Loading&hellip;</p>}

              {!loadingTeam && team.length > 0 && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {team.map((member, index) => (
                    <motion.div
                      key={member.id}
                      initial={{ opacity: 0, y: 40 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.7, delay: index * 0.14 }}
                      className="relative overflow-hidden border border-border/40 bg-card/20 group hover:border-primary/30 hover:bg-card/40 transition-all duration-500"
                    >
                      {/* decorative index */}
                      <span className="absolute top-6 right-8 font-display leading-none select-none pointer-events-none"
                        style={{ fontSize: "7rem", color: "hsl(var(--border) / 0.12)" }}>
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <div className="relative p-10 lg:p-14">
                        {/* avatar + name */}
                        <div className="flex items-start gap-6 mb-10">
                          <div className="relative flex-none">
                            <div className="w-[88px] h-[88px] rounded-full overflow-hidden ring-1 ring-border/50 group-hover:ring-primary/40 transition-all duration-400">
                              <img
                                src={member.avatar}
                                alt={member.name}
                                className="w-full h-full object-cover"
                                width={88}
                                height={88}
                                loading="lazy"
                              />
                            </div>
                            <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-primary" />
                          </div>
                          <div className="pt-1 min-w-0">
                            <h3 className="text-display leading-tight mb-2" style={{ fontSize: "clamp(1.4rem, 2.5vw, 2rem)" }}>
                              {member.name}
                            </h3>
                            <p className="label-small">{member.role}</p>
                          </div>
                        </div>

                        {/* gradient divider */}
                        <div className="h-px mb-8 bg-gradient-to-r from-primary/50 via-primary/20 to-transparent" />

                        {/* bio */}
                        <p className="text-muted-foreground text-sm leading-[1.85]">{member.bio}</p>
                      </div>

                      {/* bottom sweep accent */}
                      <div className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-700 ease-out"
                        style={{ background: "linear-gradient(to right, hsl(var(--primary)), transparent)" }} />
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </section>
        )}

      </main>

      <ContactCTA />
      <Footer />
    </div>
  );
};

export default AboutPage;
