import { NextResponse } from 'next/server'

export const runtime = 'nodejs'

const MODE_LABELS: Record<string, string> = {
  audit: 'Проверка сметы',
  new: 'Расчёт по размерам',
  contact: 'Заявка из блока «Контакты»'
}

const CHANNEL_LABELS: Record<string, string> = {
  telegram: 'Telegram',
  call: 'Звонок'
}

// Turn a machine `source` into a human description of where the lead came from.
function describeSource(source: string): string {
  if (!source) return '—'
  if (source.startsWith('header'))
    return 'Шапка сайта — кнопка «Проверить смету»'
  if (source.startsWith('hero')) return 'Первый экран (Hero)'
  if (source.startsWith('case-cta')) {
    const slug = source.split(':')[1] ?? ''
    return `Страница кейса — блок внизу${slug ? ` (${slug})` : ''}`
  }
  if (source.startsWith('case:')) {
    const slug = source.split(':')[1] ?? ''
    return `Страница кейса${slug ? ` (${slug})` : ''}`
  }
  if (source === 'contacts') return 'Блок «Контакты» на главной'
  return source
}

const escapeHtml = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

function buildMessage(fields: {
  mode: string
  name: string
  phone: string
  channel: string
  message: string
  source: string
  page: string
  fileName: string
}) {
  const moscow = new Date().toLocaleString('ru-RU', {
    timeZone: 'Europe/Moscow',
    dateStyle: 'short',
    timeStyle: 'short'
  })

  const rows = [
    '🧾 <b>Новая заявка — Кухни 30</b>',
    '',
    `📋 <b>Тип формы:</b> ${MODE_LABELS[fields.mode] ?? fields.mode}`,
    `📍 <b>Откуда:</b> ${escapeHtml(describeSource(fields.source))}`,
    `👤 <b>Имя:</b> ${fields.name ? escapeHtml(fields.name) : '—'}`,
    `📞 <b>Телефон:</b> ${escapeHtml(fields.phone)}`,
    fields.channel
      ? `💬 <b>Канал связи:</b> ${CHANNEL_LABELS[fields.channel] ?? fields.channel}`
      : null,
    fields.message
      ? `📝 <b>Комментарий:</b> ${escapeHtml(fields.message)}`
      : null,
    fields.fileName
      ? `📎 <b>Файл:</b> ${escapeHtml(fields.fileName)} (см. вложение ниже)`
      : null,
    `🌐 <b>Страница:</b> ${escapeHtml(fields.page)}`,
    `🕒 ${moscow} (МСК)`
  ]

  return rows.filter(Boolean).join('\n')
}

// POST with a timeout so a slow/unreachable Telegram API fails fast instead of
// hanging the request.
async function tgRequest(url: string, body: BodyInit, headers?: HeadersInit) {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), 9000)
  try {
    return await fetch(url, {
      method: 'POST',
      body,
      headers,
      cache: 'no-store',
      signal: controller.signal
    })
  } finally {
    clearTimeout(timer)
  }
}

export async function POST(request: Request) {
  let form: FormData
  try {
    form = await request.formData()
  } catch {
    return NextResponse.json({ ok: false, error: 'bad_form' }, { status: 400 })
  }

  const str = (key: string) => {
    const value = form.get(key)
    return typeof value === 'string' ? value : ''
  }

  const fields = {
    mode: str('mode'),
    name: str('name'),
    phone: str('phone'),
    channel: str('channel'),
    message: str('message'),
    source: str('source'),
    page: str('page'),
    fileName: str('file')
  }

  if (!fields.phone || fields.phone.replace(/\D/g, '').length < 6) {
    return NextResponse.json(
      { ok: false, error: 'phone_required' },
      { status: 422 }
    )
  }

  const attachment = form.get('attachment')
  const hasFile =
    attachment instanceof File && attachment.size > 0 ? attachment : null

  const token = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID

  if (!token || !chatId) {
    // eslint-disable-next-line no-console
    console.warn('[lead] Telegram not configured — logging only', fields)
    return NextResponse.json({ ok: true })
  }

  try {
    const messageRes = await tgRequest(
      `https://api.telegram.org/bot${token}/sendMessage`,
      JSON.stringify({
        chat_id: chatId,
        text: buildMessage(fields),
        parse_mode: 'HTML',
        disable_web_page_preview: true
      }),
      { 'content-type': 'application/json' }
    )

    if (!messageRes.ok) {
      // eslint-disable-next-line no-console
      console.error(
        '[lead] Telegram sendMessage error',
        await messageRes.text()
      )
      return NextResponse.json(
        { ok: false, error: 'telegram_failed' },
        { status: 502 }
      )
    }

    // Forward the attached file (if any) as a document.
    if (hasFile) {
      const doc = new FormData()
      doc.append('chat_id', chatId)
      doc.append('caption', `Файл к заявке · ${fields.phone}`)
      doc.append('document', hasFile, hasFile.name)
      const docRes = await tgRequest(
        `https://api.telegram.org/bot${token}/sendDocument`,
        doc
      )
      if (!docRes.ok) {
        // the lead itself is already delivered — don't fail the request
        // eslint-disable-next-line no-console
        console.error('[lead] Telegram sendDocument error', await docRes.text())
      }
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('[lead] Telegram request failed/timeout', error)
    return NextResponse.json(
      { ok: false, error: 'telegram_unreachable' },
      { status: 502 }
    )
  }

  return NextResponse.json({ ok: true })
}
