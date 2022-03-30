const selectDom = (selector: string, element: HTMLElement | Document = document): HTMLElement | null => {
  return element.querySelector(selector);
}

const selectDomAll = (selector: string, element: HTMLElement | Document = document): HTMLElement[] | null[]  => {
  return Array.from(element.querySelectorAll(selector));
}

const addEvent = (target: HTMLElement, eventName: string, handler) => {
  Array.isArray(target)
    ? target.map((v) => v.addEventListener(eventName, handler))
    : target.addEventListener(eventName, handler);
};

export { selectDom, selectDomAll, addEvent };
