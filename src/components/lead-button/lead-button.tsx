'use client'

import { ReactNode } from 'react'
import { Button } from '@/ui'
import { openLeadAtom, type LeadModalState } from '@atoms/leadAtom'
import { ButtonVariant } from '@ui/button/button.types'
import { useSetAtom } from 'jotai'

interface LeadButtonProps {
  mode: LeadModalState['mode']
  source: string
  variant?: ButtonVariant
  block?: boolean
  className?: string
  children: ReactNode
}

// Client CTA that opens the lead modal — lets server-rendered sections stay
// server components while their primary buttons remain interactive.
const LeadButton = ({
  mode,
  source,
  variant = 'primary',
  block,
  className,
  children
}: LeadButtonProps) => {
  const openLead = useSetAtom(openLeadAtom)

  return (
    <Button
      variant={variant}
      block={block}
      className={className}
      onClick={() => openLead({ mode, source })}
    >
      {children}
    </Button>
  )
}

export default LeadButton
