import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { useEffect, useRef, useState } from "react";

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
  const [isMobile, setIsMobile] = useState(false);

  // Swiper (mobile only)
  const [Swiper, setSwiper] = useState<any>(null);
  const [SwiperSlide, setSwiperSlide] = useState<any>(null);

  const swiperRef = useRef<any>(null);

  // Equal height
  const cardRefs = useRef<HTMLDivElement[]>([]);
  const [cardHeight, setCardHeight] = useState<number | null>(null);

  const [activeIndex, setActiveIndex] = useState(0);

  /* ================= FETCH ================= */
  useEffect(() => {
    fetch(`${API_BASE}/api/testimonials`)
      .then((res) => res.json())
      .then((data) => setTestimonials(Array.isArray(data) ? data : []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  /* ================= MOBILE DETECTION ================= */
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  /* ================= LOAD SWIPER (MOBILE ONLY) ================= */
  useEffect(() => {
    if (!isMobile) return;

    let mounted = true;

    (async () => {
      const swiperReact = await import("swiper/react");
      await import("swiper/css");

      if (!mounted) return;

      setSwiper(() => swiperReact.Swiper);
      setSwiperSlide(() => swiperReact.SwiperSlide);
    })();

    return () => {
      mounted = false;
    };
  }, [isMobile]);

  /* ================= EQUAL HEIGHT (MOBILE) ================= */
  useEffect(() => {
    if (!isMobile || testimonials.length === 0) return;

    requestAnimationFrame(() => {
      const heights = cardRefs.current.map((el) => el?.offsetHeight || 0);
      const max = Math.max(...heights);
      if (max > 0) setCardHeight(max);
    });
  }, [isMobile, testimonials]);

  return (
    <section className="section-padding relative overflow-hidden">
      <div className="container-wide">
        {/* ================= HEADER ================= */}
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

        {/* ================= STATES ================= */}
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

        {/* ================= MOBILE (SWIPER + CUSTOM DOTS) ================= */}
        {!loading && isMobile && Swiper && SwiperSlide && testimonials.length > 0 && (
          <div className="relative">
            <Swiper
              spaceBetween={16}
              slidesPerView={1.1}
              centeredSlides
              onSwiper={(swiper) => (swiperRef.current = swiper)}
              onSlideChange={(swiper) =>
                setActiveIndex(swiper.realIndex)
              }
              className="pb-16"
            >
              {testimonials.map((t, i) => (
                <SwiperSlide key={t.id}>
                  <div
                    ref={(el) => {
                      if (el) cardRefs.current[i] = el;
                    }}
                    style={cardHeight ? { height: cardHeight } : undefined}
                    className="glass rounded-2xl p-6 flex flex-col justify-between"
                  >
                    <div>
                      <Quote className="w-8 h-8 text-primary/30 mb-4" />
                      <p className="text-base leading-relaxed mb-6 text-muted-foreground">
                        “{t.quote}”
                      </p>
                    </div>

                    <div className="flex items-center gap-4">
                      {t.avatar ? (
                        <img
                          src={t.avatar}
                          className="w-10 h-10 rounded-full object-cover"
                          alt={t.author}
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-semibold">
                          {t.author.charAt(0)}
                        </div>
                      )}

                      <div>
                        <p className="font-semibold text-sm">{t.author}</p>
                        <p className="text-xs text-muted-foreground">
                          {t.role}, {t.company}
                        </p>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* ================= CUSTOM DOTS ================= */}
            <div className="flex justify-center gap-2 mt-8">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => swiperRef.current?.slideTo(i)}
                  className={`transition-all rounded-full ${
                    activeIndex === i
                      ? "w-6 h-2 bg-primary"
                      : "w-2 h-2 bg-muted-foreground/40"
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
          </div>
        )}

        {/* ================= DESKTOP (GRID) ================= */}
        {!loading && !isMobile && testimonials.length > 0 && (
          <div className="grid gap-8 md:grid-cols-2">
            {testimonials.map((t, index) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="glass rounded-2xl p-8"
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
                      alt={t.author}
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
