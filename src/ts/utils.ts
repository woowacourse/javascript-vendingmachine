import { STORAGE_ID } from './constants';

export const $ = <E extends Element, P extends Element>(
  selector: string,
  baseElement: P | Document = document,
): E | null => baseElement.querySelector(selector);

export const $$ = <E extends Element, P extends Element>(
  selector: string,
  baseElement: P | Document = document,
): NodeListOf<E> => baseElement.querySelectorAll(selector);

const $snackBar = $('#snackbar');

export const getRandomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const alertSnackBar = (message: string) => {
  $snackBar.classList.toggle('show');
  $snackBar.textContent = message;
  setTimeout(() => {
    $snackBar.classList.toggle('show');
  }, 3000);
};

export const isLogedIn = () => localStorage.getItem(STORAGE_ID.LOGIN);
