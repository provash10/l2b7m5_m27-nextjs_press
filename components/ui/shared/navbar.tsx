"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  CircleUserIcon,
  CreditCardIcon,
  LayoutDashboardIcon,
  LogOut,
  SettingsIcon,
  UserIcon,
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

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Dashboard", href: "/dashboard" },
  { label: "Projects", href: "/projects" },
  { label: "Pricing", href: "/pricing" },
];

const userMenuItems = [
  { label: "Profile", href: "/profile", icon: UserIcon },
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboardIcon },
  { label: "Billing", href: "/billing", icon: CreditCardIcon },
  { label: "Settings", href: "/settings", icon: SettingsIcon },
];

//  "data": {
//         "profile": {
//             "id": "8dc64e20-1c38-495e-8b83-d86dcf8a93dd",
//             "name": "Salman Shah",
//             "email": "salmanshah100@gmail.com",
//             "profilePhoto": null,
//             "activeStatus": "ACTIVE",
//             "role": "USER",
//             "createdAt": "2026-07-18T17:09:51.088Z",
//             "updatedAt": "2026-07-18T17:09:51.088Z",
//             "profile": {
//                 "id": "544561d9-c952-44b5-9277-1b1d2a91dcef",
//                 "profilePhoto": "https://example.com/photo.jpg",
//                 "bio": "",
//                 "userId": "8dc64e20-1c38-495e-8b83-d86dcf8a93dd",
//                 "createdAt": "2026-07-18T17:09:51.088Z",
//                 "updatedAt": "2026-07-18T17:09:51.088Z"
//             }
//         }
//     }

type IUser = {
  success: boolean;
  message: string;
  data?: {
    profile: {
      id: string;
      name: string;
      email: string;
      profilePhoto: string | null;
      activeStatus: string;
      role: string;
      createdAt: string;
      updatedAt: string;
      profile: {
        id: string;
        profilePhoto: string | null;
        bio: string;
        userId: string;
        createdAt: string;
        updatedAt: string;
      };
    };
  };
};

type NavbarProps = {
  user: IUser | null | undefined;
};

export function Navbar({user} : NavbarProps) {
  const pathname = usePathname();

  console.log(user?.success, "success")
  const router = useRouter();
  const handleUserMenuAction = async(action: string) =>{

     if(action ==="logout"){
      await logout();
      toast.success("User Logged Out Successfully");
      router.push("/login");
      router.refresh();
     }
  };

  // useEffect(()=>{
  //   if(user && !user?.success){
  //     toast.success("User Logged Out Successfully")
  //   }
  // }, [user?.success])

 

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
        {
          user?.success ? (
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
                      {/* Jane Doe */}
                      {user?.data?.profile.name || "Name"}
                    </span>
                    <span className="text-xs font-normal text-muted-foreground">
                      {/* jane@acme.com */}
                      {user?.data?.profile.email || "Email"}
                    </span>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  {userMenuItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <DropdownMenuItem key={item.href} asChild>
                        <Link
                          href={item.href}
                          className="flex cursor-pointer items-center gap-2"
                        >
                          <Icon />
                          {item.label}
                        </Link>
                      </DropdownMenuItem>
                    );
                  })}
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={async () => {
                  await handleUserMenuAction("logout");
                }}>
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
          )
        }
      </div>
    </header>
  );
}
