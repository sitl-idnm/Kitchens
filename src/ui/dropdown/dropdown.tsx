'use client'

import { useId, useRef, useState } from 'react'
import { CaretDown, Check } from '@phosphor-icons/react'
import classNames from 'classnames'
import { useOnClickOutside } from 'usehooks-ts'

import styles from './dropdown.module.scss'

export interface DropdownOption {
  value: string
  label: string
}

interface DropdownProps {
  options: readonly DropdownOption[]
  value?: string
  onChange: (value: string) => void
  placeholder?: string
  tone?: 'light' | 'dark'
  id?: string
  className?: string
  'aria-label'?: string
}

const Dropdown = ({
  options,
  value,
  onChange,
  placeholder = 'Выберите',
  tone = 'light',
  id,
  className,
  'aria-label': ariaLabel
}: DropdownProps) => {
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const listId = useId()

  useOnClickOutside(rootRef, () => setOpen(false))

  const selected = options.find((option) => option.value === value)

  const handleSelect = (next: string) => {
    onChange(next)
    setOpen(false)
  }

  return (
    <div
      ref={rootRef}
      className={classNames(styles.root, styles[`root_${tone}`], className)}
    >
      <button
        type="button"
        id={id}
        className={classNames(styles.trigger, open && styles.trigger_open)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={ariaLabel}
        onClick={() => setOpen((prev) => !prev)}
        onKeyDown={(event) => {
          if (event.key === 'Escape') setOpen(false)
        }}
      >
        <span
          className={classNames(styles.value, !selected && styles.placeholder)}
        >
          {selected ? selected.label : placeholder}
        </span>
        <CaretDown
          size={18}
          weight="bold"
          className={classNames(styles.caret, open && styles.caret_open)}
        />
      </button>

      {open && (
        <ul className={styles.menu} role="listbox" id={listId} tabIndex={-1}>
          {options.map((option) => {
            const isActive = option.value === value
            return (
              <li key={option.value} role="option" aria-selected={isActive}>
                <button
                  type="button"
                  className={classNames(
                    styles.option,
                    isActive && styles.option_active
                  )}
                  onClick={() => handleSelect(option.value)}
                >
                  <span>{option.label}</span>
                  {isActive && <Check size={16} weight="bold" />}
                </button>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}

export default Dropdown
