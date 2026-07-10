'use client'

import { ReactNode, useRef } from 'react'
import {
  useFocusLock,
  useOnClickOutside,
  useOnEscKeydown,
  useScrollLock
} from '@hooks/index'
import { X } from '@phosphor-icons/react'
import { Portal } from '@service/portal'
import classNames from 'classnames'

import styles from './modal.module.scss'

interface ModalProps {
  onClose: () => void
  children: ReactNode
  tone?: 'brand' | 'light'
  labelledBy?: string
  describedBy?: string
  className?: string
}

// Reusable accessible modal. Rendered only while open (mounting locks scroll +
// focus; unmounting restores them and returns focus to the opener). Closes on
// backdrop click, Esc and the × button.
const Modal = ({
  onClose,
  children,
  tone = 'light',
  labelledBy,
  describedBy,
  className
}: ModalProps) => {
  const rootRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useScrollLock()
  useFocusLock(rootRef)
  useOnClickOutside(contentRef, onClose)
  useOnEscKeydown(onClose)

  return (
    <Portal selector="#modal-root">
      <div ref={rootRef} className={styles.overlay}>
        <div
          ref={contentRef}
          className={classNames(
            styles.content,
            styles[`content_${tone}`],
            className
          )}
          role="dialog"
          aria-modal="true"
          aria-labelledby={labelledBy}
          aria-describedby={describedBy}
        >
          <button
            type="button"
            className={styles.close}
            aria-label="Закрыть"
            onClick={onClose}
          >
            <X size={22} weight="bold" />
          </button>

          {children}
        </div>
      </div>
    </Portal>
  )
}

export default Modal
