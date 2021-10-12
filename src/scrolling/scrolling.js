import { useEffect } from 'react'
import ScrollManager from './manager'

export function useConditionalScrolling(onScroll, condition, deps) {
  useEffect(() => {
    if (condition) {
      ScrollManager.addListener(onScroll)
    }
    return () => {
      if (condition) {
        ScrollManager.removeListener(onScroll)
      }
    }
  }, [onScroll, condition, ...deps])
}

export default function useScrolling(onScroll, deps) {
  useConditionalScrolling(onScroll, true, deps)
}
