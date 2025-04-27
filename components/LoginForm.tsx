"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AccountRoles } from "@/lib/enums";
import { Button } from "./ui/button";
import { useDictionary } from "./providers/LanguageProvider";
import { useAuthenticateAccount } from "@/api-calls/account/authenticate";
import { toast } from "sonner";
import Cookies from "js-cookie";
import { authCookieKey } from "@/middleware";
import { useLocalizedRedirect } from "@/lib/hooks/localized-redirect";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useAppDispatch } from "@/lib/hooks/redux-toolkit";
import { setAuthorization } from "@/store/slices/headers";

type Props = {
  role: AccountRoles;
};

export const LoginForm = ({ role }: Props) => {
  const t = useDictionary();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const authenticateMutation = useAuthenticateAccount();
  const router = useRouter();
  const handleError = (title: string, message?: string) => {
    toast.error(title, {
      closeButton: true,
      duration: 1500,
      description: message,
    });
  };
  const dispatch = useAppDispatch();
  const navigation = useLocalizedRedirect();

  useEffect(() => {
    const alreadyLoggedIn = Cookies.get(authCookieKey);
    if (alreadyLoggedIn) {
      dispatch(setAuthorization(alreadyLoggedIn));
      router.replace(navigation("dashboard"));
    }
  }, []);

  const handleFormSubmit = () => {
    if (!email) {
      handleError(t.messages.invalidEmail);
      return;
    }
    if (!password) {
      handleError(t.messages.invalidPassword);
      return;
    }
    authenticateMutation.mutate(
      { email, password },
      {
        onSuccess: (res) => {
          toast.success(t.messages.loginSuccessful, { duration: 1500 });
          Cookies.set(authCookieKey, res.data.data.accessToken, { expires: 1 });
          dispatch(setAuthorization(res.data.data.accessToken));
          router.replace(navigation("dashboard"));
        },
        onError: (err) => {
          console.log(err);
          handleError(err.errorCode, err.description);
        },
      }
    );
  };

  return (
    <Card>
      <CardContent className="space-y-8">
        <div className="space-y-1">
          <Label htmlFor="email">{t.labels.email}</Label>
          <Input
            id="email"
            placeholder="example@email.com"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="password">{t.labels.password}</Label>
          <Input
            id="password"
            placeholder="Password@123"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button
          onClick={handleFormSubmit}
          disabled={authenticateMutation.isPending}
        >
          {role === AccountRoles.PROVIDER
            ? t.actions.loginAsProvider
            : t.actions.loginAsUser}
          {authenticateMutation.isPending && (
            <Loader2 className="animate-spin" />
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};
