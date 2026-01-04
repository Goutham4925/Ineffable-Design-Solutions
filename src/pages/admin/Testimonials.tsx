import { motion } from "framer-motion";
import { Plus, Edit, Trash2, Search, Quote } from "lucide-react";
import { useState } from "react";
import { testimonials } from "@/data/testimonials";

const AdminTestimonials = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTestimonials = testimonials.filter(testimonial =>
    testimonial.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    testimonial.company.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-display font-bold mb-2">Testimonials</h1>
          <p className="text-muted-foreground">Manage client testimonials</p>
        </div>
        <button className="btn-primary">
          <Plus className="w-4 h-4 mr-2" />
          Add Testimonial
        </button>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search testimonials..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-lg bg-card border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
          />
        </div>
      </div>

      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredTestimonials.map((testimonial, index) => (
          <motion.div
            key={testimonial.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="rounded-2xl border border-border p-6 bg-card group relative"
          >
            {/* Actions */}
            <div className="absolute top-4 right-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="p-2 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors">
                <Edit className="w-4 h-4" />
              </button>
              <button className="p-2 rounded-lg bg-secondary hover:bg-destructive/10 hover:text-destructive transition-colors">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            {/* Quote Icon */}
            <Quote className="w-8 h-8 text-primary/30 mb-4" />

            {/* Message */}
            <p className="text-foreground mb-6 line-clamp-4">"{testimonial.message}"</p>

            {/* Author */}
            <div className="flex items-center gap-4">
              <img
                src={testimonial.avatar}
                alt={testimonial.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <p className="font-semibold">{testimonial.name}</p>
                <p className="text-muted-foreground text-sm">
                  {testimonial.role}, {testimonial.company}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredTestimonials.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No testimonials found matching your search.</p>
        </div>
      )}
    </div>
  );
};

export default AdminTestimonials;
