import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ashnan Dashboard",
  description: "Ashnan Kitchen Inventory",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="bg-background">
      <body>{children}</body>
    </html>
  );
}
