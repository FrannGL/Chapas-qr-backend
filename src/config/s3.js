import env from "./enviroment.config.js";
import { S3Client, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import fs from "fs";

const client = new S3Client({
	region: env.AWS_BUCKET_REGION,
	credentials: {
		accessKeyId: env.AWS_PUBLIC_KEY,
		secretAccessKey: env.AWS_SECRET_KEY_,
	},
});

export async function uploadFile(file) {
	const stream = fs.createReadStream(file.tempFilePath);
	const uploadParams = {
		Bucket: env.AWS_BUCKET_NAME,
		Key: file.name,
		Body: stream,
	};

	const command = new PutObjectCommand(uploadParams);
	return await client.send(command);
}

export async function getFileURL(filename) {
	const command = new GetObjectCommand({ Bucket: env.AWS_BUCKET_NAME, Key: filename });
	return await getSignedUrl(client, command);
}
