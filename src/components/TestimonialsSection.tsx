import { motion } from "framer-motion";
import { testimonials } from "@/data/testimonials";
import { Quote } from "lucide-react";

const TestimonialsSection = () => {
  const clients = [
    "Nexus Finance",
    "Velocity Retail",
    "Horizon Tech",
    "Quantum Analytics",
    "Aurora Motors",
    "Pulse Health",
  ];

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

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="glass rounded-2xl p-8 relative group hover:border-primary/50 transition-colors"
            >
              {/* Quote Icon */}
              <Quote className="w-10 h-10 text-primary/20 mb-6" />
              
              {/* Message */}
              <p className="text-lg leading-relaxed mb-8 text-muted-foreground">
                "{testimonial.message}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center">
                  <span className="text-primary-foreground font-semibold">
                    {testimonial.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.role}, {testimonial.company}
                  </p>
                </div>
              </div>

              {/* Decorative */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/10 to-transparent rounded-tr-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          ))}
        </div>

        {/* Client Logos Marquee */}
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10" />
          
          <div className="marquee">
            <div className="marquee-content">
              {[...clients, ...clients].map((client, index) => (
                <div
                  key={index}
                  className="flex items-center justify-center px-8 py-4"
                >
                  <span className="text-2xl font-display font-bold text-muted-foreground/40 whitespace-nowrap">
                    {client}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
