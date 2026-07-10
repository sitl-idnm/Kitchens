import { ElementType } from 'react'
import Link from 'next/link'
import classNames from 'classnames'

import styles from './button.module.scss'
import { ButtonProps } from './button.types'

const defaultElement = 'button'

export default function Button<E extends ElementType = typeof defaultElement>({
  variant = 'primary',
  block,
  isRouteLink,
  children,
  as,
  className,
  ...props
}: ButtonProps<E>) {
  const elClassName = classNames(
    styles.root,
    styles[`root_${variant}`],
    block && styles.root_block,
    className
  )

  const TagName = as || defaultElement
  const isLink = !!(isRouteLink && TagName === 'a')

  return isLink ? (
    <Link {...props} href={props.href} className={elClassName}>
      {children}
    </Link>
  ) : (
    <TagName {...props} className={elClassName}>
      {children}
    </TagName>
  )
}
