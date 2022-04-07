export * from 'Utils/User/validator';
export * from 'Utils/Snackbar';

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

export const getEntryPath = (patnName = ''): string => {
  const pathName = patnName || window.location.pathname;
  const paths = pathName.split('/').filter(entry => entry !== '');

  return paths[paths.length - 1];
};

export const setCookie = (key: string, value: string, expire = 3600) => {
  const expireDate = new Date();
  expireDate.setSeconds(expireDate.getSeconds() + expire);

  document.cookie = `${key}=${encodeURIComponent(value)}; expires=${expireDate.toUTCString()};`;
};

export const getCookie = targetKey => {
  const splitCookie = document.cookie.split('; ');
  const cookieList = splitCookie.reduce((previous, cookie) => {
    const [key, value] = cookie.split('=');

    previous[key] = decodeURIComponent(value);
    return previous;
  }, {});

  return cookieList[targetKey];
};

export const getTimeStamp = (): number => Math.floor(new Date().getTime() / 1000);

export const routingEvent = (pagePath: string): void => {
  window.history.pushState({ path: pagePath }, '', pagePath);
  window.dispatchEvent(new Event('popstate'));
};

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

export const addEventDelegate = (
  container: HTMLElement | DocumentFragment,
  selector: string,
  { eventType, handler, defaultEvent = true }: IEventDelegateListener,
): void => {
  const children = [...container.querySelectorAll(selector)];
  const isTarget = (target: EventTarget): boolean => {
    if (target instanceof Element) {
      return children.includes(target) || !!target.closest(selector);
    }
    return false;
  };

  container.addEventListener(eventType, event => {
    if (defaultEvent === true) event.preventDefault();
    if (!isTarget(event.target)) return false;
    handler(event);
  });
};

export const addMultipleEventDelegate = (
  container: HTMLElement | DocumentFragment,
  eventType: string,
  listenerList: Record<string, Omit<IEventDelegateListener, 'eventType'>>,
): void => {
  Object.entries(listenerList).forEach(([selector, listener]) => {
    const { defaultEvent, handler } = listener;
    addEventDelegate(container, selector, { eventType, defaultEvent, handler });
  });
};

export const addEventOnce = (
  eventType: string,
  $element: HTMLElement,
  callback: () => void,
): void => {
  if ($element instanceof HTMLElement === false) {
    return;
  }

  $element.addEventListener(eventType, callback, {
    once: true,
  });
};

export const runAnimation = () =>
  new Promise(resolve => {
    requestAnimationFrame(resolve);
  });

export const getTimeDiffToPercent = (startTime, currentTime, totalTime = 1000) =>
  Math.ceil((currentTime - startTime) * (100 / totalTime));
