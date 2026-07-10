import { policy } from '@/shared/data/policy'
import { Container } from '@/ui'

import styles from './policy.module.scss'

const PolicyView = () => {
  return (
    <main className={styles.root}>
      <Container className={styles.inner}>
        <span className={styles.subtitle}>{policy.subtitle}</span>
        <h1 className={styles.title}>{policy.title}</h1>

        <div className={styles.body}>
          {policy.parts.map((part) => (
            <section key={part.heading} className={styles.part}>
              <h2 className={styles.heading}>{part.heading}</h2>
              <p className={styles.text}>{part.body}</p>
            </section>
          ))}

          <p className={styles.contacts}>{policy.contacts}</p>
        </div>
      </Container>
    </main>
  )
}

export default PolicyView
