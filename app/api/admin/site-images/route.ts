import { NextResponse } from 'next/server'
import defaultData from '../../../../data/site-images.json'
import { noStoreHeaders, revalidatePublicPages } from '../_utils/cache'
import { readBlobJson, writeBlobJson } from '../_utils/storage'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const data = await readBlobJson('site-images', 'data/site-images.json')
    return NextResponse.json(data ?? defaultData, { headers: noStoreHeaders })
  } catch {
    return NextResponse.json(defaultData, { headers: noStoreHeaders })
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json()
    await writeBlobJson('site-images', 'data/site-images.json', body)
    revalidatePublicPages(['/'])
    return NextResponse.json({ ok: true, revalidated: ['/'] }, { headers: noStoreHeaders })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to save'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
