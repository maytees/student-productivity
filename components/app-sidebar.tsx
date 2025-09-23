"use client";

import {
	IconAnalyze,
	IconCalendar,
	IconChartBar,
	IconDashboard,
	IconDatabase,
	IconFileAi,
	IconForms,
	IconHelp,
	IconNavigation,
	IconReport,
	IconSearch,
	IconSettings,
} from "@tabler/icons-react";
import { Asterisk } from "lucide-react";
import Link from "next/link";
import type * as React from "react";
import { NavMain } from "@/components/nav-main";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";

const data = {
	user: {
		name: "shadcn",
		email: "m@example.com",
		avatar: "/avatars/shadcn.jpg",
	},
	navMain: [
		{
			title: "Dashboard",
			url: "/dashboard",
			icon: IconDashboard,
		},
		{
			title: "Forms",
			url: "/dashboard/forms",
			icon: IconForms,
		},
		{
			title: "Calendar",
			url: "/dashboard/calendar",
			icon: IconCalendar,
		},
		{
			title: "Assignments",
			url: "/dashboard/assignments",
			icon: IconNavigation,
		},
		{
			title: "Reports",
			url: "/dashboard/reports",
			icon: IconAnalyze,
		},
		{
			title: "Analytics",
			url: "/dashboard/analytics",
			icon: IconChartBar,
		},
	],
	navSecondary: [
		{
			title: "Settings",
			url: "/dashboard/settings",
			icon: IconSettings,
		},
		{
			title: "Get Help",
			url: "#",
			icon: IconHelp,
		},
		{
			title: "Search",
			url: "#",
			icon: IconSearch,
		},
	],
	documents: [
		{
			name: "Content Library",
			url: "/dashboard/content",
			icon: IconDatabase,
		},
		{
			name: "Templates",
			url: "/dashboard/templates",
			icon: IconFileAi,
		},
		{
			name: "Reports",
			url: "/dashboard/reports",
			icon: IconReport,
		},
	],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	return (
		<Sidebar collapsible="offcanvas" {...props}>
			<SidebarHeader>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton
							asChild
							className="data-[slot=sidebar-menu-button]:!p-1.5 "
						>
							<Link href="/">
								<Asterisk className="!size-5" />
								<span className="text-base font-semibold">Molnr</span>
							</Link>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>
			<SidebarContent>
				<NavMain items={data.navMain} />
				{/* <NavDocuments items={data.documents} /> */}
				<NavSecondary items={data.navSecondary} className="mt-auto" />
			</SidebarContent>
			<SidebarFooter>
				<NavUser />
			</SidebarFooter>
		</Sidebar>
	);
}
