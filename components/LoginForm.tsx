"use client";

import React, { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AccountRoles } from "@/lib/enums";
import { Button } from "./ui/button";
import { useDictionary } from "./providers/LanguageProvider";

type Props = {
  role: AccountRoles;
};

export const LoginForm = ({ role }: Props) => {
  const t = useDictionary();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleFormSubmit = () => {};

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
        <Button onClick={handleFormSubmit}>
          {role === AccountRoles.PROVIDER
            ? t.actions.loginAsProvider
            : t.actions.loginAsUser}
        </Button>
      </CardFooter>
    </Card>
  );
};
