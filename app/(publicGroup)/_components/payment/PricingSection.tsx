"use client";

import React, { useState } from "react";
import { Check, Sparkles, HelpCircle } from "lucide-react";
import { SubscribeButton } from "./SubscribeButton";

interface PricingPlan {
  id: string;
  name: string;
  priceMonthly: number;
  priceAnnually: number;
  description: string;
  features: string[];
  isPopular?: boolean;
  colorTheme: string;
}

const PLANS: PricingPlan[] = [
  {
    id: "basic",
    name: "Starter",
    priceMonthly: 4.99,
    priceAnnually: 3.99,
    description: "Perfect for casual readers wanting access to premium analysis.",
    features: [
      "Access to all Premium articles",
      "No ad disturbances",
      "Standard customer support",
      "Daily email digest",
    ],
    colorTheme: "border-border hover:border-primary/40",
  },
  {
    id: "premium",
    name: "Pro Member",
    priceMonthly: 9.99,
    priceAnnually: 7.99,
    description: "Designed for industry experts who require deep analytical research.",
    features: [
      "Everything in Starter plan",
      "Exclusive downloadable PDFs & reports",
      "Priority Discord community channels",
      "Early access to upcoming features",
      "Priority 24/7 client support",
    ],
    isPopular: true,
    colorTheme: "border-primary bg-primary/[0.02] ring-2 ring-primary/20",
  },
  {
    id: "enterprise",
    name: "Executive",
    priceMonthly: 24.99,
    priceAnnually: 19.99,
    description: "Best for teams and investment funds needing corporate data.",
    features: [
      "Everything in Pro plan",
      "Team access (up to 5 accounts)",
      "Dedicated account manager",
      "Custom monthly trend analysis report",
      "API access to news feeds",
    ],
    colorTheme: "border-border hover:border-primary/40",
  },
];

export function PricingSection() {
  const [isAnnual, setIsAnnual] = useState(false);

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      {/* Title */}
      <div className="text-center space-y-4">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold tracking-wide text-primary">
          <Sparkles className="h-3.5 w-3.5" />
          PRICING PLANS
        </span>
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl md:text-5xl">
          Subscribe to Premium Press
        </h1>
        <p className="mx-auto max-w-xl text-base text-muted-foreground sm:text-lg">
          Unleash analytical insights, proprietary research data, and high-quality journalism today.
        </p>

        {/* Toggle Switch */}
        <div className="flex items-center justify-center gap-3 pt-6">
          <span className={`text-sm font-semibold transition-colors duration-200 ${!isAnnual ? "text-foreground" : "text-muted-foreground"}`}>
            Monthly
          </span>
          <button
            onClick={() => setIsAnnual(!isAnnual)}
            className="relative h-6 w-11 shrink-0 cursor-pointer rounded-full bg-input p-0.5 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 data-[state=checked]:bg-primary"
            data-state={isAnnual ? "checked" : "unchecked"}
          >
            <span
              className={`block h-5 w-5 rounded-full bg-background shadow transition-transform duration-200 ${
                isAnnual ? "translate-x-5" : "translate-x-0"
              }`}
            />
          </button>
          <span className={`text-sm font-semibold transition-colors duration-200 ${isAnnual ? "text-foreground" : "text-muted-foreground"}`}>
            Annually <span className="rounded bg-emerald-500/10 px-1.5 py-0.5 text-xs font-bold text-emerald-600 dark:text-emerald-400">Save 20%</span>
          </span>
        </div>
      </div>

      {/* Grid plans */}
      <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
        {PLANS.map((plan) => {
          const price = isAnnual ? plan.priceAnnually : plan.priceMonthly;
          const billingCycle = isAnnual ? "/mo, billed yearly" : "/mo";

          return (
            <div
              key={plan.id}
              className={`relative flex flex-col justify-between rounded-2xl border bg-card p-8 shadow-sm transition-all duration-300 ${plan.colorTheme}`}
            >
              {plan.isPopular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1 rounded-full bg-primary px-4 py-1 text-xs font-bold text-primary-foreground shadow-md">
                    👑 Most Popular
                  </span>
                </div>
              )}

              {/* Title & Price */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-foreground">{plan.name}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed h-10">
                  {plan.description}
                </p>

                {/* Price tag */}
                <div className="flex items-baseline text-foreground pt-2">
                  <span className="text-4xl font-extrabold tracking-tight">$</span>
                  <span className="text-5xl font-extrabold tracking-tight">{price}</span>
                  <span className="ml-1 text-xs text-muted-foreground font-semibold">
                    {billingCycle}
                  </span>
                </div>

                <div className="border-t border-border/60 pt-4" />

                {/* Features */}
                <ul className="space-y-3">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-sm text-foreground/80">
                      <span className="mt-0.5 rounded-full bg-primary/10 p-0.5 text-primary">
                        <Check className="h-3.5 w-3.5" />
                      </span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Subscribe button action */}
              <div className="mt-8">
                <SubscribeButton planId={plan.id} isPopular={plan.isPopular} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Trust guarantees footer */}
      <div className="mt-16 text-center space-y-2">
        <p className="text-xs text-muted-foreground">
          All memberships include a 14-day money-back guarantee. No questions asked.
        </p>
        <div className="flex justify-center gap-6 text-xs text-muted-foreground">
          <span className="hover:text-foreground cursor-pointer">Security Standards</span>
          <span className="hover:text-foreground cursor-pointer">Refund Policies</span>
          <span className="hover:text-foreground cursor-pointer">Help Center</span>
        </div>
      </div>
    </div>
  );
}
