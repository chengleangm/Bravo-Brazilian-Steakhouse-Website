'use client'

import { upload } from '@vercel/blob/client'

// Uploads straight from the browser to Blob storage when possible (required for
// files over ~4.5MB on Vercel, e.g. video clips). Falls back to the server-side
// form upload for local dev without BLOB_READ_WRITE_TOKEN.
export async function uploadAdminFile(file: File, folder = 'uploads'): Promise<string> {
  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '-')
  const pathname = `${folder}/${Date.now()}-${safeName}`

  try {
    const blob = await upload(pathname, file, {
      access: 'public',
      handleUploadUrl: '/api/admin/upload',
      contentType: file.type || 'application/octet-stream',
      multipart: file.size > 4 * 1024 * 1024,
    })
    return blob.url
  } catch {
    // No BLOB_READ_WRITE_TOKEN available to the handler (typical in local dev) — fall back.
  }

  const fd = new FormData()
  fd.append('file', file)
  fd.append('folder', folder)
  const res = await fetch('/api/admin/upload', { method: 'POST', body: fd })
  const json = await res.json()
  if (!res.ok) throw new Error(json.error ?? `HTTP ${res.status}`)
  return json.url as string
}
