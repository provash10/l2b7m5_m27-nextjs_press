"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

type PostState = {
  success?: boolean;
  message?: string;
  data?: any;
} | null;

export const createPost = async (prevState: PostState, formData: FormData) => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value || null;

  if (!accessToken) {
    return {
      success: false,
      message: "User not logged in!",
    };
  }

  const title = formData.get("title");
  const content = formData.get("content");
  const thumbnail = formData.get("thumbnail");
  const tagsStr = formData.get("tags") as string;
  const tags = tagsStr ? tagsStr.split(",").map((t) => t.trim()).filter(Boolean) : [];

  const payload = {
    title,
    content,
    thumbnail: thumbnail || null,
    tags,
  };

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
      (revalidateTag as any)("my-posts", "max");
    }

    if (result.success && result.data?.isPremium) {
      (revalidateTag as any)("premium-posts", "max");
    } else if (result.success) {
      (revalidateTag as any)("public-posts", "max");
    }

    return result;
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || "Something went wrong",
    };
  }
};

export const updatePost = async (postId: string, prevState: PostState, formData: FormData) => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value || null;

  if (!accessToken) {
    return {
      success: false,
      message: "User not logged in!",
    };
  }

  const title = formData.get("title");
  const content = formData.get("content");
  const thumbnail = formData.get("thumbnail");
  const tagsStr = formData.get("tags") as string;
  const tags = tagsStr ? tagsStr.split(",").map((t) => t.trim()).filter(Boolean) : [];

  const payload = {
    title,
    content,
    thumbnail: thumbnail || null,
    tags,
  };

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
      (revalidateTag as any)("my-posts", "max");
    }

    if (result.success && result.data?.isPremium) {
      (revalidateTag as any)("premium-posts", "max");
    } else if (result.success) {
      (revalidateTag as any)("public-posts", "max");
    }

    return result;
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || "Something went wrong",
    };
  }
};

export const getMyPosts = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value || null;

  if (!accessToken) {
    return {
      success: false,
      message: "User not Logged In",
    };
  }

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/posts/my-posts`, {
    headers: {
      Cookie: `accessToken=${accessToken}`,
    },
    cache: "force-cache",
    next: {
      revalidate: 60 * 60 * 24,
      tags: ["my-posts"],
    },
  });

  const result = await res.json();
  return result;
};