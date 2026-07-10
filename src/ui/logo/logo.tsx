import Link from 'next/link'
import { SITE } from '@/shared/data/site'
import classNames from 'classnames'

import styles from './logo.module.scss'

interface LogoProps {
  tone?: 'brand' | 'light'
  className?: string
}

// Wordmark «Кухни 30» — Playfair display. `30` gets the terracotta accent.
const Logo = ({ tone = 'brand', className }: LogoProps) => {
  return (
    <Link
      href="/"
      className={classNames(styles.root, styles[`root_${tone}`], className)}
      aria-label={`${SITE.name} — на главную`}
    >
      Кухни<span className={styles.accent}> 30</span>
    </Link>
  )
}

export default Logo
