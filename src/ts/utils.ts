export const $ = <E extends Element, P extends Element>(selector: string, baseElement: P | Document = document): E | null =>
  baseElement.querySelector(selector);

export const $$ = <E extends Element, P extends Element>(selector: string, baseElement: P | Document = document): NodeListOf<E> =>
  baseElement.querySelectorAll(selector);

export const getRandomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
