import { Container } from '@/ui'
import { SectionHead } from '@components/index'
import { Factory, Package, ShieldCheck } from '@phosphor-icons/react/dist/ssr'

import styles from './Sura.module.scss'

const points = [
  {
    icon: Factory,
    title: 'Производство с 2009 года',
    text: '15 000 м² линий и до 150 000 гарнитуров в год. Фасады: ЛДСП, плёнка ПВХ, акрил, эмаль.'
  },
  {
    icon: ShieldCheck,
    title: 'Безопасные материалы',
    text: 'Сертифицированные материалы и контроль качества на каждом этапе выпуска.'
  },
  {
    icon: Package,
    title: 'В наличии и быстро',
    text: 'Склад более 12 000 м², до 98% ассортимента в наличии. Отгрузка обычно за 3–5 дней.'
  }
]

const Sura = () => {
  return (
    <section id="sura" className={styles.root} aria-labelledby="sura-title">
      <Container>
        <SectionHead
          tone="dark"
          headingId="sura-title"
          kicker="Фабрика SURA"
          title="За проектом — реальная фабрика, а не красивая легенда."
          description="Мы работаем на коллекциях, модулях и фасадах фабрики SURA — российского производителя мебели с 2009 года. Не обещаем того, что нельзя собрать: сначала показываем базу и состав, потом говорим о цене."
        />

        <div className={styles.grid}>
          {points.map((point) => {
            const Icon = point.icon
            return (
              <article key={point.title} className={styles.card}>
                <span className={styles.icon}>
                  <Icon size={26} weight="bold" />
                </span>
                <h3 className={styles.title}>{point.title}</h3>
                <p className={styles.text}>{point.text}</p>
              </article>
            )
          })}
        </div>
      </Container>
    </section>
  )
}

export default Sura
