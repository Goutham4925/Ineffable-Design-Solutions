import { useEffect, useState } from "react";
import { Check, X, ArrowUp, ArrowDown, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

type AdminUser = {
  id: string;
  name: string;
  email: string;
  role: "ADMIN" | "SUPER_ADMIN";
  approved: boolean;
};

export default function AdminUsers() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  const token = localStorage.getItem("admin_token");
  const myRole = localStorage.getItem("admin_role");

  const isSuperAdmin = myRole === "SUPER_ADMIN";

  const fetchUsers = async () => {
    setLoading(true);

    const res = await fetch(`${API_BASE}/api/admin-users`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await res.json();
    setUsers(Array.isArray(data) ? data : []);
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const approveUser = async (id: string) => {
    setActionLoading(true);
    await fetch(`${API_BASE}/api/admin-users/${id}/approve`, {
      method: "PUT",
      headers: { Authorization: `Bearer ${token}` },
    });
    await fetchUsers();
    setActionLoading(false);
  };

  const changeRole = async (id: string, role: "ADMIN" | "SUPER_ADMIN") => {
    setActionLoading(true);
    await fetch(`${API_BASE}/api/admin-users/${id}/role`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ role }),
    });
    await fetchUsers();
    setActionLoading(false);
  };

  const deleteUser = async (id: string) => {
    if (!confirm("Delete this admin?")) return;
    setActionLoading(true);
    await fetch(`${API_BASE}/api/admin-users/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    await fetchUsers();
    setActionLoading(false);
  };

  if (loading) return <p>Loading admins…</p>;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Admin Users</h1>

      {users.length === 0 && (
        <p className="text-muted-foreground">No admins found</p>
      )}

      <div className="grid gap-4">
        {users.map((u) => (
          <Card key={u.id}>
            <CardContent className="flex justify-between items-center p-6">
              <div>
                <p className="font-medium">{u.name}</p>
                <p className="text-sm text-muted-foreground">
                  {u.email} • {u.role} •{" "}
                  {u.approved ? "Approved" : "Pending"}
                </p>
              </div>

              <div className="flex gap-2">
                {!u.approved && (
                  <Button
                    size="sm"
                    onClick={() => approveUser(u.id)}
                    disabled={actionLoading}
                  >
                    <Check className="w-4 h-4 mr-1" /> Approve
                  </Button>
                )}

                {isSuperAdmin && u.approved && u.role === "ADMIN" && (
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => changeRole(u.id, "SUPER_ADMIN")}
                  >
                    <ArrowUp className="w-4 h-4 mr-1" /> Promote
                  </Button>
                )}

                {isSuperAdmin && u.approved && u.role === "SUPER_ADMIN" && (
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => changeRole(u.id, "ADMIN")}
                  >
                    <ArrowDown className="w-4 h-4 mr-1" /> Demote
                  </Button>
                )}

                {isSuperAdmin && (
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => deleteUser(u.id)}
                  >
                    <Trash className="w-4 h-4 mr-1" /> Delete
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
