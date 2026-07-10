import Image from 'next/image'
import Link from 'next/link'
import type { CaseStudy } from '@/shared/data/cases'
import { ArrowRight } from '@phosphor-icons/react/dist/ssr'

import styles from './case-card.module.scss'

interface CaseCardProps {
  data: CaseStudy
  priority?: boolean
}

const CaseCard = ({ data, priority }: CaseCardProps) => {
  return (
    <Link href={`/cases/${data.slug}`} className={styles.root}>
      <div className={styles.media}>
        <Image
          src={data.cover.src}
          alt={data.cover.alt}
          fill
          priority={priority}
          loading={priority ? 'eager' : 'lazy'}
          sizes="(max-width: 560px) 100vw, (max-width: 900px) 50vw, 420px"
          className={styles.image}
        />
        <span className={styles.badge}>
          {data.area} · {data.kicker}
        </span>
      </div>

      <div className={styles.body}>
        <h3 className={styles.title}>{data.title}</h3>
        <p className={styles.text}>{data.text}</p>

        <dl className={styles.metrics}>
          <div className={styles.metric}>
            <dt>Смета</dt>
            <dd className={styles.metricOld}>{data.oldPrice}</dd>
          </div>
          <div className={styles.metric}>
            <dt>После</dt>
            <dd className={styles.metricNew}>{data.newPrice}</dd>
          </div>
          <div className={styles.metric}>
            <dt>Резерв</dt>
            <dd className={styles.metricSaving}>{data.saving}</dd>
          </div>
        </dl>

        <span className={styles.link}>
          Открыть разбор
          <ArrowRight size={18} weight="bold" />
        </span>
      </div>
    </Link>
  )
}

export default CaseCard
