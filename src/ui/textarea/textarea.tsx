import { TextareaHTMLAttributes } from 'react'
import classNames from 'classnames'

import styles from './textarea.module.scss'

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  tone?: 'light' | 'dark'
  invalid?: boolean
}

const Textarea = ({
  className,
  tone = 'light',
  invalid,
  rows = 4,
  ...props
}: TextareaProps) => {
  const rootClassName = classNames(
    styles.root,
    styles[`root_${tone}`],
    invalid && styles.root_invalid,
    className
  )

  return <textarea {...props} rows={rows} className={rootClassName} />
}

export default Textarea
