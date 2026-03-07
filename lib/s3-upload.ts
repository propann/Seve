import { createHash, createHmac, randomUUID } from "crypto";

type S3Config = {
  endpoint: string;
  region: string;
  bucket: string;
  accessKey: string;
  secretKey: string;
  forcePathStyle: boolean;
  publicBaseUrl?: string;
};

function hashHex(value: Buffer | string): string {
  return createHash("sha256").update(value).digest("hex");
}

function hmac(key: Buffer | string, value: string): Buffer {
  return createHmac("sha256", key).update(value).digest();
}

function toAmzDate(date: Date): string {
  return date.toISOString().replace(/[:-]|\.\d{3}/g, "");
}

function encodePath(path: string): string {
  return path
    .split("/")
    .map((segment) => encodeURIComponent(segment).replace(/[!'()*]/g, (c) => `%${c.charCodeAt(0).toString(16).toUpperCase()}`))
    .join("/");
}

function getS3Config(): S3Config {
  const endpoint = String(process.env.S3_ENDPOINT || "").trim();
  const bucket = String(process.env.S3_BUCKET || "").trim();
  const accessKey = String(process.env.S3_ACCESS_KEY || "").trim();
  const secretKey = String(process.env.S3_SECRET_KEY || "").trim();
  const region = String(process.env.S3_REGION || "us-east-1").trim();
  const forcePathStyle = String(process.env.S3_FORCE_PATH_STYLE || "true").toLowerCase() !== "false";
  const publicBaseUrl = String(process.env.S3_PUBLIC_BASE_URL || process.env.NEXT_PUBLIC_S3_PUBLIC_BASE_URL || "").trim() || undefined;

  if (!endpoint || !bucket || !accessKey || !secretKey) {
    throw new Error("S3 config incomplete. Required: S3_ENDPOINT, S3_BUCKET, S3_ACCESS_KEY, S3_SECRET_KEY.");
  }

  return { endpoint, bucket, accessKey, secretKey, region, forcePathStyle, publicBaseUrl };
}

function deriveSigningKey(secretKey: string, datestamp: string, region: string): Buffer {
  const kDate = hmac(`AWS4${secretKey}`, datestamp);
  const kRegion = hmac(kDate, region);
  const kService = hmac(kRegion, "s3");
  return hmac(kService, "aws4_request");
}

export function createAvatarObjectKey(userId: string, extension: string): string {
  const cleanExt = extension.replace(/[^a-zA-Z0-9]/g, "").toLowerCase() || "jpg";
  return `avatars/${userId}/${Date.now()}-${randomUUID()}.${cleanExt}`;
}

export function createExerciseObjectKey(userId: string, moduleId: string, extension: string): string {
  const cleanExt = extension.replace(/[^a-zA-Z0-9]/g, "").toLowerCase() || "jpg";
  const cleanModuleId = moduleId
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9._-]+/g, "-")
    .replace(/^-+|-+$/g, "") || "module";
  return `exercises/${userId}/${cleanModuleId}/${Date.now()}-${randomUUID()}.${cleanExt}`;
}

export async function uploadBufferToS3(key: string, contentType: string, body: Buffer): Promise<{ key: string; url: string }> {
  const cfg = getS3Config();
  const endpoint = new URL(cfg.endpoint);
  const encodedKey = encodePath(key.replace(/^\/+/, ""));

  const url = cfg.forcePathStyle
    ? new URL(`${endpoint.toString().replace(/\/+$/, "")}/${cfg.bucket}/${encodedKey}`)
    : new URL(`${endpoint.protocol}//${cfg.bucket}.${endpoint.host}/${encodedKey}`);

  const now = new Date();
  const amzDate = toAmzDate(now);
  const datestamp = amzDate.slice(0, 8);
  const payloadHash = hashHex(body);

  const canonicalUri = url.pathname;
  const canonicalQuery = "";
  const canonicalHeaders =
    `host:${url.host}\n` +
    `x-amz-content-sha256:${payloadHash}\n` +
    `x-amz-date:${amzDate}\n`;
  const signedHeaders = "host;x-amz-content-sha256;x-amz-date";
  const canonicalRequest = [
    "PUT",
    canonicalUri,
    canonicalQuery,
    canonicalHeaders,
    signedHeaders,
    payloadHash,
  ].join("\n");

  const scope = `${datestamp}/${cfg.region}/s3/aws4_request`;
  const stringToSign = [
    "AWS4-HMAC-SHA256",
    amzDate,
    scope,
    hashHex(canonicalRequest),
  ].join("\n");

  const signingKey = deriveSigningKey(cfg.secretKey, datestamp, cfg.region);
  const signature = createHmac("sha256", signingKey).update(stringToSign).digest("hex");
  const authorization =
    `AWS4-HMAC-SHA256 Credential=${cfg.accessKey}/${scope}, SignedHeaders=${signedHeaders}, Signature=${signature}`;

  const response = await fetch(url.toString(), {
    method: "PUT",
    headers: {
      "content-type": contentType,
      "x-amz-content-sha256": payloadHash,
      "x-amz-date": amzDate,
      Authorization: authorization,
    },
    body: new Uint8Array(body),
    cache: "no-store",
  });

  if (!response.ok) {
    const errorText = await response.text().catch(() => "");
    throw new Error(`S3 upload failed (${response.status}): ${errorText.slice(0, 200)}`);
  }

  const publicUrl = cfg.publicBaseUrl
    ? `${cfg.publicBaseUrl.replace(/\/+$/, "")}/${encodedKey}`
    : url.toString();

  return { key, url: publicUrl };
}
