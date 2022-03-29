export const $ = (selector: string, target: Element | Document = document): Element =>
  target.querySelector(selector);

interface dataset {
  dataId: string;
  dataValue: unknown;
}
interface props {
  id?: string;
  class?: string;
  dataset?: dataset[];
}

export const createElement = (type: string, props: props = {}, children: string): Element => {
  const element = document.createElement(type);
  Object.entries(props).forEach(([key, value]) => {
    if (key === 'dataset') {
      value.forEach(({ dataId, dataValue }) => {
        element.setAttribute(dataId, dataValue);
      });
    } else {
      element.setAttribute(key, value);
    }
  });
  element.replaceChildren();
  element.insertAdjacentHTML('beforeend', children);
  return element;
};
