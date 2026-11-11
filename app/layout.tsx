import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nexwin Logistics | Professional Writing & Document Support",
  description: "Professional writing support, editing, proofreading, research guidance, business writing and presentation services. Request a free quotation from Nexwin Logistics.",
  keywords: ["writing services", "proofreading", "editing", "research assistance", "business writing", "PowerPoint presentations"],
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  openGraph: {
    title: "Nexwin Logistics | Professional Writing Support",
    description: "Clear communication. Professional support. A better way forward.",
    type: "website"
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}