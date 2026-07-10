import { ComponentProps, ElementType, ReactNode } from 'react'

export type ButtonVariant = 'primary' | 'outline' | 'ghost-dark'

type ButtonOwnProps<E extends ElementType = ElementType> = {
  as?: E
  isRouteLink?: boolean
  variant?: ButtonVariant
  block?: boolean
  className?: string
  children?: ReactNode
}

export type ButtonProps<E extends ElementType> = ButtonOwnProps<E> &
  Omit<ComponentProps<E>, keyof ButtonOwnProps>
