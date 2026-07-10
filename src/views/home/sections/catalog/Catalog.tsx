import { cases } from '@/shared/data/cases'
import { Container } from '@/ui'
import { CaseCard, SectionHead } from '@components/index'

import styles from './Catalog.module.scss'

const Catalog = () => {
  return (
    <section
      id="catalog"
      className={styles.root}
      aria-labelledby="catalog-title"
    >
      <Container>
        <SectionHead
          headingId="catalog-title"
          kicker="Кейсы с цифрами"
          title="Здесь видно не только красивую кухню, но и логику цены."
          description="В каждом кейсе — задача клиента, цена до пересчёта, итог, что сохранили и где нашли резерв без потери результата."
        />

        <div className={styles.grid}>
          {cases.map((item, index) => (
            <CaseCard key={item.slug} data={item} priority={index < 2} />
          ))}
        </div>
      </Container>
    </section>
  )
}

export default Catalog
