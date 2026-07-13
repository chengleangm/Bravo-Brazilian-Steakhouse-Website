import { NextResponse } from 'next/server';
import { noStoreHeaders } from '../_utils/cache';
import { getMissingR2EnvVars } from '../_utils/storage';

export const dynamic = 'force-dynamic';

export async function GET() {
  const isHosted = process.env.NODE_ENV === 'production';
  const missingEnvVars = getMissingR2EnvVars();
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
