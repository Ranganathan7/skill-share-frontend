"use client";

import { defaultLocale, Locale } from '@/app/[lang]/dictionaries';
import { usePathname } from 'next/navigation';

export function useLocalizedRedirect() {
  const pathname = usePathname();

  // Extract the current language (first segment in pathname)
  const lang = pathname.split('/')[1] || defaultLocale; // Default to 'en' if no lang is present

  // Function to get the localized URL and append '/login'
  const getLocalizedUrl = (url: string, replaceLocale?: Locale) => {
    if (url.startsWith('/')) {
      url = url.substring(1); // Remove the leading slash if exists
    }
    return `/${replaceLocale ? replaceLocale : lang}/${replaceLocale ? url.replace(lang, '') : url}`;
  };

  return getLocalizedUrl;
}
