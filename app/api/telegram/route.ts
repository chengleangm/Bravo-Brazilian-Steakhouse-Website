import { NextRequest, NextResponse } from 'next/server'

const TOKEN = process.env.TELEGRAM_BOT_TOKEN
const CHAT_ID = process.env.TELEGRAM_CHAT_ID

export async function POST(req: NextRequest) {
  if (!TOKEN || !CHAT_ID) {
    return NextResponse.json({ error: 'Telegram not configured' }, { status: 500 })
  }

  const { text } = await req.json()

  const res = await fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: CHAT_ID, text, parse_mode: 'HTML' }),
  })

  if (!res.ok) {
    const err = await res.json()
    return NextResponse.json({ error: err }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
