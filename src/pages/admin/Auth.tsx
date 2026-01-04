import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function AdminAuth() {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  /* ================= SUBMIT ================= */
  const submit = async () => {
    if (!form.email || !form.password) {
      alert("Email and password are required");
      return;
    }

    if (mode === "signup" && !form.name) {
      alert("Name is required");
      return;
    }

    setLoading(true);

    const endpoint =
      mode === "login" ? "/api/auth/login" : "/api/auth/signup";

    try {
      const res = await fetch(`${API_BASE}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Something went wrong");
        return;
      }

      /* ================= LOGIN ================= */
      if (mode === "login") {
        // 🔐 Store auth data
        localStorage.setItem("admin_token", data.token);
        localStorage.setItem("admin_id", data.admin.id);
        localStorage.setItem("admin_role", data.admin.role);
        localStorage.setItem("admin_email", data.admin.email);

        // ✅ Redirect to admin dashboard
        window.location.replace("/admin");
      }

      /* ================= SIGNUP ================= */
      else {
        alert("Signup request sent. Await admin approval.");
        setMode("login");
        setForm({ name: "", email: "", password: "" });
      }
    } catch (err) {
      alert("Network error. Is the backend running?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-sm bg-card border border-border rounded-2xl p-8 space-y-4">
        <h1 className="text-2xl font-bold text-center">
          {mode === "login" ? "Admin Login" : "Request Admin Access"}
        </h1>

        {/* Name (Signup only) */}
        {mode === "signup" && (
          <Input
            placeholder="Name"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />
        )}

        <Input
          placeholder="Email"
          type="email"
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        <Input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        <Button
          className="w-full"
          onClick={submit}
          disabled={loading}
        >
          {loading
            ? "Please wait…"
            : mode === "login"
            ? "Login"
            : "Submit Request"}
        </Button>

        <p className="text-center text-sm text-muted-foreground">
          {mode === "login" ? (
            <>
              Don’t have access?{" "}
              <button
                className="text-primary underline"
                onClick={() => setMode("signup")}
              >
                Request account
              </button>
            </>
          ) : (
            <>
              Already approved?{" "}
              <button
                className="text-primary underline"
                onClick={() => setMode("login")}
              >
                Login
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
