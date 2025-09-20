"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useId } from "react";

export function FAQ() {
  const faqs = [
    {
      question: "Will using a scheduling tool hurt my organic reach?",
      answer:
        "No. We use native posting methods that social platforms recognize as authentic. Many creators actually see better engagement because they can post consistently at optimal times when their audience is most active.",
    },
    {
      question: "How does the AI content creation work?",
      answer:
        "Our AI helps you generate captions, hashtags, and content ideas based on your niche and audience. You can also use it to adapt existing content for different platforms while maintaining your unique voice and brand.",
    },
    {
      question: "Which social media platforms can I post to?",
      answer:
        "You can schedule posts to Instagram, Facebook, LinkedIn, Twitter/X, TikTok, YouTube Shorts, Threads, and Pinterest. The Free plan includes 3 platforms, while paid plans unlock all platforms.",
    },
    {
      question: "Can I connect multiple accounts per platform?",
      answer:
        "The Free plan allows 1 account per platform to get you started. Creator Pro and Agency plans allow you to connect multiple accounts per platform, perfect for managing personal and business accounts or multiple brands.",
    },
    {
      question: "Can I manage multiple client accounts as an agency?",
      answer:
        "Yes! The Agency plan is designed specifically for this. You get separate workspaces for each client, approval workflows, team collaboration tools, and the ability to publish across all client accounts simultaneously.",
    },
    {
      question: "What if I need help getting started?",
      answer:
        "We provide onboarding tutorials, content templates, and best practice guides. Creator Pro includes email support within 24 hours, while Agency users get priority support with 2-hour response times plus monthly strategy calls.",
    },
  ];

  return (
    <section id={useId()} className="py-20 sm:py-24">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center">
          <h2 className="text-3xl tracking-tight text-foreground  font-semibold font-lora">
            Frequently asked questions
          </h2>
          <p className="mt-3 text-muted-foreground ">
            Everything you need to know before you start.
          </p>
        </div>

        <div className="mt-10 py-3 ">
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, index) => (
              <AccordionItem
                // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                key={index}
                value={`item-${index}`}
                className="border border-border rounded-lg bg-card px-4 data-[state=open]:bg-card"
              >
                <AccordionTrigger className="text-sm text-foreground  hover:no-underline py-4">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground  pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
