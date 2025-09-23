import { Plus } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import { getUsersForms } from "@/app/data/business/user/forms/get-forms";
import { Button } from "@/components/ui/button";
import FormsList from "./_components/FormsList";
import QuickTemplatesSection from "./_components/QuickTemplatesSection";
import ResourcesSection from "./_components/ResourcesSection";

const FormsPage = async () => {
	const forms = await getUsersForms();

	return (
		<div className="px-5 py-4 gap-4 md:gap-6 md:py-6">
			<div className="flex flex-row items-center justify-between mb-4 gap-1">
				<div className="flex flex-col">
					<h1 className="text-2xl font-bold">Forms ({forms.length})</h1>
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

			<Suspense fallback="Loading...">
				<FormsList forms={forms} />
			</Suspense>
			<QuickTemplatesSection />
			<ResourcesSection />
		</div>
	);
};

export default FormsPage;
