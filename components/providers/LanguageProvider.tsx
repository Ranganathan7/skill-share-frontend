"use client";

import { DictionaryType, Locale } from "@/app/[lang]/dictionaries";
import { createContext, useContext, ReactNode } from "react";

type LanguageContextType = {
  lang: Locale;
  dictionary: DictionaryType;
};

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export function LanguageProvider({
  children,
  lang,
  dictionary,
}: {
  children: ReactNode;
  lang: Locale;
  dictionary: DictionaryType;
}) {
  return (
    <LanguageContext.Provider value={{ lang, dictionary }}>
      {children}
    </LanguageContext.Provider>
  );
}

// Hooks
export function useLang() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLang must be inside LanguageProvider");
  return context.lang;
}

export function useDictionary() {
  const context = useContext(LanguageContext);
  if (!context)
    throw new Error("useDictionary must be inside LanguageProvider");
  return context.dictionary;
}
