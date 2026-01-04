import { useEffect, useState } from "react";
import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

/* ================= TYPES ================= */
type AdminUser = {
  id: string;
  name: string;
  email: string;
  role: "ADMIN" | "SUPER_ADMIN";
  approved: boolean;
};

const AdminUsers = () => {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  const token = localStorage.getItem("admin_token");

  /* ================= FETCH USERS ================= */
  const fetchUsers = async () => {
    try {
      setLoading(true);

      if (!token) {
        setUsers([]);
        return;
      }

      const res = await fetch(`${API_BASE}/api/admin-users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        console.error("Fetch admins failed:", res.status);
        setUsers([]);
        return;
      }

      const data = await res.json();

      // ✅ HARD SAFETY CHECK
      setUsers(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Fetch admins error:", err);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  /* ================= APPROVE ================= */
  const approveUser = async (id: string) => {
    try {
      setActionLoading(true);

      await fetch(`${API_BASE}/api/admin-users/${id}/approve`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      await fetchUsers();
    } finally {
      setActionLoading(false);
    }
  };

  /* ================= REJECT ================= */
  const rejectUser = async (id: string) => {
    if (!confirm("Reject this admin request?")) return;

    try {
      setActionLoading(true);

      await fetch(`${API_BASE}/api/admin-users/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      await fetchUsers();
    } finally {
      setActionLoading(false);
    }
  };

  /* ================= UI ================= */
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-display font-bold">Admin Users</h1>
        <p className="text-muted-foreground">
          Approve or manage admin accounts
        </p>
      </div>

      {/* Loading */}
      {loading && (
        <div className="text-muted-foreground">Loading admins…</div>
      )}

      {/* Empty */}
      {!loading && users.length === 0 && (
        <div className="text-muted-foreground">
          No admin users found
        </div>
      )}

      {/* Users */}
      {!loading && users.length > 0 && (
        <div className="grid gap-4">
          {users.map((user) => (
            <Card key={user.id}>
              <CardContent className="flex items-center justify-between p-6">
                <div>
                  <p className="font-medium">{user.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {user.email} • {user.role}
                  </p>
                </div>

                {!user.approved ? (
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      disabled={actionLoading}
                      onClick={() => approveUser(user.id)}
                    >
                      <Check className="w-4 h-4 mr-1" />
                      Approve
                    </Button>

                    <Button
                      size="sm"
                      variant="destructive"
                      disabled={actionLoading}
                      onClick={() => rejectUser(user.id)}
                    >
                      <X className="w-4 h-4 mr-1" />
                      Reject
                    </Button>
                  </div>
                ) : (
                  <span className="text-sm text-green-600 font-medium">
                    Approved
                  </span>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminUsers;
