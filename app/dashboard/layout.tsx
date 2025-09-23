import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { requireUser } from "../data/require-user";

export default async function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	await requireUser();
	return (
		<SidebarProvider
			style={
				{
					"--sidebar-width": "calc(var(--spacing) * 72)",
					"--header-height": "calc(var(--spacing) * 12)",
				} as React.CSSProperties
			}
		>
			<AppSidebar variant="inset" collapsible="icon" />
			<SidebarInset>
				<SiteHeader />
				<div className="flex flex-col flex-1">
					<div className="@container/main flex flex-1 h-full flex-col gap-2">
						<div className="flex flex-col h-full gap-4">{children}</div>
					</div>
				</div>
			</SidebarInset>
		</SidebarProvider>
	);
}
