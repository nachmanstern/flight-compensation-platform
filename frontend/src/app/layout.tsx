import type { Metadata } from "next";
import { Heebo, Geist_Mono } from "next/font/google";

import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

import "./globals.css";

const heebo = Heebo({
  variable: "--font-heebo",
  subsets: ["hebrew", "latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "מדריך פיצויי טיסות | חוק שירותי תעופה ו-EU261",
    template: "%s | מדריך פיצויי טיסות",
  },
  description:
    "חישוב פיצויי טיסה לפי החוק הישראלי ו-EU261, חיפוש פסקי דין, ומדריכים מעשיים לתביעה.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="he" dir="rtl" className={`${heebo.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-sans">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
