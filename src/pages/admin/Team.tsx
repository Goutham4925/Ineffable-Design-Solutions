import { motion } from "framer-motion";
import { Plus, Edit, Trash2, Search, Upload } from "lucide-react";
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
type TeamMember = {
  id: string;
  name: string;
  role: string;
  bio: string;
  avatar: string;
};

const emptyForm = {
  name: "",
  role: "",
  bio: "",
  avatar: "",
};

const AdminTeam = () => {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const token = localStorage.getItem("admin_token");

  /* ================= FETCH TEAM ================= */
  const fetchTeam = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/api/team`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setMembers(Array.isArray(data) ? data : []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeam();
  }, []);

  /* ================= FILTER ================= */
  const filteredMembers = useMemo(() => {
    return members.filter(
      (m) =>
        m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.role.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [members, searchQuery]);

  /* ================= CLOUDINARY UPLOAD (FIXED) ================= */
  const uploadAvatar = async (files: FileList) => {
    try {
      setUploading(true);

      const data = new FormData();
      Array.from(files).forEach((file) =>
        data.append("images", file) // ✅ MUST be "images"
      );

      const res = await fetch(`${API_BASE}/api/upload`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: data,
      });

      if (!res.ok) throw new Error("Upload failed");

      const json = await res.json();

      // ✅ take first image as avatar
      setForm((prev) => ({
        ...prev,
        avatar: json.urls[0],
      }));
    } catch (err) {
      alert("Avatar upload failed");
    } finally {
      setUploading(false);
    }
  };

  /* ================= CREATE ================= */
  const createMember = async () => {
    if (!form.name || !form.role || !form.avatar) {
      alert("Name, Role & Avatar are required");
      return;
    }

    try {
      setSaving(true);

      await fetch(`${API_BASE}/api/team`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      setForm(emptyForm);
      setOpen(false);
      fetchTeam();
    } finally {
      setSaving(false);
    }
  };

  /* ================= DELETE ================= */
  const deleteMember = async (id: string) => {
    if (!confirm("Delete this team member?")) return;

    await fetch(`${API_BASE}/api/team/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setMembers((prev) => prev.filter((m) => m.id !== id));
  };

  return (
    <div>
      {/* HEADER */}
      <div className="flex justify-between mb-8">
        <div>
          <h1 className="text-3xl font-display font-bold">Team</h1>
          <p className="text-muted-foreground">
            Manage your team members
          </p>
        </div>

        <Button onClick={() => setOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add Team Member
        </Button>
      </div>

      {/* SEARCH */}
      <div className="mb-6 relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <input
          className="w-full pl-10 pr-4 py-3 rounded-lg bg-card border border-border"
          placeholder="Search team members..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* GRID */}
      {!loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredMembers.map((m, i) => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="rounded-2xl border border-border bg-card overflow-hidden"
            >
              <div className="relative aspect-square">
                <img
                  src={m.avatar}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-background/80 opacity-0 hover:opacity-100 flex items-center justify-center transition">
                  <button onClick={() => deleteMember(m.id)}>
                    <Trash2 className="w-5 h-5 text-destructive" />
                  </button>
                </div>
              </div>

              <div className="p-4 text-center">
                <h3 className="font-semibold">{m.name}</h3>
                <p className="text-primary text-sm">{m.role}</p>
                <p className="text-muted-foreground text-sm line-clamp-2">
                  {m.bio}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* ADD MODAL */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Team Member</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            {form.avatar && (
              <img
                src={form.avatar}
                className="w-24 h-24 rounded-full mx-auto object-cover"
              />
            )}

            <label className="flex items-center justify-center gap-2 border border-dashed border-border rounded-lg p-4 cursor-pointer hover:bg-secondary">
              <Upload className="w-4 h-4" />
              {uploading ? "Uploading…" : "Upload Avatar"}
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={(e) =>
                  e.target.files && uploadAvatar(e.target.files)
                }
              />
            </label>

            <Input
              placeholder="Name"
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
            />
            <Input
              placeholder="Role"
              value={form.role}
              onChange={(e) =>
                setForm({ ...form, role: e.target.value })
              }
            />
            <Textarea
              placeholder="Bio"
              value={form.bio}
              onChange={(e) =>
                setForm({ ...form, bio: e.target.value })
              }
            />

            <div className="flex justify-end gap-2">
              <Button
                variant="secondary"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={createMember}
                disabled={saving || uploading}
              >
                {saving ? "Saving…" : "Create"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminTeam;
