# calculateOffset

A small utility function for calculating the offset from the top of the page for a component.

## Usage

### Arguments

- **`node`**: _`Element`_

  The HMTL element to calculate the offset for.

### Example

```js
import { calculateOffset } from 'utils'

function onScroll() {
  const offset = calculateOffset(document.querySelector('.target'))
  if (window.scrollY > offset) {
    console.log('Visible')
  }
}
```
