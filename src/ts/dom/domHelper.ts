export const on = (
  target: Window | HTMLElement,
  eventName: string,
  callback
) => {
  target.addEventListener(eventName, callback);
};

export const emit = (
  target: Window | HTMLElement,
  eventName: string,
  detail = {}
) => {
  const customEvent = new CustomEvent(eventName, detail);
  target.dispatchEvent(customEvent);
};

export const $ = (selector: string): HTMLElement =>
  document.querySelector(selector);

export const $$ = (selector: string): NodeListOf<HTMLElement> =>
  document.querySelectorAll(selector);

export const focusEditInput = ($targetInput: HTMLInputElement): void => {
  $targetInput.focus();
  $targetInput.setSelectionRange(
    $targetInput.value.length,
    $targetInput.value.length
  );
};
