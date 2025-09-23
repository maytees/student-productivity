import "server-only";

import { requireUser } from "@/app/data/require-user";
import { prisma as db } from "@/lib/db";

export async function getFormById(formId: string) {
	const user = await requireUser();

	const data = await db.form.findUnique({
		where: {
			id: formId,
			createdById: user.id,
		},
		select: {
			id: true,
			title: true,
			description: true,
			isTemplate: true,
			templateName: true,
			createdAt: true,
			updatedAt: true,
			createdBy: true,
			createdById: true,
			questions: {
				select: {
					description: true,
					type: true,
					required: true,
					order: true,
					options: true,
					metadata: true,
					answers: {
						select: {
							id: true,
							fileUrls: true,
							value: true,
							questionId: true,
						},
					},
				},
			},
		},
	});

	return data;
}

export type FormType = Awaited<ReturnType<typeof getFormById>>;
