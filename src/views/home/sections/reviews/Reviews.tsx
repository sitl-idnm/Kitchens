import { Container } from '@/ui'
import { SectionHead } from '@components/index'

import styles from './Reviews.module.scss'

const Reviews = () => {
  return (
    <section id="reviews" className={styles.root} aria-labelledby="reviews-title">
      <Container>
        <SectionHead
          align="center"
          headingId="reviews-title"
          kicker="Отзывы"
          title="Что говорят клиенты"
          description="Реальные отзывы с Яндекс.Карт — без правок и модерации с нашей стороны."
        />

        <div className={styles.widget}>
          <iframe
            className={styles.frame}
            src="https://yandex.ru/maps-reviews-widget/32758711945?comments"
            title="Отзывы о «Кухни 30» на Яндекс.Картах"
            loading="lazy"
          />
          <a
            className={styles.attribution}
            href="https://yandex.ru/maps/org/sura_kitchen_space/32758711945/"
            target="_blank"
            rel="noreferrer"
          >
            Sura Kitchen Space на Яндекс Картах
          </a>
        </div>
      </Container>
    </section>
  )
}

export default Reviews
