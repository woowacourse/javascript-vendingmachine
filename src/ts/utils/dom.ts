const $ = <E extends Element>(selector: string, element: E | Document = document): E | null =>
  element.querySelector(selector);

const $$ = <E extends Element>(selector: string, element: E | Document = document): NodeListOf<E> =>
  element.querySelectorAll(selector);

export { $, $$ };
