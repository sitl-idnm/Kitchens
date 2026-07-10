// Yandex.Metrika goal helper. Fire `reachGoal(id)` on conversions; the matching
// goals must be created in the Metrika dashboard as «JavaScript-событие» with the
// same identifier. `window.ym` is declared in components/analytics/yandex-metrika.
const YM_ID = process.env.NEXT_PUBLIC_YM_ID

export type MetrikaGoal =
  | 'lead_submit' // any submitted lead (common goal)
  | 'lead_audit' // «Проверить смету» modal
  | 'lead_calc' // «Рассчитать по размерам» modal
  | 'lead_contact' // inline form in the Contacts section

export function reachGoal(goal: MetrikaGoal, params?: Record<string, unknown>) {
  if (typeof window === 'undefined' || !YM_ID || !window.ym) return
  window.ym(Number(YM_ID), 'reachGoal', goal, params)
}
