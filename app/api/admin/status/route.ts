import { NextResponse } from 'next/server'
import { noStoreHeaders } from '../_utils/cache'

export const dynamic = 'force-dynamic'

export async function GET() {
  const isHosted = process.env.NODE_ENV === 'production'
  const hasR2 = Boolean(
    process.env.R2_BUCKET_NAME &&
      process.env.R2_ENDPOINT &&
      process.env.R2_ACCESS_KEY_ID &&
      process.env.R2_SECRET_ACCESS_KEY
  )

  return NextResponse.json(
    {
      isHosted,
      contentStorage: hasR2 ? 'ready' : isHosted ? 'missing' : 'local',
      mediaStorage: hasR2 ? 'ready' : isHosted ? 'missing' : 'local',
      canSaveContent: hasR2 || !isHosted,
      canUploadMedia: hasR2 || !isHosted,
    },
    { headers: noStoreHeaders }
  )
}
