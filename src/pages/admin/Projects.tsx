import { motion } from "framer-motion";
import { Plus, Edit, Trash2, Search, Star } from "lucide-react";
import { useState } from "react";
import { projects } from "@/data/projects";

const AdminProjects = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProjects = projects.filter(project =>
    project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.clientName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-display font-bold mb-2">Projects</h1>
          <p className="text-muted-foreground">Manage your portfolio projects</p>
        </div>
        <button className="btn-primary">
          <Plus className="w-4 h-4 mr-2" />
          Add Project
        </button>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-lg bg-card border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
          />
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="rounded-2xl border border-border overflow-hidden bg-card group"
          >
            {/* Image */}
            <div className="relative aspect-video">
              <img
                src={project.coverImage}
                alt={project.title}
                className="w-full h-full object-cover"
              />
              {project.featured && (
                <div className="absolute top-3 left-3 px-2 py-1 rounded-full bg-primary text-primary-foreground text-xs font-medium flex items-center gap-1">
                  <Star className="w-3 h-3" />
                  Featured
                </div>
              )}
              <div className="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <button className="p-3 rounded-full bg-card hover:bg-secondary transition-colors">
                  <Edit className="w-4 h-4" />
                </button>
                <button className="p-3 rounded-full bg-card hover:bg-destructive/10 hover:text-destructive transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-4">
              <div className="flex items-start justify-between gap-2 mb-2">
                <h3 className="font-semibold">{project.title}</h3>
                <span className="px-2 py-0.5 rounded-full bg-secondary text-xs text-muted-foreground">
                  {project.category}
                </span>
              </div>
              <p className="text-muted-foreground text-sm mb-2">{project.clientName}</p>
              <p className="text-muted-foreground text-sm line-clamp-2">{project.description}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No projects found matching your search.</p>
        </div>
      )}
    </div>
  );
};

export default AdminProjects;
