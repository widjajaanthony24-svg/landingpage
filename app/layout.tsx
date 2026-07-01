import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/shared/theme-provider";
import "@/styles/globals.css";

const GeistSans = Geist({ subsets: ["latin"], variable: "--font-geist-sans" });
const GeistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });

export const metadata: Metadata = {
  metadataBase: new URL("https://buildwithanthony.com"),
  title: {
    default: "Anthony Widjaja — Build With Anthony",
    template: "%s | Anthony Widjaja",
  },
  description:
    "18-year-old founder from Bandung building the trust layer for AI. Documenting the journey publicly.",
  keywords: ["AI", "founder", "AIDAL", "trust layer", "Bandung", "startup"],
  authors: [{ name: "Anthony Widjaja" }],
  creator: "Anthony Widjaja",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://buildwithanthony.com",
    siteName: "Build With Anthony",
    title: "Anthony Widjaja — Build With Anthony",
    description: "18-year-old founder from Bandung building the trust layer for AI.",
    images: [{ url: "/og.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Anthony Widjaja — Build With Anthony",
    description: "18-year-old founder from Bandung building the trust layer for AI.",
    creator: "@buildwanthony",
    images: ["/og.png"],
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
