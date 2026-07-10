import { Button } from '@/ui'
import { CheckCircle } from '@phosphor-icons/react'
import classNames from 'classnames'

import styles from './success-screen.module.scss'

interface SuccessScreenProps {
  title?: string
  text?: string
  actionLabel?: string
  onAction?: () => void
  tone?: 'light' | 'dark'
  className?: string
}

const SuccessScreen = ({
  title = 'Заявка отправлена',
  text = 'Спасибо! Свяжемся в рабочее время. Обычно отвечаем в течение дня.',
  actionLabel = 'Закрыть',
  onAction,
  tone = 'light',
  className
}: SuccessScreenProps) => {
  return (
    <div
      className={classNames(styles.root, styles[`root_${tone}`], className)}
      role="status"
    >
      <span className={styles.icon}>
        <CheckCircle size={48} weight="fill" />
      </span>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.text}>{text}</p>
      {onAction && (
        <Button
          variant={tone === 'dark' ? 'ghost-dark' : 'primary'}
          onClick={onAction}
          className={styles.action}
        >
          {actionLabel}
        </Button>
      )}
    </div>
  )
}

export default SuccessScreen
