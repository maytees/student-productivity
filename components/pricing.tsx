"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";
import Link from "next/link";

export function Pricing() {
  const plans = [
    {
      name: "Free",
      price: "$0",
      period: "Forever",
      badge: "Freemium",
      features: [
        "Post to 3 platforms (Twitter/X, Instagram, LinkedIn)",
        "1 account per platform",
        "10 AI-generated content templates",
        "Basic drag and drop scheduler (1 day ahead)",
        "1 posts per day limit",
        "Community support only"
      ],
      buttonText: "Get started",
      buttonVariant: "outline" as const,
      href: "#",
    },
    {
      name: "Creator Pro",
      price: "$15",
      period: "per month",
      badge: "Most popular",
      popular: true,
      features: [
        "Post to 8 platforms (Twitter/X, Instagram, LinkedIn, Facebook, TikTok, YouTube Shorts, Threads, Pinterest)",
        "Up to 5 accounts per platform",
        "Unlimited posts per day",
        "Advanced drag and drop calendar (any day in advance)",
        "AI content optimization for each platform",
        "AI caption generator",
        "Bulk upload and schedule (up to 50 posts at once)",
        "Auto resize images and videos for each platform",
        "Best time to post recommendations based on your audience",
        "Performance analytics with engagement insights",
        "Auto repost top performing content",
        "Email support within 24 hours",
      ],
      buttonText: "Choose Pro",
      buttonVariant: "primary" as const,
      href: "#",
    },
    {
      name: "Agency",
      price: "$30",
      period: "+ $10 per client",
      features: [
        "Manage multiple clients with separate workspaces",
        "Everything in Creator Pro",
        "Unlimited platforms and client accounts",
        "White-label dashboard with your branding",
        "Client approval workflows with comment system",
        "Team collaboration tools (assign posts to team members)",
        "Bulk publishing across all client accounts simultaneously",
        "Cross-platform content adaptation with brand voice consistency",
        "Advanced analytics dashboard with client reporting",
        "Custom content templates for each client's brand",
        "Priority support (2-hour response time)",
        "Monthly strategy calls with growth expert",
        "API access for custom integrations"
      ],
      buttonText: "Choose Agency",
      buttonVariant: "outline" as const,
      href: "#contact",
    },
  ];

  return (
    <section id={"pricing"} className="py-20 sm:py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl tracking-tight text-foreground  font-semibold font-lora">
            Simple pricing for real work
          </h2>
          <p className="mt-3 text-muted-foreground ">
            Low-cost monthly plans with a freemium tier for getting started. No enterprise pricing bullshit.
          </p>
        </div>

        <div className="mt-10 grid md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={`p-6 flex flex-col relative ${plan.popular ? "border-2 border-primary" : ""
                }`}
            >
              {plan.badge && (
                <span
                  className={`absolute -top-3 right-3 text-[11px] px-2 py-1 rounded-md  ${plan.popular
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                    }`}
                >
                  {plan.badge}
                </span>
              )}

              <h3 className="text-lg tracking-tight text-foreground font-lora">
                {plan.name}
              </h3>

              <div className="mt-4">
                <div className="text-3xl tracking-tight text-foreground  font-semibold font-lora">
                  {plan.price}
                </div>
                <div className="text-sm text-muted-foreground ">
                  {plan.period}
                </div>
              </div>

              <ul className="space-y-3 text-sm text-muted-foreground mt-6 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex gap-3 items-start">
                    <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <span className="leading-relaxed">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button asChild variant={plan.buttonVariant} className="mt-6 ">
                <Link href={plan.href}>{plan.buttonText}</Link>
              </Button>
            </Card>
          ))}
        </div>

        <p className="mt-6 text-center text-xs text-muted-foreground ">
          Monthly plans are billed monthly. Cancel anytime. No credit card
          required for Free. 7-day money-back guarantee on all paid plans.
        </p>
      </div>
    </section>
  );
}
