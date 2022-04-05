export const selectDom = <E extends Element>(
  selector: string,
  parent: HTMLElement | Document = document
): E | null => parent.querySelector(selector);

export const selectDoms = <E extends Element>(
  selector: string,
  parent: HTMLElement | Document = document
): NodeListOf<E> => parent.querySelectorAll<E>(selector);

export const request = async (url: string, option) => {
  const response = await fetch(url, option);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data);
  }

  return data;
};
