import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import { Locale, locales } from "./[lang]/dictionaries";
import { QueryClientProviders } from "@/components/providers/QueryClientProvider";

// Font set across app
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Skill Share",
  description:
    "A marketplace connecting individuals and companies to share, discover, and hire skills across a wide range of categories.",
};

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: Locale }>;
}>) {
  return (
    <html lang={(await params).lang} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={inter.className}>
        <QueryClientProviders>{children}</QueryClientProviders>
      </body>
    </html>
  );
}
