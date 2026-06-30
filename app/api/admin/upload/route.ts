import { NextRequest, NextResponse } from 'next/server'
import { handleUpload, type HandleUploadBody } from '@vercel/blob/client'
import { noStoreHeaders } from '../_utils/cache'

// Client-direct-to-Blob upload handshake. Used for large files (e.g. video) so the
// bytes go straight from the browser to Blob storage, bypassing the ~4.5MB request
// body limit on Vercel serverless functions.
async function handleClientUploadToken(request: NextRequest) {
  try {
    const body = (await request.json()) as HandleUploadBody
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async () => ({
        allowedContentTypes: ['image/*', 'video/mp4', 'video/webm', 'video/quicktime'],
        addRandomSuffix: false,
      }),
    })
    return NextResponse.json(jsonResponse, { headers: noStoreHeaders })
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    return NextResponse.json({ error: message }, { status: 400, headers: noStoreHeaders })
  }
}

export async function POST(request: NextRequest) {
  if ((request.headers.get('content-type') ?? '').includes('application/json')) {
    return handleClientUploadToken(request)
  }

  try {
    const formData = await request.formData()
    const file = formData.get('file') as File | null
    const folder = (formData.get('folder') as string) || 'uploads'

    if (!file || file.size === 0) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400, headers: noStoreHeaders })
    }

    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '-')
    const filename = `${Date.now()}-${safeName}`
    const pathname = `${folder}/${filename}`

    // On Vercel: use Blob storage
    const token = process.env.BLOB_READ_WRITE_TOKEN
    if (token) {
      const { put } = await import('@vercel/blob')
      const bytes = await file.arrayBuffer()
      const blob = await put(pathname, bytes, {
        access: 'public',
        contentType: file.type || 'application/octet-stream',
        token,
      })
      return NextResponse.json({ url: blob.url }, { headers: noStoreHeaders })
    }

    // On Vercel without Blob token → fail clearly instead of trying filesystem
    if (process.env.VERCEL) {
      return NextResponse.json(
        { error: 'BLOB_READ_WRITE_TOKEN is not set. Go to Vercel → Storage → your Blob store → connect it to this project, then redeploy.' },
        { status: 500, headers: noStoreHeaders }
      )
    }

    // Local dev fallback: save to public/
    const { promises: fs } = await import('fs')
    const path = await import('path')
    const bytes = await file.arrayBuffer()
    const uploadDir = path.join(process.cwd(), 'public', folder)
    await fs.mkdir(uploadDir, { recursive: true })
    await fs.writeFile(path.join(uploadDir, filename), Buffer.from(bytes))
    return NextResponse.json({ url: `/${folder}/${filename}` }, { headers: noStoreHeaders })
  } catch (err) {
    console.error('[upload error]', err)
    const message = err instanceof Error ? err.message : String(err)
    return NextResponse.json({ error: message }, { status: 500, headers: noStoreHeaders })
  }
}
