import { nbsp } from '@/shared/lib/typography'
import { Container } from '@/ui'
import { SectionHead } from '@components/index'
import { Receipt } from '@phosphor-icons/react/dist/ssr'

import styles from './Process.module.scss'

const overpay = [
  {
    label: 'Работы и сервис',
    text: 'Доставка, сборка и пакетные услуги нередко весят больше, чем кажется по верхней цифре.',
    value: '−5…18%'
  },
  {
    label: 'Фурнитура и декор',
    text: 'Опции, которые добавляют к цене больше, чем пользы в быту.',
    value: '−3…9%'
  },
  {
    label: 'Состав модулей',
    text: 'Лишние или неудачно подобранные модули, из-за которых чек растёт быстрее удобства.',
    value: '−2…7%'
  }
]

const steps = [
  {
    title: 'Смета или вводные',
    text: 'Берём салонный расчёт, размеры, планировку или фото. Сметы нет — соберём базу для ориентира.'
  },
  {
    title: 'Разбор по составу',
    text: 'Смотрим, что в цене даёт пользу, а что — только сервисный слой и лишнюю сложность.'
  },
  {
    title: 'Пересборка проекта',
    text: 'Сохраняем вид и сценарий кухни, меняем состав там, где это оправдано.'
  },
  {
    title: 'Финальный расчёт',
    text: 'После замера фиксируем состав, сроки и цену. Без обещаний из воздуха.'
  }
]

const Process = () => {
  return (
    <section
      id="process"
      className={styles.root}
      aria-labelledby="process-title"
    >
      <Container>
        <SectionHead
          headingId="process-title"
          kicker="Как работаем"
          title="Не торгуемся вслепую. Сначала смотрим, из чего сложилась цена."
          description="Даже подробная смета может быть раздута — из-за лишних модулей, спорной фурнитуры и сервисных работ. Мы сверяем, что кухне действительно нужно, а что можно убрать без потери вида, хранения и удобства."
        />

        <div className={styles.receipt}>
          <div className={styles.receiptHead}>
            <span className={styles.receiptTitle}>
              <Receipt size={22} weight="bold" />
              Где чаще всего появляется переплата
            </span>
            <span className={styles.receiptTotal}>100%</span>
          </div>

          <ul className={styles.receiptRows}>
            {overpay.map((row) => (
              <li key={row.label} className={styles.receiptRow}>
                <span className={styles.receiptLabel}>{row.label}</span>
                <span className={styles.receiptText}>{nbsp(row.text)}</span>
                <span className={styles.receiptValue}>{row.value}</span>
              </li>
            ))}
          </ul>

          <div className={styles.receiptFooter}>
            <span>В сопоставимой комплектации резерв обычно</span>
            <span className={styles.receiptReserve}>5–30%</span>
          </div>
        </div>

        <ol className={styles.steps}>
          {steps.map((step, index) => (
            <li key={step.title} className={styles.step}>
              <span className={styles.stepNumber}>
                {String(index + 1).padStart(2, '0')}
              </span>
              <span className={styles.stepTitle}>{step.title}</span>
              <span className={styles.stepText}>{nbsp(step.text)}</span>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  )
}

export default Process
