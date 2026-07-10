// SURA factory novelties — 3 cards. Icon keys map to Phosphor icons in the
// Novelties section component.

export type NoveltyIcon = 'gola' | 'led' | 'glass'

export interface Novelty {
  icon: NoveltyIcon
  title: string
  text: string
}

export const novelties: Novelty[] = [
  {
    icon: 'gola',
    title: 'Ручка-профиль Gola',
    text: 'Фасады без накладных ручек. Ровная линия и чистый фронт — кухня выглядит дороже, а открывается удобно.'
  },
  {
    icon: 'led',
    title: 'Модули с LED-подсветкой',
    text: 'Встроенный свет в модулях и полках. Мягкая подсветка рабочей зоны и витрин без отдельного монтажа.'
  },
  {
    icon: 'glass',
    title: 'Алюминиевые створки со стеклом',
    text: 'Витрины в тонкой алюминиевой рамке. Лёгкий, аккуратный акцент для верхних шкафов.'
  }
]
