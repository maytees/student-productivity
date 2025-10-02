import { z } from "zod";

export const AssignmentStatus = z.enum(["todo", "in_progress", "completed"]);

export const AssignmentPriority = z.enum(["low", "medium", "high", "urgent"]);

export const AssignmentType = z.enum([
	"homework",
	"quiz",
	"exam",
	"project",
	"reading",
	"other",
]);

export const subtaskSchema = z.object({
	// id: z.string().optional(),
	title: z
		.string()
		.min(1, { message: "Task title must be at least 1 character long!" })
		.max(200, { message: "Task title shouldn't exceed 200 characters!" }),
	completed: z.boolean().default(false).optional(),
	order: z.number().default(0).optional(),
});

export const assignmentSchema = z.object({
	title: z
		.string()
		.min(1, { message: "Title must be at least 1 character long!" })
		.max(200, { message: "Title shouldn't exceed 200 characters!" }),
	description: z
		.string()
		.max(1000, { message: "Description shouldn't exceed 1,000 characters!" })
		.optional(),
	dueDate: z.date({ error: "Invalid due date!" }),
	status: AssignmentStatus.default("todo").optional(),
	priority: AssignmentPriority.default("low").optional(),
	type: AssignmentType.default("other").optional(),
	points: z.coerce
		.number<number>()
		.min(0, { message: "Points must be a positive number!" })
		.max(1000, { message: "Points shouldn't exceed 1,000!" })
		.optional(),
	weight: z.coerce
		.number<number>()
		.min(0, { message: "Weight must be a positive number!" })
		.max(100, { message: "Weight shouldn't exceed 100%!" })
		.optional(),
	url: z.url().optional().or(z.literal("")),
	fileUrl: z.url().optional().or(z.literal("")),
	courseId: z.string().min(1, { message: "Course is required!" }),
	subtasks: z.array(subtaskSchema).default([]).optional(),
});

export const createAssignmentSchema = z.object({
	title: z
		.string()
		.min(1, { message: "Title must be at least 1 character long!" })
		.max(200, { message: "Title shouldn't exceed 200 characters!" }),
	dueDate: z.date({ error: "Invalid due date!" }),
	status: AssignmentStatus.default("todo").optional(),
	priority: AssignmentPriority.default("low").optional(),
	type: AssignmentType.default("other").optional(),
	courseId: z.string().min(1, { message: "Course is required!" }),
});

export const deleteAssignmentSchema = z.object({
	title: z.string({ message: "Title is required!" }),
});

export const assignmentTableSchema = z.object({
	title: z.string(),
	dueDate: z.date(),
	status: AssignmentStatus.default("todo"),
	priority: AssignmentPriority.default("low"),
	courseName: z.string(),
	tasksLength: z.number(),
	url: z.url().optional(),
});

export type AssignmentTableSchemaType = z.infer<typeof assignmentTableSchema>;
export type AssignmentSchemaType = z.infer<typeof assignmentSchema>;
export type CreateAssignmentSchemaType = z.infer<typeof createAssignmentSchema>;
export type SubtaskSchemaType = z.infer<typeof subtaskSchema>;
export type DeleteAssignmentSchemaType = z.infer<typeof deleteAssignmentSchema>;
export type AssignmentStatusType = z.infer<typeof AssignmentStatus>;
export type AssignmentPriorityType = z.infer<typeof AssignmentPriority>;
export type AssignmentTypeType = z.infer<typeof AssignmentType>;
