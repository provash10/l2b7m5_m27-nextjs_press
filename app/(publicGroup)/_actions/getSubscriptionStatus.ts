"use server";

import { cookies } from "next/headers";

export const getSubscriptionStatus = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value || null;

  if (!accessToken) {
    return {
      success: false,
      message: "User not Logged In",
      data: {
        isSubscribed: false,
        currentPeriodEnd: new Date().toISOString(),
      },
    };
  }

  try {
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/users/me`, {
      headers: {
        Cookie: `accessToken=${accessToken}`,
      },
      cache: "no-store",
    });

    const result = await res.json();

    if (result.success && result.data?.profile) {
      const userProfile = result.data.profile;
      const subscription = userProfile.subscription;

      return {
        success: true,
        data: {
          isSubscribed: Boolean(subscription && subscription.status === "ACTIVE"),
          currentPeriodEnd: subscription?.currentPeriodEnd
            ? new Date(subscription.currentPeriodEnd).toISOString()
            : new Date().toISOString(),
        },
      };
    }

    return {
      success: false,
      message: "Failed to retrieve subscription status",
      data: {
        isSubscribed: false,
        currentPeriodEnd: new Date().toISOString(),
      },
    };
  } catch (error) {
    console.error("Error fetching subscription status:", error);
    return {
      success: false,
      message: "Failed to retrieve subscription status due to an error",
      data: {
        isSubscribed: false,
        currentPeriodEnd: new Date().toISOString(),
      },
    };
  }
};
