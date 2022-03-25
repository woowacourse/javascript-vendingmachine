export const $ = (selector:string, target:Element | Document = document):Element =>
  target.querySelector(selector);
