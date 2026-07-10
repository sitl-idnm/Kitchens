'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/ui'

import styles from './cookie-banner.module.scss'

const STORAGE_KEY = 'kitchens30-cookie-consent'

const CookieBanner = () => {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) setVisible(true)
    } catch {
      // localStorage unavailable — skip the banner
    }
  }, [])

  const accept = () => {
    try {
      localStorage.setItem(STORAGE_KEY, '1')
    } catch {
      // ignore write failures
    }
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      className={styles.root}
      role="dialog"
      aria-label="Уведомление о cookie"
    >
      <p className={styles.text}>
        Мы&nbsp;используем cookie, чтобы сайт работал лучше. Продолжая
        пользоваться сайтом, вы&nbsp;соглашаетесь с&nbsp;этим.{' '}
        <Link href="/policy" className={styles.link}>
          Подробнее
        </Link>
        .
      </p>
      <Button onClick={accept} className={styles.button}>
        Хорошо
      </Button>
    </div>
  )
}

export default CookieBanner
