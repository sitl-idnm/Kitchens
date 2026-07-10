import { InputHTMLAttributes, ReactNode } from 'react'
import classNames from 'classnames'

import styles from './checkbox.module.scss'

interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  tone?: 'light' | 'dark'
  children: ReactNode
}

const Checkbox = ({
  className,
  tone = 'light',
  children,
  ...props
}: CheckboxProps) => {
  return (
    <label
      className={classNames(styles.root, styles[`root_${tone}`], className)}
    >
      <input {...props} type="checkbox" className={styles.input} />
      <span className={styles.box} aria-hidden="true" />
      <span className={styles.label}>{children}</span>
    </label>
  )
}

export default Checkbox
