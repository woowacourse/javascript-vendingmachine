export const selectDom = <E extends Element>(
  selector: string,
  parent: HTMLElement | Document = document
): E | null => parent.querySelector(selector);

export const selectDoms = <E extends Element>(
  selector: string,
  parent: HTMLElement | Document = document
): NodeListOf<E> => parent.querySelectorAll<E>(selector);
