import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "IronPulse | OpenAI Developer Showcase",
  description:
    "A cinematic engine assembly landing page built with Codex, Next.js, SVG, and GSAP ScrollTrigger.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
