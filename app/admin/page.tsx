'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

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
    <div className="min-h-screen bg-[#120807] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <Image src="/logo.png" alt="Bravo" width={64} height={64} className="mx-auto mb-4 rounded" />
          <h1 className="text-[#FFF7ED] font-black text-2xl uppercase tracking-widest">Admin Panel</h1>
          <p className="text-[#C7B8A8] text-sm mt-1">Bravo Brazilian Steakhouse</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-[#1A0E0A] border border-[#D4A373]/20 rounded-xl p-8 space-y-5">
          <div>
            <label className="block text-[#FFF7ED] text-xs font-black uppercase tracking-widest mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full bg-[#120807] border border-[#D4A373]/30 text-[#FFF7ED] px-4 py-3 rounded-lg text-sm focus:outline-none focus:border-[#fd850b] transition-colors placeholder-[#C7B8A8]/40"
              placeholder="Enter admin password"
              autoFocus
            />
          </div>

          {error && (
            <p className="text-red-400 text-sm bg-red-900/20 border border-red-500/30 px-3 py-2 rounded">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading || !password}
            className="w-full bg-[#fd850b] text-[#120807] font-black text-sm uppercase tracking-widest py-3 rounded-lg hover:bg-[#ffd029] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>

        <p className="text-center text-[#C7B8A8]/50 text-xs mt-6">
          <a href="/" className="hover:text-[#fd850b] transition-colors">← Back to website</a>
        </p>
      </div>
    </div>
  )
}
