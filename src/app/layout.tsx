import type { Metadata } from "next";
import { Poppins, Kanit } from "next/font/google";
import { Toaster } from "sonner";
import CyberpunkScrollbar from "@/components/CyberpunkScrollbar";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-poppins",
});

const kanit = Kanit({
  subsets: ["latin", "thai"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-kanit",
});

export const metadata: Metadata = {
  title: "APIWIT.EXE — Frontend Developer",
  description: "Portfolio of Apiwit — Frontend Developer & Creative Coder",
  icons: "/logo.svg",
  openGraph: {
    title: "APIWIT.EXE — Frontend Developer",
    description: "Portfolio of Apiwit — Frontend Developer & Creative Coder",
    images: ["/logo.svg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${poppins.variable} ${kanit.variable} antialiased`}>
        {children}
        <CyberpunkScrollbar />
        <Toaster
          theme="dark"
          toastOptions={{
            style: {
              background: "var(--bg-secondary)",
              border: "1px solid rgba(255,255,255,0.08)",
              color: "var(--text-primary)",
              fontFamily: "var(--font-mono)",
              fontSize: "13px",
            },
          }}
        />
      </body>
    </html>
  );
}
