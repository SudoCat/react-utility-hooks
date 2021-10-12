import { useRef, useCallback } from 'react'
import calculateOffset from '../calculateOffset'
import useResize from '../resize'
import useScrolling from '../scrolling'

export default function useScrollIntoView(onScrollIntoView, deps = []) {
  const wrapperNodeRef = useRef(null)
  const offsetRef = useRef(0)
  const inViewRef = useRef(false)

  const calculateOffsetRef = useCallback(node => {
    wrapperNodeRef.current = node
    if (node) {
      offsetRef.current = calculateOffset(node)
    }
  }, deps)

  useResize(() => {
    if (wrapperNodeRef.current) {
      offsetRef.current = calculateOffset(wrapperNodeRef.current)
    }
  }, [wrapperNodeRef.current, ...deps])

  useScrolling(() => {
    if (inViewRef.current) return
    if (window.scrollY + window.innerHeight > offsetRef.current) {
      inViewRef.current = true
      onScrollIntoView()
    }
  }, deps)

  return calculateOffsetRef
}
