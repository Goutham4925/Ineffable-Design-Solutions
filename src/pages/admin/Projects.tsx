import { motion } from "framer-motion";
import { Plus, Edit, Trash2, Search, Star } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

/* ================= TYPES ================= */
type Project = {
  id: string;
  slug: string;
  title: string;
  client: string;
  category: string;
  year: string;
  description: string;
  thumbnail: string;
  featured: boolean;
  services?: { serviceId: string }[];
};

type Service = {
  id: string;
  title: string;
};

/* ================= FORM ================= */
const emptyForm = {
  title: "",
  slug: "",
  client: "",
  category: "",
  year: "",
  description: "",
  thumbnail: "",
  featured: false,
  services: [] as string[],
};

export default function AdminProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterService, setFilterService] = useState("all");
  const [loading, setLoading] = useState(true);

  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  /* ================= FETCH ================= */
  useEffect(() => {
    Promise.all([
      fetch(`${API_BASE}/api/projects`).then((r) => r.json()),
      fetch(`${API_BASE}/api/services`).then((r) => r.json()),
    ])
      .then(([projectsData, servicesData]) => {
        setProjects(projectsData);
        setServices(servicesData);
      })
      .finally(() => setLoading(false));
  }, []);

  /* ================= FILTER ================= */
  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      const matchesSearch =
        `${p.title} ${p.client}`
          .toLowerCase()
          .includes(searchQuery.toLowerCase());

      const matchesService =
        filterService === "all" ||
        p.services?.some((s) => s.serviceId === filterService);

      return matchesSearch && matchesService;
    });
  }, [projects, searchQuery, filterService]);

  /* ================= CREATE / UPDATE ================= */
  const handleSubmit = async () => {
    if (!form.title || !form.client || !form.year) {
      alert("Title, Client and Year are required");
      return;
    }

    setSaving(true);

    const payload = {
      ...form,
      slug:
        form.slug ||
        form.title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, ""),
    };

    const url = editingId
      ? `${API_BASE}/api/projects/${editingId}`
      : `${API_BASE}/api/projects`;

    const method = editingId ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const saved = await res.json();

    setProjects((prev) =>
      editingId
        ? prev.map((p) => (p.id === saved.id ? saved : p))
        : [saved, ...prev]
    );

    setForm(emptyForm);
    setEditingId(null);
    setOpen(false);
    setSaving(false);
  };

  /* ================= DELETE ================= */
  const handleDelete = async (id: string) => {
    if (!confirm("Delete this project?")) return;
    await fetch(`${API_BASE}/api/projects/${id}`, { method: "DELETE" });
    setProjects((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div>
      {/* ================= HEADER ================= */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-display font-bold">Projects</h1>
          <p className="text-muted-foreground">
            Manage your portfolio projects
          </p>
        </div>

        <Button
          onClick={() => {
            setForm(emptyForm);
            setEditingId(null);
            setOpen(true);
          }}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Project
        </Button>
      </div>

      {/* ================= SEARCH + FILTER ================= */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative max-w-md w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            className="w-full pl-10 pr-4 py-3 rounded-lg bg-card border border-border"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <select
          className="px-4 py-3 rounded-lg bg-card border border-border"
          value={filterService}
          onChange={(e) => setFilterService(e.target.value)}
        >
          <option value="all">All Services</option>
          {services.map((s) => (
            <option key={s.id} value={s.id}>
              {s.title}
            </option>
          ))}
        </select>
      </div>

      {/* ================= GRID ================= */}
      {loading ? (
        <div className="py-12 text-center text-muted-foreground">
          Loading projects…
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="rounded-2xl border border-border bg-card overflow-hidden group"
            >
              <div className="relative aspect-video">
                <img
                  src={project.thumbnail}
                  className="w-full h-full object-cover"
                />

                {project.featured && (
                  <div className="absolute top-3 left-3 px-2 py-1 bg-primary text-primary-foreground text-xs rounded-full flex items-center gap-1">
                    <Star className="w-3 h-3" />
                    Featured
                  </div>
                )}

                <div className="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-2 transition-opacity">
                  <button
                    onClick={() => {
                      setForm({
                        ...project,
                        services:
                          project.services?.map((s) => s.serviceId) || [],
                      });
                      setEditingId(project.id);
                      setOpen(true);
                    }}
                    className="p-3 rounded-full bg-card"
                  >
                    <Edit className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => handleDelete(project.id)}
                    className="p-3 rounded-full bg-card hover:text-destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="p-4">
                <h3 className="font-semibold">{project.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {project.client}
                </p>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {project.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* ================= MODAL ================= */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {editingId ? "Edit Project" : "Add Project"}
            </DialogTitle>
          </DialogHeader>

          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Title *"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
            <Input
              placeholder="Slug (auto)"
              value={form.slug}
              onChange={(e) => setForm({ ...form, slug: e.target.value })}
            />
            <Input
              placeholder="Client *"
              value={form.client}
              onChange={(e) => setForm({ ...form, client: e.target.value })}
            />
            <Input
              placeholder="Year *"
              value={form.year}
              onChange={(e) => setForm({ ...form, year: e.target.value })}
            />
            <Input
              placeholder="Category (optional)"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
            />
            <Input
              placeholder="Thumbnail URL"
              value={form.thumbnail}
              onChange={(e) =>
                setForm({ ...form, thumbnail: e.target.value })
              }
            />
          </div>

          <Textarea
            className="mt-4"
            placeholder="Description"
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
          />

          <label className="flex items-center gap-2 mt-4">
            <Checkbox
              checked={form.featured}
              onCheckedChange={(v) =>
                setForm({ ...form, featured: Boolean(v) })
              }
            />
            Featured project
          </label>

          <div className="mt-4 space-y-2">
            <p className="text-sm font-medium">Services</p>
            <div className="grid grid-cols-2 gap-2">
              {services.map((service) => (
                <label key={service.id} className="flex items-center gap-2">
                  <Checkbox
                    checked={form.services.includes(service.id)}
                    onCheckedChange={(checked) =>
                      setForm({
                        ...form,
                        services: checked
                          ? [...form.services, service.id]
                          : form.services.filter((id) => id !== service.id),
                      })
                    }
                  />
                  {service.title}
                </label>
              ))}
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <Button onClick={handleSubmit} disabled={saving}>
              {saving
                ? editingId
                  ? "Saving…"
                  : "Creating…"
                : editingId
                ? "Save Changes"
                : "Create Project"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
