import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, Calendar, User, Tag } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { projects } from "@/data/projects";

const projectColors = [
  "from-primary/60 to-primary/30",
  "from-violet-500/60 to-purple-500/30",
  "from-pink-500/60 to-rose-500/30",
  "from-amber-500/60 to-orange-500/30",
  "from-green-500/60 to-emerald-500/30",
  "from-blue-500/60 to-indigo-500/30",
];

const ProjectDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const project = projects.find((p) => p.slug === slug);
  const projectIndex = projects.findIndex((p) => p.slug === slug);
  const gradientClass = projectColors[projectIndex % projectColors.length];

  // Get next/prev projects for navigation
  const nextProject = projects[(projectIndex + 1) % projects.length];
  const prevProject = projects[(projectIndex - 1 + projects.length) % projects.length];

  if (!project) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-display font-bold mb-4">Project Not Found</h1>
          <Link to="/projects" className="text-primary hover:underline">
            Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-20 relative overflow-hidden">
          {/* Background gradient */}
          <div className={`absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br ${gradientClass} opacity-10 blur-[100px]`} />
          
          <div className="container-wide relative z-10">
            {/* Back Link */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-12"
            >
              <Link
                to="/projects"
                className="group inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                <span className="text-sm">Back to Projects</span>
              </Link>
            </motion.div>

            {/* Project Header */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
              <div>
                {/* Category Badge */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="mb-6"
                >
                  <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
                    <Tag className="w-3.5 h-3.5" />
                    {project.category}
                  </span>
                </motion.div>

                {/* Title */}
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                  className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display font-bold leading-[1.1] mb-6"
                >
                  {project.title}
                </motion.h1>

                {/* Description */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="text-xl text-muted-foreground leading-relaxed"
                >
                  {project.description}
                </motion.p>
              </div>

              {/* Project Meta */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="lg:pt-8"
              >
                <div className="bg-card border border-border rounded-2xl p-8 space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                        <User className="w-5 h-5 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground uppercase tracking-wider">Client</p>
                        <p className="font-medium">{project.clientName || "Confidential"}</p>
                      </div>
                    </div>

                    <div className="w-full h-px bg-border" />

                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                        <Tag className="w-5 h-5 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground uppercase tracking-wider">Category</p>
                        <p className="font-medium">{project.category}</p>
                      </div>
                    </div>

                    <div className="w-full h-px bg-border" />

                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                        <Calendar className="w-5 h-5 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground uppercase tracking-wider">Year</p>
                        <p className="font-medium">2024</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Featured Image */}
        <section className="pb-20">
          <div className="container-wide">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative aspect-[16/9] rounded-3xl overflow-hidden bg-card border border-border"
            >
              <img
                src={project.coverImage}
                alt={project.title}
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </section>

        {/* Project Details */}
        <section className="py-20 border-t border-border">
          <div className="container-wide">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-20">
              {/* Left Column - Labels */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <p className="text-primary font-medium tracking-[0.3em] uppercase text-xs mb-4">
                  The Challenge
                </p>
                <h2 className="text-3xl md:text-4xl font-display font-bold">
                  Project Overview
                </h2>
              </motion.div>

              {/* Right Column - Content */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="lg:col-span-2 space-y-6"
              >
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {project.description} Our team approached this project with a focus on innovation and user-centered design, ensuring every aspect of the solution addressed real user needs while pushing the boundaries of what's possible.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Through extensive research and iterative design processes, we developed a comprehensive solution that not only met but exceeded our client's expectations. The result is a product that seamlessly blends form and function.
                </p>

                {/* Key Highlights */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-8">
                  {["Strategy & Planning", "Design & Prototyping", "Development", "Launch & Support"].map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                      <span className="text-foreground">{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section className="py-20 bg-card/50">
          <div className="container-wide">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-12"
            >
              <p className="text-primary font-medium tracking-[0.3em] uppercase text-xs mb-4">
                Visual Journey
              </p>
              <h2 className="text-3xl md:text-4xl font-display font-bold">
                Project Gallery
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {project.images.length > 0 ? (
                project.images.map((image, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className={`relative rounded-2xl overflow-hidden bg-card border border-border ${
                      index === 0 ? "md:col-span-2 aspect-[21/9]" : "aspect-[4/3]"
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${project.title} - Image ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                ))
              ) : (
                [1, 2, 3].map((item, index) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className={`relative rounded-2xl overflow-hidden bg-card border border-border ${
                      index === 0 ? "md:col-span-2 aspect-[21/9]" : "aspect-[4/3]"
                    }`}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${gradientClass} opacity-20`} />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-4xl font-display font-bold text-foreground/10">
                        0{item}
                      </span>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </div>
        </section>

        {/* Results Section */}
        <section className="py-20 border-t border-border">
          <div className="container-wide">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-20">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <p className="text-primary font-medium tracking-[0.3em] uppercase text-xs mb-4">
                  The Results
                </p>
                <h2 className="text-3xl md:text-4xl font-display font-bold">
                  Impact & Outcomes
                </h2>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="lg:col-span-2"
              >
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
                  {[
                    { value: "150%", label: "Increase in Engagement" },
                    { value: "2.5x", label: "Revenue Growth" },
                    { value: "40%", label: "Cost Reduction" },
                  ].map((stat, index) => (
                    <div key={index} className="text-center sm:text-left">
                      <p className="text-4xl md:text-5xl font-display font-bold text-primary mb-2">
                        {stat.value}
                      </p>
                      <p className="text-muted-foreground text-sm">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Navigation */}
        <section className="py-20 border-t border-border">
          <div className="container-wide">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Previous Project */}
              <Link
                to={`/projects/${prevProject.slug}`}
                className="group relative bg-card border border-border rounded-2xl p-8 hover:border-primary/50 transition-all duration-300"
              >
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">
                  Previous Project
                </p>
                <h3 className="text-2xl font-display font-bold group-hover:text-primary transition-colors">
                  {prevProject.title}
                </h3>
                <div className="absolute top-8 right-8 w-10 h-10 rounded-full bg-secondary flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowLeft className="w-5 h-5" />
                </div>
              </Link>

              {/* Next Project */}
              <Link
                to={`/projects/${nextProject.slug}`}
                className="group relative bg-card border border-border rounded-2xl p-8 hover:border-primary/50 transition-all duration-300 text-right"
              >
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">
                  Next Project
                </p>
                <h3 className="text-2xl font-display font-bold group-hover:text-primary transition-colors">
                  {nextProject.title}
                </h3>
                <div className="absolute top-8 left-8 w-10 h-10 rounded-full bg-secondary flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowUpRight className="w-5 h-5" />
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-card/50">
          <div className="container-wide text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-6">
                Ready to start your project?
              </h2>
              <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
                Let's create something extraordinary together. Get in touch to discuss your next big idea.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-full font-medium hover:bg-primary/90 transition-colors"
              >
                Start a Project
                <ArrowUpRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ProjectDetail;
