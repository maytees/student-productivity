import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { env } from "@/lib/env";
import { S3 } from "@/lib/s3client";
import { uploadImageSchema } from "@/lib/zodSchemas";

export async function POST(request: Request) {
	try {
		const body = await request.json();
		const validationResult = uploadImageSchema.safeParse(body);

		if (!validationResult.success) {
			return NextResponse.json(
				{ error: validationResult.error.message },
				{ status: 400 },
			);
		}

		const { fileName, contentType, size } = validationResult.data;
		const uniqueKey = `${uuidv4()}-${fileName}`;

		const command = new PutObjectCommand({
			Bucket: env.NEXT_PUBLIC_S3_BUCKET_NAME_IMAGES,
			Key: uniqueKey,
			ContentType: contentType,
			ContentLength: size,
		});

		const preSignedUrl = await getSignedUrl(S3, command, { expiresIn: 360 }); // Expire sin 6 minutes

		const response = {
			preSignedUrl,
			key: uniqueKey,
		};

		return NextResponse.json(response, { status: 200 });
	} catch {
		return NextResponse.json(
			{ error: "Failed to upload file" },
			{ status: 500 },
		);
	}
}
