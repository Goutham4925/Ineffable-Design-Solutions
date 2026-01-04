import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white dark:bg-background">
      {/* Background Image - Wave visible with its natural colors */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://framerusercontent.com/images/ZMYKutVkKIecWMzISEDH8aZR9E.jpg')`,
          }}
        />
        {/* Light mode: subtle overlay to keep wave visible, Dark mode: stronger overlay */}
        <div className="absolute inset-0 bg-white/40 dark:bg-background/70" />
      </div>

      {/* Content */}
      <div className="container-wide relative z-10 pt-20">
        <div className="max-w-5xl mx-auto text-center">
          {/* Main Title */}
          <div className="overflow-hidden mb-6">
            <motion.h1
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-semibold leading-[1.1] tracking-tight text-foreground"
            >
              Welcome to the
            </motion.h1>
          </div>
          <div className="overflow-hidden mb-10">
            <motion.h1
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-semibold leading-[1.1] tracking-tight gradient-text"
            >
              Ineffable Design Solutions
            </motion.h1>
          </div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mb-16"
          >
            <Link 
              to="/about" 
              className="inline-flex items-center gap-2 px-8 py-4 text-sm font-medium uppercase tracking-widest text-foreground border border-border/50 hover:border-primary hover:text-primary transition-all duration-300 backdrop-blur-sm bg-card/20"
            >
              Learn more
            </Link>
          </motion.div>

          {/* Subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-xl md:text-2xl lg:text-3xl font-medium text-foreground mb-4">
              Transforming Businesses with Cutting-Edge Design Solutions
            </h2>
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
              Ineffable Design Solutions delivers innovative digital design and branding services, 
              empowering businesses to thrive in the digital landscape.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.5 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-10 border-2 border-muted-foreground/50 rounded-full flex justify-center pt-2"
        >
          <motion.div 
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-1 h-2 bg-primary rounded-full"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
