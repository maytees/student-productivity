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
			return <ToggleRightIcon className="w-4 h-4 text-primary" />;
		case "Checkbox":
			return <CheckIcon className="w-4 h-4 text-primary" />;
		case "Number":
			return <BinaryIcon className="w-4 h-4 text-primary" />;
		case "Photo":
			return <CameraIcon className="w-4 h-4 text-primary" />;
		case "Radio":
			return <VideoIcon className="w-4 h-4 text-primary" />;
		case "Rating":
			return <StarIcon className="w-4 h-4 text-primary" />;
		case "Text":
			return <TypeIcon className="w-4 h-4 text-primary" />;
		case "TextArea":
			return <SquareMousePointerIcon className="w-4 h-4" />;
	}
};

const mockItems: SortableQuestion[] = [
	{
		id: "1",
		order: 1,
		title: "hO was your expeirience",
		type: "Text",
	},
	{
		id: "2",
		order: 2,
		title: "Was it clean",
		type: "Boolean",
	},
	{
		id: "3",
		order: 3,
		title: "How as the food (Good, bad, really bad, amazing)",
		type: "Radio",
	},
	{
		id: "4",
		order: 4,
		title: "Upload a photo of your reciept",
		type: "Photo",
	},
];

const jumpToQuestion = (id: string) => {
	// TODO: Jump to question
};

const QuestionOrder = () => {
	const [items, setItems] = useState<SortableQuestion[]>(mockItems);

	const handleValueChange = (newItems: SortableQuestion[]) => {
		setItems(newItems);

		// Show toast with new order
		toast.success("Items reordered successfully!", {
			description: `${newItems.map((item, index) => `${index + 1}. ${item.title}`).join(", ")}`,
			duration: 4000,
		});
	};

	const getItemValue = (item: SortableQuestion) => item.id;

	return (
		<div className="w-full max-w-4xl px-3 mx-auto space-y-8">
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
							className="flex items-center w-full px-3 py-2 border rounded-lg cursor-pointer gap-3 transition-colors bg-sidebar border-border hover:bg-accent/50"
						>
							<SortableItemHandle className="text-muted-foreground hover:text-foreground">
								<GripVertical className="w-4 h-4" />
							</SortableItemHandle>
							<span className="text-sm text-muted-foreground">
								{item.order}
							</span>
							<div className="flex items-center gap-2 text-muted-foreground">
								{getTypeIcon(item.type)}
							</div>
							<h4 className="text-sm font-medium truncate text-muted-foreground">
								{item.title}
							</h4>
						</button>
					</SortableItem>
				))}

				<Button size={"sm"} className="w-full">
					<Plus />
					Add Question
				</Button>
			</Sortable>
		</div>
	);
};

export default QuestionOrder;
