'use client'

import { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { CASE_COMMON, type CaseStudy } from '@/shared/data/cases'
import { nbsp } from '@/shared/lib/typography'
import { Container } from '@/ui'
import { LeadButton } from '@components/index'
import {
  ArrowLeft,
  CaretLeft,
  CaretRight,
  Quotes,
  Ruler,
  SealCheck,
  Wallet,
  X
} from '@phosphor-icons/react'

import styles from './case.module.scss'

interface CaseViewProps {
  data: CaseStudy
}

const columns = (data: CaseStudy) => [
  { title: CASE_COMMON.columns.order, items: data.order },
  { title: CASE_COMMON.columns.preserved, items: data.preserved },
  { title: CASE_COMMON.columns.whatChanged, items: data.whatChanged }
]

const CaseView = ({ data }: CaseViewProps) => {
  const [active, setActive] = useState(0)
  const [lightbox, setLightbox] = useState<number | null>(null)

  const total = data.gallery.length

  const step = useCallback(
    (delta: number) => {
      setLightbox((prev) =>
        prev === null ? prev : (prev + delta + total) % total
      )
    },
    [total]
  )

  useEffect(() => {
    if (lightbox === null) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setLightbox(null)
      if (event.key === 'ArrowRight') step(1)
      if (event.key === 'ArrowLeft') step(-1)
    }
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', onKey)
    }
  }, [lightbox, step])

  return (
    <main className={styles.root}>
      <Container>
        <Link href="/#catalog" className={styles.back}>
          <ArrowLeft size={18} weight="bold" />
          {CASE_COMMON.backLink}
        </Link>

        <div className={styles.top}>
          <div className={styles.intro}>
            <span className={styles.kicker}>{data.kicker}</span>
            <h1 className={styles.title}>{data.caseTitle}</h1>
            <p className={styles.story}>{nbsp(data.clientStory)}</p>

            <div className={styles.numbers}>
              <div className={styles.number}>
                <span className={styles.numberLabel}>
                  {CASE_COMMON.numbers.old}
                </span>
                <span className={styles.numberOld}>{data.oldPrice}</span>
              </div>
              <div className={styles.number}>
                <span className={styles.numberLabel}>
                  {CASE_COMMON.numbers.new}
                </span>
                <span className={styles.numberNew}>{data.newPrice}</span>
              </div>
              <div className={styles.number}>
                <span className={styles.numberLabel}>
                  {CASE_COMMON.numbers.saving}
                </span>
                <span className={styles.numberSaving}>{data.saving}</span>
              </div>
            </div>
            <p className={styles.numbersNote}>
              {nbsp(CASE_COMMON.numbersNote)}
            </p>

            <div className={styles.actions}>
              <LeadButton mode="audit" source={`case:${data.slug}`}>
                Проверить смету
              </LeadButton>
              <LeadButton
                mode="new"
                source={`case:${data.slug}`}
                variant="outline"
              >
                Рассчитать по размерам
              </LeadButton>
            </div>
          </div>

          <aside className={styles.sidebar}>
            <div className={styles.sideRow}>
              <span className={styles.sideIcon}>
                <Ruler size={20} />
              </span>
              <span>
                <span className={styles.sideLabel}>
                  {CASE_COMMON.sidebar.area}
                </span>
                <span className={styles.sideValue}>{data.area}</span>
              </span>
            </div>
            <div className={styles.sideRow}>
              <span className={styles.sideIcon}>
                <SealCheck size={20} />
              </span>
              <span>
                <span className={styles.sideLabel}>
                  {CASE_COMMON.sidebar.format}
                </span>
                <span className={styles.sideValue}>{data.location}</span>
              </span>
            </div>
            <div className={styles.sideRow}>
              <span className={styles.sideIcon}>
                <Wallet size={20} />
              </span>
              <span>
                <span className={styles.sideLabel}>
                  {CASE_COMMON.sidebar.saved}
                </span>
                <span className={styles.sideValue}>
                  {data.saving}
                  <span className={styles.sideNote}>
                    {CASE_COMMON.sidebar.savedNote}
                  </span>
                </span>
              </span>
            </div>
          </aside>
        </div>

        <div className={styles.gallery}>
          <button
            type="button"
            className={styles.galleryMain}
            onClick={() => setLightbox(active)}
            aria-label="Открыть фото"
          >
            <Image
              src={data.gallery[active].src}
              alt={data.gallery[active].alt}
              fill
              priority
              quality={90}
              sizes="(max-width: 900px) 100vw, 1312px"
              className={styles.galleryImg}
            />
          </button>
          <div className={styles.thumbs}>
            {data.gallery.map((image, index) => (
              <button
                key={image.src}
                type="button"
                className={
                  index === active
                    ? `${styles.thumb} ${styles.thumb_active}`
                    : styles.thumb
                }
                onClick={() => setActive(index)}
                aria-label={`Фото ${index + 1}`}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 560px) 32vw, 180px"
                  className={styles.galleryImg}
                />
              </button>
            ))}
          </div>
        </div>

        <div className={styles.columns}>
          {columns(data).map((column) => (
            <div key={column.title} className={styles.column}>
              <h2 className={styles.columnTitle}>
                <SealCheck size={20} weight="fill" />
                {column.title}
              </h2>
              <ul className={styles.columnList}>
                {column.items.map((item) => (
                  <li key={item}>{nbsp(item)}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className={styles.important}>
          <Quotes size={32} weight="fill" className={styles.importantIcon} />
          <div>
            <h2 className={styles.importantTitle}>
              {CASE_COMMON.important.title}
            </h2>
            <p className={styles.importantText}>{nbsp(data.thanks)}</p>
            <p className={styles.importantNote}>
              {nbsp(CASE_COMMON.important.note)}
            </p>
          </div>
        </div>

        <div className={styles.cta}>
          <span className={styles.ctaKicker}>{CASE_COMMON.cta.kicker}</span>
          <h2 className={styles.ctaTitle}>{CASE_COMMON.cta.title}</h2>
          <p className={styles.ctaText}>{nbsp(CASE_COMMON.cta.text)}</p>
          <div className={styles.actions}>
            <LeadButton mode="audit" source={`case-cta:${data.slug}`}>
              Проверить смету
            </LeadButton>
            <LeadButton
              mode="new"
              source={`case-cta:${data.slug}`}
              variant="outline"
            >
              Рассчитать по размерам
            </LeadButton>
          </div>
        </div>
      </Container>

      {lightbox !== null && (
        <div className={styles.lightbox} role="dialog" aria-modal="true">
          <button
            type="button"
            className={styles.lightboxClose}
            aria-label="Закрыть"
            onClick={() => setLightbox(null)}
          >
            <X size={26} />
          </button>
          <button
            type="button"
            className={`${styles.lightboxNav} ${styles.lightboxPrev}`}
            aria-label="Предыдущее фото"
            onClick={() => step(-1)}
          >
            <CaretLeft size={28} weight="bold" />
          </button>
          <div className={styles.lightboxImage}>
            <Image
              src={data.gallery[lightbox].src}
              alt={data.gallery[lightbox].alt}
              fill
              sizes="100vw"
              className={styles.lightboxImg}
            />
          </div>
          <button
            type="button"
            className={`${styles.lightboxNav} ${styles.lightboxNext}`}
            aria-label="Следующее фото"
            onClick={() => step(1)}
          >
            <CaretRight size={28} weight="bold" />
          </button>
        </div>
      )}
    </main>
  )
}

export default CaseView
