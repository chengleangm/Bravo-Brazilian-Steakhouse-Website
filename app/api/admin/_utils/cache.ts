import { revalidatePath } from 'next/cache'

export const noStoreHeaders = {
  'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0, s-maxage=0',
  'CDN-Cache-Control': 'no-store',
  'Vercel-CDN-Cache-Control': 'no-store',
}

export function revalidatePublicPages(paths: string[]) {
  for (const path of new Set(paths)) {
    revalidatePath(path)
  }
}
