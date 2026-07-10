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
    display: 'kitchens@kim.agency',
    href: 'mailto:kitchens@kim.agency',
    placeholder: false
  },
  telegram: {
    display: '@username',
    href: 'https://t.me/username',
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
  // Operator (personal-data controller) — ИП Мурзаев Б. И.
  operator: {
    name: 'Индивидуальный предприниматель Мурзаев Багаутдин Ибрагимович',
    instrumental:
      'индивидуальным предпринимателем Мурзаевым Багаутдином Ибрагимовичем',
    short: 'ИП Мурзаев Б. И.',
    inn: '057001361332',
    ogrnip: '324050000053489'
  },
  // Bank / payment requisites
  requisites: {
    account: '40802 810 2 3800 0503399',
    bankName: 'ПАО Сбербанк',
    bik: '044525225',
    corrAccount: '30101 810 4 0000 0000225'
  },
  // Legal line (footer)
  legalName: 'ИП Мурзаев Б. И., ИНН 057001361332',
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
  { value: 'call', label: 'Звонок' }
] as const
