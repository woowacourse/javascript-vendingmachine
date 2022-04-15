export const on = (
  target: Window | HTMLElement,
  eventName: string,
  callback
): void => {
  target.addEventListener(eventName, callback);
};

export const emit = (
  target: Window | HTMLElement,
  eventName: string,
  detail = {}
): void => {
  const customEvent = new CustomEvent(eventName, detail);
  target.dispatchEvent(customEvent);
};

export const $ = <T extends HTMLElement>(
  selector: string,
  element: Document | HTMLElement = document
): T | null => element.querySelector(selector);

export const $$ = <T extends HTMLElement>(
  selector: string
): NodeListOf<T> | null => document.querySelectorAll(selector);

export const focusEditInput = ($targetInput: HTMLInputElement): void => {
  $targetInput.focus();
  $targetInput.setSelectionRange(
    $targetInput.value.length,
    $targetInput.value.length
  );
};
