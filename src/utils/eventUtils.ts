export function stopPropagation(
  e: React.PointerEvent | React.MouseEvent | React.KeyboardEvent
) {
  e.stopPropagation();
}
