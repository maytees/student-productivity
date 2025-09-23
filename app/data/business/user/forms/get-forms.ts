import "server-only";

import { requireUser } from "@/app/data/require-user";
import { prisma as db } from "@/lib/db";

export async function getUsersForms() {
	const user = await requireUser();

	const data = await db.form.findMany({
		where: {
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
					_count: true,
				},
			},
			shops: {
				select: {
					_count: true, // might work for geting length?
				},
			},
		},
	});

	return data;
}

export type FormsType = Awaited<ReturnType<typeof getUsersForms>>[0];
