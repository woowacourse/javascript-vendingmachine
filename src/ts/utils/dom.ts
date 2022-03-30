const $ = (
  selector: string,
  target: Document | HTMLElement = document,
): HTMLElement | null => target.querySelector(selector);
const $$ = (
  selector: string,
  target: Document | HTMLElement = document,
): NodeListOf<HTMLElement> | null => target.querySelectorAll(selector);

const replaceHTML = ($el: HTMLElement, template: string) => {
  $el.replaceChildren();
  $el.insertAdjacentHTML('beforeend', template);
};

export { $, $$, replaceHTML };
