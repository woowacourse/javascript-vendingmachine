export const $ = (selector: string, baseElement: HTMLElement | Document = document): HTMLElement =>
  baseElement.querySelector(selector);
export const $$ = (selector: string, baseElement: HTMLElement | Document = document): NodeList =>
  baseElement.querySelectorAll(selector);

export const getRandomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
