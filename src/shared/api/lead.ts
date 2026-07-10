import type { LeadPayload } from '@/shared/types/lead'

// Single integration point for lead submission. Currently posts to the local
// /api/lead route (which logs the payload). TODO(client): wire the real channel
// (Telegram Bot API / Formspree / email) inside app/api/lead/route.ts.
export async function submitLead(payload: LeadPayload): Promise<void> {
  const response = await fetch('/api/lead', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(payload)
  })

  if (!response.ok) {
    throw new Error(`Lead submission failed: ${response.status}`)
  }
}
