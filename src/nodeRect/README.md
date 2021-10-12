# useNodeRect

A hook to retrieve the boundingClientRect for a react component, updating automatically on resize.

## Usage

### Arguments

- **`deps`**: _`Array`_

  A list of dependencies to be passed to the hook.

### Returns

_`Oject`_

- **`node`**: _`Element`_

  A reference to the element.

- **`measuredRef`**: _`function`_

  A function returned from useCallback. Should be passed in as a `ref`

- **`...`**: _`DOMRect`_

  All of the properties of a DOMRect will be returned. These are rounded to the nearest whole number.

### Example

```jsx
import React from 'react
import { useNodeRect } from 'utils'

function Photo({src}) {
  const { node, measuredRef, width } = useNodeRect([src])
  return <img ref={measuredRef} src={src} />
}
```
