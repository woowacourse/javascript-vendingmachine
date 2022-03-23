export const $ = (selector: string, element = document) =>
  element.querySelector(selector) as HTMLElement;

export const addEvent = (target: HTMLElement, eventName: string, handler) => {
  Array.isArray(target)
    ? target.map((v) => v.addEventListener(eventName, handler))
    : target.addEventListener(eventName, handler);
};
