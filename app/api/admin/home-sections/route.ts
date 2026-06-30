import { NextResponse } from 'next/server'
import defaultData from '../../../../data/home-sections.json'
import { noStoreHeaders, revalidatePublicPages } from '../_utils/cache'

export const dynamic = 'force-dynamic'

const KEY = 'bravo:home-sections'

async function read() {
  if (!process.env.KV_REST_API_URL || !process.env.KV_REST_API_TOKEN) {
    const { promises: fs } = await import('fs')
    const path = await import('path')
    const raw = await fs.readFile(path.join(process.cwd(), 'data', 'home-sections.json'), 'utf8')
    return JSON.parse(raw)
  }
  const { kv } = await import('@vercel/kv')
  return kv.get(KEY)
}

async function write(body: unknown) {
  if (!process.env.KV_REST_API_URL || !process.env.KV_REST_API_TOKEN) {
    if (process.env.VERCEL) {
      throw new Error('Vercel KV is not connected. Add KV_REST_API_URL and KV_REST_API_TOKEN, then redeploy.')
    }
    const { promises: fs } = await import('fs')
    const path = await import('path')
    await fs.writeFile(path.join(process.cwd(), 'data', 'home-sections.json'), JSON.stringify(body, null, 2))
    return
  }
  const { kv } = await import('@vercel/kv')
  await kv.set(KEY, body)
}

export async function GET() {
  try {
    const data = await read()
    return NextResponse.json(data ?? defaultData, { headers: noStoreHeaders })
  } catch {
    return NextResponse.json(defaultData, { headers: noStoreHeaders })
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json()
    await write(body)
    revalidatePublicPages(['/'])
    return NextResponse.json({ ok: true, revalidated: ['/'] }, { headers: noStoreHeaders })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to save'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
