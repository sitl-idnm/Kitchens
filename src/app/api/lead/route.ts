import { NextResponse } from 'next/server'
import type { LeadPayload } from '@/shared/types/lead'

const MODE_LABELS: Record<string, string> = {
  audit: 'Проверить смету',
  new: 'Расчёт по размерам',
  contact: 'Контакты (форма на сайте)'
}

const CHANNEL_LABELS: Record<string, string> = {
  telegram: 'Telegram',
  call: 'Звонок'
}

const escapeHtml = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

const buildMessage = (payload: LeadPayload) => {
  const rows: [string, string | undefined][] = [
    ['Режим', MODE_LABELS[payload.mode] ?? payload.mode],
    ['Имя', payload.name],
    ['Телефон', payload.phone],
    ['Канал', payload.channel ? CHANNEL_LABELS[payload.channel] : undefined],
    ['Сообщение', payload.message],
    ['Файл', payload.file],
    ['Источник', payload.source],
    ['Страница', payload.page]
  ]

  const lines = rows
    .filter(([, value]) => value && value.trim())
    .map(([label, value]) => `<b>${label}:</b> ${escapeHtml(String(value))}`)

  return ['🧾 <b>Новая заявка — Кухни 30</b>', '', ...lines].join('\n')
}

// Receives leads and forwards them to the Telegram bot. Secrets come from env
// (TELEGRAM_BOT_TOKEN / TELEGRAM_CHAT_ID). If Telegram is not configured the
// lead is still logged and accepted so the form keeps working in dev.
export async function POST(request: Request) {
  let payload: LeadPayload

  try {
    payload = (await request.json()) as LeadPayload
  } catch {
    return NextResponse.json({ ok: false, error: 'bad_json' }, { status: 400 })
  }

  if (!payload.phone || payload.phone.trim().length < 6) {
    return NextResponse.json(
      { ok: false, error: 'phone_required' },
      { status: 422 }
    )
  }

  const token = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID

  if (!token || !chatId) {
    // eslint-disable-next-line no-console
    console.warn('[lead] Telegram not configured — logging only', payload)
    return NextResponse.json({ ok: true })
  }

  try {
    const response = await fetch(
      `https://api.telegram.org/bot${token}/sendMessage`,
      {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text: buildMessage(payload),
          parse_mode: 'HTML',
          disable_web_page_preview: true
        }),
        cache: 'no-store'
      }
    )

    if (!response.ok) {
      // eslint-disable-next-line no-console
      console.error('[lead] Telegram error', await response.text())
      return NextResponse.json(
        { ok: false, error: 'telegram_failed' },
        { status: 502 }
      )
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('[lead] Telegram request failed', error)
    return NextResponse.json(
      { ok: false, error: 'telegram_unreachable' },
      { status: 502 }
    )
  }

  return NextResponse.json({ ok: true })
}
