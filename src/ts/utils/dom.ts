const $ = (selector, target = document) => target.querySelector(selector);
const $$ = (selector, target = document) => target.querySelectorAll(selector);

const replaceHTML = ($el, template) => {
  $el.replaceChildren();
  $el.insertAdjacentHTML('beforeend', template);
};

export { $, $$, replaceHTML };
