"use client";
import { useState } from "react";
import type { UseFormReturn } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogBody,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { CreateFormSchemaType } from "@/lib/schemas/createFormSchema";

export default function EditDetailsDialog({
	form,
}: {
	form: UseFormReturn<CreateFormSchemaType>;
}) {
	const [open, setOpen] = useState(false);

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button variant={"link"} className="p-0">
					Edit Details
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-xl">
				<DialogHeader>
					<DialogTitle>Edit Details</DialogTitle>
					<DialogDescription>
						Edit form title and description, this is what shoppers see when
						viewing your mystery shopping post.
					</DialogDescription>
				</DialogHeader>
				<DialogBody className="space-y-4">
					<FormField
						control={form.control}
						name="title"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Title</FormLabel>
								<FormControl>
									<Input
										placeholder="Resturaunt Shopping Evaluation"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="description"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Description</FormLabel>
								<FormControl>
									<Textarea
										placeholder="e.g Visit during dinner hours (5-9 PM), order an entree and drink, and evaluate service speed, food quality, and overall experience. Take photos of your meal and receipt. Estimated visit time: 45-60 minutes."
										className="min-h-24"
										maxLength={500}
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</DialogBody>
				<DialogFooter className="max-sm:gap-4">
					<DialogClose asChild>
						<Button type="button" variant="outline">
							Close
						</Button>
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
