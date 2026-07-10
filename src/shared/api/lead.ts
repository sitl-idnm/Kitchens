import type { LeadPayload } from '@/shared/types/lead'

// Single integration point for lead submission. Sends multipart/form-data so an
// optional attachment (смета/фото) is forwarded too. A client-side timeout keeps
// the UI from hanging if the server is slow to reach the Telegram API.
const CLIENT_TIMEOUT_MS = 20000

export async function submitLead(
  payload: LeadPayload,
  file?: File | null
): Promise<void> {
  const form = new FormData()
  Object.entries(payload).forEach(([key, value]) => {
    if (value !== undefined && value !== null) form.append(key, String(value))
  })
  if (file) form.append('attachment', file)

  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), CLIENT_TIMEOUT_MS)

  try {
    const response = await fetch('/api/lead', {
      method: 'POST',
      body: form,
      signal: controller.signal
    })
    if (!response.ok) {
      throw new Error(`Lead submission failed: ${response.status}`)
    }
  } finally {
    clearTimeout(timer)
  }
}
