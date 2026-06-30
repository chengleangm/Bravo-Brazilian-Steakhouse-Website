'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function AdminLoginPage() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })

      if (!res.ok) {
        setError('Incorrect password. Please try again.')
        return
      }

      router.push('/admin/dashboard')
    } catch {
      setError('Connection error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="grid min-h-screen bg-[#0d0905] text-[#FFF7ED] lg:grid-cols-[1fr_420px]">
      <section className="relative hidden overflow-hidden lg:block">
        <Image
          src="/logo.png"
          alt=""
          width={220}
          height={160}
          className="absolute left-10 top-10 z-10 h-auto w-40 object-contain"
          priority
        />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1800&q=85')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(13,9,5,0.95),rgba(13,9,5,0.64),rgba(13,9,5,0.95))]" />
        <div className="relative z-10 flex h-full max-w-2xl flex-col justify-end p-10">
          <p className="mb-3 text-xs font-black uppercase tracking-[0.22em] text-[#fd850b]">Bravo website manager</p>
          <h1 className="text-5xl font-black uppercase leading-none">Edit the live site without hunting for files.</h1>
          <p className="mt-5 max-w-xl text-sm leading-6 text-[#C7B8A8]">
            Manage home content, menu items, promotions, catering packages, gallery media, and page images from one place.
          </p>
        </div>
      </section>

      <section className="flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-sm">
          <div className="mb-8 text-center lg:text-left">
            <Image src="/logo.png" alt="Bravo" width={78} height={78} className="mx-auto mb-5 h-auto w-20 object-contain lg:mx-0" />
            <p className="mb-2 text-xs font-black uppercase tracking-[0.22em] text-[#fd850b]">Admin access</p>
            <h2 className="text-3xl font-black uppercase tracking-wide text-[#FFF7ED]">Sign in</h2>
            <p className="mt-2 text-sm text-[#C7B8A8]">Update Bravo Brazilian Steakhouse content.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5 rounded-lg border border-[#D4A373]/18 bg-[#130c08] p-6 shadow-2xl">
            <div>
              <label className="mb-2 block text-xs font-black uppercase tracking-widest text-[#C7B8A8]">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full rounded-lg border border-[#D4A373]/25 bg-[#0d0905] px-4 py-3 text-sm text-[#FFF7ED] placeholder-[#C7B8A8]/40 transition-colors focus:border-[#fd850b] focus:outline-none focus:ring-1 focus:ring-[#fd850b]/20"
                placeholder="Enter admin password"
                autoFocus
              />
            </div>

            {error && (
              <p className="rounded-lg border border-red-500/30 bg-red-900/20 px-3 py-2 text-sm text-red-300">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading || !password}
              className="w-full rounded-lg bg-[#fd850b] py-3 text-sm font-black uppercase tracking-widest text-black transition-colors hover:bg-[#ff9a2e] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>

          <p className="mt-6 text-center text-xs text-[#C7B8A8]/60 lg:text-left">
            <a href="/" className="transition-colors hover:text-[#fd850b]">Back to website</a>
          </p>
        </div>
      </section>
    </div>
  )
}
