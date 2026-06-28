import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File | null
    const folder = (formData.get('folder') as string) || 'uploads'

    if (!file || file.size === 0) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
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
      return NextResponse.json({ url: blob.url })
    }

    // On Vercel without Blob token → fail clearly instead of trying filesystem
    if (process.env.VERCEL) {
      return NextResponse.json(
        { error: 'BLOB_READ_WRITE_TOKEN is not set. Go to Vercel → Storage → your Blob store → connect it to this project, then redeploy.' },
        { status: 500 }
      )
    }

    // Local dev fallback: save to public/
    const { promises: fs } = await import('fs')
    const path = await import('path')
    const bytes = await file.arrayBuffer()
    const uploadDir = path.join(process.cwd(), 'public', folder)
    await fs.mkdir(uploadDir, { recursive: true })
    await fs.writeFile(path.join(uploadDir, filename), Buffer.from(bytes))
    return NextResponse.json({ url: `/${folder}/${filename}` })
  } catch (err) {
    console.error('[upload error]', err)
    const message = err instanceof Error ? err.message : String(err)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
