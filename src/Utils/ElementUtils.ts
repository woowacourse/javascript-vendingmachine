export const $ = (selector, node: HTMLElement | DocumentFragment = document.body) =>
  node.querySelector(selector);
export const $$ = (selector, node: HTMLElement | DocumentFragment = document.body) =>
  node.querySelectorAll(selector);

export const convertStringToElement = (htmlString = ''): HTMLElement => {
  const element: HTMLElement = document.createElement('template');
  element.insertAdjacentHTML('afterbegin', htmlString);

  return <HTMLElement>element.children[0];
};

export const setContentOfChildElement = (
  element: HTMLElement,
  target: ITemplateSetting['childTextContent'],
): void => {
  Object.entries(target).forEach(([selector, innerText]) => {
    const $target: HTMLInputElement = element.querySelector(selector);
    $target.value !== undefined
      ? ($target.value = <string>innerText)
      : ($target.textContent = <string>innerText);
  });
};

export const setElementProperty = (
  element: HTMLElement,
  property: ITemplateSetting['elementProperty'],
): void => {
  Object.entries(property).forEach(([key, value]) => {
    if (key === 'dataset') {
      Object.entries(value).forEach(([datasetId, datasetValue]) =>
        element.setAttribute(`data-${datasetId}`, datasetValue),
      );
      return;
    }

    switch (typeof element[key]) {
      case 'string':
      case 'boolean':
        element[key] = value;
        break;
      case 'function':
        element[key](...(<[]>value));
        break;

      // no default
    }
  });
};

export const createTemplate = (
  template: HTMLElement | string,
  setting: ITemplateSetting,
): HTMLElement => {
  const element = typeof template === 'string' ? convertStringToElement(template) : template;

  const { childTextContent, elementProperty } = setting;
  childTextContent && setContentOfChildElement(element, childTextContent);
  elementProperty && setElementProperty(element, elementProperty);

  return element;
};
