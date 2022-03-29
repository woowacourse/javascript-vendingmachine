export function generateRandom(max: number) {
  return Math.floor(Math.random() * (max + 1));
}

export const $ = selector => document.querySelector(selector);

export const $$ = selector => document.querySelectorAll(selector);

export const emit = ({ target = window, eventName, detail }) => {
  const event = new CustomEvent(eventName, { detail });
  target.dispatchEvent(event);
};
