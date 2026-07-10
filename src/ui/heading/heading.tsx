import { FC } from 'react'
import classNames from 'classnames'

import styles from './heading.module.scss'
import { HeadingProps } from './heading.types'

const Heading: FC<HeadingProps> = ({
  children,
  size = 'section',
  tagName = 'h2',
  id,
  className
}) => {
  const TagName = tagName
  const rootClassName = classNames(
    styles.root,
    styles[`root_${size}`],
    className
  )
  return (
    <TagName id={id} className={rootClassName}>
      {children}
    </TagName>
  )
}

export default Heading
