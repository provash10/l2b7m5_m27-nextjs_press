"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { LayoutDashboard, Podcast, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { sidebarMenuItems } from "../_config/sidebarMenuItems";
import { ISidebarItem, NavbarProps } from "@/lib/types";

// const navItems = [
//   {
//     label: "My Posts",
//     href: "/dashboard/my-posts",
//     icon: Podcast,
//   },
//   {
//     label: "My Profile",
//     href: "/dashboard/profile",
//     icon: User,
//   },
// ];

export default function DashboardSidebar({user} : NavbarProps) {
  const pathname = usePathname();

  // const navItems = sidebarMenuItems.USER
  // const navItems = sidebarMenuItems[user.data?.profile.role as string]

  let navItems : ISidebarItem[]= [];
  if(user?.data?.profile.role === "USER"){
    navItems=sidebarMenuItems.USER
  }else if(user?.data?.profile.role === "AUTHOR"){
    navItems=sidebarMenuItems.AUTHOR
  }else if(user?.data?.profile.role === "ADMIN"){
    navItems=sidebarMenuItems.ADMIN
  }

  return (
    <Sidebar
      collapsible="none"
      className="h-[calc(100vh-0rem)] w-60 border-r border-border bg-sidebar"
    >
      {/* <SidebarHeader className="p-4">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-600 text-white font-bold shadow-xs">
            <LayoutDashboard className="h-4 w-4" />
          </div>
          <span className="font-semibold text-foreground text-sm">Dashboard</span>
        </div>
      </SidebarHeader> */}

      <SidebarContent className="px-2">
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
  );
}
