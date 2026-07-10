import { ReactNode } from 'react'

export interface HeadingProps {
  children: ReactNode
  // display = Playfair hero title · section = 40/500 brand · sub = 24/600
  size?: 'display' | 'section' | 'sub'
  tagName?: 'h1' | 'h2' | 'h3' | 'h4'
  id?: string
  className?: string
}
