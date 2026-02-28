import type { Metadata } from "next";
import { Poppins, Kanit } from "next/font/google";
import { Toaster } from "sonner";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
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

const SITE_URL = "https://apiwit.xyz";
const TITLE = "APIWIT.EXE — Frontend Developer";
const DESCRIPTION =
  "Portfolio of Apiwit — Frontend Developer & Creative Coder specializing in React, Next.js, and interactive web experiences.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  icons: "/logo.svg",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: TITLE,
    description: DESCRIPTION,
    siteName: "APIWIT.EXE",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
  robots: { index: true, follow: true },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale} className="dark">
      <body className={`${poppins.variable} ${kanit.variable} antialiased`}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
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
