'use client'

import { FormEvent, useId, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { CONTACT_CHANNELS } from '@/shared/data/site'
import type { LeadChannel, LeadMode } from '@/shared/types/lead'
import { Button, Dropdown, Input, Textarea } from '@/ui'
import { submitLead } from '@api/lead'
import { Paperclip } from '@phosphor-icons/react'

import styles from './lead-form.module.scss'

interface LeadFormProps {
  mode: LeadMode
  source: string
  tone?: 'light' | 'dark'
  submitLabel: string
  onSuccess: () => void
}

const channelOptions = CONTACT_CHANNELS.map((c) => ({
  value: c.value,
  label: c.label
}))

const messageConfig: Record<
  Exclude<LeadMode, 'audit'>,
  { label: string; placeholder: string }
> = {
  new: {
    label: 'Размеры, планировка или описание задачи',
    placeholder:
      'Например: угловая 2400×1800, современный стиль, бюджет до 300 тыс.'
  },
  contact: {
    label: 'Комментарий',
    placeholder: 'Пара слов о кухне: размеры, стиль, что уже есть'
  }
}

const isValidPhone = (phone: string) => phone.replace(/\D/g, '').length >= 10

const LeadForm = ({
  mode,
  source,
  tone = 'light',
  submitLabel,
  onSuccess
}: LeadFormProps) => {
  const pathname = usePathname()
  const fieldId = useId()

  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [channel, setChannel] = useState<LeadChannel | ''>('')
  const [message, setMessage] = useState('')
  const [fileName, setFileName] = useState('')
  const [phoneError, setPhoneError] = useState(false)
  const [submitError, setSubmitError] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const showFile = mode === 'audit'
  const showTextarea = mode !== 'audit'

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    setSubmitError(false)

    if (!isValidPhone(phone)) {
      setPhoneError(true)
      return
    }

    setSubmitting(true)
    try {
      await submitLead({
        mode,
        name: name.trim(),
        phone: phone.trim(),
        channel,
        message: message.trim(),
        source,
        page: pathname,
        file: fileName || undefined
      })
      onSuccess()
    } catch {
      setSubmitError(true)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form className={styles.root} onSubmit={handleSubmit} noValidate>
      <div className={styles.field}>
        <label htmlFor={`${fieldId}-name`} className={styles.label}>
          Имя
        </label>
        <Input
          id={`${fieldId}-name`}
          name="name"
          tone={tone}
          autoComplete="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className={styles.field}>
        <label htmlFor={`${fieldId}-phone`} className={styles.label}>
          Телефон<span className={styles.required}>*</span>
        </label>
        <Input
          id={`${fieldId}-phone`}
          name="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder="+7 ___ ___-__-__"
          tone={tone}
          invalid={phoneError}
          aria-invalid={phoneError}
          value={phone}
          onChange={(e) => {
            setPhone(e.target.value)
            if (phoneError) setPhoneError(false)
          }}
        />
        {phoneError && (
          <span className={styles.error}>Укажите корректный телефон</span>
        )}
      </div>

      <div className={styles.field}>
        <span className={styles.label}>Удобный канал</span>
        <Dropdown
          options={channelOptions}
          value={channel}
          onChange={(value) => setChannel(value as LeadChannel)}
          placeholder="Telegram / WhatsApp / Звонок"
          tone={tone}
          aria-label="Удобный канал связи"
        />
      </div>

      {showTextarea && (
        <div className={styles.field}>
          <label htmlFor={`${fieldId}-message`} className={styles.label}>
            {messageConfig[mode as 'new' | 'contact'].label}
          </label>
          <Textarea
            id={`${fieldId}-message`}
            name="message"
            tone={tone}
            placeholder={messageConfig[mode as 'new' | 'contact'].placeholder}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
      )}

      {showFile && (
        <div className={styles.field}>
          <span className={styles.label}>Смета, фото или скрин</span>
          <label
            className={styles.file}
            data-tone={tone}
            data-has-file={!!fileName}
          >
            <Paperclip size={18} />
            <span className={styles.fileText}>
              {fileName || 'Прикрепить файл (необязательно)'}
            </span>
            <input
              type="file"
              className={styles.fileInput}
              accept="image/*,application/pdf"
              onChange={(e) => setFileName(e.target.files?.[0]?.name ?? '')}
            />
          </label>
        </div>
      )}

      {submitError && (
        <p className={styles.submitError}>
          Не удалось отправить. Попробуйте ещё раз или напишите в мессенджер.
        </p>
      )}

      <Button
        type="submit"
        block
        variant={tone === 'dark' ? 'ghost-dark' : 'primary'}
        disabled={submitting}
      >
        {submitting ? 'Отправляем…' : submitLabel}
      </Button>

      <p className={styles.consent} data-tone={tone}>
        Отправляя форму, вы соглашаетесь с{' '}
        <Link href="/policy">политикой конфиденциальности</Link> и обработкой
        персональных данных.
      </p>
    </form>
  )
}

export default LeadForm
