'use client'

export async function uploadAdminFile(file: File, folder = 'uploads'): Promise<string> {
  const fd = new FormData()
  fd.append('file', file)
  fd.append('folder', folder)

  const res = await fetch('/api/admin/upload', { method: 'POST', body: fd })
  const json = await res.json()
  if (!res.ok) throw new Error(json.error ?? `HTTP ${res.status}`)
  return json.url as string
}
