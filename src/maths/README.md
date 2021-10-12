### isWithinRange

This function can be used to check if one number is within a range. Pass it the value, and the lower and upper bounds of the range, and it will return a bool.

#### Arguments

- **`value`**: _`number`_

  This is the value that will be compared.

* **`rangeStart`**: _`number`_

  The lower bounds of the range to compare against.

- **`rangeEnd`**: _`number`_

  The upper bounds of the range to compare against.

#### Usage

```js
const x = 5
const y = 15
const range = [0, 10]

console.log(isWithinRange(x, range[0], range[1])) // true
console.log(isWithinRange(y, range[0], range[1])) // false
```

### isInsideBounds

This function uses the `isWithinRange` function to check if a pair of x and y co-ordinates are within a `Rect`

#### Arguments

- **`x`**: _`number`_

  The x position (horizontal).

* **`y`**: _`number`_

  The y position (vertical).

- **`boundingRect`**: [_`DOMRect`_](https://developer.mozilla.org/en-US/docs/Web/API/DOMRect)

  The bounding rect to compare against the position.

#### Usage

```js
const target = document.getElementById('target')
const rect = target.getBoundingClientRect()

window.addEventListener('click', function (evt) {
  console.log(isInsideBounds(evt.clientX, evt.clientY, rect))
})
```

## Quirks

This solution relies on comparing the position of your click with the bounding box of the element, rather than a typical DOM tree walk.

While this makes it lighter, it does also mean that clicking elements hanging outside of the wrapping node will trigger the close event.
