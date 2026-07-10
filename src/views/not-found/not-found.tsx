import { Button, Container } from '@/ui'

import styles from './not-found.module.scss'

const NotFoundView = () => {
  return (
    <main className={styles.root}>
      <Container className={styles.inner}>
        <span className={styles.code}>404</span>
        <h1 className={styles.title}>Такой страницы нет</h1>
        <p className={styles.text}>
          Возможно, ссылка устарела или в адресе опечатка. Вернитесь на главную
          или посмотрите кейсы.
        </p>
        <div className={styles.actions}>
          <Button as="a" isRouteLink href="/">
            На главную
          </Button>
          <Button as="a" isRouteLink href="/#catalog" variant="outline">
            Смотреть кейсы
          </Button>
        </div>
      </Container>
    </main>
  )
}

export default NotFoundView
