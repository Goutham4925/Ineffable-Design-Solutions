import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/components/providers";

export const metadata: Metadata = {
  title: {
    default: "Ineffable Design Solutions",
    template: "%s | Ineffable Design Solutions",
  },
  description:
    "Ineffable Design Solutions — a remote digital agency from India offering software development, UI/UX design, branding & AI automation, serving clients worldwide.",
  metadataBase: new URL("https://www.ineffabledesignsolutions.com"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background text-foreground antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
