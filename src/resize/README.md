# useResize

This hook provides a consistent API for listening to window resize events, with debouncing for perf imrpovements.

## Usage

### Arguments

- **`onResize`**: _`function`_

  The function to be called on resize.

- **`deps`**: _`Array`_

  An array of depedencies to be passed in to the useEffect hook.

- **`delay`**: _`Number`_

  The delay for the debounce.

### Example

```jsx
import React, { useState } from 'react'
import { useResize } from 'utils/resize'

function Photo({src}) {
  const [width, setWidth] = useState(0)
  useResize(() => {
    setWidth(window.innerWidth)
  }, [src], 250)
  return <div style={{ width }} />
}
```
