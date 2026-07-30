"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  CircleUserIcon,
  LayoutDashboard,
  LogOut,
  Settings,
  User,
} from "lucide-react";
import { logout } from "@/service/logOut";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { NavbarProps } from "@/lib/types";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Dashboard", href: "/dashboard" },
  { label: "Projects", href: "/projects" },
  { label: "Services", href: "/services" },
  { label: "Contact", href: "/contact" },
  { label: "News", href: "/news" },
  { label: "Premium", href: "/premium" },
];

const userMenuItems = [
  { label: "Dashboard", icon: LayoutDashboard, action: "dashboard" },
  { label: "Profile", icon: User, action: "profile" },
  { label: "Settings", icon: Settings, action: "settings" },
];

export function Navbar({ user }: NavbarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const handleUserMenuAction = async (action: string) => {
    if (action === "dashboard") {
      if (user?.data?.profile.role === "USER") {
        router.push("/dashboard");
      } else if (user?.data?.profile.role === "AUTHOR") {
        router.push("/author-dashboard");
      } else if (user?.data?.profile.role === "ADMIN") {
        router.push("/admin-dashboard");
      }
      return;
    }

    if (action === "profile") {
      router.push("/profile");
    }

    if (action === "settings") {
      router.push("/settings");
    }

    if (action === "logout") {
      await logout();
      toast.success("User Logged Out Successfully!");
      router.push("/login");
      router.refresh();
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 cursor-pointer">
          <span className="flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <CircleUserIcon className="size-5" />
          </span>
          <span className="text-lg font-semibold tracking-tight">
            Nextjs Press
          </span>
        </Link>

        {/* Nav links */}
        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Button
                key={link.href}
                variant="ghost"
                size="sm"
                asChild
                className={cn(
                  "text-muted-foreground",
                  isActive && "text-foreground"
                )}
              >
                <Link href={link.href} className="cursor-pointer">
                  {link.label}
                </Link>
              </Button>
            );
          })}
        </nav>

        {/* User dropdown */}
        {user?.success ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full"
                aria-label="Open user menu"
              >
                <Avatar className="size-8">
                  <AvatarImage src="/diverse-avatars.png" alt="User avatar" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-foreground">
                    {user?.data?.profile.name || "Name"}
                  </span>
                  <span className="text-xs font-normal text-muted-foreground">
                    {user?.data?.profile.email || "Email"}
                  </span>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                {userMenuItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <DropdownMenuItem
                      key={item.action}
                      onClick={() => handleUserMenuAction(item.action)}
                      className="flex cursor-pointer items-center gap-2"
                    >
                      <Icon className="w-4 h-4 mr-2" />
                      <span>{item.label}</span>
                    </DropdownMenuItem>
                  );
                })}
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={async () => {
                  await handleUserMenuAction("logout");
                }}
                className="flex cursor-pointer items-center gap-2 text-destructive focus:text-destructive"
              >
                <LogOut className="w-4 h-4 mr-2" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button asChild size="sm">
            <Link href="/login" className="cursor-pointer">
              Login
            </Link>
          </Button>
        )}
      </div>
    </header>
  );
}
