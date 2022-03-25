const $ = (selector: string, target = document): HTMLElement =>
  target.querySelector(selector);
const $$ = (selector: string, target = document): NodeListOf<HTMLElement> =>
  target.querySelectorAll(selector);

const replaceHTML = ($el: HTMLElement, template: string) => {
  $el.replaceChildren();
  $el.insertAdjacentHTML('beforeend', template);
};

export { $, $$, replaceHTML };
