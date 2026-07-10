import { ElementType, ReactNode } from 'react'
import classNames from 'classnames'

import styles from './container.module.scss'

interface ContainerProps {
  as?: ElementType
  children?: ReactNode
  className?: string
}

const Container = ({
  as: Tag = 'div',
  children,
  className
}: ContainerProps) => {
  return <Tag className={classNames(styles.root, className)}>{children}</Tag>
}

export default Container
