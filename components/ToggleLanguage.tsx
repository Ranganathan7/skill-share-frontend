"use client";

import { useRouter, usePathname } from "next/navigation";
import { useLang } from "@/components/providers/LanguageProvider";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { useLocalizedRedirect } from "@/lib/hooks/localized-redirect";
import { Locale, locales } from "@/app/[lang]/dictionaries";

export function ToggleLanguage() {
  const router = useRouter();
  const currentLocale = useLang();
  const navigation = useLocalizedRedirect();
  const pathname = usePathname();

  const handleChangeLanguage = (lang: Locale) => {
    if (lang === currentLocale) return;
    router.replace(navigation(pathname, lang));
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          {currentLocale.toUpperCase()}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        {locales.map((lang) => (
          <DropdownMenuItem
            key={lang}
            onClick={() => handleChangeLanguage(lang)}
          >
            {lang.toUpperCase()}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
