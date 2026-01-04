const API_BASE = import.meta.env.VITE_API_URL;

export async function uploadSingleImage(file: File) {
  const formData = new FormData();
  formData.append("image", file);

  const res = await fetch(`${API_BASE}/api/upload/single`, {
    method: "POST",
    body: formData,
  });

  return res.json(); // { url }
}

export async function uploadMultipleImages(files: File[]) {
  const formData = new FormData();
  files.forEach((file) => formData.append("images", file));

  const res = await fetch(`${API_BASE}/api/upload/multiple`, {
    method: "POST",
    body: formData,
  });

  return res.json(); // [{ url }]
}
