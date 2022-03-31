export const $ = <E extends Element>(selector: string, baseElement: E | Document = document): E | null =>
  baseElement.querySelector(selector);

export const $$ = <E extends Element>(selector: string, baseElement: E | Document = document): NodeListOf<E> =>
  baseElement.querySelectorAll(selector);

export const getRandomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
