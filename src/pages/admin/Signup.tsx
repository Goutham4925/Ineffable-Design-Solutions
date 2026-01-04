import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function AdminSignup() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const signup = async () => {
    const res = await fetch(`${API_BASE}/api/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    if (!res.ok) return alert(data.error);

    alert("Signup request sent. Await approval.");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-sm space-y-4 border border-border p-8 rounded-2xl bg-card">
        <h1 className="text-2xl font-bold text-center">Request Admin Access</h1>

        <Input placeholder="Name" onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <Input placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <Input type="password" placeholder="Password" onChange={(e) => setForm({ ...form, password: e.target.value })} />

        <Button className="w-full" onClick={signup}>
          Submit Request
        </Button>
      </div>
    </div>
  );
}
