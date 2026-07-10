import { Container } from '@/ui'
import { SectionHead } from '@components/index'
import {
  ArrowsLeftRight,
  ClipboardText,
  Wrench
} from '@phosphor-icons/react/dist/ssr'

import styles from './Pricing.module.scss'

const points = [
  {
    icon: ClipboardText,
    title: 'Сначала задача',
    text: 'Разбираемся с размерами, стилем и сценарием, а потом считаем состав.'
  },
  {
    icon: ArrowsLeftRight,
    title: 'Сравнение состава',
    text: 'Сопоставляем модули, фасады, фурнитуру, доставку и сборку — не цену «от».'
  },
  {
    icon: Wrench,
    title: 'Что входит в итог',
    text: 'Отдельно показываем мебель, работы и доставку. Без сюрпризов в конце.'
  }
]

const Pricing = () => {
  return (
    <section className={styles.root} aria-labelledby="pricing-title">
      <Container>
        <SectionHead
          headingId="pricing-title"
          kicker="Понятная цена"
          title="Итоговая цена должна быть ясна до предоплаты, а не после."
          description="Мы не обещаем волшебную цифру без проверки. Сначала — размеры, фасады, модули, фурнитура, доставка и монтаж. Потом показываем, где есть резерв, а где снижение уже начнёт ломать вид, удобство или срок службы."
        />

        <div className={styles.grid}>
          {points.map((point) => {
            const Icon = point.icon
            return (
              <article key={point.title} className={styles.card}>
                <span className={styles.icon}>
                  <Icon size={24} weight="bold" />
                </span>
                <div className={styles.body}>
                  <h3 className={styles.title}>{point.title}</h3>
                  <p className={styles.text}>{point.text}</p>
                </div>
              </article>
            )
          })}
        </div>
      </Container>
    </section>
  )
}

export default Pricing
