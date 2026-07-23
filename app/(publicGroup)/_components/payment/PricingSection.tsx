import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckIcon } from "lucide-react";
import { SubscribeButton } from "./SubscribeButton";
import { getMe } from "@/service/getMe";

export async function PricingSection() {
  const meResult = await getMe();

  const statusResult = {
    success: meResult.success,
    data: {
      isSubscribed: Boolean(meResult.success && meResult.data?.profile?.subscription?.status === "ACTIVE"),
      currentPeriodEnd: meResult.success && meResult.data?.profile?.subscription?.currentPeriodEnd
        ? new Date(meResult.data.profile.subscription.currentPeriodEnd).toISOString()
        : new Date().toISOString(),
    },
  };

  const isActive = Boolean(
    statusResult?.success && statusResult.data?.isSubscribed
  );

  return (
    <Card className="mx-auto max-w-md">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold flex items-center justify-center gap-2">
          Premium Membership
          {isActive && <Badge variant="default" className="bg-amber-500 text-white border-none">Active</Badge>}
        </CardTitle>
        <CardDescription>
          {isActive
            ? `Active until ${new Date(statusResult.data.currentPeriodEnd).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}`
            : "Subscribe to unlock premium news content."}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <ul className="space-y-2 text-sm">
          <li className="flex items-center gap-2">
            <CheckIcon className="size-4 text-primary" />
            Unlimited premium articles
          </li>
          <li className="flex items-center gap-2">
            <CheckIcon className="size-4 text-primary" />
            Early access to new stories
          </li>
          <li className="flex items-center gap-2">
            <CheckIcon className="size-4 text-primary" />
            Support independent journalism
          </li>
        </ul>
        {/* {!isActive && <SubscribeButton />} */}
        {<SubscribeButton />}
      </CardContent>
    </Card>
  );
}
