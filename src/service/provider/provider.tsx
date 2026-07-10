'use client'

import { FC, ReactNode, useEffect } from 'react'
import { DeviceAtomType, deviceWriteAtom } from '@atoms/deviceAtom'
import { Provider as JotaiProvider, useSetAtom } from 'jotai'

// Design-system breakpoints: mobile ≤560 · tablet 561–900 · desktop ≥901
const MOBILE_MAX = 560
const TABLET_MAX = 900

const getDeviceType = (width: number): DeviceAtomType => {
  if (width <= MOBILE_MAX) {
    return 'mobile'
  }

  if (width <= TABLET_MAX) {
    return 'tablet'
  }

  return 'desktop'
}

// Detects device type into a Jotai atom and keeps the `--vh` custom property in
// sync (mobile 100vh fix). Renders nothing and never blocks SSR of the page —
// children are always rendered on the server for SEO.
const DeviceDetector: FC = () => {
  const setDevice = useSetAtom(deviceWriteAtom)

  useEffect(() => {
    const handleResize = () => {
      document.documentElement.style.setProperty(
        '--vh',
        `${window.innerHeight * 0.01}px`
      )
      setDevice(getDeviceType(window.innerWidth))
    }

    handleResize()
    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [setDevice])

  return null
}

export const Provider: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <JotaiProvider>
      <DeviceDetector />
      {children}
    </JotaiProvider>
  )
}
