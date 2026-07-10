import Link from 'next/link'
import { company, nav, SITE } from '@/shared/data/site'
import { Container, Logo } from '@/ui'

import styles from './footer.module.scss'

const contactRows = [
  { label: 'Телефон', ...company.phone },
  { label: 'E-mail', ...company.email },
  { label: 'Telegram', ...company.telegram },
  { label: 'WhatsApp', ...company.whatsapp }
]

const SiteFooter = () => {
  return (
    <footer className={styles.root}>
      <Container className={styles.inner}>
        <div className={styles.brand}>
          <Logo tone="light" />
          <p className={styles.tagline}>
            Кухни фабрики SURA напрямую. Проверка сметы, расчёт, замер, доставка
            и сборка. Москва и область.
          </p>
        </div>

        <nav className={styles.nav} aria-label="Навигация в подвале">
          <span className={styles.colTitle}>Навигация</span>
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className={styles.navLink}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className={styles.contacts}>
          <span className={styles.colTitle}>Контакты</span>
          {contactRows.map((row) => (
            <a key={row.label} href={row.href} className={styles.contactLink}>
              {row.display}
            </a>
          ))}
          <span className={styles.address}>{company.address.display}</span>
        </div>

        <div className={styles.legal}>
          <p className={styles.legalLine}>
            © {company.copyrightYear} {SITE.name}. {company.legalName}
            {' · '}
            <Link href="/policy" className={styles.policyLink}>
              Политика конфиденциальности
            </Link>
          </p>
          <p className={styles.disclaimer}>
            Информация на сайте не является публичной офертой. Итоговая
            стоимость определяется после замера.
          </p>
        </div>
      </Container>
    </footer>
  )
}

export default SiteFooter
