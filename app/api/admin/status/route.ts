import { NextResponse } from 'next/server';
import { noStoreHeaders } from '../_utils/cache';

export const dynamic = 'force-dynamic';

export async function GET() {
  const isHosted = process.env.NODE_ENV === 'production';
  const requiredEnvs = [
    'R2_BUCKET_NAME',
    'R2_ENDPOINT',
    'R2_ACCESS_KEY_ID',
    'R2_SECRET_ACCESS_KEY',
  ];
  const missingEnvVars = requiredEnvs.filter((key) => !process.env[key]);
  const hasR2 = missingEnvVars.length === 0;

  return NextResponse.json(
    {
      isHosted,
      contentStorage: hasR2 ? 'ready' : isHosted ? 'missing' : 'local',
      mediaStorage: hasR2 ? 'ready' : isHosted ? 'missing' : 'local',
      canSaveContent: hasR2 || !isHosted,
      canUploadMedia: hasR2 || !isHosted,
      missingEnvVars,
    },
    { headers: noStoreHeaders },
  );
}
