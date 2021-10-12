import { useEffect } from 'react'
import debounce from 'lodash/debounce'

export default function useResize(onResize, deps = [], delay = 300) {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const debounced = debounce(onResize, delay)
      window.addEventListener('resize', debounced)
      return () => {
        window.removeEventListener('resize', debounced)
      }
    }
    return undefined
  }, deps)
}
