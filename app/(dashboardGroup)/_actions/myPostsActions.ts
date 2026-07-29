"use server"

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

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

export const createPostAction = async (prevState: any, formData: FormData) => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value || null;

  if (!accessToken) {
    return {
      success: false,
      message: "User not Logged In",
    };
  }

  const title = formData.get("title");
  const content = formData.get("content");
  const thumbnail = formData.get("thumbnail");
  const tagsStr = formData.get("tags") as string;
  const tags = tagsStr ? tagsStr.split(",").map((t) => t.trim()).filter(Boolean) : [];

  try {
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: `accessToken=${accessToken}`,
      },
      body: JSON.stringify({
        title,
        content,
        thumbnail: thumbnail || null,
        tags,
      }),
    });

    const result = await res.json();
    if (result?.success) {
      (revalidateTag as any)("my-posts");
    }
    return result;
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || "Something went wrong",
    };
  }
};

export const updatePostAction = async (postId: string, prevState: any, formData: FormData) => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value || null;

  if (!accessToken) {
    return {
      success: false,
      message: "User not Logged In",
    };
  }

  const title = formData.get("title");
  const content = formData.get("content");
  const thumbnail = formData.get("thumbnail");
  const tagsStr = formData.get("tags") as string;
  const tags = tagsStr ? tagsStr.split(",").map((t) => t.trim()).filter(Boolean) : [];

  try {
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/posts/${postId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Cookie: `accessToken=${accessToken}`,
      },
      body: JSON.stringify({
        title,
        content,
        thumbnail: thumbnail || null,
        tags,
      }),
    });

    const result = await res.json();
    if (result?.success) {
      (revalidateTag as any)("my-posts");
    }
    return result;
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || "Something went wrong",
    };
  }
};