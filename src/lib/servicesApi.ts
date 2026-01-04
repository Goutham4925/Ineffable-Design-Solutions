const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

export async function getServices() {
  const res = await fetch(`${API_BASE}/api/services`);
  if (!res.ok) throw new Error("Failed to fetch services");
  return res.json();
}

export async function getServiceBySlug(slug: string) {
  const res = await fetch(`${API_BASE}/api/services/${slug}`);
  if (!res.ok) throw new Error("Service not found");
  return res.json();
}

export async function createService(data: any) {
  const res = await fetch(`${API_BASE}/api/services`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create service");
  return res.json();
}

export async function updateService(id: string, data: any) {
  const res = await fetch(`${API_BASE}/api/services/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update service");
  return res.json();
}

export async function deleteService(id: string) {
  const res = await fetch(`${API_BASE}/api/services/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete service");
}
