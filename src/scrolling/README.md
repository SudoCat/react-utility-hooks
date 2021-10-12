# Scrolling Utilities

## useScrolling Hook

This hook provides a simply, consistent interface for binding to scrolling events. Under the hood, it uses the ScrollManager to provide RAF throttled scrolling, to avoid impacting frame rate.

NOTE: Please still be cautious what you do within scroll events! avoid long running code, keep calculations to a minimum

### Usage

#### Arguments

- **`onScroll`**: _`function`_

  The function to be run within scroll.

- **`deps`**: _`array`_

  An array of depedencies to be passed to the useEffect.

#### Example

```jsx
import React, { useRef } from 'react'
import { useScrolling } from 'utils/scrolling'

function Component() {
  const ref = useRef(null)
  useScrolling(() => {
    if (ref.current) {
      ref.current.style.transform = `translateY(${window.scrollY})`
    }
  })

  return <div ref={ref} />
}
```

## useConditionalScrolling Hook

A fancy version of the useScrolling hook, with the option of conditionally enabling the scrolling events. Useful for events that should only be run in certain situations, such as lazy loaders.

### Usage

#### Arguments

- **`onScroll`**: _`function`_

  The function to be run within scroll.

- **`condition`**: _`bool`_

  The scroll event will only be bound/unbound if this value is true.

- **`deps`**: _`array`_

  An array of depedencies to be passed to the useEffect.

#### Example

```jsx
import React, { useRef, useState } from 'react'
import { useScrolling } from 'utils/scrolling'

function Component() {
  const [isEnabled, setEnabled] = useState(false)
  const ref = useRef(null)
  useScrolling(() => {
    if (ref.current) {
      ref.current.style.transform = `translateY(${window.scrollY})`
    }
  }, isEnabled)

  return (
    <button ref={ref} onClick={() => setEnabled(enabled => !enabled)}>
      sticky?
    </button>
  )
}
```

## ScrollManager

An optimised scroll manager which uses requestAnimationFrame under the hood to keep things buttery-smooth, and avoiding blocking main thread with scroll-bound actions.

## Usage

### Arguments

- **`onScroll`**: _`function`_

  The function to be run on scroll.

### Example

```js
import { ScrollMananger } from 'utils/scrolling'

ScrollManager.addListener(() => {
  console.log(window.scrollY)
})
```
