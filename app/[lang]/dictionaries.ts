import en from "@/app/[lang]/dictionaries/en.json";

// Types
export type DictionaryType = typeof en;
export type Locale = "en"; // Extend this if you add more locales

// Constants
export const locales: Locale[] = ["en"];
export const defaultLocale: Locale = "en";

// Dictionary loader
const dictionaries: Record<Locale, () => Promise<DictionaryType>> = {
  en: () => import("./dictionaries/en.json").then((mod) => mod.default),
};

// Get dictionary
export async function getDictionary(locale: Locale): Promise<DictionaryType> {
  const loadDictionary = dictionaries[locale];

  if (!loadDictionary) {
    throw new Error(`No dictionary found for locale: ${locale}`);
  }

  return loadDictionary();
}
