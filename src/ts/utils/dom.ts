const $ = <T extends HTMLElement>(
  selector: string,
  target: Document | HTMLElement = document,
): T => target.querySelector(selector);

const $$ = <T extends HTMLElement>(
  selector: string,
  target: Document | HTMLElement = document,
): NodeListOf<T> => target.querySelectorAll(selector);

const replaceHTML = ($el: HTMLElement, template: string) => {
  $el.replaceChildren();
  $el.insertAdjacentHTML('beforeend', template);
};

export { $, $$, replaceHTML };
