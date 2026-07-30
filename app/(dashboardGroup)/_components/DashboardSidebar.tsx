"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { sidebarMenuItems } from "../_config/sidebarMenuItems";
import { ISidebarItem, NavbarProps } from "@/lib/types";

export default function DashboardSidebar({ user }: NavbarProps) {
  const pathname = usePathname();

  let navItems: ISidebarItem[] = [];
  if (user?.data?.profile.role === "USER") {
    navItems = sidebarMenuItems.USER;
  } else if (user?.data?.profile.role === "AUTHOR") {
    navItems = sidebarMenuItems.AUTHOR;
  } else if (user?.data?.profile.role === "ADMIN") {
    navItems = sidebarMenuItems.ADMIN;
  }

  return (
    <>
      {/* Desktop Sidebar */}
      <Sidebar
        collapsible="none"
        className="hidden md:block h-[calc(100vh-4rem)] w-60 border-r border-border bg-sidebar shrink-0"
      >
        <SidebarContent className="px-2 py-4">
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu className="space-y-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;
                  return (
                    <SidebarMenuItem key={item.href}>
                      <SidebarMenuButton
                        asChild
                        isActive={isActive}
                        className={cn(
                          "w-full justify-start gap-3 rounded-xl px-3 py-2 text-sm transition-all",
                          isActive
                            ? "bg-muted text-foreground font-semibold"
                            : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                        )}
                      >
                        <Link href={item.href}>
                          <Icon className="h-4 w-4" />
                          <span>{item.label}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>

      {/* Mobile Top Sub-Nav Bar */}
      <div className="block md:hidden w-full border-b bg-muted/40 px-4 py-2 overflow-x-auto">
        <nav className="flex items-center gap-2 whitespace-nowrap">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground font-semibold shadow-xs"
                    : "bg-background text-muted-foreground hover:bg-muted hover:text-foreground border"
                )}
              >
                <Icon className="h-3.5 w-3.5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </>
  );
}
