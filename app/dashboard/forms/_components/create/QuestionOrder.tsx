"use client";
import {
	BinaryIcon,
	BoxSelect,
	CameraIcon,
	CircleDot,
	GripVertical,
	Plus,
	StarIcon,
	ToggleRightIcon,
	TypeIcon,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import type { UseFieldArrayReturn, UseFormReturn } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import {
	Sortable,
	SortableItem,
	SortableItemHandle,
} from "@/components/ui/sortable";
import type { CreateFormSchemaType } from "@/lib/schemas/createFormSchema";

const getTypeIcon = (
	type:
		| "Boolean"
		| "Checkbox"
		| "Number"
		| "Photo"
		| "Radio"
		| "Rating"
		| "Text",
) => {
	switch (type) {
		case "Boolean":
			return <ToggleRightIcon className="w-4 h-4 text-green-500" />;
		case "Checkbox":
			return <BoxSelect className="w-4 h-4 text-blue-500" />;
		case "Number":
			return <BinaryIcon className="w-4 h-4 text-purple-500" />;
		case "Photo":
			return <CameraIcon className="w-4 h-4 text-pink-500" />;
		case "Radio":
			return <CircleDot className="w-4 h-4 text-orange-500" />;
		case "Rating":
			return <StarIcon className="w-4 h-4 text-yellow-500" />;
		case "Text":
			return <TypeIcon className="w-4 h-4 text-indigo-500" />;
	}
};

// const jumpToQuestion = (id: string) => {
// 	// TODO: Jump to question
// };

const QuestionOrder = ({
	addQuestion,
	fields,
	form,
	arrayReturn,
}: {
	addQuestion: () => void;
	fields: UseFieldArrayReturn<CreateFormSchemaType, "questions">["fields"];
	form: UseFormReturn<CreateFormSchemaType>;
	arrayReturn: UseFieldArrayReturn<CreateFormSchemaType, "questions">;
}) => {
	const { replace } = arrayReturn;

	// Watch all questions to trigger re-renders when they change
	const watchedQuestions = form.watch("questions");

	const handleValueChange = (newItems: typeof fields) => {
		// Create the reordered array based on newItems order
		const reorderedQuestions = newItems.map((item, index) => {
			const originalIndex = fields.findIndex((field) => field.id === item.id);
			const originalQuestion = form.getValues(`questions.${originalIndex}`);
			return {
				type: originalQuestion?.type || "Text",
				title: originalQuestion?.title || "",
				helper: originalQuestion?.helper || "",
				required: originalQuestion?.required ?? true,
				options: originalQuestion?.options || null,
				order: index + 1,
			};
		});

		// Replace the entire array with the new order
		replace(reorderedQuestions);

		// Show success toast
		toast.success("Questions reordered successfully!", {
			description: `New order: ${newItems.map((item, index) => `${index + 1}. ${watchedQuestions[fields.findIndex((f) => f.id === item.id)]?.title || "Untitled"}`).join(", ")}`,
			duration: 4000,
		});
	};

	const getItemValue = (item: (typeof fields)[0]) => item.id;

	return (
		<div className="w-full h-full px-3 flex flex-col border-r">
			{/* Header section */}
			<div className="flex-shrink-0 pt-4 pb-3">
				<h1 className="text-lg font-bold">Questions</h1>
				<p className="text-sm text-muted-foreground">
					Click on question to jump. Hold & Drag questions to reorder.
				</p>
			</div>

			{/* Scrollable content */}
			{fields.length !== 0 ? (
				<ScrollArea className="flex-1 overflow-auto min-h-0">
					<div className="py-2 space-y-2">
						<AnimatePresence>
							<Sortable
								value={fields}
								onValueChange={handleValueChange}
								getItemValue={getItemValue}
								strategy="vertical"
								className="space-y-2"
							>
								{fields.map((item, index) => (
									<SortableItem key={item.id} value={item.id}>
										<motion.button
											layout
											initial={{ opacity: 0, scale: 0.8, y: 20 }}
											animate={{ opacity: 1, scale: 1, y: 0 }}
											exit={{
												opacity: 0,
												scale: 0.8,
												x: -100,
												transition: {
													duration: 0.4,
													ease: "easeInOut",
												},
											}}
											whileHover={{
												scale: 1.02,
												transition: { duration: 0.2 },
											}}
											whileTap={{ scale: 0.98 }}
											type="button"
											className="flex items-center w-full gap-2 px-3 py-3.5 transition-colors border rounded-lg cursor-pointer bg-sidebar border-border hover:bg-accent/50"
										>
											<div className="flex items-center gap-2">
												<SortableItemHandle className="text-muted-foreground hover:text-foreground">
													<GripVertical className="w-4 h-4" />
												</SortableItemHandle>
												<span className="text-sm text-muted-foreground">
													{watchedQuestions[index]?.order || item.order}
												</span>
												<div className="flex items-center gap-1 text-muted-foreground">
													{getTypeIcon(
														watchedQuestions[index]?.type || item.type,
													)}
												</div>
											</div>
											<h4 className="text-sm font-medium truncate text-muted-foreground">
												{watchedQuestions[index]?.title || "Untitled Question"}
											</h4>
										</motion.button>
									</SortableItem>
								))}
							</Sortable>
						</AnimatePresence>
					</div>
				</ScrollArea>
			) : (
				<div className="flex-1 overflow-auto min-h-0 flex flex-col gap-3">
					<Skeleton className="w-full h-8" />
					<Skeleton className="w-full h-8" />
					<Skeleton className="w-full h-8" />
					<Skeleton className="w-full h-8" />
					<Skeleton className="w-full h-8" />
				</div>
			)}

			{/* Footer button */}
			<Button
				size="sm"
				onClick={addQuestion}
				type="button"
				className="w-full flex-shrink-0 mt-3 mb-5"
			>
				<Plus />
				Add Question
			</Button>
		</div>
	);
};

export default QuestionOrder;
