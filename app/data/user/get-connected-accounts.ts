import "server-only";

import { prisma as db } from "@/lib/db";
import { requireUser } from "./require-user";

export async function getConnectedAccounts() {
    const user = await requireUser();

    const data = await db.socialAccount.findMany({
        where: {
            userId: user.id,
        },
        select: {
            posts: {
                select: {
                    post: true,
                    socialAccount: true,
                    postId: true,
                    socialAccountId: true
                }
            },
            platform: true,
            platformUserId: true
        }
    })

    return data;
}

export type ConnectedAccountType = Awaited<
    ReturnType<typeof getConnectedAccounts>
>[0];