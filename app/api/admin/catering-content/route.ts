import { NextResponse } from 'next/server'
import defaultData from '../../../../data/catering-content.json'
import { noStoreHeaders, revalidatePublicPages } from '../_utils/cache'
import { readBlobJson, writeBlobJson } from '../_utils/storage'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const data = await readBlobJson('catering-content', 'data/catering-content.json')
    return NextResponse.json(data ?? defaultData, { headers: noStoreHeaders })
  } catch {
    return NextResponse.json(defaultData, { headers: noStoreHeaders })
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json()
    await writeBlobJson('catering-content', 'data/catering-content.json', body)
    revalidatePublicPages(['/catering'])
    return NextResponse.json({ ok: true, revalidated: ['/catering'] }, { headers: noStoreHeaders })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to save'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
