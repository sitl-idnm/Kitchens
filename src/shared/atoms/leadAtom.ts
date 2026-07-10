import type { LeadMode } from '@/shared/types/lead'
import { atom } from 'jotai'

// The lead modal opens in a mode ('audit' | 'new'); null = closed. `source`
// records which CTA opened it so the payload can attribute the lead.
export interface LeadModalState {
  mode: Exclude<LeadMode, 'contact'>
  source: string
}

export const leadModalAtom = atom<LeadModalState | null>(null)

export const openLeadAtom = atom(null, (_get, set, next: LeadModalState) => {
  set(leadModalAtom, next)
})

export const closeLeadAtom = atom(null, (_get, set) => {
  set(leadModalAtom, null)
})
