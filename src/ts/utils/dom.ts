const selectDom = (selector: string, element: HTMLElement | Document = document): HTMLElement | null => {
  return element.querySelector(selector);
}

const selectDomAll = (selector: string, element: HTMLElement | Document = document): HTMLElement[] | null[]  => {
  return Array.from(element.querySelectorAll(selector));
}

const addEvent = (target: HTMLElement, eventName: string, handler) => {
  target.addEventListener(eventName, event => {
  try {
    handler(event);
  } catch ({ message }) {
    alert(message);
    return;
  }
  });
};

export { selectDom, selectDomAll, addEvent };
