import { z } from "zod";
import type { Prettify } from "../utils";

const questionObject = z
	.object({
		type: z.enum([
			"TEXT",
			"TEXTAREA",
			"RADIO",
			"CHECKBOX",
			"RATING",
			"NUMBER",
			"PHOTO",
			"YES_NO",
		]),
		title: z.string().min(1).max(500),
		description: z.string().max(500).nullable(),
		required: z.boolean().default(true).optional(),
		order: z.number().min(1),

		// Different options based on question type
		options: z
			.discriminatedUnion("type", [
				// For RADIO questions
				z.object({
					type: z.literal("choice"),
					allowMultiple: z.literal(false),
					choices: z
						.array(
							z.object({
								id: z.string().optional(),
								label: z.string().min(1).max(200),
								value: z.string().min(1).max(200),
								pointValue: z.number().min(0).max(100), // Points for selecting this option
								isCorrect: z.boolean().default(false).optional(), // For businesses to mark "ideal" answers
							}),
						)
						.min(1)
						.max(10),
				}),

				// For CHECKBOX questions
				z.object({
					type: z.literal("choice"),
					allowMultiple: z.literal(true),
					choices: z
						.array(
							z.object({
								id: z.string().optional(),
								label: z.string().min(1).max(200),
								value: z.string().min(1).max(200),
								pointValue: z.number().min(0).max(100),
								isCorrect: z.boolean().default(false).optional(),
							}),
						)
						.min(1)
						.max(10),
					// Scoring method for multiple selections
					scoringMethod: z
						.enum(["ADDITIVE", "ALL_CORRECT", "PARTIAL"])
						.default("ADDITIVE")
						.optional(),
				}),

				// For RATING questions
				z.object({
					type: z.literal("rating"),
					minValue: z.number().min(1).default(1).optional(),
					maxValue: z.number().max(10).default(5).optional(),
					minLabel: z.string().max(50).nullable().optional(),
					maxLabel: z.string().max(50).nullable(),
					// Point mapping for ratings
					pointMapping: z.array(
						z.object({
							ratingValue: z.number(),
							pointValue: z.number().min(0).max(100),
						}),
					), // e.g., [{ratingValue: 5, pointValue: 10}, {ratingValue: 4, pointValue: 8}]
				}),

				// For YES_NO questions
				z.object({
					type: z.literal("yes_no"),
					correctAnswer: z.enum(["YES", "NO"]).nullable(), // What the business considers correct
					yesPoints: z.number().min(0).max(100).default(10).optional(),
					noPoints: z.number().min(0).max(100).default(0).optional(),
				}),

				// For NUMBER questions
				z.object({
					type: z.literal("number"),
					minValue: z.number().nullable(),
					maxValue: z.number().nullable(),
					unit: z.string().max(20).nullable(),
					// Point ranges for number answers
					pointRanges: z
						.array(
							z.object({
								minRange: z.number().nullable(),
								maxRange: z.number().nullable(),
								pointValue: z.number().min(0).max(100),
								label: z.string().max(50), // "Excellent (under 5 minutes)"
							}),
						)
						.optional(),
				}),

				// For TEXT/PHOTO questions (manual scoring)
				z.object({
					type: z.literal("manual"),
					maxLength: z.number().min(1).max(2000).nullable(),
					placeholder: z.string().max(100).nullable(),
					scoringGuidelines: z.string().max(500).nullable(), // Guide for business to score manually
				}),
			])
			.nullable(),
	})
	.optional();

export const createFormSchema = z.object({
	title: z.string().max(100).default("No Title").optional(),
	description: z.string().max(500).default("No Description").optional(),
	questions: z.array(questionObject),
});

export type CreateFormSchemaType = Prettify<
	z.infer<Prettify<typeof createFormSchema>>
>;
export type QuestionSchemaType = Prettify<
	z.infer<Prettify<typeof questionObject>>
>;
