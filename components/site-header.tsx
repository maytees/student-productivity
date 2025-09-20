"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";

export function SiteHeader() {
	const pathname = usePathname();

	const getPageTitle = (path: string) => {
		if (path === "/dashboard") return "Dashboard";
		if (path === "/dashboard/schedule") return "Schedule Video";
		// Add more routes as needed
		return "Dashboard";
	};

	const getBreadcrumbs = (path: string) => {
		const segments = path.split("/").filter(Boolean);
		const breadcrumbs = [];

		if (segments.length > 1) {
			breadcrumbs.push({
				label: "Dashboard",
				href: "/dashboard",
				isLast: false,
			});

			if (segments[1] === "assignments") {
				breadcrumbs.push({
					label: "Assignments",
					href: "/dashboard/assignments",
					isLast: segments[2] === undefined,
				});

				if (segments[2] === "create") {
					breadcrumbs.push({
						label: "Create",
						href: "/dashboard/assignments/create",
						isLast: true,
					});
				}
			}

			if (segments[1] === "forms") {
				breadcrumbs.push({
					label: "Forms",
					href: "/dashboard/forms",
					isLast: segments[2] === undefined,
				});

				if (segments[2] === "create") {
					breadcrumbs.push({
						label: "Create",
						href: "/dashboard/forms/create",
						isLast: true,
					});
				}
			}

			if (segments[1] === "calendar") {
				breadcrumbs.push({
					label: "Calendar",
					href: "/dashboard/calendar",
					isLast: true,
				});
			}

			if (segments[1] === "reports") {
				breadcrumbs.push({
					label: "Reports",
					href: "/dashboard/reports",
					isLast: true,
				});
			}

			if (segments[1] === "analytics") {
				breadcrumbs.push({
					label: "Analytics",
					href: "/dashboard/analytics",
					isLast: true,
				});
			}
		} else if (segments[0] === "dashboard") {
			breadcrumbs.push({
				label: "Dashboard",
				href: "/dashboard",
				isLast: true,
			});
		}
		return breadcrumbs;
	};

	const breadcrumbs = getBreadcrumbs(pathname);

	return (
		<header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
			<div className="flex items-center w-full px-4 gap-1 lg:gap-2 lg:px-6">
				<SidebarTrigger className="-ml-1" />
				<Separator
					orientation="vertical"
					className="mx-2 data-[orientation=vertical]:h-4"
				/>
				<Breadcrumb>
					<BreadcrumbList>
						{breadcrumbs.map((breadcrumb) => (
							<React.Fragment key={breadcrumb.href}>
								<BreadcrumbItem key={breadcrumb.href}>
									{breadcrumb.isLast ? (
										<BreadcrumbPage className="text-base font-medium">
											{breadcrumb.label}
										</BreadcrumbPage>
									) : (
										<BreadcrumbLink asChild className="text-base font-medium">
											<Link href={breadcrumb.href}>{breadcrumb.label}</Link>
										</BreadcrumbLink>
									)}
								</BreadcrumbItem>
								{!breadcrumb.isLast && <BreadcrumbSeparator />}
							</React.Fragment>
						))}
					</BreadcrumbList>
				</Breadcrumb>
			</div>
		</header>
	);
}
