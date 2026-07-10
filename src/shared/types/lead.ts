// Lead form domain types. A single `submitLead(payload)` sends these to the
// backend channel (see shared/api/lead.ts). Keep in sync with /api/lead route.

export type LeadMode = 'audit' | 'new' | 'contact'

export type LeadChannel = 'telegram' | 'whatsapp' | 'call'

export interface LeadPayload {
  mode: LeadMode
  name: string
  phone: string
  channel: LeadChannel | ''
  // what the client already has (смета / размеры / фото / планировка) or free text
  message: string
  // origin of the lead (e.g. 'hero', 'contacts', 'case:manolo-graphite')
  source: string
  // current page path
  page: string
  // optional attached file name (upload is non-blocking in the MVP)
  file?: string
}
