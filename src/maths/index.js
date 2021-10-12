export function isWithinRange(value, rangeStart, rangeEnd) {
  return value >= rangeStart && value <= rangeEnd;
}

export function isInsideBounds(x, y, boundingRect) {
  return (
    isWithinRange(x, boundingRect.x, boundingRect.x + boundingRect.width) &&
    isWithinRange(y, boundingRect.y, boundingRect.y + boundingRect.height)
  );
}
