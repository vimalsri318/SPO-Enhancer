import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "SOP Enhancer — SPINaBOT",
  description:
    "Submit your Statement of Purpose and get a humanized, AI-detection-safe version delivered to your inbox.",
  keywords: ["SOP", "Statement of Purpose", "University Application", "AI Humanizer", "SPINaBOT"],
  openGraph: {
    title: "SOP Enhancer — SPINaBOT",
    description: "AI-powered SOP humanizer for international university applications.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <body className="antialiased">
        {children}
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              background: "rgba(13, 17, 33, 0.95)",
              border: "1px solid rgba(99, 102, 241, 0.3)",
              color: "#f1f5f9",
              backdropFilter: "blur(12px)",
              borderRadius: "12px",
            },
          }}
        />
      </body>
    </html>
  );
}
