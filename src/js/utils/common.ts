export function generateRandom(max) {
  return Math.floor(Math.random() * (max + 1));
}

export const $ = element => document.querySelector(element);

export const $$ = element => document.querySelectorAll(element);
