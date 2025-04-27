"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { ToggleTheme } from "./ToggleTheme";
import { useDictionary } from "./providers/LanguageProvider";
import Image from "next/image";
import { useLocalizedRedirect } from "@/lib/hooks/localized-redirect";
import { useAppSelector } from "@/lib/hooks/redux-toolkit";
import { getAccountName } from "@/lib/utils";

export default function Header() {
  const t = useDictionary();
  const navigation = useLocalizedRedirect();
  const account = useAppSelector((state) => state.account);

  return (
    <header className="flex items-center justify-between px-6 py-4 border-b bg-background">
      <div className="flex items-center justify-center gap-2">
        <Image
          src={"/logo.png"}
          alt={"Logo"}
          width={40}
          height={25}
          className="rounded-xl"
        />
        <p className="text-xl font-bold">{t.labels.skillShare}</p>
      </div>

      <div className="flex items-center gap-4">
        <ToggleTheme />

        {account.email && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="cursor-pointer">
                <AvatarImage alt={getAccountName(account)} />
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Link href="/profile">Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <form action="/api/logout" method="POST">
                  <Button variant="ghost" size="sm" type="submit">
                    Logout
                  </Button>
                </form>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </header>
  );
}
