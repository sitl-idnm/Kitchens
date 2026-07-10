import type { Metadata } from 'next'
import { NotFoundView } from '@views/not-found'

export const metadata: Metadata = {
  title: 'Страница не найдена',
  robots: { index: false, follow: true }
}

export default function NotFound() {
  return <NotFoundView />
}
