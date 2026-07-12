import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { NextRequest, NextResponse } from 'next/server';
import { noStoreHeaders } from '../_utils/cache';

function getR2Env() {
  return {
    bucket: process.env.R2_BUCKET_NAME,
    endpoint: process.env.R2_ENDPOINT,
    accessKeyId: process.env.R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
  };
}

function getMissingR2EnvVars() {
  return Object.entries(getR2Env())
    .filter(([_, value]) => !value)
    .map(([key]) => key);
}

function getS3Client() {
  const { bucket, endpoint, accessKeyId, secretAccessKey } = getR2Env();
  if (!bucket || !endpoint || !accessKeyId || !secretAccessKey) return null;
  return new S3Client({
    endpoint,
    region: 'auto',
    credentials: { accessKeyId, secretAccessKey },
    forcePathStyle: true,
  });
}

function uploadUrl(pathname: string) {
  const { bucket, endpoint } = getR2Env();
  return `${endpoint}/${bucket}/${pathname}`;
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const folder = (formData.get('folder') as string) || 'uploads';

    if (!file || file.size === 0) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400, headers: noStoreHeaders },
      );
    }

    const client = getS3Client();
    if (!client) {
      const missingEnvVars = getMissingR2EnvVars();
      return NextResponse.json(
        {
          error: `R2 storage is not configured. Missing environment variables: ${missingEnvVars.join(', ')}.`,
        },
        { status: 500, headers: noStoreHeaders },
      );
    }

    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '-');
    const filename = `${Date.now()}-${safeName}`;
    const pathname = `${folder}/${filename}`;
    const bytes = await file.arrayBuffer();

    const { bucket } = getR2Env();
    await client.send(
      new PutObjectCommand({
        Bucket: bucket!,
        Key: pathname,
        Body: new Uint8Array(bytes),
        ContentType: file.type || 'application/octet-stream',
      }),
    );

    return NextResponse.json({ url: uploadUrl(pathname) }, { headers: noStoreHeaders });
  } catch (err) {
    console.error('[upload error]', err);
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: message }, { status: 500, headers: noStoreHeaders });
  }
}
