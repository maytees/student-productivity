"use server";

import { requireUser } from "@/app/data/user/require-user";
import type { ApiResponse } from "@/lib/types";
import { type ScheduleFormType, scheduleSchema } from "@/lib/zodSchemas";

export async function CreateCourse(
	data: ScheduleFormType,
): Promise<ApiResponse> {
	const session = await requireUser();

	try {
		const validation = scheduleSchema.safeParse(data);

		if (!validation.success) {
			return {
				status: "error",
				message: "Invalid Form Data",
			};
		}

		const values = validation.data;

		let scheduledFor: Date;

		if (values.postNow) {
			scheduledFor = new Date();
		} else {
			const [hours, minutes, seconds] = values.scheduleTime
				?.split(":")
				.map(Number) || [10, 30, 0]; // defaults to 10:30:00
			scheduledFor = new Date(values.scheduleDate!);
			scheduledFor.setHours(hours, minutes, seconds || 0, 0);
		}

		// const post = await prisma.post.create({
		//     data: {
		//         title: values.videoPost?.filename ?? values.textPost?.caption ?? null,
		//         description: values.videoPost?.caption ?? null,
		//         caption: values.textPost?.caption ?? null,
		//         scheduledFor,
		//         userId: session.id,
		//         postType: values.postType === "text" ? "Text" : "Media",
		//         media: values.videoPost ? {
		//             create: {
		//                 type: "Video",
		//                 url: values.videoPost.url,
		//                 filename: values.videoPost.filename,
		//                 duration: values.videoPost.duration,
		//                 size: values.videoPost.size,
		//                 order: 0
		//             }
		//         } : values.imagePost ? {
		//             create: {
		//                 type: "Image",
		//                 images: values.imagePost.images ?? [],
		//                 order: 0
		//             }
		//         } : undefined,
		//     }
		// })

		for (const platform of values.platforms) {
			const accountIds =
				platform === "youtube"
					? values.youtubeAccounts
					: platform === "tiktok"
						? values.tiktokAccounts
						: platform === "instagram"
							? values.instagramAccounts
							: values.twitterAccounts;

			if (!accountIds) continue;

			// await prisma.postOnAccount.createMany({
			//     data: accountIds.map((id) => ({
			//         postId: post.id,
			//         socialAccountId: id
			//     }))
			// })
		}

		// TODO: queue background job for BullMQ
		return {
			status: "success",
			message: "Course created succesfully",
		};
	} catch {
		return {
			status: "error",
			message: "Failed to create course",
		};
	}
}
