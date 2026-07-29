import type { Metadata } from "next";
import NotFoundClient from "@/components/NotFoundClient";

export const metadata: Metadata = {
  title: "Page Not Found | Ineffable Design Solutions",
  robots: "noindex, nofollow",
};

export default function NotFound() {
  return <NotFoundClient />;
}
