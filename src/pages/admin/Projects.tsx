import { motion } from "framer-motion";
import { Plus, Edit, Trash2, Search, Star } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
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
  year: string;
  category: string;
  description: string;
  thumbnail: string;
  images: string[];
  featured: boolean;
  services?: { serviceId: string }[];
};

type Service = {
  id: string;
  title: string;
};

type ProjectForm = {
  title: string;
  slug: string;
  client: string;
  year: string;
  category: string;
  description: string;
  thumbnail: string;
  images: string[];
  featured: boolean;
  services: string[];
};

const emptyForm: ProjectForm = {
  title: "",
  slug: "",
  client: "",
  year: "",
  category: "",
  description: "",
  thumbnail: "",
  images: [],
  featured: false,
  services: [],
};

export default function AdminProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterService, setFilterService] = useState("all");
  const [loading, setLoading] = useState(true);

  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<ProjectForm>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  /* ================= FETCH ================= */
  useEffect(() => {
    Promise.all([
      fetch(`${API_BASE}/api/projects`).then((r) => r.json()),
      fetch(`${API_BASE}/api/services`).then((r) => r.json()),
    ])
      .then(([p, s]) => {
        setProjects(p || []);
        setServices(s || []);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  /* ================= CLOUDINARY UPLOAD ================= */
  const uploadImages = async (files: FileList) => {
    const data = new FormData();
    Array.from(files).forEach((file) => data.append("images", file));

    const res = await fetch(`${API_BASE}/api/upload`, {
      method: "POST",
      body: data,
    });

    if (!res.ok) {
      throw new Error("Image upload failed");
    }

    const json = await res.json();
    return json.urls as string[];
  };

  /* ================= FILTER ================= */
  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      const matchesSearch = `${p.title} ${p.client}`
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
    if (!form.title || !form.client || !form.year || !form.thumbnail) {
      alert("Title, Client, Year and Thumbnail are required");
      return;
    }

    setSaving(true);

    const payload = {
      ...form,
      images: form.images ?? [],
      slug:
        form.slug ||
        form.title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, ""),
    };

    try {
      const res = await fetch(
        editingId
          ? `${API_BASE}/api/projects/${editingId}`
          : `${API_BASE}/api/projects`,
        {
          method: editingId ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (!res.ok) throw new Error("Save failed");

      const saved = await res.json();

      setProjects((prev) =>
        editingId
          ? prev.map((p) => (p.id === saved.id ? saved : p))
          : [saved, ...prev]
      );

      setForm(emptyForm);
      setEditingId(null);
      setOpen(false);
    } catch (err) {
      console.error(err);
      alert("Failed to save project");
    } finally {
      setSaving(false);
    }
  };

  /* ================= DELETE ================= */
  const handleDelete = async (id: string) => {
    if (!confirm("Delete this project?")) return;
    await fetch(`${API_BASE}/api/projects/${id}`, { method: "DELETE" });
    setProjects((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div>
      {/* HEADER */}
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

      {/* SEARCH + FILTER */}
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

      {/* GRID */}
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
                        title: project.title,
                        slug: project.slug,
                        client: project.client,
                        year: project.year,
                        category: project.category,
                        description: project.description,
                        thumbnail: project.thumbnail,
                        images: project.images || [],
                        featured: project.featured,
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

      {/* MODAL */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingId ? "Edit Project" : "Add Project"}
            </DialogTitle>
            <DialogDescription>
              Fields marked * are required.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <Input placeholder="Title *" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
              <Input placeholder="Slug (auto)" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} />
              <Input placeholder="Client *" value={form.client} onChange={(e) => setForm({ ...form, client: e.target.value })} />
              <Input placeholder="Year *" value={form.year} onChange={(e) => setForm({ ...form, year: e.target.value })} />
              <Input placeholder="Category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
            </div>

            {/* THUMBNAIL */}
            <div>
              <p className="text-sm font-medium mb-2">Thumbnail *</p>
              {form.thumbnail && (
                <img src={form.thumbnail} className="h-40 rounded border mb-2 object-cover" />
              )}
              <input
                type="file"
                accept="image/*"
                onChange={async (e) => {
                  if (!e.target.files?.length) return;
                  const urls = await uploadImages(e.target.files);
                  setForm({ ...form, thumbnail: urls[0] });
                }}
              />
            </div>

            {/* GALLERY */}
            <div>
              <p className="text-sm font-medium mb-2">Gallery Images</p>
              <div className="grid grid-cols-4 gap-2 mb-2">
                {form.images.map((img, i) => (
                  <div key={i} className="relative">
                    <img src={img} className="h-24 w-full rounded border object-cover" />
                    <button
                      onClick={() =>
                        setForm({
                          ...form,
                          images: form.images.filter((_, idx) => idx !== i),
                        })
                      }
                      className="absolute top-1 right-1 bg-black/70 text-white text-xs px-1 rounded"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>

              <input
                type="file"
                multiple
                accept="image/*"
                onChange={async (e) => {
                  if (!e.target.files?.length) return;
                  const urls = await uploadImages(e.target.files);
                  setForm({ ...form, images: [...form.images, ...urls] });
                }}
              />
            </div>

            <Textarea
              placeholder="Description"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />

            <label className="flex items-center gap-2">
              <Checkbox
                checked={form.featured}
                onCheckedChange={(v) =>
                  setForm({ ...form, featured: Boolean(v) })
                }
              />
              Featured project
            </label>

            <div className="flex justify-end pt-4 border-t">
              <Button onClick={handleSubmit} disabled={saving}>
                {saving
                  ? "Saving…"
                  : editingId
                  ? "Save Changes"
                  : "Create Project"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
