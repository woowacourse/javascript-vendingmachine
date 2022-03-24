const $ = (selector: string, element: HTMLElement | Document = document) =>
  element.querySelector(selector) as HTMLElement;

const $$ = (selector: string, element: HTMLElement | Document = document) =>
  element.querySelectorAll(selector) as NodeList;

const addEvent = (target: HTMLElement, eventName: string, handler) => {
  Array.isArray(target)
    ? target.map((v) => v.addEventListener(eventName, handler))
    : target.addEventListener(eventName, handler);
};

export { $, $$, addEvent };
