import { FileText } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

type TemplateCardType = {
	image?: string;
	name: string;
	description: string;
	link: string;
};

const quickTemplates: TemplateCardType[] = [
	{
		image:
			"https://images.squarespace-cdn.com/content/v1/570a72d222482e7442eda206/6f3b5a32-cd75-4e09-abff-18a0257db569/annette-dining-room-hero.jpg",
		name: "Restaurant General Evaluation",
		description:
			"Complete dining experience assessment covering service speed, food quality, cleanliness, and staff friendliness. Includes receipt verification and atmosphere rating.",
		link: "/dashboard/forms/create/template?name=restaurant-general",
	},
	{
		image: "/templates/retail-template.svg",
		name: "Retail Store Experience",
		description:
			"Evaluate customer service, product availability, store cleanliness, checkout process, and staff knowledge. Perfect for clothing, electronics, and general merchandise stores.",
		link: "/dashboard/forms/create/template?name=retail-experience",
	},
	{
		image: "",
		name: "Hotel Stay Experience",
		description:
			"Comprehensive accommodation evaluation covering check-in process, room condition, amenities, housekeeping quality, and front desk service. Includes facility assessment.",
		link: "/dashboard/forms/create/template?name=hotel-experience",
	},
	{
		image: "",
		name: "Auto Dealership Visit",
		description:
			"Comprehensive evaluation of sales process, greeting time, vehicle presentation, test drive experience, and follow-up communication quality.",
		link: "/dashboard/forms/create/template?name=auto-dealership",
	},
	{
		image: "",
		name: "Coffee Shop Experience",
		description:
			"Quick service evaluation focusing on order accuracy, wait time, product quality, cleanliness, and atmosphere. Ideal for cafes and quick-service establishments.",
		link: "/dashboard/forms/create/template?name=coffee-shop",
	},
];

const QuickTemplatesSection = () => {
	return (
		<>
			<div className="flex flex-row items-center justify-between mb-2">
				<div className="flex flex-col gap-1">
					<h2 className="text-xl font-bold">Form Templates</h2>
					<p className="text-sm text-muted-foreground">
						Start with proven templates for your industry
					</p>
				</div>

				<Button asChild>
					<Link href="/dashboard/forms/templates?all">View All</Link>
				</Button>
			</div>
			<ScrollArea className="w-full rounded-md whitespace-nowrap">
				<div className="flex space-x-4 w-max">
					{quickTemplates.map((template) => (
						<div key={template.link} className="w-72 min-h-fit">
							<div
								key={template.name}
								className="relative flex-none p-4 mb-5 transition-colors border rounded-lg cursor-pointer group w-72 bg-card hover:bg-accent/50"
							>
								<div className="space-y-3">
									<div className="flex items-center justify-center w-full h-32 overflow-hidden rounded-md bg-gradient-to-br from-primary/10 to-primary/5">
										{template.image ? (
											<Image
												src={template.image}
												alt={template.name}
												width={288}
												height={128}
												className="object-cover w-full h-full"
											/>
										) : (
											<FileText className="size-8 text-primary/60" />
										)}
									</div>
									<div className="space-y-1">
										<h3 className="text-sm font-medium transition-colors group-hover:text-primary">
											{template.name}
										</h3>
										<p className="max-w-full text-xs text-muted-foreground text-wrap">
											{template.description}
										</p>
									</div>
									<Button
										asChild
										size="sm"
										variant="outline"
										className="w-full"
									>
										<Link href={template.link}>Use Template</Link>
									</Button>
								</div>
							</div>
						</div>
					))}
				</div>
				<ScrollBar orientation="horizontal" />
			</ScrollArea>
		</>
	);
};

export default QuickTemplatesSection;
