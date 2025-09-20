import { addMinutes } from "date-fns";
import { z } from "zod";

const baseScheduleSchema = z.object({
    scheduleDate: z.date().min(1, "Scheduled date is required").optional(),
    scheduleTime: z.string().min(1, "Scheduled time is required").default("10:30:00").optional(),

    platforms: z.array(z.enum(["youtube", "tiktok", "instagram", "twitter"])).min(1, "At least one platform must be selected"),
    tiktokAccounts: z.array(z.string()).optional(),
    instagramAccounts: z.array(z.string()).optional(),
    twitterAccounts: z.array(z.string()).optional(),
    youtubeAccounts: z.array(z.string()).optional(),

    textPost: z.object({
        caption: z.string().optional()
    }).optional(),

    videoPost: z.object({
        url: z.string().min(1, "Video URL is required"),
        filename: z.string().min(1, "Video filename is required"),
        duration: z.transform(Number).pipe(z.number()),
        size: z.transform(Number).pipe(z.number()),
        caption: z.string().min(1, "Caption is required"),
    }).optional(),

    imagePost: z.object({
        images: z.array(z.string()).min(1, "At least one image is required").optional(),
        caption: z.string({ error: "Caption is required" }).min(1, "Caption is required").optional(),
    }).optional(),

    postNow: z.boolean().default(false).optional(),
    postType: z.enum(["text", "video", "image"]),
})
    .refine((data) => {
        if (data.postNow) return true; // Skip validation if posting now

        if (!data.scheduleDate || !data.scheduleTime) return true; // Skip if no date/time set

        // Combine date and time to create the full scheduled datetime
        const [hours, minutes, seconds] = data.scheduleTime.split(':').map(Number);
        const scheduledDateTime = new Date(data.scheduleDate);
        scheduledDateTime.setHours(hours, minutes, seconds || 0, 0);

        // Check if the scheduled time is at least 10 minutes from now
        const timeThreshold = addMinutes(new Date(), 10);

        console.log(data)

        if (scheduledDateTime < timeThreshold) {
            return false;
        }
        return true;
    }, {
        message: "Schedule date and time must be at least 10 minutes in advance.",
        path: ["scheduleTime"]
    })
    .refine((data) => {
        if (!data.postNow && (!data.scheduleDate || !data.scheduleTime)) {
            return false;
        }
        return true;
    }, {
        message: "Schedule date and time must be undefined when posting now",
        path: ["scheduleDate", "scheduleTime"]
    })
    .refine((data) => {
        if (data.platforms.includes("tiktok") && (!data.tiktokAccounts || data.tiktokAccounts.length === 0)) return false;
        return true;
    }, {
        message: "At least one TikTok account must be selected",
        path: ["tiktokAccounts"]
    })
    .refine((data) => {
        if (data.platforms.includes("instagram") && (!data.instagramAccounts || data.instagramAccounts.length === 0)) return false;
        return true;
    }, {
        message: "At least one Instagram account must be selected",
        path: ["instagramAccounts"]
    })
    .refine((data) => {
        if (data.platforms.includes("twitter") && (!data.twitterAccounts || data.twitterAccounts.length === 0)) return false;
        return true;
    }, {
        message: "At least one Twitter account must be selected",
        path: ["twitterAccounts"]
    })
    .refine((data) => {
        if (data.platforms.includes("youtube") && (!data.youtubeAccounts || data.youtubeAccounts.length === 0)) return false;
        return true;
    }, {
        message: "At least one YouTube account must be selected",
        path: ["youtubeAccounts"]
    });

export const scheduleSchema = baseScheduleSchema;

export const uploadImageSchema = z.object({
    fileName: z.string(),
    contentType: z.string(),
    size: z.number()
})

// Type inference
export type ScheduleFormType = z.infer<typeof scheduleSchema>
// End of Selection
