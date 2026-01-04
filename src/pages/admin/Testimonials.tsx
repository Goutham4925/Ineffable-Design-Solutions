import { motion } from "framer-motion";
import { Plus, Edit, Trash2, Search, Quote } from "lucide-react";
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

type TestimonialForm = {
  quote: string;
  author: string;
  role: string;
  company: string;
  avatar?: string;
};

const emptyForm: TestimonialForm = {
  quote: "",
  author: "",
  role: "",
  company: "",
  avatar: "",
};

const AdminTestimonials = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<TestimonialForm>(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const token = localStorage.getItem("admin_token");

  /* ================= FETCH ================= */
  const fetchTestimonials = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/testimonials`);
      const data = await res.json();
      setTestimonials(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Fetch testimonials failed", err);
      setTestimonials([]);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  /* ================= FILTER ================= */
  const filtered = useMemo(() => {
    return testimonials.filter(
      (t) =>
        t.author.toLowerCase().includes(search.toLowerCase()) ||
        t.company.toLowerCase().includes(search.toLowerCase())
    );
  }, [testimonials, search]);

  /* ================= CLOUDINARY UPLOAD (FIXED) ================= */
  const uploadAvatar = async (file: File) => {
    const data = new FormData();
    data.append("images", file); // ✅ MUST MATCH PROJECTS

    const res = await fetch(`${API_BASE}/api/upload`, {
      method: "POST",
      body: data,
    });

    if (!res.ok) {
      throw new Error("Avatar upload failed");
    }

    const json = await res.json();
    return json.urls[0]; // ✅ SAME RESPONSE AS PROJECTS
  };

  /* ================= SAVE ================= */
  const save = async () => {
    if (!form.quote || !form.author || !form.company) {
      alert("Quote, Author, and Company are required");
      return;
    }

    setSaving(true);

    try {
      const method = editingId ? "PUT" : "POST";
      const url = editingId
        ? `${API_BASE}/api/testimonials/${editingId}`
        : `${API_BASE}/api/testimonials`;

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Save failed");

      setOpen(false);
      setEditingId(null);
      setForm(emptyForm);
      fetchTestimonials();
    } catch (err) {
      console.error(err);
      alert("Failed to save testimonial");
    } finally {
      setSaving(false);
    }
  };

  /* ================= DELETE ================= */
  const remove = async (id: string) => {
    if (!confirm("Delete this testimonial?")) return;

    await fetch(`${API_BASE}/api/testimonials/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    setTestimonials((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div>
      {/* ================= HEADER ================= */}
      <div className="flex justify-between mb-8">
        <div>
          <h1 className="text-3xl font-display font-bold">
            Testimonials
          </h1>
          <p className="text-muted-foreground">
            Manage client feedback
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
          Add Testimonial
        </Button>
      </div>

      {/* ================= SEARCH ================= */}
      <div className="relative max-w-md mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <input
          className="w-full pl-10 pr-4 py-3 rounded-lg bg-card border border-border"
          placeholder="Search testimonials..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* ================= GRID ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filtered.map((t, i) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="rounded-2xl border border-border p-6 bg-card relative group"
          >
            {/* Actions */}
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 flex gap-2">
              <button
                onClick={() => {
                  setForm({
                    quote: t.quote,
                    author: t.author,
                    role: t.role,
                    company: t.company,
                    avatar: t.avatar,
                  });
                  setEditingId(t.id);
                  setOpen(true);
                }}
              >
                <Edit className="w-4 h-4" />
              </button>
              <button onClick={() => remove(t.id)}>
                <Trash2 className="w-4 h-4 text-destructive" />
              </button>
            </div>

            <Quote className="w-8 h-8 text-primary/30 mb-4" />
            <p className="mb-6">“{t.quote}”</p>
            <p className="font-semibold">{t.author}</p>
            <p className="text-sm text-muted-foreground">
              {t.role}, {t.company}
            </p>
          </motion.div>
        ))}
      </div>

      {/* ================= MODAL ================= */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingId ? "Edit Testimonial" : "Add Testimonial"}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <Textarea
              placeholder="Quote *"
              value={form.quote}
              onChange={(e) =>
                setForm({ ...form, quote: e.target.value })
              }
            />

            <Input
              placeholder="Author *"
              value={form.author}
              onChange={(e) =>
                setForm({ ...form, author: e.target.value })
              }
            />

            <Input
              placeholder="Role"
              value={form.role}
              onChange={(e) =>
                setForm({ ...form, role: e.target.value })
              }
            />

            <Input
              placeholder="Company *"
              value={form.company}
              onChange={(e) =>
                setForm({ ...form, company: e.target.value })
              }
            />

            {/* Avatar Upload */}
            <input
              type="file"
              accept="image/*"
              onChange={async (e) => {
                if (!e.target.files?.length) return;
                const url = await uploadAvatar(e.target.files[0]);
                setForm({ ...form, avatar: url });
              }}
            />

            {form.avatar && (
              <img
                src={form.avatar}
                alt="Avatar preview"
                className="h-20 w-20 rounded-full object-cover border"
              />
            )}

            <Button
              onClick={save}
              disabled={saving}
              className="w-full"
            >
              {saving ? "Saving…" : "Save"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminTestimonials;
