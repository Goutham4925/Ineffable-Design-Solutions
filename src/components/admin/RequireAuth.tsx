import { Navigate } from "react-router-dom";

type RequireAuthProps = {
  children: JSX.Element;
  role?: "ADMIN" | "SUPER_ADMIN"; // optional
};

export default function RequireAuth({
  children,
  role,
}: RequireAuthProps) {
  const token = localStorage.getItem("admin_token");
  const userRole = localStorage.getItem("admin_role");

  /* 🔐 Not logged in */
  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }

  /* 🔐 Role check (only if role is required) */
  if (role && userRole !== role) {
    return <Navigate to="/admin" replace />;
  }

  return children;
}
