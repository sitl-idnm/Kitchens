import Link from 'next/link'
import Image from 'next/image' // Добавьте этот импорт
import { SITE } from '@/shared/data/site'
import classNames from 'classnames'

import styles from './logo.module.scss'

// Импорт НЕ НУЖЕН, файл лежит в public
// import LogoImage from '@/public/Logo.svg'  <-- УДАЛИТЕ ЭТУ СТРОКУ

interface LogoProps {
  tone?: 'brand' | 'light'
  className?: string
}

const Logo = ({ tone = 'brand', className }: LogoProps) => {
  return (
    <Link
      href="/"
      className={classNames(styles.root, styles[`root_${tone}`], className)}
      aria-label={`${SITE.name} — на главную`}
    >
      {/* Используйте Image с прямым путем из public */}
      <Image
        src="/Logo.svg"  // Путь относительно папки public
        alt={`${SITE.name} logo`}
        width={100}      // Укажите реальные размеры
        height={50}
        priority        // Добавьте для LCP элемента
      />
    </Link>
  )
}

export default Logo
