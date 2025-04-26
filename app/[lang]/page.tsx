"use client";

import { LoginForm } from "@/components/LoginForm";
import { useDictionary } from "@/components/providers/LanguageProvider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AccountRoles } from "@/lib/enums";
import React from "react";

const page = () => {
  const t = useDictionary();

  return (
    <div>
      <div>
        <Tabs defaultValue={AccountRoles.USER} className="w-[400px]">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value={AccountRoles.USER}>{t.labels.user}</TabsTrigger>
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
  );
};

export default page;
