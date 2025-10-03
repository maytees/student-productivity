"use client";

import { CircleCheck, CircleHelp } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

// const tooltipContent = {
//     styles: "Choose from a variety of styles to suit your preferences.",
//     filters: "Choose from a variety of filters to enhance your portraits.",
//     credits: "Use these credits to retouch your portraits.",
// };

const YEARLY_DISCOUNT = 20;
type PlanFeature = { title: string; tooltip?: string };
type Plan = {
	name: string;
	price: number;
	description: string;
	features: PlanFeature[];
	buttonText: string;
	isPopular?: boolean;
	isRecommended?: boolean;
};

const plans: Plan[] = [
	{
		name: "Free",
		price: 0,
		description: "Plan assignments, track a few courses, and try study tools.",
		features: [
			{ title: "Up to 3 courses" },
			{ title: "Assignments + Kanban + Table" },
			{ title: "Basic study tools (Pomodoro, Flashcards)" },
			{ title: "Email sign‑in" },
		],
		buttonText: "Start Free",
	},
	{
		name: "Pro",
		price: 6,
		isRecommended: true,
		description: "Everything you need to stay organized all semester.",
		features: [
			{ title: "Unlimited courses" },
			{ title: "Priority + labels + subtasks" },
			{ title: "Advanced study tools and stats" },
			{ title: "Email + GitHub sign‑in" },
		],
		buttonText: "Upgrade to Pro",
		isPopular: true,
	},
	{
		name: "Teams (Soon)",
		price: 0,
		description: "Collaboration for groups and clubs.",
		features: [
			{ title: "Shared courses and assignments" },
			{ title: "Real‑time collaboration" },
			{ title: "Team insights" },
		],
		buttonText: "Join Waitlist",
	},
];

const Pricing = () => {
	const [selectedBillingPeriod, setSelectedBillingPeriod] = useState("monthly");

	return (
		<div
			id="pricing"
			className="flex flex-col items-center justify-center py-12 xs:py-20 px-6"
		>
			<h1 className="text-3xl xs:text-4xl md:text-5xl font-bold text-center tracking-tight">
				Simple pricing for students
			</h1>
			<Tabs
				value={selectedBillingPeriod}
				onValueChange={setSelectedBillingPeriod}
				className="mt-8"
			>
				<TabsList className="h-11 px-1.5 rounded-full bg-primary/5">
					<TabsTrigger value="monthly" className="py-1.5 rounded-full">
						Monthly
					</TabsTrigger>
					<TabsTrigger value="yearly" className="py-1.5 rounded-full">
						Yearly (Save {YEARLY_DISCOUNT}%)
					</TabsTrigger>
				</TabsList>
			</Tabs>
			<div className="mt-12 max-w-screen-lg mx-auto grid grid-cols-1 lg:grid-cols-3 items-center gap-8">
				{plans.map((plan) => (
					<div
						key={plan.name}
						className={cn("relative border rounded-xl p-6 bg-background/50", {
							"border-[2px] border-primary bg-background py-10": plan.isPopular,
						})}
					>
						{plan.isPopular && (
							<Badge className="absolute top-0 right-1/2 translate-x-1/2 -translate-y-1/2">
								Most Popular
							</Badge>
						)}
						<h3 className="text-lg font-medium">{plan.name}</h3>
						<p className="mt-2 text-4xl font-bold">
							$
							{selectedBillingPeriod === "monthly"
								? plan.price
								: plan.price * ((100 - YEARLY_DISCOUNT) / 100)}
							<span className="ml-1.5 text-sm text-muted-foreground font-normal">
								/month
							</span>
						</p>
						<p className="mt-4 font-medium text-muted-foreground">
							{plan.description}
						</p>

						<Button
							variant={plan.isPopular ? "primary" : "outline"}
							size="lg"
							className="w-full mt-6 text-base"
							asChild
						>
							<Link href="/login">{plan.buttonText}</Link>
						</Button>
						<Separator className="my-8" />
						<ul className="space-y-2">
							{plan.features.map((feature) => (
								<li key={feature.title} className="flex items-start gap-1.5">
									<CircleCheck className="h-4 w-4 mt-1 text-green-600" />
									{feature.title}
									{feature.tooltip && (
										<Tooltip>
											<TooltipTrigger className="cursor-help">
												<CircleHelp className="h-4 w-4 mt-1 text-gray-500" />
											</TooltipTrigger>
											<TooltipContent>{feature.tooltip}</TooltipContent>
										</Tooltip>
									)}
								</li>
							))}
						</ul>
					</div>
				))}
			</div>
		</div>
	);
};

export default Pricing;
