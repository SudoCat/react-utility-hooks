export default function calculateOffset(node) {
  let n = node
  let offsetTop = 0
  do {
    offsetTop += n.offsetTop
    n = n.offsetParent
  } while (n)
  return offsetTop
}
