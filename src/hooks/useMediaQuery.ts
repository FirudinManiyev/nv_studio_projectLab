import { useEffect, useState } from 'react'

export function useMediaQuery(query: string) {
  const getMatches = () =>
    typeof window.matchMedia === 'function' && window.matchMedia(query).matches

  const [matches, setMatches] = useState(getMatches)

  useEffect(() => {
    if (typeof window.matchMedia !== 'function') return

    const mediaQuery = window.matchMedia(query)
    const handleChange = (event: MediaQueryListEvent) => setMatches(event.matches)

    mediaQuery.addEventListener('change', handleChange)

    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [query])

  return matches
}
