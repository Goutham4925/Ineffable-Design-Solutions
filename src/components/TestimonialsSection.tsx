import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { useEffect, useState } from "react";

const API_BASE =
  import.meta.env.VITE_API_URL || "http://localhost:5000";

/* ================= TYPES ================= */
type Testimonial = {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  avatar?: string;
};

const TestimonialsSection = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE}/api/testimonials`)
      .then((res) => res.json())
      .then((data) =>
        setTestimonials(Array.isArray(data) ? data : [])
      )
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="section-padding relative overflow-hidden">
      <div className="container-wide">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-primary font-medium tracking-[0.3em] uppercase text-xs mb-4">
            Testimonials
          </p>
          <h2 className="text-4xl md:text-5xl font-display font-bold">
            Client Stories
          </h2>
        </motion.div>

        {/* States */}
        {loading && (
          <p className="text-center text-muted-foreground">
            Loading testimonials…
          </p>
        )}

        {!loading && testimonials.length === 0 && (
          <p className="text-center text-muted-foreground">
            Testimonials coming soon.
          </p>
        )}

        {/* Grid */}
        {!loading && testimonials.length > 0 && (
          <div className="grid gap-8 md:grid-cols-2">
            {testimonials.map((t, index) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="glass rounded-2xl p-8 relative"
              >
                <Quote className="w-10 h-10 text-primary/20 mb-6" />

                <p className="text-lg leading-relaxed mb-8 text-muted-foreground">
                  “{t.quote}”
                </p>

                <div className="flex items-center gap-4">
                  {t.avatar ? (
                    <img
                      src={t.avatar}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-semibold">
                      {t.author.charAt(0)}
                    </div>
                  )}

                  <div>
                    <p className="font-semibold">{t.author}</p>
                    <p className="text-sm text-muted-foreground">
                      {t.role}, {t.company}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default TestimonialsSection;
