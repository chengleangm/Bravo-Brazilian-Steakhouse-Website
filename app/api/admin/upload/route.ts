import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File | null
    const folder = (formData.get('folder') as string) || 'uploads'

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '-')

    // On Vercel: use Blob storage (persistent, CDN-served)
    if (process.env.BLOB_READ_WRITE_TOKEN) {
      const { put } = await import('@vercel/blob')
      const pathname = `${folder}/${Date.now()}-${safeName}`
      const blob = await put(pathname, file, { access: 'public' })
      return NextResponse.json({ url: blob.url })
    }

    // Local dev fallback: save to public/uploads/
    const { promises: fs } = await import('fs')
    const path = await import('path')
    const bytes = await file.arrayBuffer()
    const filename = `${Date.now()}-${safeName}`
    const uploadDir = path.join(process.cwd(), 'public', folder)
    await fs.mkdir(uploadDir, { recursive: true })
    await fs.writeFile(path.join(uploadDir, filename), Buffer.from(bytes))
    return NextResponse.json({ url: `/${folder}/${filename}` })
  } catch {
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
  }
}
