import { Page } from './ui/CustomElement';

type CustomElementTag =
  | 'login-page'
  | 'profile-edit-page'
  | 'signup-page'
  | 'product-management-tab'
  | 'charge-tab'
  | 'purchase-tab'
  | 'user-menu';

type ElementType<T> = T extends CustomElementTag ? Page : Element;

export const pickRandomElement = <T>(array: T[]): T => {
  return array[Math.floor(Math.random() * array.length)];
};

export const emit = (selector: string, eventName: string, detail: object, component: Element | Document = document) => {
  const event = new CustomEvent(eventName, { detail });
  const target = component.querySelector(selector);

  target.dispatchEvent(event);
};

export const on = (
  selector: string,
  eventName: string,
  handler: (e: CustomEvent) => void,
  component: Element | Document = document,
) => {
  const targets = component.querySelectorAll(selector);

  targets.forEach((target) => target.addEventListener(eventName, handler));
};

export const addEvent = (component: Element, eventType: string, selector: string, callback: Function) => {
  const children = Array.from(component.querySelectorAll(selector));
  const isTarget = (target: Element) => children.includes(target) || target.closest(selector);

  component.addEventListener(eventType, (event) => {
    if (!isTarget(event.target as Element)) {
      return false;
    }
    return callback(event);
  });
};

export const $ = <T extends CustomElementTag | string>(
  selector: T,
  scope: Element | Document = document,
): ElementType<T> => scope.querySelector(selector);

export const $$ = (selector: string, scope: Element | Document = document) =>
  Array.from(scope.querySelectorAll(selector));

export const markUnit = (price: number) => price.toLocaleString();

export const deleteSeparator = (price: string) => parseInt(price.replace(',', ''), 10);

export const showSnackbar = (message: string) => {
  const snackbarContainer = $('#snackbar-container');

  snackbarContainer.insertAdjacentHTML('beforeend', `<div class="snackbar animation">${message}</div>`);

  setTimeout(() => {
    snackbarContainer.firstChild.remove();
  }, 3000);
};
