"use client";
import {
	BinaryIcon,
	CameraIcon,
	CheckIcon,
	GripVertical,
	Plus,
	SquareMousePointerIcon,
	StarIcon,
	ToggleRightIcon,
	TypeIcon,
	VideoIcon,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
	Sortable,
	SortableItem,
	SortableItemHandle,
} from "@/components/ui/sortable";
import type { QuestionType } from "@/lib/generated/prisma";

type SortableQuestion = {
	id: string;
	title: string;
	type: QuestionType;
	order: number;
};

const getTypeIcon = (type: SortableQuestion["type"]) => {
	switch (type) {
		case "Boolean":
			return <ToggleRightIcon className="w-4 h-4 text-green-500" />;
		case "Checkbox":
			return <CheckIcon className="w-4 h-4 text-blue-500" />;
		case "Number":
			return <BinaryIcon className="w-4 h-4 text-purple-500" />;
		case "Photo":
			return <CameraIcon className="w-4 h-4 text-pink-500" />;
		case "Radio":
			return <VideoIcon className="w-4 h-4 text-orange-500" />;
		case "Rating":
			return <StarIcon className="w-4 h-4 text-yellow-500" />;
		case "Text":
			return <TypeIcon className="w-4 h-4 text-indigo-500" />;
		case "TextArea":
			return <SquareMousePointerIcon className="w-4 h-4 text-red-500" />;
	}
};

const mockItems: SortableQuestion[] = [
	{
		id: "1",
		order: 1,
		title: "What is your full name?",
		type: "Text",
	},
	{
		id: "2",
		order: 2,
		title: "Please share your detailed feedback about our service",
		type: "TextArea",
	},
	{
		id: "3",
		order: 3,
		title:
			"How would you rate our customer service? (Excellent, Good, Fair, Poor)",
		type: "Radio",
	},
	{
		id: "4",
		order: 4,
		title: "Which features did you use? (Select all that apply)",
		type: "Checkbox",
	},
	{
		id: "5",
		order: 5,
		title: "Rate your overall satisfaction (1-5 stars)",
		type: "Rating",
	},
	{
		id: "6",
		order: 6,
		title: "How many people were in your party?",
		type: "Number",
	},
	{
		id: "7",
		order: 7,
		title: "Upload a photo of your receipt or invoice",
		type: "Photo",
	},
	{
		id: "8",
		order: 8,
		title: "Would you recommend us to a friend?",
		type: "Boolean",
	},
];

const jumpToQuestion = (id: string) => {
	// TODO: Jump to question
};

const QuestionOrder = ({ addQuestion }: { addQuestion: () => void }) => {
	const [items, setItems] = useState<SortableQuestion[]>(mockItems);

	const handleValueChange = (newItems: SortableQuestion[]) => {
		const updatedItems = newItems.map((item, index) => ({
			...item,
			order: index + 1,
		}));

		setItems(updatedItems);

		// TODO: Send server mutation to update

		// Show toast with new order
		toast.success("Items reordered successfully!", {
			description: `${newItems.map((item, index) => `${index + 1}. ${item.title}`).join(", ")}`,
			duration: 4000,
		});
	};

	const getItemValue = (item: SortableQuestion) => item.id;

	return (
		<div className="w-full h-full px-3 mx-auto space-y-3 border-r">
			<div className="flex flex-col pt-4">
				<h1 className="text-lg font-bold">Questions</h1>
				<p className="text-sm text-muted-foreground">
					Click on question to jump. Hold & Drag questions to reoder.
				</p>
			</div>
			<Sortable
				value={items}
				onValueChange={handleValueChange}
				getItemValue={getItemValue}
				strategy="vertical"
				className="space-y-2"
			>
				{items.map((item) => (
					<SortableItem key={item.id} value={item.id}>
						<button
							type="button"
							className="flex items-center w-full gap-2 px-3 py-3.5 transition-colors border rounded-lg cursor-pointer bg-sidebar border-border hover:bg-accent/50"
						>
							<div className="flex items-center gap-2">
								<SortableItemHandle className="text-muted-foreground hover:text-foreground">
									<GripVertical className="w-4 h-4" />
								</SortableItemHandle>
								<span className="text-sm text-muted-foreground">
									{item.order}
								</span>
								<div className="flex items-center gap-1 text-muted-foreground">
									{getTypeIcon(item.type)}
								</div>
							</div>

							<h4 className="text-sm font-medium truncate text-muted-foreground">
								{item.title}
							</h4>
						</button>
					</SortableItem>
				))}
			</Sortable>
			<Button
				size={"sm"}
				onClick={addQuestion}
				type="button"
				className="w-full mt-auto"
			>
				<Plus />
				Add Question
			</Button>
		</div>
	);
};

export default QuestionOrder;
