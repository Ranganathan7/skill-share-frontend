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
import { useAppDispatch, useAppSelector } from "@/lib/hooks/redux-toolkit";
import { getAccountName } from "@/lib/utils";
import { User } from "lucide-react";
import { toast } from "sonner";
import { clearAuthorization } from "@/store/slices/headers";
import { clearAccountDetails } from "@/store/slices/account";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { authCookieKey } from "@/middleware";

export default function Header() {
  const t = useDictionary();
  const navigation = useLocalizedRedirect();
  const account = useAppSelector((state) => state.account);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleLogout = () => {
    toast.success(t.messages.logoutSuccessful, {
      duration: 1500,
    });
    dispatch(clearAuthorization());
    dispatch(clearAccountDetails());
    Cookies.remove(authCookieKey);
    router.replace(navigation(""));
  };

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
              <Avatar className="cursor-pointer h-10 w-10">
                <AvatarImage alt={getAccountName(account)} />
                <AvatarFallback>
                  <User className="h-5 w-5" />
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <Link href={navigation("dashboard/profile")}>
                <DropdownMenuItem className="flex flex-col items-start gap-1 cursor-pointer">
                  <div className="text-sm font-medium">
                    {getAccountName(account)}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {account.email}
                  </div>
                </DropdownMenuItem>
              </Link>
              <div className="flex w-full justify-center">
                <Button
                  variant="destructive"
                  size="sm"
                  className="mt-5 mb-2 cursor-pointer"
                  onClick={handleLogout}
                >
                  {t.actions.logout}
                </Button>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </header>
  );
}
