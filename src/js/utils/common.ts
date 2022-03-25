export function generateRandom(max: number) {
  return Math.floor(Math.random() * (max + 1));
}

export const $ = selector => document.querySelector(selector);

export const $$ = selector => document.querySelectorAll(selector);
