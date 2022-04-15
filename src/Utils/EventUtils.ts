export const routingEvent = (pagePath: string): void => {
  window.history.pushState({ path: pagePath }, '', pagePath);
  window.dispatchEvent(new Event('popstate'));
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
