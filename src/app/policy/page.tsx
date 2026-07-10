import type { Metadata } from 'next'
import { PolicyView } from '@views/policy'

export const metadata: Metadata = {
  title: 'Политика конфиденциальности',
  description:
    'Как мы обрабатываем и защищаем персональные данные посетителей сайта Кухни 30.',
  robots: { index: false, follow: true },
  alternates: { canonical: '/policy' }
}

export default function PolicyPage() {
  return <PolicyView />
}
