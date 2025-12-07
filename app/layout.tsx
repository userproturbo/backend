import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "../styles/globals.css";

const grotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-grotesk"
});

export const metadata: Metadata = {
  title: "Arefev.Pro — Shader Gallery",
  description: "WebGL shader gallery & viewer built with Next.js"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={grotesk.variable}>
      <body className="bg-surface text-white">{children}</body>
    </html>
  );
}
