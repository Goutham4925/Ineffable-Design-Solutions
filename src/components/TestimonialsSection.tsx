import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { cachedFetch } from "@/lib/api-cache";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

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
  const [isMobile, setIsMobile] = useState(false);
  const [Swiper, setSwiper] = useState<any>(null);
  const [SwiperSlide, setSwiperSlide] = useState<any>(null);
  const swiperRef = useRef<any>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    cachedFetch<Testimonial[]>(`${API_BASE}/api/testimonials`)
      .then((d) => setTestimonials(Array.isArray(d) ? d : []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    if (!isMobile) return;
    let mounted = true;
    (async () => {
      const m = await import("swiper/react");
      await import("swiper/css");
      if (!mounted) return;
      setSwiper(() => m.Swiper);
      setSwiperSlide(() => m.SwiperSlide);
    })();
    return () => { mounted = false; };
  }, [isMobile]);

  const TestimonialCard = ({ t }: { t: Testimonial }) => (
    <div className="border border-border/60 p-8 md:p-10 relative group hover:border-primary/30 transition-colors duration-300">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/3 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="relative">
        {/* Large opening quote */}
        <div
          className="text-primary/20 leading-none mb-6 select-none"
          style={{ fontFamily: "var(--font-display)", fontSize: "5rem", lineHeight: 1 }}
          aria-hidden="true"
        >
          &ldquo;
        </div>
        <p
          className="text-foreground/80 leading-relaxed mb-8"
          style={{ fontSize: "clamp(1rem, 1.5vw, 1.15rem)", fontFamily: "var(--font-display)", fontStyle: "italic" }}
        >
          {t.quote}
        </p>
        <div className="flex items-center gap-4">
          {t.avatar ? (
            <img src={t.avatar} alt={t.author} className="w-11 h-11 rounded-full object-cover" />
          ) : (
            <div className="w-11 h-11 rounded-full bg-primary/20 flex items-center justify-center text-primary font-semibold text-sm">
              {t.author.charAt(0)}
            </div>
          )}
          <div>
            <p className="font-medium text-sm">{t.author}</p>
            <p className="text-muted-foreground text-xs tracking-wide">{t.role}, {t.company}</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <section className="section-padding">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex items-end justify-between gap-8 mb-16"
        >
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-px bg-primary" />
              <span className="label-small">Testimonials</span>
            </div>
            <h2 className="text-display" style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}>
              Client Stories
            </h2>
          </div>
        </motion.div>

        {loading && <p className="text-muted-foreground text-sm">Loading&hellip;</p>}
        {!loading && testimonials.length === 0 && (
          <p className="text-muted-foreground text-sm">Testimonials coming soon.</p>
        )}

        {/* Mobile — Swiper */}
        {!loading && isMobile && Swiper && SwiperSlide && testimonials.length > 0 && (
          <div>
            <Swiper
              spaceBetween={16}
              slidesPerView={1.05}
              centeredSlides
              onSwiper={(s: any) => (swiperRef.current = s)}
              onSlideChange={(s: any) => setActiveIndex(s.realIndex)}
              className="pb-14"
            >
              {testimonials.map((t) => (
                <SwiperSlide key={t.id}>
                  <TestimonialCard t={t} />
                </SwiperSlide>
              ))}
            </Swiper>
            <div className="flex justify-center gap-2 mt-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => swiperRef.current?.slideTo(i)}
                  className={`rounded-full transition-all duration-300 ${activeIndex === i ? "w-6 h-1.5 bg-primary" : "w-1.5 h-1.5 bg-border"}`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
          </div>
        )}

        {/* Desktop — grid */}
        {!loading && !isMobile && testimonials.length > 0 && (
          <div className="grid gap-6 md:grid-cols-2">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <TestimonialCard t={t} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default TestimonialsSection;
