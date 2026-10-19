import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pirates of Grill — Legendary Barbecue & Feasts",
  description: "Experience the ultimate barbecue voyage with endless grills, gourmet dining, and seamless table bookings.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-[#090a0f] text-zinc-100 font-sans">
        {children}
      </body>
    </html>
  );
}
