import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "MK Group | Agri Land Developers",
  description: "Specializing in the development and conversion of land for agricultural, farming, and dry land use.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col font-sans">
        <Navbar />
        <main className="flex-grow flex flex-col">{children}</main>
        <Footer />
        <WhatsAppFloat />
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
