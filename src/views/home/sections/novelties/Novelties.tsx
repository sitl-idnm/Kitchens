import { novelties, type NoveltyIcon } from '@/shared/data/novelties'
import { nbsp } from '@/shared/lib/typography'
import { Container } from '@/ui'
import { SectionHead } from '@components/index'
import {
  Lightbulb,
  LineSegment,
  SquaresFour
} from '@phosphor-icons/react/dist/ssr'

import styles from './Novelties.module.scss'

const iconMap: Record<NoveltyIcon, typeof LineSegment> = {
  gola: LineSegment,
  led: Lightbulb,
  glass: SquaresFour
}

const Novelties = () => {
  return (
    <section
      id="novelties"
      className={styles.root}
      aria-labelledby="novelties-title"
    >
      <Container>
        <SectionHead
          headingId="novelties-title"
          kicker="Новинки фабрики"
          title="Что появилось в коллекциях SURA"
          description="Свежие решения фабрики — их же можно заложить в ваш проект."
        />

        <div className={styles.grid}>
          {novelties.map((item) => {
            const Icon = iconMap[item.icon]
            return (
              <article key={item.title} className={styles.card}>
                <span className={styles.icon}>
                  <Icon size={26} weight="bold" />
                </span>
                <h3 className={styles.title}>{item.title}</h3>
                <p className={styles.text}>{nbsp(item.text)}</p>
              </article>
            )
          })}
        </div>
      </Container>
    </section>
  )
}

export default Novelties
