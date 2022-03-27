export const $ = (selector: string, parentNode = document): HTMLElement => parentNode.querySelector(selector);

export const generateRandomInRange = (min: number, max: number): number => Math.floor(Math.random() * (max + 1 - min)) + min;