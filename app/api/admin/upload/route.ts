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
    const pathname = `${folder}/${Date.now()}-${safeName}`

    // Convert to buffer first — more reliable across runtimes
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // On Vercel: use Blob storage
    const token = process.env.BLOB_READ_WRITE_TOKEN
    if (token) {
      const { put } = await import('@vercel/blob')
      const blob = await put(pathname, buffer, {
        access: 'public',
        contentType: file.type || 'application/octet-stream',
        token,
      })
      return NextResponse.json({ url: blob.url })
    }

    // Local dev fallback: save to public/
    const { promises: fs } = await import('fs')
    const path = await import('path')
    const uploadDir = path.join(process.cwd(), 'public', folder)
    await fs.mkdir(uploadDir, { recursive: true })
    await fs.writeFile(path.join(uploadDir, `${Date.now()}-${safeName}`), buffer)
    return NextResponse.json({ url: `/${folder}/${Date.now()}-${safeName}` })
  } catch (err) {
    console.error('[upload]', err)
    const message = err instanceof Error ? err.message : 'Unknown error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
