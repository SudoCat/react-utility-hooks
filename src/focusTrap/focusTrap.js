import React, { useEffect, useRef } from 'react'

/**
 * Find all focusable elements within an element scope.
 *
 * @param {Node} scope the element scope within which to find focusable elements
 */
export function findFocusable(scope) {
  return scope.querySelectorAll(
    'a[href]:not([rel="ignore"]),input:not([type="hidden"]):not([type="file"]),button,select,textarea,[tabindex]:not([tabindex="-1"])'
  )
}

/**
 * ARIA focus management, based on W3 aria modal example.
 *
 * Auto focuses the first focusable element.
 *
 * Ensures tab events stay inside the currently active overlay.
 *
 * @param {bool} isActive the active state for the focus trap
 * @param {func} getContext a function that returns the focus trap's context element
 * @see https://www.w3.org/TR/wai-aria-practices-1.1/examples/dialog-modal/dialog.html#
 */
export default function useFocusTrap(isActive, getContext) {
  const originalFocus = useRef(null)
  const lastFocus = useRef(null)

  useEffect(() => {
    if (isActive) {
      originalFocus.current = document.activeElement
      const context = getContext()
      if (context) {
        const [first] = findFocusable(context)
        if (first) {
          // This delay is to avoid edge cases where focusing
          // an element while an ancestor is being animated
          // causes redraw issues
          setTimeout(() => {
            first.focus()
          }, 66)
        }
      }
    } else if (originalFocus.current) {
      originalFocus.current.focus()
      lastFocus.current = null
    }
  }, [isActive])

  useEffect(() => {
    function trapFocus(e) {
      if (!isActive) {
        return
      }

      const context = getContext()
      if (!context) {
        return
      }

      if (context.contains(e.target)) {
        // Inside the focus trap, update the last focussed element
        lastFocus.current = e.target
      } else {
        // Outside the focus trap, need to move focus inside the trap
        const focusables = findFocusable(context)
        if (lastFocus.current === focusables[0]) {
          // If the last focussed element was the first in the content area,
          // then set focus to last element
          focusables[focusables.length - 1].focus()
        } else {
          // Else, we've exited from the last focussable element, reset to start
          focusables[0].focus()
        }
        lastFocus.current = document.activeElement
      }
    }

    document.addEventListener('focus', trapFocus, true)
    return () => {
      document.removeEventListener('focus', trapFocus, true)
    }
  }, [isActive, getContext])

  // Return two nodes to act as focus traps
  // These nodes should come before and after the content area
  // This allows us to keep focus inside the focus trap
  return {
    // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
    preNode: <div tabIndex="0" />,
    // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
    postNode: <div tabIndex="0" />,
  }
}
