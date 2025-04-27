import {
  ClipboardList,
  CalendarSearch,
  CirclePercent,
  BookCheck,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useLocalizedRedirect } from "@/lib/hooks/localized-redirect";
import { useAppSelector } from "@/lib/hooks/redux-toolkit";
import { useDictionary } from "./providers/LanguageProvider";

export function AppSidebar() {
  const navigation = useLocalizedRedirect();
  const account = useAppSelector((state) => state.account);
  const t = useDictionary();

  // Menu items.
  const items = [
    {
      title: t.labels.myTasks,
      url: navigation("dashboard"),
      icon: ClipboardList,
    },
    {
      title: t.labels.exploreTasks,
      url: navigation("dashboard/explore"),
      icon: CalendarSearch,
    },
    {
      title: t.labels.myOffers,
      url: navigation("dashboard/offers"),
      icon: CirclePercent,
    },
    {
      title: t.labels.mySkills,
      url: navigation("dashboard/skills"),
      icon: BookCheck,
    },
  ];

  return (
    <Sidebar variant="floating" collapsible="icon" className="mt-16">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
