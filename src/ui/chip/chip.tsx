import { ElementType, ReactNode } from 'react'
import classNames from 'classnames'

import styles from './chip.module.scss'

export type ChipVariant = 'light' | 'frosted' | 'sage' | 'brand'

interface ChipProps {
  as?: ElementType
  variant?: ChipVariant
  children: ReactNode
  className?: string
}

const Chip = ({
  as: Tag = 'span',
  variant = 'light',
  children,
  className
}: ChipProps) => {
  return (
    <Tag
      className={classNames(styles.root, styles[`root_${variant}`], className)}
    >
      {children}
    </Tag>
  )
}

export default Chip
