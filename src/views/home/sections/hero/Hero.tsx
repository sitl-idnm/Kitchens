'use client'

import Image from 'next/image'
import { nbsp } from '@/shared/lib/typography'
import { Chip, Container } from '@/ui'
import { openLeadAtom } from '@atoms/leadAtom'
import { ArrowRight, SealCheck, Sparkle } from '@phosphor-icons/react'
import { useSetAtom } from 'jotai'

import styles from './Hero.module.scss'

const proof = [
  { value: '5–30%', label: 'обычный резерв в сопоставимой комплектации' },
  {
    value: 'по составу',
    label: 'сравниваем модули и фурнитуру, а не цену «от»'
  },
  { value: 'Москва и МО', label: 'расчёт, замер, доставка и сборка' }
]

const trust = [
  'Если экономия ломает удобство или вид — прямо об этом говорим.',
  'Сравниваем реальный состав заказа, а не рекламную цену.',
  'В кейсах показываем и фото, и цифры до и после.'
]

const scenarios = [
  {
    mode: 'audit' as const,
    source: 'hero-audit',
    title: 'Проверить смету',
    desc: 'PDF, фото или скрин. Разберём по составу и покажем, где резерв.'
  },
  {
    mode: 'new' as const,
    source: 'hero-new',
    title: 'Рассчитать по размерам',
    desc: 'Размеры, стиль, бюджет. Дадим ориентир до замера.'
  }
]

const ticker = [
  'Смета или просто размеры',
  'Покажем, где переплата',
  'Сравниваем состав, а не баннеры',
  'Москва и МО',
  'Сразу говорим, что оставляем в проекте'
]

const Hero = () => {
  const openLead = useSetAtom(openLeadAtom)

  return (
    <section className={styles.root} aria-labelledby="hero-title">
      <Container className={styles.inner}>
        <div className={styles.content}>
          <Chip variant="brand" className={styles.pill}>
            <Sparkle size={16} weight="fill" />
            Кухни SURA напрямую — Москва и область
          </Chip>

          <h1 id="hero-title" className={styles.title}>
            Проверим вашу смету на кухню{' '}
            <span className={styles.titleAccent}>
              и покажем, где спрятана переплата
            </span>
          </h1>

          <p className={styles.subtitle}>
            {nbsp(
              'Пришлите смету из салона или просто размеры стены. Разберём проект по составу — фасады, модули, фурнитура, доставка, сборка — и честно скажем, где цену можно снизить, а где не стоит.'
            )}
          </p>

          <dl className={styles.proof}>
            {proof.map((item) => (
              <div key={item.value} className={styles.proofItem}>
                <dt className={styles.proofValue}>{item.value}</dt>
                <dd className={styles.proofLabel}>{item.label}</dd>
              </div>
            ))}
          </dl>

          <ul className={styles.trust}>
            {trust.map((item) => (
              <li key={item} className={styles.trustItem}>
                <SealCheck
                  size={22}
                  weight="fill"
                  className={styles.trustIcon}
                />
                {nbsp(item)}
              </li>
            ))}
          </ul>

          <div className={styles.actions}>
            {scenarios.map((scenario) => (
              <button
                key={scenario.mode}
                type="button"
                className={styles.scenario}
                onClick={() =>
                  openLead({ mode: scenario.mode, source: scenario.source })
                }
              >
                <span className={styles.scenarioHead}>
                  <span className={styles.scenarioTitle}>{scenario.title}</span>
                  <ArrowRight size={20} weight="bold" />
                </span>
                <span className={styles.scenarioDesc}>
                  {nbsp(scenario.desc)}
                </span>
              </button>
            ))}
          </div>

          <p className={styles.note}>
            {nbsp(
              'Можно начать со сметы, фото кухни или просто с размеров стены.'
            )}
          </p>
        </div>

        <div className={styles.media}>
          <div className={styles.photo}>
            <Image
              src="/images/kitchens/trinity-light.webp"
              alt="Светлая кухня-гостиная фабрики SURA без ручек"
              fill
              priority
              sizes="(max-width: 900px) 100vw, 560px"
              className={styles.photoImg}
            />
            <div className={styles.caption}>
              <span className={styles.captionTitle}>
                Коллекции фабрики SURA
              </span>
              <span className={styles.captionSub}>
                размеры · проект · честный расчёт
              </span>
            </div>
          </div>

          <div className={styles.auditCard}>
            <div className={styles.auditTop}>
              <span className={styles.auditTitle}>
                Где обычно находится резерв
              </span>
              <span className={styles.auditValue}>5–30%</span>
            </div>
            <div className={styles.auditRow}>
              <span>Смета из салона</span>
              <span className={styles.auditBad}>100%</span>
            </div>
            <div className={styles.auditBar}>
              <span className={styles.auditBarFill} />
            </div>
            <div className={styles.auditRow}>
              <span>После пересчёта</span>
              <span className={styles.auditGood}>70–95%</span>
            </div>
            <div className={styles.auditBar}>
              <span
                className={styles.auditBarFillGood}
                style={{ width: '82%' }}
              />
            </div>
            <p className={styles.auditNote}>
              Итог зависит от размеров, материалов, фурнитуры, состава работ и
              комплектации.
            </p>
          </div>
        </div>
      </Container>

      <div className={styles.ticker} aria-hidden="true">
        <div className={styles.tickerTrack}>
          {[...ticker, ...ticker].map((item, index) => (
            <span key={index} className={styles.tickerItem}>
              {item}
              <span className={styles.tickerDot} />
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Hero
