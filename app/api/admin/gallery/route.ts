import { NextResponse } from 'next/server'
import defaultData from '../../../../data/gallery.json'

const KEY = 'bravo:gallery'

async function read() {
  if (!process.env.KV_REST_API_URL) return null
  const { kv } = await import('@vercel/kv')
  return kv.get(KEY)
}

async function write(body: unknown) {
  if (!process.env.KV_REST_API_URL) {
    const { promises: fs } = await import('fs')
    const path = await import('path')
    await fs.writeFile(path.join(process.cwd(), 'data', 'gallery.json'), JSON.stringify(body, null, 2))
    return
  }
  const { kv } = await import('@vercel/kv')
  await kv.set(KEY, body)
}

export async function GET() {
  try {
    const data = await read()
    return NextResponse.json(data ?? defaultData)
  } catch {
    return NextResponse.json(defaultData)
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json()
    await write(body)
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Failed to save' }, { status: 500 })
  }
}
