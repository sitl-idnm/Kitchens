import { InputHTMLAttributes } from 'react'
import classNames from 'classnames'

import styles from './input.module.scss'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  // panel context: `light` on light bg (default), `dark` on brand bg
  tone?: 'light' | 'dark'
  invalid?: boolean
}

const Input = ({
  className,
  tone = 'light',
  invalid,
  ...props
}: InputProps) => {
  const rootClassName = classNames(
    styles.root,
    styles[`root_${tone}`],
    invalid && styles.root_invalid,
    className
  )

  return <input {...props} className={rootClassName} />
}

export default Input
