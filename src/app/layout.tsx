import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Satranç Boyama Oyunu",
  description: "Satranç taşlarının hareketlerini öğrenmek için eğlenceli bir boyama oyunu",
  keywords: "satranç, boyama, eğitim, oyun, satranç öğrenme",
  authors: [{ name: "Your Name" }],
  openGraph: {
    title: "Satranç Boyama Oyunu",
    description: "Satranç taşlarının hareketlerini öğrenmek için eğlenceli bir boyama oyunu",
    type: "website",
    locale: "tr_TR",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body className={`${inter.className} bg-gray-50`}>
        {children}
      </body>
    </html>
  );
}
