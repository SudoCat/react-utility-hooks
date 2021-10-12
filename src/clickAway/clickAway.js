import { useEffect } from 'react'

export default function useClickAway(wrapperRef, isEnabled, onClickAway, dependencies = []) {
  useEffect(() => {
    function onClick(evt) {
      if (!isEnabled || !wrapperRef.current) return
      const isClickInsideContainer = wrapperRef.current.contains(evt.target)
      if (!isClickInsideContainer) {
        onClickAway()
        evt.preventDefault()
      }
    }

    if (typeof window !== 'undefined') {
      window.addEventListener('click', onClick, true)
      return () => {
        window.removeEventListener('click', onClick, true)
      }
    }
    return undefined
  }, [wrapperRef, isEnabled, onClickAway, ...dependencies])
}
