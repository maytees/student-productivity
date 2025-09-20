import { Plus } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import FormsList from "./_components/FormsList";
import QuickTemplatesSection from "./_components/QuickTemplatesSection";
import ResourcesSection from "./_components/ResourcesSection";

const FormsPage = () => {
	return (
		<>
			<div className="flex flex-row items-center justify-between">
				<div className="flex flex-col">
					<h1 className="text-2xl font-bold">Forms (0)</h1>
					<p className="text-sm text-muted-foreground">
						Manage your evaluation forms here.
					</p>
				</div>

				<div className="flex flex-row gap-2">
					<Button asChild size={"icon"}>
						<Link href="/dashboard/forms/create">
							<Plus />
						</Link>
					</Button>
				</div>
			</div>

			<FormsList />
			<QuickTemplatesSection />
			<ResourcesSection />
		</>
	);
};

export default FormsPage;
