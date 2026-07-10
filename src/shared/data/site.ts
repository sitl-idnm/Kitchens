// =====================================================================
// SINGLE SOURCE OF TRUTH for brand, contacts & requisites.
// All ⟨placeholders⟩ from the handoff live here — the client's real data
// is filled in ONE place and flows into Header, Footer, Contacts, JSON-LD,
// Policy and metadata. Fields marked `placeholder: true` are not yet real.
// =====================================================================

export const SITE = {
  name: 'Кухни 30',
  domain: 'https://kitchens.kim-agency.ru',
  locale: 'ru_RU',
  lang: 'ru',
  description:
    'Кухни фабрики SURA напрямую, без салонной наценки. Проверка сметы, расчёт, замер, доставка и сборка. Москва и область.',
  themeColor: '#40312A',
  ogImage: '/images/og/og-image.webp'
} as const

export type ContactChannel =
  | 'phone'
  | 'email'
  | 'telegram'
  | 'whatsapp'
  | 'address'
  | 'schedule'

// ⟨…⟩ placeholders — replace with the client's real data before launch.
export const company = {
  phone: {
    display: '+7 930 418-88-14',
    href: 'tel:+79304188814',
    placeholder: false
  },
  email: {
    display: 'kitchens30@kim.agency',
    href: 'mailto:kitchens30@kim.agency',
    placeholder: false
  },
  telegram: {
    display: '@username',
    href: 'https://t.me/username',
    placeholder: true
  },
  whatsapp: {
    display: 'WhatsApp',
    href: 'https://wa.me/70000000000',
    placeholder: true
  },
  address: {
    display:
      'г. Москва, ул. Южнопортовая, д. 5, стр. 1, эт. 1, офис 116 (м. Кожуховская)',
    placeholder: false
  },
  schedule: {
    display: 'Пн–Вс, 10:00–20:00',
    placeholder: true
  },
  // Legal line (footer / policy)
  legalName: 'ИП/ООО «…», ИНН …',
  copyrightYear: 2026,
  areaServed: 'Москва и Московская область'
} as const

export const nav = [
  { label: 'Как работаем', href: '/#process' },
  { label: 'Кейсы', href: '/#catalog' },
  { label: 'Новинки', href: '/#novelties' },
  { label: 'Фабрика', href: '/#sura' },
  { label: 'Контакты', href: '/#contacts' }
] as const

export const CONTACT_CHANNELS = [
  { value: 'telegram', label: 'Telegram' },
  { value: 'whatsapp', label: 'WhatsApp' },
  { value: 'call', label: 'Звонок' }
] as const
