// Blob-backed JSON storage — replaces Vercel KV for all admin data routes.
// On Vercel: reads/writes config JSON files to Vercel Blob (BLOB_READ_WRITE_TOKEN).
// Local dev: reads/writes the JSON files in data/.

const tok = () => process.env.BLOB_READ_WRITE_TOKEN ?? ''

export async function readBlobJson(blobName: string, localJsonPath: string): Promise<unknown> {
  const token = tok()
  if (token) {
    try {
      const { list } = await import('@vercel/blob')
      const { blobs } = await list({ prefix: `config/${blobName}.json`, token })
      if (blobs.length > 0) {
        const res = await fetch(blobs[0].url, { cache: 'no-store' })
        if (res.ok) return res.json()
      }
    } catch {
      // fall through to local file
    }
  }
  const { promises: fs } = await import('fs')
  const path = await import('path')
  const raw = await fs.readFile(path.join(process.cwd(), localJsonPath), 'utf8')
  return JSON.parse(raw)
}

export async function writeBlobJson(blobName: string, localJsonPath: string, body: unknown): Promise<void> {
  const token = tok()
  if (token) {
    const { put } = await import('@vercel/blob')
    await put(`config/${blobName}.json`, JSON.stringify(body), {
      access: 'public',
      addRandomSuffix: false,
      allowOverwrite: true,
      contentType: 'application/json',
      token,
    })
    return
  }
  if (process.env.VERCEL) {
    throw new Error(
      'Vercel Blob is not connected. In your Vercel dashboard go to Storage → connect your Blob store to this project, then redeploy.'
    )
  }
  const { promises: fs } = await import('fs')
  const path = await import('path')
  await fs.writeFile(path.join(process.cwd(), localJsonPath), JSON.stringify(body, null, 2))
}
