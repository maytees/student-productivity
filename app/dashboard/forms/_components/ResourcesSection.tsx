import {
	BarChart3,
	ExternalLink,
	RotateCcw,
	ShoppingBag,
	UtensilsCrossed,
} from "lucide-react";
import Link from "next/link";

const resources = [
	{
		title: "Mystery Shopping Best Practices For Your Business",
		description:
			"Learn industry standards and proven methods to improve msytery shopping outcomes.",
		url: "/resources/best-practices",
		icon: ShoppingBag,
	},
	{
		title: "Designing Effective Forms For Shoppers",
		description:
			"Create effective forms for msytery shoppers that drive actionable insights for your business",
		url: "/resources/effective-forms",
		icon: BarChart3,
	},
	{
		title: "Service Recovery",
		description:
			"Learn how to turn failed mystery shopping experiences to customer loyatly wins.",
		url: "/resources/service-recovery",
		icon: RotateCcw,
	},
	{
		title: "Restaurant Service Quality Tips",
		description: "Resturaunt specific guide to hospitality excellence",
		url: "/resources/resturaunt-tips",
		icon: UtensilsCrossed,
	},
];

const ResourcesSection = () => {
	return (
		<div className="space-y-4 w-full">
			<div>
				<h2 className="text-lg font-semibold">Learning Resources</h2>
				<p className="text-sm text-muted-foreground">
					Expert guides and best practices to improve your evaluations
				</p>
			</div>
			<div className="grid gap-3">
				{resources.map((resource) => {
					const IconComponent = resource.icon;
					return (
						<Link
							key={resource.url}
							href={resource.url}
							target="_blank"
							rel="noreferrer"
							className="group flex items-center gap-3 p-4 border rounded-lg bg-card hover:bg-accent/50 transition-colors"
						>
							<div className="flex-shrink-0 mt-0.5">
								<IconComponent className="size-5 text-primary group-hover:text-primary transition-colors" />
							</div>
							<div className="flex-1 min-w-0">
								<div className="flex items-center gap-2">
									<h3 className="font-semibold text-sm group-hover:text-primary transition-colors">
										{resource.title}
									</h3>
									<ExternalLink className="size-3 text-muted-foreground group-hover:text-primary transition-colors" />
								</div>
								<p className="text-xs text-muted-foreground mt-1">
									{resource.description}
								</p>
							</div>
						</Link>
					);
				})}
			</div>
		</div>
	);
};

export default ResourcesSection;
