"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { isAccessTokenExist } from "@/service/refreshToken";

type PostState = {
  success?: boolean;
  message?: string;
  data?: any;
} | null;

export const createPost = async (prevState: PostState, formData: FormData) => {
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const thumbnail = formData.get("thumbnail") as string;
  const tagsRaw = formData.get("tags") as string;
  const tags = tagsRaw
    ? tagsRaw.split(",").map((t) => t.trim()).filter(Boolean)
    : [];
  const isPremium = formData.get("isPremium") === "on" || formData.get("isPremium") === "true";

  const payload = {
    title,
    content,
    thumbnail: thumbnail || null,
    tags,
    isPremium,
  };

  const accessToken = await isAccessTokenExist();

  if (typeof accessToken !== "string") {
    return accessToken;
  }

  try {
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: `accessToken=${accessToken}`,
      },
      body: JSON.stringify(payload),
    });

    const result = await res.json();

    if (result.success) {
      revalidateTag("my-posts");
    }

    if (result.success && result.data?.isPremium) {
      revalidateTag("premium-posts");
    } else if (result.success) {
      revalidateTag("public-posts");
    }

    revalidatePath("/dashboard/my-posts");

    return result;
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || "Something went wrong",
    };
  }
};

export const updatePost = async (postId: string, prevState: PostState, formData: FormData) => {
  const title = (formData.get("title") as string) ?? "";
  const content = (formData.get("content") as string) ?? "";
  const thumbnail = (formData.get("thumbnail") as string) ?? "";
  const tagsRaw = (formData.get("tags") as string) ?? "";
  const tags = tagsRaw
    ? tagsRaw.split(",").map((t) => t.trim()).filter(Boolean)
    : [];
  const isPremium = formData.get("isPremium") === "on" || formData.get("isPremium") === "true";

  const payload = {
    title,
    content,
    thumbnail,
    tags,
    isPremium,
  };

  const accessToken = await isAccessTokenExist();

  if (typeof accessToken !== "string") {
    return accessToken;
  }

  try {
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/posts/${postId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Cookie: `accessToken=${accessToken}`,
      },
      body: JSON.stringify(payload),
    });

    const result = await res.json();

    if (result.success) {
      revalidateTag("my-posts");
    }

    if (result.success && result.data?.isPremium) {
      revalidateTag("premium-posts");
    } else if (result.success) {
      revalidateTag("public-posts");
    }

    revalidatePath("/dashboard/my-posts");

    return result;
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || "Something went wrong",
    };
  }
};

export const getMyPosts = async () => {
  const accessToken = await isAccessTokenExist();

  if (typeof accessToken !== "string") {
    return accessToken;
  }

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/posts/my-posts`, {
    headers: {
      Cookie: `accessToken=${accessToken}`,
    },
    cache: "no-store",
    next: {
      tags: ["my-posts"],
    },
  });

  const result = await res.json();
  return result;
};

export const deletePost = async (postId: string) => {
  const accessToken = await isAccessTokenExist();

  if (typeof accessToken !== "string") {
    return accessToken;
  }

  try {
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/posts/${postId}`, {
      method: "DELETE",
      headers: {
        Cookie: `accessToken=${accessToken}`,
      },
    });

    const result = await res.json();

    if (result.success) {
      revalidateTag("my-posts");
      revalidateTag("public-posts");
      revalidateTag("premium-posts");
      revalidatePath("/dashboard/my-posts");
    }

    return result;
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || "Failed to delete post",
    };
  }
};