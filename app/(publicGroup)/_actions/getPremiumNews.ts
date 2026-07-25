"use server";

import { cookies } from "next/headers";

export const getPremiumNews = async ({
  query,
}: {
  query?: { [key: string]: string | string[] | undefined };
} = {}) => {
  const params = new URLSearchParams();
  if (query?.searchTerm) {
    params.set("searchTerm", query.searchTerm as string);
  }
  console.log(params.toString(), "params");

  const queryString = params.toString() ? `?${params.toString()}` : "";

  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value || null;

  if (!accessToken) {
    return {
      success: false,
      message: "User not logged in!",
    };
  }

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/premium?${params}`, {
    headers: {
      Cookie: `accessToken=${accessToken}`,
    },
    cache: "no-store",
    next: {
      tags: ["premium-posts"],
    },
  });

  const result = await res.json();
  return result;
};
