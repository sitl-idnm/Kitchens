'use client'

import { useState } from 'react'
import { Container } from '@/ui'
import { LeadForm } from '@components/lead-form'
import { SectionHead } from '@components/section-head'
import { SuccessScreen } from '@components/success-screen'
import { company } from '@/shared/data/site'
import {
  Clock,
  EnvelopeSimple,
  MapPin,
  Phone,
  TelegramLogo,
  WhatsappLogo
} from '@phosphor-icons/react'

import styles from './Contacts.module.scss'

const contactItems = [
  { icon: Phone, label: 'Телефон', value: company.phone.display, href: company.phone.href },
  { icon: EnvelopeSimple, label: 'E-mail', value: company.email.display, href: company.email.href },
  { icon: TelegramLogo, label: 'Telegram', value: company.telegram.display, href: company.telegram.href },
  { icon: WhatsappLogo, label: 'WhatsApp', value: company.whatsapp.display, href: company.whatsapp.href },
  { icon: MapPin, label: 'Адрес шоурума', value: company.address.display },
  { icon: Clock, label: 'Часы работы', value: company.schedule.display }
]

const Contacts = () => {
  const [done, setDone] = useState(false)

  return (
    <section id="contacts" className={styles.root} aria-labelledby="contacts-title">
      <Container className={styles.inner}>
        <div className={styles.left}>
          <SectionHead
            headingId="contacts-title"
            kicker="Контакты"
            title="Расскажите про кухню — ответим и посчитаем"
            description="Оставьте заявку или напишите в мессенджер. Отвечаем в рабочее время."
          />

          <ul className={styles.list}>
            {contactItems.map((item) => {
              const Icon = item.icon
              const content = (
                <>
                  <span className={styles.itemIcon}>
                    <Icon size={22} />
                  </span>
                  <span className={styles.itemBody}>
                    <span className={styles.itemLabel}>{item.label}</span>
                    <span className={styles.itemValue}>{item.value}</span>
                  </span>
                </>
              )

              return (
                <li key={item.label} className={styles.item}>
                  {item.href ? (
                    <a href={item.href} className={styles.itemLink}>
                      {content}
                    </a>
                  ) : (
                    content
                  )}
                </li>
              )
            })}
          </ul>

          <div className={styles.panel}>
            {done ? (
              <SuccessScreen
                tone="dark"
                actionLabel="Отправить ещё заявку"
                onAction={() => setDone(false)}
              />
            ) : (
              <>
                <h3 className={styles.panelTitle}>Оставить заявку</h3>
                <LeadForm
                  mode="contact"
                  source="contacts"
                  tone="dark"
                  submitLabel="Отправить заявку"
                  onSuccess={() => setDone(true)}
                />
              </>
            )}
          </div>
        </div>

        <aside className={styles.reviews} aria-label="Отзывы клиентов">
          <span className={styles.reviewsTitle}>Отзывы с Яндекс.Карт</span>
          <div className={styles.reviewsWidget}>
            <iframe
              className={styles.reviewsFrame}
              src="https://yandex.ru/maps-reviews-widget/32758711945?comments"
              title="Отзывы о «Кухни 30» на Яндекс.Картах"
              loading="lazy"
            />
            <a
              className={styles.reviewsLink}
              href="https://yandex.ru/maps/org/sura_kitchen_space/32758711945/"
              target="_blank"
              rel="noreferrer"
            >
              Sura Kitchen Space на Яндекс Картах
            </a>
          </div>
        </aside>
      </Container>
    </section>
  )
}

export default Contacts
