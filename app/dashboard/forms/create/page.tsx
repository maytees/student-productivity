"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, Save, Settings } from "lucide-react";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import {
	type CreateFormSchemaType,
	createFormSchema,
} from "@/lib/schemas/createFormSchema";
import EditDetailsDialog from "../_components/create/EditDetails";
import FormBuilder from "../_components/create/FormBuilder";
import QuestionOrder from "../_components/create/QuestionOrder";

const CreateFormPage = () => {
	// const [pending, startTransition] = useTransition();
	// const router = useRouter();

	const form = useForm<CreateFormSchemaType>({
		resolver: zodResolver(createFormSchema),
		defaultValues: {
			title: "",
			description: "",
			questions: [],
		},
		mode: "onSubmit",
	});

	// console.log(`${JSON.stringify(form.formState.errors)} is errors`);

	function onSubmit(values: CreateFormSchemaType) {
		console.log(values);
		toast.success("Saved", { description: JSON.stringify(form.getValues()) });
		// startTransition(async () => {
		// const { data: result, error } = await tryCatch(CreateCourse(values));
		// if (error) {
		// 	toast.error("An unexpected error occurred. Please try again.");
		// 	return;
		// }
		// if (result.status === "success") {
		// 	toast.success(result.message);
		// 	form.reset();
		// 	router.push("/admin/courses");
		// } else if (result.status === "error") {
		// 	toast.error(result.message);
		// }
		// });
	}

	const arrayReturn = useFieldArray({
		control: form.control, // control props comes from useForm (optional: if you are using FormProvider)
		name: "questions", // unique name for your Field Array
	});

	const {
		fields,
		append,
		// prepend,
		remove,
		// swap,
		// move,
		// insert,
		// replace,
		// update,
	} = arrayReturn;

	const addQuestion = () => {
		append({
			type: "Text",
			title: "",
			options: null,
			order: fields.length + 1,
			required: true,
			helper: "",
		});
	};

	const removeQuestion = (index: number) => {
		remove(index);
		const currentQuestions = form.getValues("questions");
		currentQuestions.forEach((_, questionIndex) => {
			form.setValue(`questions.${questionIndex}.order`, questionIndex + 1);
		});
	};

	const title = form.watch("title");
	const description = form.watch("description");

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)}>
				<div className="flex flex-col h-full lg:flex-row ">
					<aside className="lg:h-[calc(100vh-74px)] lg:sticky lg:top-0 max-lg:border-b max-lg:pb-5 lg:w-1/2 ">
						<QuestionOrder
							form={form}
							fields={fields}
							arrayReturn={arrayReturn}
							addQuestion={addQuestion}
						/>
					</aside>
					<div className="flex flex-col h-full w-full gap-2 py-4 lg:h-[calc(100vh-74px)]">
						<div className="flex flex-row max-lg:py-2 max-lg:flex-col-reverse max-lg:gap-5 justify-between px-3 border-b">
							<div className="flex flex-col items-start">
								<h1 className="max-w-lg text-xl font-bold">
									{title || "No Title"}
								</h1>
								<p className="max-w-lg text-sm text-muted-foreground">
									{description || "No Description"}
								</p>
								<EditDetailsDialog form={form} />
							</div>
							<div className="flex flex-row gap-2">
								<Button type="submit" variant={"primary"}>
									<Save />
									Save
								</Button>
								{/* TODO: preview ? mono : outline */}
								<Button type="button" size={"icon"} variant={"outline"}>
									<Eye />
								</Button>
								<Button type="button" size={"icon"} variant={"outline"}>
									<Settings />
								</Button>
							</div>
						</div>
						<FormBuilder
							form={form}
							addQuestion={addQuestion}
							removeQuestion={removeQuestion}
							fields={fields}
						/>
					</div>
				</div>
			</form>
		</Form>
	);
};

export default CreateFormPage;
