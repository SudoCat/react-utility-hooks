import { useState, useCallback, useRef } from 'react'
import useResize from '../resize'

/**
 * This function converts a DOMRect into a regular object,
 * enabling use of the spread operator.
 *
 * It rounds all of the numbers for safe use elsewhere.
 *
 * @param {DOMRect} rect
 */
function formatRect(rect) {
  return {
    x: Math.round(rect.x),
    y: Math.round(rect.y),
    width: Math.round(rect.width),
    height: Math.round(rect.height),
    top: Math.round(rect.top),
    right: Math.round(rect.right),
    bottom: Math.round(rect.bottom),
    left: Math.round(rect.left),
  }
}

export default function useNodeRect(deps) {
  const [rect, setRect] = useState(0)
  const nodeRef = useRef(null)

  /** Auto measure node on creation */
  const measuredRef = useCallback(node => {
    if (node !== null) {
      nodeRef.current = node
      setRect(formatRect(node.getBoundingClientRect()))
    }
  }, deps)

  // Re-measure node on resize
  useResize(() => {
    if (nodeRef.current) {
      setRect(formatRect(nodeRef.current.getBoundingClientRect()))
    }
  })

  return {
    node: nodeRef,
    measuredRef,
    ...rect,
  }
}
