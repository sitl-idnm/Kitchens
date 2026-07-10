import { ReactNode } from 'react'
import { nbsp } from '@/shared/lib/typography'
import { Heading } from '@/ui'
import classNames from 'classnames'

import styles from './section-head.module.scss'

const withNbsp = (node: ReactNode): ReactNode =>
  typeof node === 'string' ? nbsp(node) : node

interface SectionHeadProps {
  kicker: string
  title: ReactNode
  description?: ReactNode
  tone?: 'light' | 'dark'
  align?: 'start' | 'center'
  headingId?: string
  className?: string
}

// Shared section header: kicker (overline) + H2 + optional description.
const SectionHead = ({
  kicker,
  title,
  description,
  tone = 'light',
  align = 'start',
  headingId,
  className
}: SectionHeadProps) => {
  return (
    <div
      className={classNames(
        styles.root,
        styles[`root_${tone}`],
        styles[`root_${align}`],
        className
      )}
    >
      <span className={styles.kicker}>{kicker}</span>
      <Heading id={headingId} className={styles.title}>
        {withNbsp(title)}
      </Heading>
      {description && (
        <p className={styles.description}>{withNbsp(description)}</p>
      )}
    </div>
  )
}

export default SectionHead
