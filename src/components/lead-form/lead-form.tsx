'use client'

import { FormEvent, useId, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { CONTACT_CHANNELS } from '@/shared/data/site'
import { reachGoal, type MetrikaGoal } from '@/shared/lib/metrika'
import { isCompleteRuPhone } from '@/shared/lib/phone'
import type { LeadChannel, LeadMode } from '@/shared/types/lead'
import { Button, Checkbox, Dropdown, Input, PhoneInput, Textarea } from '@/ui'
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

const goalByMode: Record<LeadMode, MetrikaGoal> = {
  audit: 'lead_audit',
  new: 'lead_calc',
  contact: 'lead_contact'
}

const MAX_FILE_BYTES = 10 * 1024 * 1024 // 10 MB

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
  const [file, setFile] = useState<File | null>(null)
  const [fileError, setFileError] = useState('')
  const [consent, setConsent] = useState(false)
  const [phoneError, setPhoneError] = useState(false)
  const [consentError, setConsentError] = useState(false)
  const [submitError, setSubmitError] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const showFile = mode === 'audit'
  const showTextarea = mode !== 'audit'

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    setSubmitError(false)

    if (!isCompleteRuPhone(phone)) {
      setPhoneError(true)
      return
    }

    if (!consent) {
      setConsentError(true)
      return
    }

    setSubmitting(true)
    try {
      await submitLead(
        {
          mode,
          name: name.trim(),
          phone: phone.trim(),
          channel,
          message: message.trim(),
          source,
          page: pathname,
          file: file?.name
        },
        file
      )
      reachGoal('lead_submit', { mode, source })
      reachGoal(goalByMode[mode])
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
        <PhoneInput
          id={`${fieldId}-phone`}
          name="phone"
          tone={tone}
          invalid={phoneError}
          aria-invalid={phoneError}
          value={phone}
          onChange={(next) => {
            setPhone(next)
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
          placeholder="Telegram / Звонок"
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
            data-has-file={!!file}
          >
            <Paperclip size={18} />
            <span className={styles.fileText}>
              {file ? file.name : 'Прикрепить файл (необязательно)'}
            </span>
            <input
              type="file"
              className={styles.fileInput}
              accept="image/*,application/pdf"
              onChange={(e) => {
                const picked = e.target.files?.[0] ?? null
                if (picked && picked.size > MAX_FILE_BYTES) {
                  setFileError('Файл больше 10 МБ — прикрепите поменьше')
                  setFile(null)
                  return
                }
                setFileError('')
                setFile(picked)
              }}
            />
          </label>
          {fileError && <span className={styles.error}>{fileError}</span>}
        </div>
      )}

      <div className={styles.consentRow}>
        <Checkbox
          tone={tone}
          checked={consent}
          aria-invalid={consentError}
          className={consentError ? styles.consentInvalid : undefined}
          onChange={(e) => {
            setConsent(e.target.checked)
            if (consentError) setConsentError(false)
          }}
        >
          Я соглашаюсь с{' '}
          <Link
            href="/policy"
            target="_blank"
            rel="noreferrer"
            onClick={(e) => e.stopPropagation()}
          >
            политикой конфиденциальности
          </Link>{' '}
          и обработкой персональных данных.
        </Checkbox>
        {consentError && (
          <span className={styles.error}>
            Отметьте согласие, чтобы отправить заявку
          </span>
        )}
      </div>

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
    </form>
  )
}

export default LeadForm
