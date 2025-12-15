import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SEO Brief Generator | AI-Powered Content Strategy",
  description:
    "Generate comprehensive SEO content briefs instantly with AI. Get meta titles, descriptions, content outlines, and keyword placement tips.",
  keywords: [
    "SEO",
    "content brief",
    "AI",
    "content strategy",
    "keyword research",
  ],
  authors: [{ name: "SEO Brief Generator" }],
  openGraph: {
    title: "SEO Brief Generator | AI-Powered Content Strategy",
    description:
      "Generate comprehensive SEO content briefs instantly with AI.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-gradient-to-br from-white via-brand-50/30 to-brand-100/20`}
      >
        {children}
      </body>
    </html>
  );
}
