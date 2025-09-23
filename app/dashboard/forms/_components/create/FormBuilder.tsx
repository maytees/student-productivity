"use client";
import { Asterisk, LayoutTemplate, PlusCircle, Trash } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import type { UseFieldArrayReturn, UseFormReturn } from "react-hook-form";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardHeader,
	CardHeading,
	CardToolbar,
} from "@/components/ui/card";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import type { Question } from "@/lib/generated/prisma";
import type {
	CreateFormSchemaType,
	QuestionSchemaType,
} from "@/lib/schemas/createFormSchema";

// From Prisma
// type Question = {
// 	id: string;
// 	formId: string;
// 	type: QuestionType;
// 	title: string;
// 	description: string | null;
// 	required: boolean;
// 	order: number;
// 	options: JsonValue | null;
// 	metadata: JsonValue | null;
// 	createdAt: Date;
// 	updatedAt: Date;
// };

type QuestionType = Omit<Question, "createdAt" | "updatedAt" | "formId">;

export const FormBuilder = ({
	addQuestion,
	removeQuestion,
	form,
	fields,
}: {
	addQuestion: () => void;
	removeQuestion: (index: number) => void;
	form: UseFormReturn<CreateFormSchemaType>;
	fields: UseFieldArrayReturn<CreateFormSchemaType, "questions">["fields"];
}) => {
	// const [questions, setQuestions] = useState<QuestionType[]>([
	// 	{
	// 		id: "1",
	// 		title:
	// 			"Did the employee give you a genuinely friendly greeting and give you their full attention during the ordering process?",
	// 		description: null,
	// 		order: 1,
	// 		type: "Boolean",
	// 		required: true,
	// 		metadata: null,
	// 		options: null,
	// 	},
	// ]);

	return (
		<div className="flex flex-col h-full gap-5">
			{fields.length > 0 ? (
				<div className="p-3 space-y-5">
					<AnimatePresence>
						{fields.map((question, index) => (
							<motion.div
								initial={{ opacity: 0, x: -50 }}
								animate={{ opacity: 1, x: 0 }}
								exit={{
									opacity: 0,
									x: 50,
									transition: { duration: 0.3 },
								}}
								key={question.id}
							>
								<QuestionCard
									removeQuestion={() => removeQuestion(index)}
									question={question}
									index={index}
									form={form}
								/>
							</motion.div>
						))}
					</AnimatePresence>
					{/* {fields.map((question) => (
						<QuestionCard key={question.id} question={question}></QuestionCard>
					))} */}
				</div>
			) : (
				<div className="flex flex-col items-center justify-center h-full gap-4 mb-42 ">
					<Asterisk className="size-8" />
					<div className="flex flex-col items-center gap-1">
						<h1 className="text-xl font-bold">Fresh Start?</h1>
						<p className="max-w-sm text-sm text-center text-muted-foreground">
							There are no questions at the moment, would you like to add one or
							pick from our industry standard templates?
						</p>
					</div>
					<div className="flex flex-row gap-2">
						<Button variant={"outline"} size={"sm"}>
							<LayoutTemplate />
							View Templates
						</Button>
						<Button size={"sm"} onClick={addQuestion}>
							<PlusCircle />
							Add Question
						</Button>
					</div>
				</div>
			)}
		</div>
	);
};

type QuestionCardProps = {
	question: NonNullable<QuestionSchemaType>;
	index: number;
	form: UseFormReturn<CreateFormSchemaType>;
	removeQuestion: (index: number) => void;
};

const QuestionCard = ({
	question,
	index,
	form,
	removeQuestion,
}: QuestionCardProps) => {
	return (
		<Card>
			<CardHeading>
				<CardHeader>
					Question {question.order}
					<CardToolbar>
						<AlertDialog>
							<AlertDialogTrigger asChild>
								<Button variant={"foreground"}>
									<Trash className="text-destructive" />
								</Button>
							</AlertDialogTrigger>
							<AlertDialogContent>
								<AlertDialogHeader>
									<AlertDialogTitle>Are you sure?</AlertDialogTitle>
									<AlertDialogDescription>
										Are you sure you want to delete this question? You
										can&apos;t undo this action! Take a moment to review the
										details provided to ensure you understand the implications.
									</AlertDialogDescription>
								</AlertDialogHeader>
								<AlertDialogFooter>
									<AlertDialogCancel>Cancel</AlertDialogCancel>
									<AlertDialogAction onClick={() => removeQuestion(index)}>
										Delete
									</AlertDialogAction>
								</AlertDialogFooter>
							</AlertDialogContent>
						</AlertDialog>
					</CardToolbar>
				</CardHeader>
			</CardHeading>
			<CardContent>
				<FormField
					control={form.control}
					name={`questions.${index}.title`}
					render={({ field }) => (
						<FormItem>
							<FormLabel>Question</FormLabel>
							<FormControl>
								<Input
									{...field}
									placeholder="What are you asking the shopper?"
								/>
							</FormControl>
							{/* <FormDescription>
								Question you&apos;re asking the shopper
							</FormDescription> */}
							<FormMessage />
						</FormItem>
					)}
				/>
				{/* <Input
					{...form.register(`questions.${index}.title`)}
					defaultValue={question.title}
				/>
				<select {...form.register(`questions.${index}.type`)}>
					<option value="TEXT">Text</option>
					<option value="RADIO">Radio</option>
				</select> */}
			</CardContent>
		</Card>
	);
};

export default FormBuilder;

// <div key={question.id}>
// 	{/* Question fields */}
// 	<input
// 		{...form.register(`questions.${index}.title`)}
// 		placeholder="Question title"
// 	/>
// 	<select {...form.register(`questions.${index}.type`)}>
// 		<option value="TEXT">Text</option>
// 		<option value="RADIO">Radio</option>
// 		{/* ... other options */}
// 	</select>
// 	<button type="button" onClick={() => removeQuestion(index)}>
// 		Remove
// 	</button>
// </div>
