import { NextResponse } from 'next/server'
import { noStoreHeaders } from '../_utils/cache'

export const dynamic = 'force-dynamic'

export async function GET() {
  const isHosted = Boolean(process.env.VERCEL)
  const hasKv = Boolean(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN)
  const hasBlob = Boolean(process.env.BLOB_READ_WRITE_TOKEN)

  return NextResponse.json(
    {
      isHosted,
      contentStorage: hasKv ? 'ready' : isHosted ? 'missing' : 'local',
      mediaStorage: hasBlob ? 'ready' : isHosted ? 'missing' : 'local',
      canSaveContent: hasKv || !isHosted,
      canUploadMedia: hasBlob || !isHosted,
    },
    { headers: noStoreHeaders }
  )
}
