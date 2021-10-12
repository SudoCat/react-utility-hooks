# ScrollIntoView Hook

This is a basic utility hook for firing a function once when an element is scrolled into view.

It utilises the resize and scrolling hooks, and calculate offset utilities.

## Usage

```js
import { useScrollIntoView } from 'utils'

function Component() {
  const { updateElementRef } = useScrollIntoView(() => {
    alert("I'm visible!")
  })

  return (
    <div ref={updateElementRef} style={{ marginTop: '110vh' }}>
      I'll let you know when I'm visible.
    </div>
  )
}
```
