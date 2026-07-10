'use client'

import { useEffect, useState } from 'react'
import { closeLeadAtom, leadModalAtom } from '@atoms/leadAtom'
import { LeadForm } from '@components/lead-form'
import { Modal } from '@components/modal'
import { SuccessScreen } from '@components/success-screen'
import { useAtomValue, useSetAtom } from 'jotai'

import styles from './lead-modal.module.scss'

const config = {
  audit: {
    title: 'Проверим смету до предоплаты',
    intro:
      'Оставьте телефон и удобный способ связи. Можно приложить смету, PDF, фото или скрин — разберём по составу и покажем, есть ли резерв без потери качества.',
    submit: 'Отправить смету'
  },
  new: {
    title: 'Расчёт по размерам',
    intro:
      'Оставьте телефон и удобный способ связи. Сметы нет — пришлите размеры, планировку, фото или желаемый стиль. Подскажем разумную рамку бюджета и что уточнить до замера.',
    submit: 'Получить расчёт'
  }
} as const

const LeadModal = () => {
  const state = useAtomValue(leadModalAtom)
  const close = useSetAtom(closeLeadAtom)
  const [done, setDone] = useState(false)

  // reset the success screen whenever the modal (re)opens
  useEffect(() => {
    if (state) setDone(false)
  }, [state])

  if (!state) return null

  const { mode, source } = state
  const current = config[mode]

  return (
    <Modal
      tone="brand"
      onClose={close}
      labelledBy="lead-modal-title"
      describedBy="lead-modal-intro"
    >
      {done ? (
        <SuccessScreen tone="dark" actionLabel="Закрыть" onAction={close} />
      ) : (
        <div className={styles.body}>
          <h2 id="lead-modal-title" className={styles.title}>
            {current.title}
          </h2>
          <p id="lead-modal-intro" className={styles.intro}>
            {current.intro}
          </p>

          <LeadForm
            mode={mode}
            source={source}
            tone="dark"
            submitLabel={current.submit}
            onSuccess={() => setDone(true)}
          />

          <p className={styles.disclaimer}>
            Предварительный расчёт не является финальной стоимостью. Точная цена
            зависит от замера, материалов, фурнитуры, доставки и сборки.
          </p>
        </div>
      )}
    </Modal>
  )
}

export default LeadModal
