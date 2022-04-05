export const $ = (selector, node: HTMLElement | DocumentFragment = document.body) =>
  node.querySelector(selector);
export const $$ = (selector, node: HTMLElement | DocumentFragment = document.body) =>
  node.querySelectorAll(selector);

export const getRandomNumber = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min + 1) + min);

export const isNumberInRange = (value: number, min: number, max: number): boolean =>
  value >= min && value <= max;

export const isStringLengthInRange = (value: string, min: number, max: number): boolean =>
  value.length >= min && value.length <= max;

export const isCorrectNumberUnit = (value: number, unit: number): boolean => value % unit === 0;

export const getSearchParamsParse = (searchUrl = ''): string => `?${searchUrl.split('?')[1]}`;

export const getSearchParamsObject = (searchUrl = ''): object =>
  Object.fromEntries(new URLSearchParams(searchUrl));

export const convertStringToElement = (htmlString = ''): HTMLElement => {
  const element: HTMLElement = document.createElement('template');
  element.insertAdjacentHTML('afterbegin', htmlString);

  return <HTMLElement>element.children[0];
};

export const setContentOfChildElement = (
  element: HTMLElement,
  target: TemplateSetting['childTextContent'],
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
  property: TemplateSetting['elementProperty'],
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
  setting: TemplateSetting,
): HTMLElement => {
  const element = typeof template === 'string' ? convertStringToElement(template) : template;

  setContentOfChildElement(element, setting.childTextContent);
  setElementProperty(element, setting.elementProperty);

  return element;
};
