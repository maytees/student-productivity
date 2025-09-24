"use client";
import {
	Asterisk,
	BinaryIcon,
	BoxSelect,
	CameraIcon,
	CircleDot,
	LayoutTemplate,
	PlusCircle,
	Star,
	ToggleRight,
	Trash,
	TypeIcon,
} from "lucide-react";
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
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
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
				<div className="scroll-container overflow-x-hidden overflow-y-auto lg:max-h-[76vh] lg:relative flex-1">
					<div className="p-3 space-y-5">
						<AnimatePresence>
							{fields.map((question, index) => (
								<motion.div
									layout
									initial={{ opacity: 0, scale: 0.9, y: 30 }}
									animate={{
										opacity: 1,
										scale: 1,
										y: 0,
										transition: {
											type: "spring",
											damping: 20,
											stiffness: 300,
											delay: index * 0.1, // Stagger the entrance
										},
									}}
									exit={{
										opacity: 0,
										scale: 0.8,
										x: Math.random() > 0.5 ? 100 : -100, // Random direction
										rotate: Math.random() * 10 - 5, // Random slight rotation
										transition: {
											duration: 0.2 + Math.random() * 0.3, // Random duration between 0.4-0.7s
											delay: Math.random() * 0.2, // Random delay up to 0.2s
											ease: "easeInOut",
										},
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
					</div>
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
						<FormField
							control={form.control}
							name={`questions.${index}.type`}
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Select
											onValueChange={field.onChange}
											defaultValue={field.value}
										>
											<SelectTrigger className="[&>span_svg]:text-muted-foreground/80 [&>span]:flex [&>span]:items-center [&>span]:gap-2 [&>span_svg]:shrink-0">
												<SelectValue placeholder="Question Type" />
											</SelectTrigger>
											<SelectContent className="[&_*[role=option]>span>svg]:text-muted-foreground/80 [&_*[role=option]>span]:flex [&_*[role=option]>span]:gap-2 [&_*[role=option]>span>svg]:shrink-0">
												<SelectItem value="Text">
													<TypeIcon size={16} aria-hidden="true" />
													<span className="">Text</span>
												</SelectItem>
												<SelectItem value="Number">
													<BinaryIcon size={16} aria-hidden="true" />
													<span className="">Number</span>
												</SelectItem>
												<SelectItem value="Boolean">
													<ToggleRight size={16} aria-hidden="true" />
													<span className="">Yes/No</span>
												</SelectItem>
												<SelectItem value="Radio">
													<CircleDot size={16} aria-hidden="true" />
													<span className="">Single Select</span>
												</SelectItem>
												<SelectItem value="Checkbox">
													<BoxSelect size={16} aria-hidden="true" />
													<span className="">Multi-select</span>
												</SelectItem>
												<SelectItem value="Rating">
													<Star size={16} aria-hidden="true" />
													<span className="">Rating</span>
												</SelectItem>
												<SelectItem value="Photo">
													<CameraIcon size={16} aria-hidden="true" />
													<span className="">Photo</span>
												</SelectItem>
											</SelectContent>
										</Select>
									</FormControl>
									{/* <FormDescription>
								Question you&apos;re asking the shopper
							</FormDescription> */}
									<FormMessage />
								</FormItem>
							)}
						/>
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
			<CardContent className="space-y-5">
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
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name={`questions.${index}.helper`}
					render={({ field }) => (
						<FormItem>
							<FormLabel>Helper</FormLabel>
							<FormControl>
								<Input {...field} placeholder="Explain the answer" />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name={`questions.${index}.required`}
					render={({ field }) => (
						<FormItem className="flex flex-row-reverse items-center gap-2">
							<FormControl>
								<Switch
									size={"sm"}
									checked={field.value}
									onCheckedChange={field.onChange}
								/>
							</FormControl>
							<FormLabel>Required</FormLabel>
							{/* <FormMessage /> */}
						</FormItem>
					)}
				/>
			</CardContent>
		</Card>
	);
};

export default FormBuilder;
