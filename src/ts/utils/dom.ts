const $ = <T extends HTMLElement | HTMLInputElement | HTMLButtonElement>(
  selector: string,
  target: Document | HTMLElement = document,
): T | null => target.querySelector(selector) as T;
const $$ = <T extends HTMLElement | HTMLInputElement | HTMLButtonElement>(
  selector: string,
  target: Document | HTMLElement = document,
): NodeListOf<T> | null => target.querySelectorAll(selector) as NodeListOf<T>;

const getNamedItem = <T extends HTMLElement | HTMLInputElement>(
  elements: HTMLFormControlsCollection,
  name: string,
): T => elements.namedItem(name) as T;

const replaceHTML = ($el: HTMLElement, template: string) => {
  $el.replaceChildren();
  $el.insertAdjacentHTML('beforeend', template);
};

export { $, $$, getNamedItem, replaceHTML };
