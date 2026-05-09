export function isTextLikeInput(el: EventTarget | null): boolean {
  if (!(el instanceof HTMLElement)) return false;
  const tag = el.tagName;
  if (tag === "TEXTAREA") return true;
  if (tag !== "INPUT") return el.isContentEditable;
  const type = (el as HTMLInputElement).type;
  return (
    type === "text" ||
    type === "search" ||
    type === "url" ||
    type === "email" ||
    type === "password" ||
    type === "tel" ||
    type === "number"
  );
}
