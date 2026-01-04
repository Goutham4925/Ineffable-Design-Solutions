import { motion } from "framer-motion";
import {
  Plus,
  Edit,
  Trash2,
  Search,
  GripVertical,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";


const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

type Service = {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  longDescription?: string;
  features: string[];
  image: string;
  icon: string;
  accentColor: string;
  order: number;
};

const emptyForm = {
  title: "",
  slug: "",
  tagline: "",
  description: "",
  longDescription: "",
  features: "",
  image: "",
  icon: "Code",
  accentColor: "service-default",
};

const AdminServices = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [form, setForm] = useState<any>(emptyForm);
  const [saving, setSaving] = useState(false);

  /* ================= FETCH SERVICES ================= */
  useEffect(() => {
    fetch(`${API_BASE}/api/services`)
      .then((res) => res.json())
      .then(setServices)
      .finally(() => setLoading(false));
  }, []);

  /* ================= CREATE / UPDATE ================= */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const payload = {
      title: form.title,
      slug: form.slug,
      tagline: form.tagline,
      description: form.description,
      longDescription: form.longDescription || null,
      features: form.features.split(",").map((f: string) => f.trim()),
      image: form.image,
      icon: form.icon,
      accentColor: form.accentColor,
      order: editingService ? editingService.order : services.length + 1,
    };

    const url = editingService
      ? `${API_BASE}/api/services/${editingService.id}`
      : `${API_BASE}/api/services`;

    const method = editingService ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const saved = await res.json();

    setServices((prev) =>
      editingService
        ? prev.map((s) => (s.id === saved.id ? saved : s))
        : [...prev, saved]
    );

    setForm(emptyForm);
    setEditingService(null);
    setIsModalOpen(false);
    setSaving(false);
  };

  /* ================= DELETE ================= */
  const handleDelete = async (id: string) => {
    if (!confirm("Delete this service?")) return;

    await fetch(`${API_BASE}/api/services/${id}`, { method: "DELETE" });
    setServices((prev) => prev.filter((s) => s.id !== id));
  };

  const filteredServices = services.filter((s) =>
    s.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      {/* ================= HEADER ================= */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-display font-bold">Services</h1>
          <p className="text-muted-foreground">
            Manage your service offerings
          </p>
        </div>

        <button
          className="btn-primary"
          onClick={() => {
            setEditingService(null);
            setForm(emptyForm);
            setIsModalOpen(true);
          }}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Service
        </button>
      </div>

      {/* ================= SEARCH ================= */}
      <div className="mb-6 max-w-md relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <input
          className="w-full pl-10 pr-4 py-3 rounded-lg bg-card border border-border"
          placeholder="Search services..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* ================= TABLE ================= */}
      <div className="rounded-2xl border border-border overflow-hidden">
        <table className="w-full">
          <thead className="bg-secondary/50">
            <tr>
              <th className="px-6 py-4 text-left">Order</th>
              <th className="px-6 py-4 text-left">Service</th>
              <th className="px-6 py-4 hidden md:table-cell">Tagline</th>
              <th className="px-6 py-4 hidden lg:table-cell">Features</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center">
                  Loading services...
                </td>
              </tr>
            ) : (
              filteredServices.map((service, index) => (
                <motion.tr
                  key={service.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.03 }}
                  className="border-t border-border"
                >
                  <td className="px-6 py-4">{service.order}</td>

                  <td className="px-6 py-4">
                    <div className="flex gap-4 items-center">
                      <img
                        src={service.image}
                        className="w-10 h-10 rounded"
                      />
                      <div>
                        <p className="font-semibold">{service.title}</p>
                        <p className="text-sm text-muted-foreground">
                          {service.slug}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4 hidden md:table-cell">
                    {service.tagline}
                  </td>

                  <td className="px-6 py-4 hidden lg:table-cell">
                    {service.features.length}
                  </td>

                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => {
                          setEditingService(service);
                          setForm({
                            ...service,
                            features: service.features.join(", "),
                          });
                          setIsModalOpen(true);
                        }}
                        className="p-2 hover:text-primary"
                      >
                        <Edit />
                      </button>

                      <button
                        onClick={() => handleDelete(service.id)}
                        className="p-2 hover:text-destructive"
                      >
                        <Trash2 />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* ================= MODAL ================= */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-display">
              {editingService ? "Edit Service" : "Create Service"}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* ================= BASIC INFO ================= */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase">
                Basic Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Title</Label>
                  <Input
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <Label>Slug</Label>
                  <Input
                    value={form.slug}
                    onChange={(e) => setForm({ ...form, slug: e.target.value })}
                    placeholder="software-development"
                    required
                  />
                </div>
              </div>

              <div>
                <Label>Tagline</Label>
                <Input
                  value={form.tagline}
                  onChange={(e) => setForm({ ...form, tagline: e.target.value })}
                  required
                />
              </div>
            </div>

            {/* ================= CONTENT ================= */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase">
                Content
              </h3>

              <div>
                <Label>Short Description</Label>
                <Textarea
                  rows={3}
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                  required
                />
              </div>

              <div>
                <Label>Long Description (Detail Page)</Label>
                <Textarea
                  rows={5}
                  value={form.longDescription}
                  onChange={(e) =>
                    setForm({ ...form, longDescription: e.target.value })
                  }
                />
              </div>

              <div>
                <Label>Features (comma separated)</Label>
                <Input
                  value={form.features}
                  onChange={(e) => setForm({ ...form, features: e.target.value })}
                  placeholder="API Development, Cloud Architecture, DevOps"
                  required
                />
              </div>
            </div>

            {/* ================= MEDIA & STYLE ================= */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase">
                Media & Style
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2">
                  <Label>Image URL</Label>
                  <Input
                    value={form.image}
                    onChange={(e) => setForm({ ...form, image: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <Label>Icon</Label>
                  <Input
                    value={form.icon}
                    onChange={(e) => setForm({ ...form, icon: e.target.value })}
                    placeholder="Code"
                  />
                </div>
              </div>

              <div>
                <Label>Accent Color</Label>
                <Input
                  value={form.accentColor}
                  onChange={(e) =>
                    setForm({ ...form, accentColor: e.target.value })
                  }
                  placeholder="service-software"
                />
              </div>
            </div>

            {/* ================= ACTIONS ================= */}
            <DialogFooter className="pt-6">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </Button>

              <Button type="submit" disabled={saving}>
                {saving
                  ? "Saving..."
                  : editingService
                  ? "Update Service"
                  : "Create Service"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminServices;
