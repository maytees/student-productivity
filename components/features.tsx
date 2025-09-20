"use client";

import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart3,
  Calendar,
  Clock,
  DollarSign,
  FileCheck2,
  FileText,
  Globe,
  RefreshCw,
  Send,
  ShieldCheck,
  Target,
  User,
  Workflow,
} from "lucide-react";
import { useId } from "react";

export function Features() {
  const creatorFeatures = [
    {
      icon: Send,
      title: "One-click posting to social media platforms",
      description:
        "Publish everywhere without going on multiple social media platforms.",
    },
    {
      icon: FileText,
      title: "AI Integration",
      description:
        "AI integration to help you create content faster and easier.",
    },
    {
      icon: Calendar,
      title: "Drag and drop scheduling",
      description: "Move posts across days and times in seconds.",
    },
    {
      icon: BarChart3,
      title: "Basic analytics with actions",
      description: "Simple insights that tell you how to grow.",
    },
  ];

  const agencyFeatures = [
    {
      icon: User,
      title: "Client workspace organization",
      description:
        "Separate dashboards for each client with their own content libraries and brand assets.",
    },
    {
      icon: Workflow,
      title: "Bulk publishing across client accounts",
      description:
        "Schedule and publish content for multiple clients simultaneously across all their platforms.",
    },
    {
      icon: Globe,
      title: "Cross-platform content adaptation",
      description:
        "Automatically resize and reformat content for each client's specific platform requirements.",
    },
    {
      icon: FileCheck2,
      title: "Client approval workflows",
      description:
        "Send content drafts for client review and approval before publishing to their channels.",
    },
  ];

  const painPoints = [
    {
      icon: Clock,
      title: "Time-consuming admin tasks",
      description:
        "Content creators spend most of their time on administrative tasks like uploading, formatting, and cross-posting instead of actually creating content. This imbalance leads to burnout and reduced creative output.",
      value: "time-admin",
    },
    {
      icon: RefreshCw,
      title: "Manual resizing and formatting",
      description:
        "Every social media platform has different image sizes, video formats, and character limits. Creators waste hours adapting the same content for Instagram stories, LinkedIn posts, Twitter threads, and more.",
      value: "manual-formatting",
    },
    {
      icon: DollarSign,
      title: "Tool costs and missing features",
      description:
        "Existing tools are either too expensive, lack essential features, or creators worry that using third-party schedulers will hurt their organic reach and engagement rates on social platforms.",
      value: "tool-costs",
    },
    {
      icon: Target,
      title: "Client demands everywhere",
      description:
        "Agencies face pressure from clients who want a presence on every platform with consistent posting schedules, but lack the resources to manually manage multiple accounts across different social networks.",
      value: "client-demands",
    },
  ];

  return (
    <section className="sm:py-24 pt-20 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-1">
            <h2 className="text-3xl sm:text-4xl tracking-tight text-foreground  font-semibold font-lora">
              Key benefits for every team size
            </h2>
            <p className="mt-3 text-muted-foreground max-w-prose ">
              Designed for creators who want simplicity and agencies who require
              governance—no clutter, just what matters.
            </p>
          </div>

          <div className="lg:col-span-2 grid md:grid-cols-2 gap-6">
            {/* Creator/SMB */}
            <Card className="p-6">
              <div className="flex items-center gap-2">
                <User className="w-5 h-5 text-primary" />
                <h3 className="text-xl tracking-tight text-foreground font-lora">
                  For creators & small businesses
                </h3>
              </div>
              <ul className="mt-4 space-y-3 ">
                {creatorFeatures.map((feature, index) => (
                  // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                  <li key={index} className="flex gap-3">
                    <feature.icon className="w-5 h-5 shrink-0 text-primary" />
                    <div>
                      <div className="text-sm font-medium text-foreground">
                        {feature.title}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {feature.description}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="text-xs text-muted-foreground mt-auto">
                Built to remove the complexity barrier and cut time investment
                by hours each week. Helping you focus on content creation, not
                the hassle of uploading.
              </div>
            </Card>

            {/* Agencies */}
            <Card className="p-6" id={useId()}>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-primary" />
                <h3 className="text-xl tracking-tight text-foreground font-lora">
                  Social media marketing agencies
                </h3>
              </div>
              <ul className="mt-4 space-y-3 ">
                {agencyFeatures.map((feature, index) => (
                  // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                  <li key={index} className="flex gap-3">
                    <feature.icon className="w-5 h-5 shrink-0 text-primary" />
                    <div>
                      <div className="text-sm font-medium text-foreground">
                        {feature.title}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {feature.description}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="text-xs text-muted-foreground mt-auto">
                Ideal for social media marketing agencies who want to simplify
                their workflow and focus on content creation for their clients.
              </div>
            </Card>
          </div>
        </div>

        {/* Pain Points */}
        <div className="mt-20">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-1">
              <h2 className="text-3xl sm:text-4xl tracking-tight text-foreground font-semibold font-lora">
                What creators struggle with
              </h2>
              <p className="mt-3 text-muted-foreground max-w-prose">
                These are the real problems that waste hours of your time every
                week, keeping you from what you do best.
              </p>
            </div>

            <div className="lg:col-span-2">
              <Tabs defaultValue={painPoints[0].value} className="w-full">
                <TabsList className="grid w-full grid-cols-4 h-auto p-1">
                  {painPoints.map((point) => (
                    <TabsTrigger
                      key={point.value}
                      value={point.value}
                      className="flex items-center justify-center p-3 text-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                    >
                      <point.icon className="w-4 h-4" />
                    </TabsTrigger>
                  ))}
                </TabsList>

                {painPoints.map((point) => (
                  <TabsContent
                    key={point.value}
                    value={point.value}
                    className="mt-0"
                  >
                    <Card className="p-6 border-primary/20 rounded-t-none border-t-0">
                      <div className="flex items-center gap-3">
                        <point.icon className="w-5 h-5 text-primary" />
                        <h4 className="text-lg font-medium text-primary font-lora">
                          {point.title}
                        </h4>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {point.description}
                      </p>
                    </Card>
                  </TabsContent>
                ))}
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
