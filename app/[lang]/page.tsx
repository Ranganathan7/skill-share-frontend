"use client";

import { LoginForm } from "@/components/LoginForm";
import { useDictionary } from "@/components/providers/LanguageProvider";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AccountRoles } from "@/lib/enums";
import Image from "next/image";
import React from "react";

const LoginPage = () => {
  const t = useDictionary();

  return (
    <div className="flex flex-col md:flex-row w-full h-full">
      {/* Left side - Intro */}
      <div className="relative flex flex-1 flex-col items-center justify-center p-8 overflow-hidden">
        {/* Background image */}
        <Image
          src="/home-background.avif"
          alt="Home Background"
          layout="fill"
          objectFit="cover"
          className="absolute inset-0"
        />

        {/* Overlay */}
        <div className="relative z-10 text-center max-w-md">
          <h1 className="text-4xl font-bold mb-4 drop-shadow-lg text-black">
            {t.labels.welcomeText}
          </h1>
          <p className="text-lg text-primary">{t.labels.introText}</p>
        </div>
      </div>

      {/* Right side - Login */}
      <div className="flex flex-1 items-center justify-center bg-linear-to-tl from-primary to-primary-foreground p-8">
        <div className="w-full max-w-sm bg-card shadow-xl rounded-lg p-8 flex flex-col items-center gap-6">
          {/* Small Welcome Text */}
          <div className="text-center">
            <Label className="text-2xl font-bold mb-2">
              {t.labels.loginTitle}
            </Label>
            <p className="text-muted-foreground text-sm">
              {t.labels.loginSubtitle}
            </p>
          </div>

          {/* Tabs */}
          <Tabs defaultValue={AccountRoles.USER} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value={AccountRoles.USER}>
                {t.labels.user}
              </TabsTrigger>
              <TabsTrigger value={AccountRoles.PROVIDER}>
                {t.labels.provider}
              </TabsTrigger>
            </TabsList>

            <TabsContent value={AccountRoles.USER}>
              <LoginForm role={AccountRoles.USER} />
            </TabsContent>

            <TabsContent value={AccountRoles.PROVIDER}>
              <LoginForm role={AccountRoles.PROVIDER} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
