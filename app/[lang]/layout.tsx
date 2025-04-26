import { LanguageProvider } from "@/components/providers/LanguageProvider";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { getDictionary, Locale } from "./dictionaries";
import Header from "@/components/Header";

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: Locale }>;
}>) {
  const dictionary = await getDictionary((await params).lang);

  return (
    <LanguageProvider lang={(await params).lang} dictionary={dictionary}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <Header />
        {children}
      </ThemeProvider>
    </LanguageProvider>
  );
}
