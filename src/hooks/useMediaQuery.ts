import { useEffect, useState } from 'react'

/** Reactive matchMedia hook. */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(query).matches,
  )

  useEffect(() => {
    const mql = window.matchMedia(query)
    const onChange = (e: MediaQueryListEvent) => setMatches(e.matches)
    setMatches(mql.matches)
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [query])

  return matches
}

/** Lighter 3D + simpler layout below this breakpoint. */
export const useIsMobile = () => useMediaQuery('(max-width: 768px)')

/** Honors the OS-level accessibility setting everywhere. */
export const usePrefersReducedMotion = () => useMediaQuery('(prefers-reduced-motion: reduce)')

/** Touch devices get no custom cursor / magnetic effects. */
export const useIsCoarsePointer = () => useMediaQuery('(pointer: coarse)')
