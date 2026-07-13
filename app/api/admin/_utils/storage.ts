import { GetObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';

const requiredR2Envs = [
  'R2_BUCKET_NAME',
  'R2_ENDPOINT',
  'R2_ACCESS_KEY_ID',
  'R2_SECRET_ACCESS_KEY',
];

export function getR2Env() {
  const endpoint = process.env.R2_ENDPOINT || process.env.R2_URL;
  const accessKeyId = process.env.R2_ACCESS_KEY_ID || process.env.AWS_ACCESS_KEY_ID;
  const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY || process.env.AWS_SECRET_ACCESS_KEY;
  const publicUrl =
    process.env.R2_PUBLIC_URL ||
    process.env.NEXT_PUBLIC_R2_PUBLIC_URL ||
    process.env.R2_CUSTOM_DOMAIN;

  return {
    bucket: process.env.R2_BUCKET_NAME,
    endpoint,
    accessKeyId,
    secretAccessKey,
    publicUrl,
  };
}

export function getMissingR2EnvVars() {
  const { bucket, endpoint, accessKeyId, secretAccessKey } = getR2Env();

  return requiredR2Envs.filter((name) => {
    if (name === 'R2_BUCKET_NAME') return !bucket;
    if (name === 'R2_ENDPOINT') return !endpoint;
    if (name === 'R2_ACCESS_KEY_ID') return !accessKeyId;
    if (name === 'R2_SECRET_ACCESS_KEY') return !secretAccessKey;
    return false;
  });
}

export function buildPublicObjectUrl(pathname: string) {
  const { publicUrl, bucket, endpoint } = getR2Env();
  const cleanPathname = pathname.replace(/^\/+/, '');

  if (publicUrl) {
    return `${publicUrl.replace(/\/$/, '')}/${cleanPathname}`;
  }

  if (!endpoint) {
    return cleanPathname;
  }

  try {
    const url = new URL(endpoint);
    const hostname = url.hostname;
    if (hostname.endsWith('.r2.cloudflarestorage.com')) {
      if (bucket && hostname.startsWith(`${bucket}.`)) {
        return `${url.origin}/${cleanPathname}`;
      }
      if (bucket) {
        return `${url.protocol}//${bucket}.${hostname}/${cleanPathname}`;
      }
    }
  } catch {
    // ignore malformed endpoint and fall back to base URL
  }

  return `${endpoint.replace(/\/$/, '')}/${cleanPathname}`;
}

function hasR2() {
  return getMissingR2EnvVars().length === 0;
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

async function streamToString(body: unknown): Promise<string> {
  if (!body) return '';
  if (typeof body === 'string') return body;
  if (typeof (body as any).text === 'function') return await (body as any).text();
  if (typeof (body as any).arrayBuffer === 'function') {
    const buffer = await (body as any).arrayBuffer();
    return new TextDecoder().decode(buffer);
  }
  if (typeof (body as any).getReader === 'function') {
    const reader = (body as any).getReader();
    const chunks: Uint8Array[] = [];
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      if (value) chunks.push(value);
    }
    const totalLength = chunks.reduce((sum, chunk) => sum + chunk.length, 0);
    const merged = new Uint8Array(totalLength);
    let offset = 0;
    for (const chunk of chunks) {
      merged.set(chunk, offset);
      offset += chunk.length;
    }
    return new TextDecoder().decode(merged);
  }
  if (body && typeof (body as any).on === 'function') {
    return await new Promise<string>((resolve, reject) => {
      const chunks: Uint8Array[] = [];
      const stream = body as any;
      stream.on('data', (chunk: Uint8Array | string) => {
        if (typeof chunk === 'string') chunks.push(new TextEncoder().encode(chunk));
        else chunks.push(chunk);
      });
      stream.on('end', () => {
        const totalLength = chunks.reduce((sum, chunk) => sum + chunk.length, 0);
        const merged = new Uint8Array(totalLength);
        let offset = 0;
        for (const chunk of chunks) {
          merged.set(chunk, offset);
          offset += chunk.length;
        }
        resolve(new TextDecoder().decode(merged));
      });
      stream.on('error', reject);
    });
  }
  throw new Error('Unsupported response body type');
}

export async function readBlobJson(blobName: string, localJsonPath: string): Promise<unknown> {
  const client = getS3Client();
  if (client) {
    const { bucket } = getR2Env();
    try {
      const result = await client.send(
        new GetObjectCommand({
          Bucket: bucket!,
          Key: `config/${blobName}.json`,
        }),
      );
      const raw = await streamToString(result.Body);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }

  if (process.env.NODE_ENV !== 'production') {
    const { promises: fs } = await import('fs');
    const path = await import('path');
    const raw = await fs.readFile(path.join(process.cwd(), localJsonPath), 'utf8');
    return JSON.parse(raw);
  }

  throw new Error(
    'R2 storage is not configured. Set R2_BUCKET_NAME, R2_ENDPOINT, R2_ACCESS_KEY_ID and R2_SECRET_ACCESS_KEY.',
  );
}

export async function writeBlobJson(
  blobName: string,
  localJsonPath: string,
  body: unknown,
): Promise<void> {
  const client = getS3Client();
  if (client) {
    const { bucket } = getR2Env();
    await client.send(
      new PutObjectCommand({
        Bucket: bucket!,
        Key: `config/${blobName}.json`,
        Body: JSON.stringify(body),
        ContentType: 'application/json; charset=utf-8',
      }),
    );
    return;
  }

  if (process.env.NODE_ENV !== 'production') {
    const { promises: fs } = await import('fs');
    const path = await import('path');
    await fs.writeFile(path.join(process.cwd(), localJsonPath), JSON.stringify(body, null, 2));
    return;
  }

  throw new Error(
    'R2 storage is not configured. Set R2_BUCKET_NAME, R2_ENDPOINT, R2_ACCESS_KEY_ID and R2_SECRET_ACCESS_KEY.',
  );
}
