'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { nav } from '@/shared/data/site'
import { Container, Logo } from '@/ui'
import { LeadButton } from '@components/index'
import { List, X } from '@phosphor-icons/react'
import classNames from 'classnames'

import styles from './header.module.scss'
import { HeaderProps } from './header.types'

const Header = ({ className }: HeaderProps) => {
  const [menuOpen, setMenuOpen] = useState(false)

  // lock body scroll while the mobile menu is open
  useEffect(() => {
    if (!menuOpen) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  return (
    <header className={classNames(styles.root, className)}>
      <Container className={styles.inner}>
        <Logo />

        <nav className={styles.nav} aria-label="Основная навигация">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className={styles.link}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className={styles.actions}>
          <LeadButton mode="audit" source="header" className={styles.cta}>
            Проверить смету
          </LeadButton>

          <button
            type="button"
            className={styles.burger}
            aria-label={menuOpen ? 'Закрыть меню' : 'Открыть меню'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            {menuOpen ? <X size={26} /> : <List size={26} />}
          </button>
        </div>
      </Container>

      {menuOpen && (
        <>
          <button
            type="button"
            className={styles.scrim}
            aria-label="Закрыть меню"
            onClick={closeMenu}
          />
          <div className={styles.menu}>
            <nav className={styles.menuNav} aria-label="Мобильная навигация">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={styles.menuLink}
                  onClick={closeMenu}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <LeadButton
              mode="audit"
              source="header-menu"
              block
              className={styles.menuCta}
            >
              Проверить смету
            </LeadButton>
          </div>
        </>
      )}
    </header>
  )
}

export default Header
