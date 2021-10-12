# useClickAway Hook

A hook that provides a simple API for handling 'click away' style behaviour.

This is particularly useful when you have a modal or overlay that should close if the user clicks outside of it's bounds.

## Usage

### Arguments

- **`wrapperRef`**: _`Node`_

  A react ref object containing the wrapping node. This element will be used to calculate the bounding box. Any clicks outside of it will trigger the onClickAway function.

* **`isEnabled`**: _`bool`_

  Whether the click away behaviour should be active. This allows you to disable the click away handler, such as when the popup is not currently visible, or if a child popup is open.

- **`onClickAway`**: _`function`_

  This is a function that will be called when a click is registered outside of the wrapper node's bounds. Usually a function that will close the current component.

* **`dependencies`**: _`array`_

  An array of any other dependencies. These will be passed to the internal useEffect hook deps.

### Example

Below is an example of using this hook to close a modal when you click away from it.

```jsx
import React, { useState, useRef } from 'react'
import useClickAway from 'utils/clickAway'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  width: '400px',
  height: '400px',
  marginLeft: '-200px',
  marginTop: '-200px'
}

export default function ComponentName() {
  const [isOpen, setOpen] = useState(false);
  const node = useRef(null);
  useClickAway(node.current, isOpen, () => setOpen(false))

  return isOpen ? (
    <div ref={node} style={style}>
      <p>Pretend Modal, clicking outside of it will close it.</p>
    </div>
  ) : null
}
```