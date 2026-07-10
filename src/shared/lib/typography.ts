// Typography helper — glues short words (prepositions/conjunctions) to the next
// word with a non-breaking space so they never dangle at the end of a line.
// Handles chains ("а не так") via lookbehind (does not consume the leading
// delimiter). Use as {nbsp(text)} on any flowing copy.

// 1–2 letter words + common short prepositions/conjunctions.
const SHORT =
  '[a-zA-Zа-яёА-ЯЁ]{1,2}|для|без|над|под|про|что|как|это|или|уже|при|так|где|чем'

const WIDOW_RE = new RegExp(`(?<=^|[\\s(«"—-])(${SHORT})\\s+(?=\\S)`, 'gi')

const NBSP = String.fromCharCode(0x00a0)

export function nbsp(text: string): string {
  return text.replace(WIDOW_RE, `$1${NBSP}`)
}
