import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Byteforge Academy — Code Your Future",
  description:
    "Transform your career with Byteforge Academy. Intensive coding bootcamps — terminal-style.",
  openGraph: {
    title: "Byteforge Academy — Code Your Future",
    description:
      "Transform your career with Byteforge Academy. Intensive coding bootcamps — terminal-style.",
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
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}