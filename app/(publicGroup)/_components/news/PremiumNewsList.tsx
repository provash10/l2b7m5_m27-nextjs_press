import { getPremiumNews } from "../../_actions/getPremiumNews";
import { getSubscriptionStatus } from "../../_actions/getSubscriptionStatus";
import { PremiumNewsListClient } from "./PremiumNewsListClient";

export async function PremiumNewsList({
  searchParams,
}: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const query = await searchParams;
  const result = await getPremiumNews({ query });
  const subscriptionStatus = await getSubscriptionStatus();
  const hasActiveSubscription = !!(subscriptionStatus.success && subscriptionStatus.data?.isSubscribed);

  const posts = result.success && result.data ? result.data : [];

  return (
    <PremiumNewsListClient
      initialNews={posts}
      hasActiveSubscription={hasActiveSubscription}
    />
  );
}

