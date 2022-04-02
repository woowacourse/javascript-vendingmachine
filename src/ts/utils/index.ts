export const selectDom = (
  selector: string,
  parent: HTMLElement | Document = document
): HTMLElement => parent.querySelector(selector);

export const selectDoms = <E extends Element>(
  selector: string,
  parent: HTMLElement | Document = document
): NodeListOf<E> => parent.querySelectorAll<E>(selector);
