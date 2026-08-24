import { S3Client } from "@aws-sdk/client-s3";

function createS3Client() {
  const endpoint = process.env.S3_ENDPOINT;
  const region = process.env.S3_REGION ?? "us-east-1";

  return new S3Client({
    ...(endpoint ? { endpoint, forcePathStyle: true } : {}),
    region,
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY_ID!,
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
    },
  });
}

declare const globalThis: {
  s3Global?: ReturnType<typeof createS3Client>;
} & typeof global;

export const s3 = globalThis.s3Global ?? createS3Client();

if (process.env.NODE_ENV !== "production") {
  globalThis.s3Global = s3;
}
