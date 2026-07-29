"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { cookies } from "next/headers";

type PostState = {
  success?: boolean;
  message?: string;
  data?: any;
} | null;

export const createPost = async (...args: any[]) => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value || null;

  if (!accessToken) {
    return {
      success: false,
      message: "User not logged in!",
    };
  }

  let formData: any = args.find((a) => a && typeof a.get === "function");
  if (!formData) {
    formData = args.find((a) => a && a instanceof FormData);
  }
  if (!formData && args.length > 0) {
    formData = args[args.length - 1];
  }

  const getVal = (key: string) => {
    if (!formData) return "";
    if (typeof formData.get === "function") {
      return formData.get(key);
    }
    if (typeof formData === "object" && key in formData) {
      return formData[key];
    }
    return "";
  };

  const title = getVal("title");
  const content = getVal("content");
  const thumbnail = getVal("thumbnail");
  const tagsVal = getVal("tags");
  const tagsStr = typeof tagsVal === "string" ? tagsVal : Array.isArray(tagsVal) ? tagsVal.join(", ") : "";
  const tags = tagsStr ? tagsStr.split(",").map((t: string) => t.trim()).filter(Boolean) : [];
  const isPremiumVal = getVal("isPremium");
  const isPremium = isPremiumVal === "true" || isPremiumVal === "on" || isPremiumVal === true;

  const payload = {
    title,
    content,
    thumbnail: thumbnail || null,
    tags,
    isPremium,
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
      (revalidateTag as any)("my-posts", {
        expire: 0,
      });
    }

    if (result.success && result.data?.isPremium) {
      (revalidateTag as any)("premium-posts", {
        expire: 0,
      });
    } else if (result.success) {
      (revalidateTag as any)("public-posts", {
        expire: 0,
      });
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

export const updatePost = async (...args: any[]) => {
  let postId = "";
  for (const arg of args) {
    if (typeof arg === "string" && arg.length > 0) {
      postId = arg;
      break;
    }
  }

  let formData: any = args.find((a) => a && typeof a.get === "function");
  if (!formData) {
    formData = args.find((a) => a && a instanceof FormData);
  }
  if (!formData && args.length > 0) {
    formData = args[args.length - 1];
  }

  const getVal = (key: string) => {
    if (!formData) return "";
    if (typeof formData.get === "function") {
      return formData.get(key);
    }
    if (typeof formData === "object" && key in formData) {
      return formData[key];
    }
    return "";
  };

  const title = getVal("title");
  const content = getVal("content");
  const thumbnail = getVal("thumbnail");
  const tagsVal = getVal("tags");
  const tagsStr = typeof tagsVal === "string" ? tagsVal : Array.isArray(tagsVal) ? tagsVal.join(", ") : "";
  const tags = tagsStr ? tagsStr.split(",").map((t: string) => t.trim()).filter(Boolean) : [];
  const isPremiumVal = getVal("isPremium");
  const isPremium = isPremiumVal === "true" || isPremiumVal === "on" || isPremiumVal === true;

  console.log({
    postId,
    title,
    content,
    thumbnail,
    tags,
    isPremium,
  });

  const payload = {
    title: title ?? "",
    content: content ?? "",
    thumbnail: thumbnail ?? "",
    tags,
    isPremium,
  };

  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value || null;

  if (!accessToken) {
    return {
      success: false,
      message: "User not logged in!",
    };
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
      (revalidateTag as any)("my-posts", {
        expire: 0,
      });
    }

    if (result.success && result.data?.isPremium) {
      (revalidateTag as any)("premium-posts", {
        expire: 0,
      });
    } else if (result.success) {
      (revalidateTag as any)("public-posts", {
        expire: 0,
      });
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
    cache: "no-store",
    next: {
      tags: ["my-posts"],
    },
  });

  const result = await res.json();
  return result;
};

export const deletePost = async (postId: string) => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value || null;

  if (!accessToken) {
    return {
      success: false,
      message: "User not logged in!",
    };
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
      (revalidateTag as any)("my-posts", {
        expire: 0,
      });
      (revalidateTag as any)("public-posts", {
        expire: 0,
      });
      (revalidateTag as any)("premium-posts", {
        expire: 0,
      });
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