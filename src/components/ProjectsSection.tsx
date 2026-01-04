import { motion } from "framer-motion";
import { useState } from "react";
import { projects, categories } from "@/data/projects";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

const ProjectsSection = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects = activeCategory === "All"
    ? projects.filter(p => p.featured)
    : projects.filter(p => p.featured && p.category === activeCategory);

  const projectColors = [
    "from-cyan-500 to-blue-500",
    "from-violet-500 to-purple-500",
    "from-pink-500 to-rose-500",
    "from-amber-500 to-orange-500",
    "from-green-500 to-emerald-500",
    "from-blue-500 to-indigo-500",
  ];

  return (
    <section className="section-padding relative overflow-hidden bg-card/50">
      <div className="container-wide">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-primary font-medium tracking-[0.3em] uppercase text-xs mb-4">
              Featured Work
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold">
              Our Projects
            </h2>
          </motion.div>

          {/* Category Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-wrap gap-2"
          >
            {categories.slice(0, 5).map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-xs font-medium tracking-wide transition-all ${
                  activeCategory === category
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }`}
              >
                {category}
              </button>
            ))}
          </motion.div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <Link to={`/projects/${project.slug}`} className="block">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-card border border-border">
                  {/* Gradient Background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${projectColors[index % projectColors.length]} opacity-20 group-hover:opacity-30 transition-opacity`} />
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center transform scale-0 group-hover:scale-100 transition-transform duration-500">
                      <ArrowUpRight className="w-6 h-6 text-primary-foreground" />
                    </div>
                  </div>

                  {/* Category Badge */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="px-3 py-1 rounded-full bg-background/80 backdrop-blur-sm text-xs font-medium">
                      {project.category}
                    </span>
                  </div>
                </div>

                {/* Project Info */}
                <div className="mt-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-display font-semibold group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                  <p className="text-muted-foreground text-sm">
                    {project.clientName}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* View All CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mt-16"
        >
          <Link to="/projects" className="btn-outline">
            View All Projects
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;
