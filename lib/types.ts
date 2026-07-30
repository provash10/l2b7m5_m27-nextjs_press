import { LucideIcon } from "lucide-react";

export type IPostStatus = "DRAFT" | "PUBLISHED" | "ARCHIVED";

export type IAuthor = {
  id: string;
  name: string;
  email: string;
  activeStatus: string;
  role: string;
  createdAt: string;
  updatedAt: string;
};

export type IComment = {
  id: string;
  content: string;
  status: string;
  postId: string;
  authorId: string;
  createdAt: string;
  updatedAt: string;
};

export type IPost = {
  id: string;
  title: string;
  content: string;
  thumbnail: string | null;
  isFeatured: boolean;
  status: IPostStatus;
  tags: string[];
  views: number;
  isPremium: boolean;
  authorId: string;
  author?: IAuthor;
  comments?: IComment[];
  _count?: {
    comments: number;
  };
  createdAt: string;
  updatedAt: string;
};

export type IUser = {
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

export type NavbarProps = {
  user: IUser | null | undefined;
};

export type ISidebarItem = {
  label: string;
  href: string;
  icon: LucideIcon;
};