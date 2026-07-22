"use client";

import React, { useState } from "react";
import { toast } from "sonner";
import { CreditCard, Loader2, Sparkles, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface SubscribeButtonProps {
  planId: string;
  isPopular?: boolean;
}

export function SubscribeButton({ planId, isPopular = false }: SubscribeButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = async () => {
    setIsLoading(true);
    // Simulate API request to Stripe or another payment processor
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    setIsLoading(false);
    setIsSubscribed(true);
    toast.success("Successfully subscribed! Welcome to Premium Press.", {
      description: `Plan: ${planId.toUpperCase()} active.`,
    });
  };

  if (isSubscribed) {
    return (
      <button
        disabled
        className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-500 py-3 text-sm font-bold text-white shadow-md transition-all cursor-default"
      >
        <CheckCircle2 className="h-4 w-4" />
        Current Active Plan
      </button>
    );
  }

  return (
    <button
      onClick={handleSubscribe}
      disabled={isLoading}
      className={cn(
        "w-full inline-flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold shadow-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60",
        isPopular
          ? "bg-primary text-primary-foreground hover:bg-primary/95 hover:shadow-lg focus:ring-primary"
          : "bg-secondary text-secondary-foreground hover:bg-[color-mix(in_oklch,var(--secondary),var(--foreground)_5%)] hover:shadow-md focus:ring-secondary border border-border"
      )}
    >
      {isLoading ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          Processing Secure Checkout...
        </>
      ) : (
        <>
          <CreditCard className="h-4 w-4" />
          Subscribe Now
        </>
      )}
    </button>
  );
}
