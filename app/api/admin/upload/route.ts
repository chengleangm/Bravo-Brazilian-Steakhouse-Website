import { NextRequest, NextResponse } from 'next/server'
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { noStoreHeaders } from '../_utils/cache'

const bucket = process.env.R2_BUCKET_NAME
const endpoint = process.env.R2_ENDPOINT
const accessKeyId = process.env.R2_ACCESS_KEY_ID
const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY

function getS3Client() {
  if (!bucket || !endpoint || !accessKeyId || !secretAccessKey) return null
  return new S3Client({
    endpoint,
    region: 'auto',
    credentials: { accessKeyId, secretAccessKey },
    forcePathStyle: true,
  })
}

function uploadUrl(pathname: string) {
  return `${endpoint}/${bucket}/${pathname}`
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File | null
    const folder = (formData.get('folder') as string) || 'uploads'

    if (!file || file.size === 0) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400, headers: noStoreHeaders })
    }

    const client = getS3Client()
    if (!client) {
      return NextResponse.json(
        {
          error:
            'R2 storage is not configured. Set R2_BUCKET_NAME, R2_ENDPOINT, R2_ACCESS_KEY_ID, and R2_SECRET_ACCESS_KEY.',
        },
        { status: 500, headers: noStoreHeaders }
      )
    }

    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '-')
    const filename = `${Date.now()}-${safeName}`
    const pathname = `${folder}/${filename}`
    const bytes = await file.arrayBuffer()

    await client.send(
      new PutObjectCommand({
        Bucket: bucket,
        Key: pathname,
        Body: new Uint8Array(bytes),
        ContentType: file.type || 'application/octet-stream',
      })
    )

    return NextResponse.json({ url: uploadUrl(pathname) }, { headers: noStoreHeaders })
  } catch (err) {
    console.error('[upload error]', err)
    const message = err instanceof Error ? err.message : String(err)
    return NextResponse.json({ error: message }, { status: 500, headers: noStoreHeaders })
  }
}
