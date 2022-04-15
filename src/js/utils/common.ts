import { CustomEventType } from '../types/constants';

export function generateRandom(max: number) {
  return Math.floor(Math.random() * (max + 1));
}

export const $ = selector => document.querySelector(selector);

export const $$ = selector => document.querySelectorAll(selector);

export const emitCustomEvent = (customEventName: CustomEventType, detail?) => {
  window.dispatchEvent(new CustomEvent(customEventName, detail));
};

export const onCustomEvent = (customEventName: CustomEventType, eventHandler) => {
  window.addEventListener(customEventName, eventHandler);
};

export const showSnackBar = message => {
  const $snackbar = document.querySelector('#snackbar');
  $snackbar.textContent = message;
  $snackbar.classList.toggle('snackbar-show');
  setTimeout(() => {
    $snackbar.classList.toggle('snackbar-show');
  }, 2000);
};
