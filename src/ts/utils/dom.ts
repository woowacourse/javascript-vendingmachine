const $ = (selector: string, element: HTMLElement | Document = document) =>
  element.querySelector(selector) as HTMLElement;

const $$ = (selector: string, element: HTMLElement | Document = document) =>
  element.querySelectorAll(selector) as NodeList;

export { $, $$ };
