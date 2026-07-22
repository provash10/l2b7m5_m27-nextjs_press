import React from "react";
import { PricingSection } from "../_components/payment/PricingSection";
import { ShieldCheck, HelpCircle, Lock, Undo } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Premium Subscription - Next.js Press",
  description: "Unlock exclusive contents, executive summaries, and direct trends updates by subscribing to our Pro tiers.",
};

export default function PaymentPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero background blur glow effects */}
      <div className="relative isolate overflow-hidden">
        <div className="absolute top-0 left-1/2 -z-10 h-[600px] w-[1000px] -translate-x-1/2 [mask-image:radial-gradient(ellipse_at_top,white,transparent)] sm:left-[calc(50%-20rem)]">
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-primary/5 blur-3xl" />
        </div>
        
        {/* Pricing Section */}
        <PricingSection />
      </div>

      {/* Safety guarantees & Features Section */}
      <section className="mx-auto max-w-5xl px-4 pb-24 sm:px-6 lg:px-8 border-t border-border/40 pt-16">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          <div className="flex flex-col items-center text-center p-4">
            <div className="mb-3 rounded-full bg-primary/10 p-3 text-primary">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <h4 className="text-base font-bold text-foreground">Secure Checkout</h4>
            <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
              Fully encrypted Stripe transaction handling with standard PCI-DSS compliance.
            </p>
          </div>

          <div className="flex flex-col items-center text-center p-4">
            <div className="mb-3 rounded-full bg-primary/10 p-3 text-primary">
              <Undo className="h-6 w-6" />
            </div>
            <h4 className="text-base font-bold text-foreground">Cancel Anytime</h4>
            <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
              No long commitments. Cancel subscription in one click directly in billing menu.
            </p>
          </div>

          <div className="flex flex-col items-center text-center p-4">
            <div className="mb-3 rounded-full bg-primary/10 p-3 text-primary">
              <Lock className="h-6 w-6" />
            </div>
            <h4 className="text-base font-bold text-foreground">Privacy Protection</h4>
            <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
              Your details and reading logs are never shared or sold to third-party advert brokers.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-muted/30 border-t border-border/30 py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-2xl font-bold tracking-tight text-foreground text-center mb-12">
            Frequently Asked Questions
          </h2>

          <div className="space-y-6">
            <div className="rounded-xl border border-border bg-card p-5">
              <h3 className="font-bold text-foreground flex items-center gap-2">
                <HelpCircle className="h-4 w-4 text-primary shrink-0" />
                How do I upgrade or downgrade my plan?
              </h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed pl-6">
                You can easily change plans at any time from your account settings under the Billing tab. Downgrades take effect at the end of the billing period, while upgrades are prorated immediately.
              </p>
            </div>

            <div className="rounded-xl border border-border bg-card p-5">
              <h3 className="font-bold text-foreground flex items-center gap-2">
                <HelpCircle className="h-4 w-4 text-primary shrink-0" />
                Do you offer student or academic discounts?
              </h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed pl-6">
                Yes! We offer a 50% discount for students, teachers, and researchers. Please send an email using your university address to support@nextjspress.com to verify and claim your discount.
              </p>
            </div>

            <div className="rounded-xl border border-border bg-card p-5">
              <h3 className="font-bold text-foreground flex items-center gap-2">
                <HelpCircle className="h-4 w-4 text-primary shrink-0" />
                What is your cancellation policy?
              </h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed pl-6">
                If you cancellation within 14 days of your initial purchase, you are eligible for a full 100% refund. Simply message support or initiate the checkout refund in the dashboard.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
