# useFocusTrap Hook

This hook can be used to create a focus trap for a component that opens/closes, such as a modal.

- Automatically focus on the first focusable element when your component opens.
- Prevent focus from leaving the component while it's open.
- Automatically return focus to the previously focussed element on close (such as the button used to open it)

## Usage

### Arguments

- **`isActive`**: _`bool`_

  Whether or not the focus trap is active. This should match the open state of the component using it. When the focus trap is inactive, it will do nothing. When the focus trap first becomes active, it will focus the first element. When the focus trap stops being active, it will return focus to the previously focussed element.

* **`getContext`**: _`func`_

  A function that returns the focus trap's context element. The context is the element within which focus should remain.

### Returns

The useFocusTrap hook will return two react nodes which must be used in your component.

- **`preNode`**: _`React.Component`_

  This should be placed as the previous sibling for your content area.

- **`postNode`**: _`React.Component`_

  This should be placed as the next sibling for your content area.

### Example

To use this hook:

- install and import `useFocusTrap`
- call `useFocusTrap` by passing your active state, and a function that returns your context node
- insert the `pre` and `post` node siblings

```jsx
export default function ComponentName() {
  const [isOpen, setOpen] = useState(false)
  const content = useRef(null)
  const { preNode, postNode } = useFocusTrap(isOpen, () => content.current)

  return isOpen ? (
    <div className="modal-wrap">
      {preNode}
      <div className="modal-content" ref={content}>
        <p>Pretend Modal, clicking outside of it will close it.</p>
      </div>
      {postNode}
    </div>
  ) : null
}
```

## Quirks

In some circumstance, this method may work without use of the pre and post nodes, however they ensure much more reliable behaviour.

In some browsers on certain operating systems, the auto-return-focus behaviour may be somewhat unreliable when triggering open state changes via pointer events.

This is due to some browsers on specific operating systems not setting focus on buttons/anchors on click.

It should behave as expected when using keyboard events.
