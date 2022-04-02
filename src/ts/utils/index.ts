export const selectDom = (
  selector: string,
  parent: HTMLElement | Document = document
): HTMLElement => parent.querySelector(selector);

export const selectDoms = (selector: string, parent: HTMLElement | Document = document): NodeList =>
  parent.querySelectorAll(selector);
