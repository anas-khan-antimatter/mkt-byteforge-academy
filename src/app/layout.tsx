import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Byteforge Academy — Code Your Future",
  description:
    "Transform your career at Byteforge Academy. Intensive coding bootcamps in software engineering, data science, and AI. Terminal-ready, job-ready.",
  openGraph: {
    title: "Byteforge Academy — Code Your Future",
    description:
      "Transform your career at Byteforge Academy. Intensive coding bootcamps in software engineering, data science, and AI.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased bg-surface text-brand-100">{children}</body>
    </html>
  );
}